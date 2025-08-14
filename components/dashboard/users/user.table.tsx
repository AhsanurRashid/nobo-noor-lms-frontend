import getAllUsersAction from "@/app/actions/dashboard/users/getAllUsers.action"
import Pagination from "@/components/common/pagination"
import UserStatus from "@/components/common/user-status"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IPagination } from "@/lib/types/pagination.type"
import { User } from "@/lib/types/user.type"
import UserActions from "@/components/dashboard/users/user.actions"

const UserTable = async ({
  search,
  page,
  limit,
}: {
  search: string;
  page: number;
  limit: number;
}) => {
    const user = await getAllUsersAction({
      search,
      page,
      limit
    })
    if(!user || user?.users?.length < 1){
        return <div className="text-red-500 text-center text-xs font-light">No users found !</div>
    }
    
    return (
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {user?.users.map((user: User) => (
                <TableRow key={user._id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell><UserStatus status={user.role} /></TableCell>
                    <TableCell className="text-right">
                        <UserActions user={user} />
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>
                        <Pagination pagination={user?.pagination as IPagination} route="users" />
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
export default UserTable