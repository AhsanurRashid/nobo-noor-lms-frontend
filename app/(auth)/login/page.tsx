import LoginForm from "@/components/forms/login.form"
import Link from "next/link"

const LoginPage = () => {
  return (
    <div className='flex flex-col justify-center'>
      <LoginForm />
      <div className="flex justify-center text-xs mt-4 divide-x space-x-2">
        <div className="pr-2">
          <span>Don&apos;t have an account? <Link href='/register' className="text-blue-500 hover:underline">Register</Link></span>
        </div>
        <div>
          <span>Forgot Password? <Link href='/forget-password' className="text-blue-500 hover:underline">Forgot Password</Link></span>
        </div>
      </div>
    </div>
  )
}

export default LoginPage