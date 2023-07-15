import { Database } from '@/lib/schema'
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

type Questions = Database['public']['Tables']['questions']['Row']

export default function QuestionList({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const [questions, setQuestions] = useState<Questions[]>([])
  const [newContentText, setNewContentText] = useState('')
  const [errorText, setErrorText] = useState('')

  const user = session.user

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data: questions, error } = await supabase
        .from('questions')
        .select('*')
        .order('id', { ascending: true })

      if (error) console.log('error', error)
      else setQuestions(questions)
    }

    fetchQuestions()
  }, [supabase])

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
      }
    }
  }

  const deleteQuestion = async (id: number) => {
    try {
      await supabase.from('questions').delete().eq('id', id).throwOnError()
      setQuestions(questions.filter((x) => x.id != id))
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className="w-full">
      <h1 className="mb-12">Question List.</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addQuestion(newContentText)
        }}
        className="flex gap-2 my-2"
      >
        <input
          className="rounded w-full p-2"
          type="text"
          placeholder="make coffee"
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
      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul>
          {questions.map((question) => (
            <Question key={question.id} question={question} onDelete={() => deleteQuestion(question.id)} />
          ))}
        </ul>
      </div>
    </div>
  )
}

const Question = ({ question, onDelete }: { question: Questions; onDelete: () => void }) => {
  const supabase = useSupabaseClient<Database>()
  const [isCompleted, setIsCompleted] = useState(question.likes)

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

  return (
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
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete()
          }}
          className="w-4 h-4 ml-2 border-2 hover:border-black rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </li>
  )
}

const Alert = ({ text }: { text: string }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
)
