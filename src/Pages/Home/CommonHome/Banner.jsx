import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, EffectCoverflow, A11y]}
      spaceBetween={30}
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      }}
      navigation
      pagination={{ clickable: true }}
    >
      <SwiperSlide className="mb-3  relative ">
        <img
          data-aos="zoom-in"
          data-aos-duration="1000"
          data
          src="https://i.postimg.cc/4Nbnfjv4/pexels-fauxels-3183183.jpg"
          className="w-full md:h-[400px] lg:h-[550px] rounded-xl  border-0  "
          alt=""
        />
        <div className="absolute  flex flex-col  md:flex-col justify-center items-center w-full h-full space-y-5 top-0">
          <div className="text-2xl md:text-4xl lg:text-6xl font-bold text-transparent bg-gradient-to-r text-center from-rose-600 to-rose-500 bg-clip-text mt-10 md:mt-0">
            <p> Welcome to </p>
            <p className="mt-0 md:mt-3"> Assets Management System</p>
          </div>
          <Link to="/signUp">
            <button className="btn text-white  bg-gradient-to-r text-center from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700  text-xl px-7 md:mt-10 mt-5">
              JOIN AS A HR
            </button>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide className="mb-3  relative ">
        <img
          data-aos="zoom-in"
          data-aos-duration="1000"
          data
          className="w-full md:h-[400px] lg:h-[550px] rounded-xl   border-0"
          src="https://i.postimg.cc/4ypyhSr5/pexels-alxs-919734.jpg"
          alt=""
        />
        <div className="absolute flex flex-col  md:flex-col justify-center items-center w-full h-full space-y-5 top-0">
          <div className="text-2xl md:text-4xl lg:text-6xl font-bold text-transparent bg-gradient-to-r text-center from-green-600 to-green-500 bg-clip-text mt-10 md:mt-0">
            <p> Welcome to </p>
            <p className="mt-0 md:mt-3"> Assets Management System</p>
          </div>
          <Link to="/employSignUp">
            <button className="btn text-white  bg-gradient-to-r text-center from-pink-600 to-yellow-600 hover:from-pink-700 hover:to-yellow-700  text-xl md:px-7 md:mt-10 mt-5">
              {" "}
              JOIN AS A EMPLOY
            </button>
          </Link>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
