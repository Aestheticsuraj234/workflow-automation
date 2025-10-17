"use client"
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client';
import { requireAuth } from '@/lib/auth-utils';
import { useTRPC } from '@/trpc/client';
import { caller } from '@/trpc/server';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'


const Page = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const {data} = useQuery(trpc.getWorkflows.queryOptions());

 
const create = useMutation(trpc.createWorkflow.mutationOptions({


  onSuccess:()=>{
    queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
  }
}))

  return (
    <div className='min-h-screen h-full flex flex-col items-center justify-center'>
      
     {JSON.stringify(data, null, 2)}
     <Button disabled={create.isPending} onClick={()=>create.mutate()}>
      Create Workflow
     </Button>
    </div>
  )
}

export default Page