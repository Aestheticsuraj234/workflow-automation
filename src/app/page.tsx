
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client';
import { requireAuth } from '@/lib/auth-utils';
import { caller } from '@/trpc/server';
import React from 'react'


const Page = async() => {
 await requireAuth();
 const data = await caller.getUsers();

  return (
    <div className='min-h-screen h-full flex flex-col items-center justify-center'>
      {JSON.stringify(data , null, 2)}
     

    </div>
  )
}

export default Page