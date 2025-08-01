import getSlidersAction from "@/app/actions/dashboard/sliders/getSliders.action"
import { showImage } from "@/lib/helper/show.image"
import { ISlider } from "@/lib/types/slider.types"
import Image from "next/image"
import DeleteSlider from "@/components/dashboard/sliders/delete.slider"
import EditSlider from "@/components/dashboard/sliders/edit.slider"


const ShowSlider = async() => {
    const res = await getSlidersAction()
    if(!res || res.code === 500 || res.error) {
        return <h1 className="text-red-500 text-center text-xs font-light">Something went wrong</h1>
    }                                                                                                                           
  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {
            res.sliders.map((slider: ISlider) => (
                <div className="w-full h-30 relative aspect-video rounded-lg" key={slider._id}>
                    <Image src={showImage(slider.slider)} alt={slider._id} fill className="object-cover rounded-lg" />
                    <div className="absolute -top-2 -right-2 flex items-center gap-2">
                        <EditSlider id={slider._id} />
                        <DeleteSlider id={slider._id} />
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default ShowSlider