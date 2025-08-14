"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

type DashboardChartProps = {
  totalCourses: number;
  totalStudents: number;
  revenue: number;
};

const DashboardChart = ({ totalCourses, totalStudents, revenue }: DashboardChartProps) => {
  const data = [
    { name: "Courses", value: totalCourses },
    { name: "Students", value: totalStudents },
    { name: "Revenue", value: revenue },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-md w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={60}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#6366f1" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
