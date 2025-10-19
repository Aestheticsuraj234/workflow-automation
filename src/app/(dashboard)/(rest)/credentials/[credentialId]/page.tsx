import { requireAuth } from '@/lib/auth-utils'
import React from 'react'

interface PageProps {
  params: Promise<{
    credentialId: string
  }>
}
const Page = async ({ params }: PageProps) => {
  const { credentialId } = await params
  await requireAuth()
  return (
    <div>Credential ID: {credentialId}</div>
  )
}

export default Page