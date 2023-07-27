'use client';

import { Database } from '@/lib/schema'
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { Button, Card } from 'flowbite-react';
import { Alert } from "flowbite-react";
import Link from 'next/link';

type Questions = Database['public']['Tables']['questions']['Row']


export default function QuestionList() {
  const supabase = useSupabaseClient<Database>()
  const [questions, setQuestions] = useState<Questions[]>([])
  const [newContentText, setNewContentText] = useState('')
  const [errorText, setErrorText] = useState('')
  const [imgSrc, setImgSrc] = useState('https://random.imagecdn.app/300/200')
  

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data: questions, error } = await supabase
        .from('questions')
        .select('*')
        .not('answer', 'is', null)
        .order('id', { ascending: true })

      if (error) 
      <Alert color="info">There was an error!: {error.message}</Alert>
      else setQuestions(questions)
    }

    fetchQuestions()
  }, [supabase])


  // const addQuestion = async (contentText: string) => {
  //   let content = contentText.trim()
  //   if (content.length) {
  //     const { data: question, error } = await supabase
  //       .from('questions')
  //       .insert({ content, user_id: user_id })
  //       .select()
  //       .single()

  //     if (error) {
  //       setErrorText(error.message)
  //     } else {
  //       setQuestions([...questions, question])
  //       setNewContentText('')
  //     }
  //   }
  // }

  const likeQuestion = async (id: number, likes: number) => {
    try {
      await supabase.from('questions').update({likes: likes + 1}).eq('id', id).throwOnError()
      setQuestions(questions.filter((x) => x.id != id))
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className="w-full">
      {!!errorText && <Alert>{errorText}</Alert>}
      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul>
          {questions.map(
              (question) => 
              <Question key={question.id} question={question} imgSrc={imgSrc} />
              
          )}
        </ul>
      </div>
    </div>
  )
}

const Question = ({ question, imgSrc }: { question: Questions; imgSrc: string }) => {
  const supabase = useSupabaseClient<Database>()
  const [isCompleted, setIsCompleted] = useState(question.likes)
  const [toggleAnswer, setToggleAnswer] = useState(false);
  const [redirectedImgSrc, setRedirectedImgSrc] = useState('');
  
  useEffect(() => {
    const fetchRedirectedImage = async () => {
      const fetchImg = await fetch('https://random.imagecdn.app/300/200');

      setRedirectedImgSrc(fetchImg.url)
    }

    fetchRedirectedImage()
  }, [imgSrc])


  const likesCount = question.likes || 0
  const toggle = async () => {
    try {
      const { data } = await supabase
        .from('questions')
        .update({ likes: likesCount + 1 })
        .eq('id', question.id)
        .throwOnError()
        .select()
        .single()

      if (data) setIsCompleted(data.likes)
    } catch (error) {
      console.log('error', error)
    }
  }

  async function getRedirectedImgUrl() {
    return await fetch('https://random.imagecdn.app/300/200');
  }

  function doToggleAnswer() {
    setToggleAnswer(!toggleAnswer);
  } 

  return (
    
<li className="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out p-4">
  <Link href={`/question/${question.id}`}>
      <Card 
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={redirectedImgSrc}
      className="w-full h-full">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {question.content}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-2">
          {question.answer}
        </p>
      </Card>
      </Link>
  </li>
  )
}

{/* 
<li className="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out">
<div className="flex items-center px-4 py-4 sm:px-6">
  <div className="min-w-0 flex-1 flex items-center">
    <div className="text-sm leading-5 font-medium truncate">{question.content}</div>
  </div>
  <div>
    <input
      className="cursor-pointer"
      onChange={(e) => toggle()}
      type="checkbox"
      checked={isCompleted ? true : false}
    />
  </div>
</div>
</li> 

*/}
