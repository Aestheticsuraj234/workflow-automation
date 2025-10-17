import { LoginForm } from '@/features/auth/components/login-form'
import { requireUnAuth } from '@/lib/auth-utils'

import React from 'react'

const Page = async () => {
  await requireUnAuth()
  return (

    <LoginForm />

  )
}

export default Page