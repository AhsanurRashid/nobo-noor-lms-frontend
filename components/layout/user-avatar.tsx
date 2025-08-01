import getUserAction from '@/app/actions/user/getUser.action';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link';
import User from '@/public/assets/user.webp';
import { breakName } from '@/lib/helper/break.name';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutDashboard, User2 } from 'lucide-react';
import LogoutButton from '../common/logout.button';
import { cn } from '@/lib/utils';

const UserAvatar = async() => {
  const user = await getUserAction()
  return (
    <>
      {!user.error ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex items-center gap-2 cursor-pointer'>
              <p className='text-xs capitalize font-light tracking-wide text-muted-foreground'>{user.user.name}</p>
              <Avatar>
                <AvatarImage src={User.src} />
                <AvatarFallback>{breakName(user.user.name) || "CN"}</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-40" align="end">
            <DropdownMenuLabel className='capitalize'>
              <div className={cn(user?.user?.role === "admin" ? "bg-green-500" : user?.user?.role === "instructor" ? "bg-blue-600" : "bg-gray-600", "flex items-center w-full justify-center py-1 rounded text-white")}>
                {user?.user?.role}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {
              user?.user?.role === "admin" && (
                <>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href="/admin/dashboard" className="flex items-center gap-1 w-full">
                        <LayoutDashboard size="xs" />
                        <p className="ml-2">Dashboard</p>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </>
                
              )
            }
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/profile" className="flex items-center gap-1 w-full">
                  <User2 size="xs" />
                  <p className="ml-2">Profile</p>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className='flex items-center gap-2 divide-x divide-gray-300 dark:divide-gray-700'>
            <Link href="/login" className='text-xs text-muted-foreground uppercase pr-2 hover:underline'>Login</Link>
            <Link href="/register" className='text-xs text-muted-foreground uppercase hover:underline'>Register</Link>
        </div>
      )}
    </>
  )
}

export default UserAvatar