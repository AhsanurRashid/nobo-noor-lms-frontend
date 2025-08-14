import GenerateButton from "@/components/common/generate-button"
import SearchInput from "@/components/common/search.input"
import TableSkeleton from "@/components/common/table.skeleton"
import CourseCreationForm from "@/components/forms/courses/create.course.form"
import { Separator } from "@/components/ui/separator"
import { Suspense } from "react"
import CoursesTable from "@/components/dashboard/courses/courses.table"

const CoursesWrapper = ({
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
                <SearchInput limit={limit} route="courses" />
                <GenerateButton title="Create Course">
                    <CourseCreationForm />
                </GenerateButton>
            </div>

            <Separator />

            <Suspense fallback={<TableSkeleton />}>
                <CoursesTable search={search} page={page} limit={limit}/>
            </Suspense>
    </div>
  )
}

export default CoursesWrapper