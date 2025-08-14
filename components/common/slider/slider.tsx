"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ISlider } from "@/lib/types/slider.types";
import { showImage } from "@/lib/helper/show.image";
import Image from "next/image";

const SimpleSlider = ({sliders}: {sliders: ISlider[]}) => {
    const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false
  };
  return (
    <section id='slider-section'>
        <div className="slider-container">
            <Slider {...settings}>
                {sliders.map((slider: ISlider) => (
                    <div key={slider?._id} className="relative w-full h-[480px] rounded-lg">
                      <Image
                        src={showImage(slider?.slider)}
                        alt={slider?._id}
                        fill
                        className="object-cover rounded-lg"
                        priority
                      />
                    </div>
                ))}
            </Slider>
        </div>
    </section>
  )
}

export default SimpleSlider