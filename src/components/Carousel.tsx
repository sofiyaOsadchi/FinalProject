import React from 'react';
import { Carousel } from 'flowbite-react';

const CarouselComponent: React.FC = () => {
    return (
        <div className="h-60 sm:h-70 xl:h-[25rem] 2xl:h-[40rem]">
            <Carousel pauseOnHover>
              {/*   <img src="public/img/Elegant Dresses Facebook Cover (2400 x 1080 px) (1).png" alt="Elegant Dresses Cover" /> */}
               
                <img src="public\img\Brown & White Fashion Photo Collage New Collection Facebook Cover (2400 x 1000 px).png" alt="Elegant Dresses Cover" />
                {/* <img src="public\img\Brown & White Fashion Photo Collage New Collection Facebook Cover.png"..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." /> */}
            </Carousel>
        </div>
    );
}

export { CarouselComponent };