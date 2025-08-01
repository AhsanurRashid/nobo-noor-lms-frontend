const DashboardSkeleton = () => {
  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      {
        Array.from({ length: 10 }).map((_, index) => (
          <div key={`dashboard_skeleton_${index}`} className="w-full h-30 relative aspect-video rounded-lg bg-muted-foreground animate-pulse">
          </div>
        ))
      }
    </div>
  )
}

export default DashboardSkeleton