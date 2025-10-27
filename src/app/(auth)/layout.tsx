import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
   <div className='bg-muted flex min-h-svh items-center  flex-col justify-center gap-6 md:p-10'>
      <div className='max-w-sm w-full mx-auto flex flex-col gap-6'>
        <Link href='/' className='text-3xl font-bold text-center'>
          <Image
            src={"/logo.svg"}
            alt='Logo'
            width={30}
            height={30}

          />
          WorkFlow Automation
        </Link>

      {children}
      </div>
      </div>
  )
}

export default AuthLayout