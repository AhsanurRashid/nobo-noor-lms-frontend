import CoursesWrapper from "@/components/dashboard/courses/course.wrapper"

const CoursesPage = async(
  {
    searchParams
}: {
    searchParams?: Promise<{ search?: string; page?: string; limit?: string }>;
}) => {

  const params = await searchParams;
  const search = params?.search || "";
  const page = parseInt(params?.page || "1", 10);
  const limit = parseInt(params?.limit || "10", 10);

  return (
    <div>
        <CoursesWrapper search={search} page={page} limit={limit}/>
    </div>
  )
}

export default CoursesPage