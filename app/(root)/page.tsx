import SliderWrapper from "@/components/common/slider/slider.wrapper";
import HomePageSliderSkeleton from "@/components/skeletons/homepageSlider.skeleton";
import { Suspense } from "react";


const Home = () => {
  return (
    <main>
      <Suspense fallback={<HomePageSliderSkeleton />}>
        <SliderWrapper />
      </Suspense>
    </main>
  );
}

export default Home;
