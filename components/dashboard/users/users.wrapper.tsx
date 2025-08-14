import { Suspense } from 'react'
import UserTable from './user.table'
import TableSkeleton from '@/components/common/table.skeleton'
import SearchInput from '@/components/common/search.input';
import { Separator } from '@/components/ui/separator';
import GenerateButton from '@/components/common/generate-button';
import UserCreationForm from '@/components/forms/user/user.creation.form';

const UsersWrapper = ({
  search,
  page,
  limit,
}: {
  search: string;
  page: number;
  limit: number;
}) => {
    return (
        <div className='space-y-4'>
            <div className='flex items-center justify-between'>
                <SearchInput limit={limit} route="users" />
                <GenerateButton title="Create User">
                    <UserCreationForm />
                </GenerateButton>
            </div>

            <Separator />

            <Suspense fallback={<TableSkeleton />}>
                <UserTable search={search} page={page} limit={limit}/>
            </Suspense>
        </div>
    )
}

export default UsersWrapper