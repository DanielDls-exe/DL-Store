import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import tw from "twin.macro";
import { Title } from "@/components/core/Title";

const Page = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <section tw="flex justify-center items-center flex-col gap-8">
        <Title>DL Store</Title>
        
        <div tw="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
          <Slider {...sliderSettings}>
            <div><img tw="max-w-full h-auto" src="/uno.jpg" alt="Game 1" /></div>
            <div><img tw="max-w-full h-auto" src="/uno.jpg" alt="Game 2" /></div>
          </Slider>
        </div>

        <div tw="text-center p-8">
          <p>Welcome to DL Store, your one-stop shop for all your favorite video games.</p>
        </div>
      </section>
    </div>
  );
};

export default Page;
