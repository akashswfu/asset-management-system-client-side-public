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
      scrollbar={{ draggable: true }}
    >
      <SwiperSlide className="mb-3  relative bg-white">
        <img
          data-aos="zoom-in"
          data-aos-duration="1000"
          data
          className="w-full md:h-[450px] lg:h-[650px] rounded-3xl opacity-50 border-0 bg-green-200 "
          alt=""
        />
        <div className="absolute hidden md:flex flex-col justify-center items-center w-full h-full space-y-5 top-0">
          <p className="text-6xl font-bold text-transparent bg-gradient-to-r from-rose-500 text-center  to-rose-900 bg-clip-text">
            Welcome to <br />
            Assets Management System
          </p>
          <Link to="/signUp">
            <button className="btn btn-info text-xl px-7">JOIN AS A HR</button>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide className="mb-3  relative bg-white">
        <img
          data-aos="zoom-in"
          data-aos-duration="1000"
          data
          className="w-full md:h-[450px] lg:h-[650px] rounded-3xl opacity-50 bg-blue-200 border-0"
          //   src="https://i.postimg.cc/ZqYwW5w8/pexels-wolfgang-weiser-18705291.jpg"
          alt=""
        />
        <div className="absolute hidden md:flex flex-col justify-center items-center w-full h-full space-y-5 top-0">
          <p className="text-6xl font-bold text-transparent bg-gradient-to-r from-rose-500 text-center  to-rose-900 bg-clip-text">
            Welcome to <br />
            Assets Management System
          </p>
          <Link to="/employSignUp">
            <button className="btn btn-info text-xl px-7">
              JOIN AS A EMPLOY
            </button>
          </Link>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
