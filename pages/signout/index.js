
import { useEffect } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Alert } from "flowbite-react";
import  {Link} from 'next/link'

const SignOut = () => {

    const session = useSession()
    const supabase = useSupabaseClient()

    useEffect(() => {
        const signOut = async () => {
            const { error } = await supabase.auth.signOut()
            if (error) 
            <Alert color="info">Error logging out: {error.message}</Alert>
        }
    
        signOut()        
      }, [supabase])
    
    return (
        <div className="w-full h-full bg-gray-200">
          <div className="min-w-full min-h-screen flex justify-center">
            <div className="w-full h-full flex justify-center items-center p-4">
              <div className="w-full h-full sm:h-auto sm:w-2/5 max-w-sm p-5 bg-white shadow flex flex-col text-base">
                <span className="font-sans text-2xl text-center pb-2 mb-1 border-b mx-4 align-center">
                  You are signed out. Click from the menu to go to the questions.
                </span>

              </div>
            </div>
          </div>
      </div>  
      );
};

export default SignOut;
