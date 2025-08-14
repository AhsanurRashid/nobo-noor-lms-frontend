import UsersWrapper from "@/components/dashboard/users/users.wrapper"

const UsersPage = async ({
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
        <UsersWrapper search={search} page={page} limit={limit}/>
    </div>
  )
}

export default UsersPage
