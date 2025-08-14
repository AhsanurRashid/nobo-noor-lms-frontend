import Pagination from "@/components/common/pagination"
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
import getAllCoursesAction from "@/app/actions/dashboard/courses/getAllCourses.action"
import { ICourse } from "@/lib/types/course.type"
import { showImage } from "@/lib/helper/show.image"
import Image from "next/image";
import CourseActions from "@/components/dashboard/courses/course.action"

const CoursesTable = async ({
  search,
  page,
  limit,
}: {
  search: string;
  page: number;
  limit: number;
}) => {
    const courses = await getAllCoursesAction({
      search,
      page,
      limit
    })
    if(!courses || courses?.data?.length < 1){
        return <div className="text-red-500 text-center text-xs font-light">No courses found !</div>
    }
    
    return (
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {courses?.data.map((course: ICourse) => (
                <TableRow key={course._id}>
                    <TableCell>
                        <Image
                            src={showImage(course.thumbnail)}
                            alt={course._id}
                            width={100}
                            height={100}
                            className="object-cover aspect-video rounded-lg"
                        />
                    </TableCell>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>{course.instructor?.name}</TableCell>
                    <TableCell>{course.price}</TableCell>
                    <TableCell className="text-right">
                        <CourseActions course={course} />
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5}>
                        <Pagination pagination={courses?.pagination as IPagination} route="courses" />
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
export default CoursesTable