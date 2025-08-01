"use client"
import logoutAction from '@/app/actions/auth/logout.action';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
    const handleOnClick = async() => {
        await logoutAction();
    }
  return (
    <div onClick={handleOnClick} className="flex items-center gap-1 w-full cursor-pointer">
        <LogOut size="xs" />
        <p className="ml-2">Log out</p>
    </div>
  )
}

export default LogoutButton