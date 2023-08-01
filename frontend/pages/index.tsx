import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { useGamesList } from './../components/games/UseGame'; 



const Page = () => {
  const GAMES_PER_SLIDE = 1; 
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // 
    autoplaySpeed: 2000, 
  };

  const list = useGamesList(); 

  const slides = [];
  for (let i = 0; i < list.length; i += GAMES_PER_SLIDE) {
    slides.push(list.slice(i, i + GAMES_PER_SLIDE));
  }

  return (
    <div style={{ display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    }}>
      <section tw="flex justify-center items-center flex-col gap-8" style={{ maxWidth: '100%', marginTop: '0px' }}>
  
        <div tw="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/4" style={{ height: '50%' }}>
          <Slider {...sliderSettings}>
            {!slides.length ? (
              <p>Loading...</p>
            ) : (
              slides.map((slide, idx) => (
                <div key={idx} style={{ display: 'flex', height: '100%' }}>
                  {slide.map((game) => (
                    <div key={game._id} style={{ flex: 1, padding: '10px', height: '800%' }}>
                      <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <img style={{ width: '100%', height: '403px', objectFit: 'cover' }} src={game.img} alt={game.title} />
                        <h3 style={{ textAlign: 'center', marginTop: '10px' }}>{game.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </Slider>
        </div>
      </section>
    </div>
  );
};

export default Page;
