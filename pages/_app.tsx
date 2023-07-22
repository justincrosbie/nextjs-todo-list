import { supabase } from '@/lib/initSupabase'
import '@/styles/tailwind.css'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'
import Layout from '@/components/layoutold'
// import { Layout } from 'ui/page-directory/layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  )
}
