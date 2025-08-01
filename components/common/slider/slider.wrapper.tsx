import React from 'react'
import SimpleSlider from '@/components/common/slider/slider'
import getSlidersAction from '@/app/actions/dashboard/sliders/getSliders.action'
import { ISlider } from '@/lib/types/slider.types'

const SliderWrapper = async() => {
    const res = await getSlidersAction()
    if(!res || res.code === 500 || res.error) {
        return <h1 className="text-red-500 text-center text-xs font-light">Something went wrong</h1>
    } 
  return (
    <div>
        <SimpleSlider sliders={res.sliders as ISlider[]} />
    </div>
  )
}

export default SliderWrapper