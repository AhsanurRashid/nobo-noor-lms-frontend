import getUserCountAction from "@/app/actions/dashboard/users/getUserCount.action";
import { Book, Users, DollarSign } from "lucide-react";
import DashboardChart from "@/components/dashboard/dashboard.chart";

const DashboardCards = async() => {
    const res = await getUserCountAction()

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className='rounded-2xl p-5 shadow-md text-white flex items-center justify-between bg-indigo-500'>
                    <div>
                        <h3 className="text-lg font-semibold">Courses</h3>
                        <p className="text-3xl font-bold mt-1">{res?.counts?.course}</p>
                    </div>
                    <div className="ml-4">
                        <Book className="w-6 h-6 text-white" />
                    </div>
                </div>
                <div className='rounded-2xl p-5 shadow-md text-white flex items-center justify-between bg-emerald-500'>
                    <div>
                        <h3 className="text-lg font-semibold">Students</h3>
                        <p className="text-3xl font-bold mt-1">{res?.counts?.student}</p>
                    </div>
                    <div className="ml-4">
                        <Users className="w-6 h-6 text-white" />
                    </div>
                </div>
                <div className='rounded-2xl p-5 shadow-md text-white flex items-center justify-between bg-pink-500'>
                    <div>
                        <h3 className="text-lg font-semibold">Revenue</h3>
                        <p className="text-3xl font-bold mt-1">0.00</p>
                    </div>
                    <div className="ml-4">
                        <DollarSign className="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>
            <DashboardChart
                totalCourses={res?.counts?.course || 0}
                totalStudents={res?.counts?.student || 0}
                revenue={15.00}
            />
        </div>
    );
};

export default DashboardCards;
