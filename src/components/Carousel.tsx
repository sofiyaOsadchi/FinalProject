/* import React from 'react';
import { Carousel } from 'flowbite-react';

const CarouselComponent: React.FC = () => {
    return (
        <div className="h-60 sm:h-70 xl:h-[25rem] 2xl:h-[40rem]">
            <Carousel pauseOnHover>
               
                <img src="\img\Brown & White Fashion Photo Collage New Collection Facebook Cover (2400 x 1000 px).png" alt="Elegant Dresses Cover" />
                
            </Carousel>
        </div>
    );
}

export { CarouselComponent }; */
import React from 'react';
import { Carousel } from 'flowbite-react';
import './Carousel.scss';

const CarouselComponent: React.FC = () => {
    const isMobile = window.innerWidth < 768;

    return (
        <div className="h-60 sm:h-70 xl:h-[25rem] 2xl:h-[40rem] custom-carousel">
            <Carousel pauseOnHover>
                {isMobile ? (
                    <img src="\img\Brown & White Fashion Photo Collage New Collection Facebook Cover (2400 x 1000 px) (2400 x 1200 px).png" alt="Elegant Dresses Cover Mobile" />
                ) : (
                    <img src="\img\Brown & White Fashion Photo Collage New Collection Facebook Cover (2400 x 1000 px).png" alt="Elegant Dresses Cover" />
                )}
            </Carousel>
        </div>
    );
}

export { CarouselComponent };
