import CreateSlider from "@/components/dashboard/sliders/create.slider";
import ShowSlider from "@/components/dashboard/sliders/show.slider";
import DashboardSkeleton from "@/components/skeletons/dashboardSlider.skeleton"
import { Suspense } from "react";

const SlidersPage = async() => {
  return (
    <div className="space-y-6">
      <Suspense fallback={<DashboardSkeleton />}>
        <ShowSlider />
      </Suspense>
      <CreateSlider />
    </div>
  )
}

export default SlidersPage