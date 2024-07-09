
import { Carousel } from 'flowbite-react';

const CarouselComponent: React.FC = () => {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel pauseOnHover>
                <img src="https://www.brides.com/thmb/3QKU-W65NwYGXyFCfmVUn3kMrWM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/fall-cocktail-attire-dress-recirc-Alen-Karupovic-de945e683307429bb0dc8118bd2f21a7.jpg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
            </Carousel>
        </div>
    );
}
export { CarouselComponent };

