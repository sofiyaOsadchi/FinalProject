import React from 'react';
import { Carousel } from 'flowbite-react';

const CarouselComponent: React.FC = () => {
    return (
        <div className="h-80 sm:h-86 xl:h-[30rem] 2xl:h-[45rem]">
            <Carousel pauseOnHover>
                <img src="public/img/Elegant Dresses Facebook Cover (2400 x 1080 px) (1).png" alt="Elegant Dresses Cover" />
                {/* <img src="public/img/Elegant Dresses Facebook Cover (2400 x 1080 px) (1).png"..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." /> */}
            </Carousel>
        </div>
    );
}

export { CarouselComponent };