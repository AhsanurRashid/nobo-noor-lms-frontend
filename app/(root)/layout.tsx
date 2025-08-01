import Navbar from '@/components/layout/navbar'

const RootLayout = ({
    children
}: {
    children: React.ReactNode   
}) => {
  return (
    <div className='2xl:w-[1400px] xl:w-[1200px] lg:w-[992px] md:w-[768px] sm:w-[576px] w-[calc(100%-2rem)] mx-auto'>  
        <Navbar />
        {children}
    </div>
  )
}

export default RootLayout