import { Database } from '@/lib/schema'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import QuestionView from '@/components/QuestionView';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { Alert } from 'flowbite-react';

type Question = Database['public']['Tables']['questions']['Row']

const AskQuestion = () => {

    const session = useSession()
    const supabase = useSupabaseClient()

    const router = useRouter()
    const [question, setQuestion] = useState<Question>()

    const { questionId } = router.query
    const questionIdStr = questionId as string

    return (
        <div className="w-full h-full bg-gray-200">
        {!session ? (
          <div className="min-w-full min-h-screen flex justify-center">
            <div className="w-full h-full flex justify-center items-center p-4">
              <div className="w-full h-full sm:h-auto sm:w-2/5 max-w-sm p-5 bg-white shadow flex flex-col text-base">
                <span className="font-sans text-2xl text-center pb-2 mb-1 border-b mx-4 align-center">
                  You just need to sign in to ask a question
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
            {questionId ? 
            <QuestionView questionId={questionIdStr} />
            : <Alert>No Question!</Alert>}
          </div>
        )}
      </div>  
      );
};

export default AskQuestion;
