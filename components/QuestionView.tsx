import { Database } from '@/lib/schema'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import Link from 'next/link';
import { Alert, Button, Card } from 'flowbite-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'

type Question = Database['public']['Tables']['questions']['Row']

export default function QuestionView({ questionId }: { questionId: string }) {
  const session = useSession()
  const supabase = useSupabaseClient<Database>()
  const [question, setQuestion] = useState<Question>()
  const [errorText, setErrorText] = useState('')
  const [infoText, setInfoText] = useState('')

  useEffect(() => {
    const fetchQuestion = async () => {

      const { data: questionList, error } = await supabase
        .from('questions')
        .select('*')
        .eq('id', questionId)
        .limit(1)
        .single()

      if (error)  
        <Alert color="info">There was an error!: <br></br> {error.message}</Alert>
      else {
        setQuestion(questionList);
      }
    }

    fetchQuestion()
  }, [supabase, questionId])


  const user = session?.user

  const likeQuestion = async () => {
    
    if ( user) {
      const { data: question_like, error } = await supabase
        .from('question_likes')
        .insert({ user_id: user.id, question_id: questionId })
        .select()
        .single()

      if (error) {
        if (error.message.includes('duplicate key value violates unique constraint')) {
          setErrorText('You already liked this question')
          setInfoText('')
        } else {
          setErrorText(error.message)
          setInfoText('')
        }
      } else {
        setInfoText('Thanks, glad you liked!')
      }
    }
  }

  return (
    <div className="w-full h-full bg-gray-200">
      {!session ? (
        <div className="min-w-full min-h-screen flex justify-center">
          <div className="w-full h-full flex justify-center items-center p-4">
            <div className="w-full h-full sm:h-auto sm:w-2/5 max-w-sm p-5 bg-white shadow flex flex-col text-base">
              <span className="font-sans text-2xl text-center pb-2 mb-1 border-b mx-4 align-center">
                You just need to sign in to view a question
              </span>
              <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="w-full flex flex-col justify-center items-center p-4"
          style={{ minWidth: 250, maxWidth: 600, margin: 'auto' }}
        >
        <div className="w-full">
          
          <Card 
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc="https://random.imagecdn.app/300/200"
            className="w-full h-full" href="#">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {question ? question.content : ''}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {question ? question.answer : ''}
            </p>

            <Button
              onClick={() => {
                setErrorText('')
                likeQuestion()
              }}
            >
              <div className="flex gap-3 md:order-2">Click if you like! 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
              </svg>
              </div>
            </Button>
          </Card>
        </div>
      </div>
      )}

{!!errorText && <Alert color="red">{errorText}</Alert>}
{!!infoText && <Alert color="green">{infoText}</Alert>}
    </div>
  )
}
