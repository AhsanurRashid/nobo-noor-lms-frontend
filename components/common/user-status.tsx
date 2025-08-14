import { cn } from "@/lib/utils"

const UserStatus = ({ status }: { status: string }) => {
  return (
    <div className={cn(status === 'admin' ? 'bg-green-500' : status === 'instructor' ? 'bg-blue-500' : 'bg-gray-500', 'text-white inline-block py-2 px-4 rounded capitalize text-center')}>
      {status}
    </div>
  )
}

export default UserStatus