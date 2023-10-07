"use client"

import { getRoleName } from "@/lib/enum/user-role"
import { Button } from "@mantine/core"
import { User } from "@prisma/client"
import { signOut, useSession } from "next-auth/react"

type WelcomeProps = {
  users: User[]
}

export default function Welcome({ users }: WelcomeProps) {
  const { data: session } = useSession()

  if (!session) {
    return <></>
  }

  return (
    <div>
      <div>
        <h1 className="text-center text-6xl font-bold">Garudahashira</h1>
        <div>
          Signed in as {session.user?.email} <br />
          Signed in as {getRoleName(session.user?.role)} <br />
        </div>
        <div>
          <Button variant="filled">Button</Button>
        </div>

        <Button variant="outline" onClick={() => signOut()}>Sign out</Button>
      </div>
    </div>
  )
}
