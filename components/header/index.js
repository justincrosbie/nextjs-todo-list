import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from "flowbite-react";
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import logo from './logo.png'

export default function SiteHeader() {

  const session = useSession()
  const supabase = useSupabaseClient()

  return (

    (session ? (
      <Navbar
        fluid={true}
        rounded={true}
      >
        <Navbar.Brand href="/">
          <img
            src="/DALL·E 2023-07-23 12.43.28 - an echo into space.png"
            className="mr-3 h-6 sm:h-9"
            alt="An echo into space, generated by DALL-E"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Echoes into space
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            href="/"
            active={true}
          >
            Home
          </Navbar.Link>
          <Navbar.Link href="/askquestion">
          Ask a Question
          </Navbar.Link>

          <Navbar.Link href="/signout" >
          Sign out
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    ) : (
<Navbar
        fluid={true}
        rounded={true}
      >
        <Navbar.Brand href="/">
          <img
            src="/DALL·E 2023-07-23 12.43.28 - an echo into space.png"
            className="mr-3 h-6 sm:h-9"
            alt="An echo into space, generated by DALL-E"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Echoes into space
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            href="/"
            active={true}
          >
            Home
          </Navbar.Link>
          <Navbar.Link href="/askquestion">
          Ask a Question
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>      
    )
      )

  )
}
