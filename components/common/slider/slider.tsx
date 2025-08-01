"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ISlider } from "@/lib/types/slider.types";
import { showImage } from "@/lib/helper/show.image";

const SimpleSlider = ({sliders}: {sliders: ISlider[]}) => {
    const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  return (
    <section id='slider-section'>
        <div className="slider-container">
            <Slider {...settings}>
                {sliders.map((slider: ISlider) => (
                    <div key={slider?._id}>
                        <img
                        src={showImage(slider?.slider)}
                        alt={slider?._id}
                        className="rounded-xl w-full h-[400px] object-cover shadow-md"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    </section>
  )
}

export default SimpleSlider