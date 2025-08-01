import RegisterForm from '@/components/forms/register.form'
import Link from 'next/link'
import React from 'react'

const Registration = () => {
  return (
    <div className='flex flex-col justify-center'>
      <RegisterForm />
      <div className="flex justify-center text-xs mt-4 pb-10">
        <div className="pr-2">
          <span>Already have an account? <Link href='/login' className="text-blue-500 hover:underline">LogIn</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Registration