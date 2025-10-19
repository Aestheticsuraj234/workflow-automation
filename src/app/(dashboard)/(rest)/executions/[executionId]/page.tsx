import { requireAuth } from '@/lib/auth-utils'
import React from 'react'

interface PageProps {
  params: Promise<{
    executionId: string
  }>
}
const Page = async ({ params }: PageProps) => {
  const { executionId } = await params
  await requireAuth()
  return (
    <div>Credential ID: {executionId}</div>
  )
}

export default Page