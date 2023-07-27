import { Database } from '@/lib/schema'
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';

type Questions = Database['public']['Tables']['questions']['Row']

export default function QuestionAdd({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const [questions, setQuestions] = useState<Questions[]>([])
  const [newContentText, setNewContentText] = useState('')
  const [errorText, setErrorText] = useState('')
  const router = useRouter()

  const user = session.user

  const addQuestion = async (contentText: string) => {
    
    let content = contentText.trim()
    if (content.length) {
      const { data: question, error } = await supabase
        .from('questions')
        .insert({ content, user_id: user.id })
        .select()
        .single()

      if (error) {
        setErrorText(error.message)
      } else {
        setQuestions([...questions, question])
        setNewContentText('')
        router.push(`/question/ok`)
      }
    }
  }


  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addQuestion(newContentText)
        }}
        className="gap-2 my-2"
      >
        <textarea
          rows={5}
          className="rounded w-full p-2"
          placeholder="Ask your question"
          value={newContentText}
          onChange={(e) => {
            setErrorText('')
            setNewContentText(e.target.value)
          }}
        />
        <button className="btn-black" type="submit">
          Add
        </button>
      </form>
      {!!errorText && <Alert text={errorText} />}
    </div>
  )
}

const Alert = ({ text }: { text: string }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
)
