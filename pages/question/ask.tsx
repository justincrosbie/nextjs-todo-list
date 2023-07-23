import QuestionAdd from '@/components/QuestionAdd';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'

const AskQuestion = () => {

    const session = useSession()
    const supabase = useSupabaseClient()

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
            <QuestionAdd session={session} />
          </div>
        )}
      </div>  );
};

export default AskQuestion;
