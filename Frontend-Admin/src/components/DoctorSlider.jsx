import React from "react";
import Slider from "react-slick";
import Doc1 from '../images/doc1.jpg'
import Doc2 from '../images/doc2.jpg'
import Doc3 from '../images/doc3.jpg'
import Doc4 from '../images/doc4.jpg'
import Doc5 from '../images/doc5.jpg'


const doctors = [
  {
    name: "Dr. John Smith",
    image: Doc1,
    facebook: "#",
    twitter: "#",
    google: "#",
  },
  {
    name: "Dr. Emma Brown",
    image: Doc2,
    facebook: "#",
    twitter: "#",
    google: "#",
  },
  {
    name: "Dr. William Johnson",
    image: Doc3,
    facebook: "#",
    twitter: "#",
    google: "#",
  },
  {
    name: "Dr. Sophia Taylor",
    image: Doc4,
    facebook: "#",
    twitter: "#",
    google: "#",
  },
  {
    name: "Dr. Liam Davis",
    image: Doc5,
    facebook: "#",
    twitter: "#",
    google: "#",
  }
];

const DoctorSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10">
      <h2 className="text-center text-3xl font-bold mb-6">
        Our <span className="text-blue-600">Outstanding</span> Doctors
      </h2>
      <Slider {...settings}>
        {doctors.map((doctor, index) => (
          <div key={index} className="p-4">
            <div className="bg-white  rounded-lg shadow-md text-center">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{doctor.name}</h3>
                <div className="flex justify-center space-x-4">
                  <a
                    href={doctor.facebook}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Facebook
                  </a>
                  <a
                    href={doctor.twitter}
                    className="text-blue-400 hover:text-blue-600"
                  >
                    Twitter
                  </a>
                  <a
                    href={doctor.google}
                    className="text-red-600 hover:text-red-800"
                  >
                    Google
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DoctorSlider;
