import NavbarForAdmin from "@/components/layout/navbar-for-admin"
import Sidebar from "@/components/dashboard/sidebar"

const AdminLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
  return (
    <section >
      <NavbarForAdmin />
      <div className="flex">
        <div className="2xl:min-w-[320px] min-w-[250px] min-h-screen border-r shadow-r-md p-4 overflow-y-auto">
          <Sidebar />
        </div>
        <div className="p-4 w-full">
          {children}
        </div>
      </div>
    </section>
  )
}

export default AdminLayout