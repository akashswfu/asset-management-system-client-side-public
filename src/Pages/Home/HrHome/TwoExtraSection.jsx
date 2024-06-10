import React from "react";

const TwoExtraSection = () => {
  return (
    <div>
      <h2 className="text-4xl text-center font-bold my-8 text-transparent bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text pb-5 uppercase mt-20">
        Best Selling Products
      </h2>
      <div>
        <h2 className="text-2xl text-center font-bold my-8 text-transparent bg-gradient-to-r from-green-600 to-green-600 bg-clip-text pb-5 uppercase mt-10">
          Returnable Products
        </h2>
        <div className="grid grid-cols-3  justify-items-center">
          <div>
            <img
              className="w-[380px] h-80  "
              src="https://i.postimg.cc/D0DfKg1q/pexels-craigmdennis-205421.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="w-[380px] h-80 "
              src="https://i.postimg.cc/DfYws2R8/pexels-monoar-rahman-22660-109371.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="w-[380px] h-80 "
              src="https://i.postimg.cc/KYFGF43s/pexels-johnpet-2115256.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="grid grid-cols-3  justify-items-center mt-20">
          <div>
            <img
              className="w-80 h-80  "
              src="https://i.postimg.cc/tCZCNKHD/pexels-lum3n-44775-399161.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="w-80 h-80 "
              src="https://i.postimg.cc/FKZ9KmjF/pexels-paula-schmidt-353488-963486.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="w-80 h-80 "
              src="https://i.postimg.cc/DZw7JDgr/pexels-daan-stevens-66128-939331.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl text-center font-bold my-8 text-transparent bg-gradient-to-r from-green-600 to-green-600 bg-clip-text pb-5 uppercase mt-16">
          Non-Returnable Products
        </h2>
        <div className="grid grid-cols-3  justify-items-center">
          <div>
            <img
              className="w-80 h-80  "
              src="https://i.postimg.cc/QCWGcrWT/pexels-alex-green-5699456.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="w-80 h-80 "
              src="https://i.postimg.cc/wvrYtB3z/pexels-pixabay-159752.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="w-80 h-80 "
              src="https://i.postimg.cc/JtVwqdbd/pexels-tirachard-kumtanom-112571-733857.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="grid grid-cols-3  justify-items-center mt-20">
          <div>
            <img
              className="w-80 h-80  "
              src="https://i.postimg.cc/J7yGpDNb/pexels-asya-vlasova-228168-2575363.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="w-80 h-80 "
              src="https://i.postimg.cc/sD71Rk0x/pexels-pixabay-163031.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="w-80 h-80 "
              src="https://i.postimg.cc/Zn3Y4NH2/pexels-wisdomsky-2292081.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoExtraSection;
