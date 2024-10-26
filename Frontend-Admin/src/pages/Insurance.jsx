import React from "react";
import "../styles/insurance.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import DocImg from "../images/main-bg.png";
import StoryImg from "../images/our-story.jpg";
import TestImg from "../images/testimonials-img.png";
import TProfile from "../images/t1.jpg";
import { FaCapsules } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillSkin } from "react-icons/ai";
import { FaSquarePollHorizontal } from "react-icons/fa6";
import { FaTooth } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { CiStar } from "react-icons/ci";

export default function Insurance() {
  return (
    <>
      <div className="hero-content">
        <div className="hero-text">
          <h1>Feel Better About Finding The Best Health Insurance</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga
            aliquam blanditiis assumenda accusamus facere, beatae ratione.
            Temporibus iste ab fugit!
          </p>

          <div className="hero-text-btns">
            <Link className="a" to="https://insurance-morgphealth.netlify.app">
              Get Insuranced
            </Link>
          </div>
        </div>

        <div className="hero-img">
          <img src={DocImg} alt="" />
        </div>
      </div>
      <div className="what-we-provide">
        <div className="w-info-box w-info-box-1">
          <div className="w-info-icon">
            <FaCapsules />
          </div>

          <div className="w-info-text">
            <strong>Specialised Service</strong>
            <p>Lorem ipsum dolor sot0</p>
          </div>
        </div>

        <div className="w-info-box w-info-box-2">
          <div className="w-info-icon">
            <AiFillMessage />
          </div>

          <div className="w-info-text">
            <strong>24/7 Advanced Care</strong>
            <p>Lorem ipsum dolor sot0</p>
          </div>
        </div>

        <div className="w-info-box w-info-box-3">
          <div className="w-info-icon">
            <FaSquarePollHorizontal />
          </div>

          <div className="w-info-text">
            <strong>Get Result Online</strong>
            <p>Lorem ipsum dolor sot0</p>
          </div>
        </div>
      </div>

      <div className="our-story">
        <div className="our-story-img">
          <img src={StoryImg} alt="" />
        </div>

        <div className="our-story-text">
          <h2>Short Story About Our Clinic</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
            beatae nam eaque ea similique, doloribus animi vero quisquam
            asperiores tempore?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
            beatae nam eaque ea similique, doloribus animi vero quisquam
            asperiores tempore?
          </p>

          <div className="story-number-container">
            <div className="story-number-box s-n-box1">
              <storng>1000+</storng>
              <span>Happy Patients</span>
            </div>

            <div className="story-number-box s-n-box2">
              <storng>215+</storng>
              <span>Expert Doctor's0</span>
            </div>

            <div className="story-number-box s-n-box3">
              <storng>300+</storng>
              <span>Hospital Rooms</span>
            </div>

            <div className="story-number-box s-n-box4">
              <storng>106+</storng>
              <span>Award Winning</span>
            </div>
          </div>
        </div>
      </div>

      <div className="our-services">
        <div className="services-heading">
          <div className="services-heading-text">
            <strong>Our Services</strong>
            <h2>High Quality Services For You</h2>
          </div>
        </div>

        <div className="services-box-container">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              <div className="services-box s-box1">
                <div className="i">
                  <FaTooth />
                </div>

                <storng className="strong">Dental Care</storng>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloremque aliquid ut perspiciatis! Voluptatem, sed adipisci?
                </p>

                <Link className="link" to="">
                  Read More
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="services-box s-box2">
                <div className="i">
                  <FaEye />
                </div>

                <storng className="strong">Eye Care</storng>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloremque aliquid ut perspiciatis! Voluptatem, sed adipisci?
                </p>

                <Link className="link" to="">
                  Read More
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="services-box s-box3">
                <div className="i">
                  <AiFillSkin />
                </div>

                <storng className="strong">Skin Care</storng>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloremque aliquid ut perspiciatis! Voluptatem, sed adipisci?
                </p>

                <Link className="link" to="">
                  Read More
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="services-box s-box4">
                <div className="i">
                  <FaTooth />
                </div>

                <storng className="strong">Dental Care</storng>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloremque aliquid ut perspiciatis! Voluptatem, sed adipisci?
                </p>

                <Link className="link" to="">
                  Read More
                </Link>
              </div>
            </SwiperSlide>
            ...
          </Swiper>
        </div>

        <span className="services-help-btn">
          Contact Us If You Need Any Help And Service{" "}
          <Link className="a" to="">
            Let's Get Started
          </Link>
        </span>
      </div>

      <div className="why-choose-us">
        <div className="why-choose-us-left">
          <h3>Why Choose Us</h3>

          <div className="why-choose-box-container">
            <div className="why-choose-box">
              <FaCheckCircle
                style={{
                  width: "35px",
                  height: "35px",
                  color: "#ffffff",
                  marginRight: "10px",
                }}
              />
              <div className="why-choose-box-text">
                <strong>Advance Care</strong>
                <p>Lorem ipsum dolor sit</p>
              </div>
            </div>
            <div className="why-choose-box">
              <FaCheckCircle
                style={{
                  width: "35px",
                  height: "35px",
                  color: "#ffffff",
                  marginRight: "10px",
                }}
              />
              <div className="why-choose-box-text">
                <strong>Advance Care</strong>
                <p>Lorem ipsum dolor sit</p>
              </div>
            </div>
            <div className="why-choose-box">
              <FaCheckCircle
                style={{
                  width: "35px",
                  height: "35px",
                  color: "#ffffff",
                  marginRight: "10px",
                }}
              />

              <div className="why-choose-box-text">
                <strong>Advance Care</strong>
                <p>Lorem ipsum dolor sit</p>
              </div>
            </div>
            <div className="why-choose-box">
              <FaCheckCircle
                style={{
                  width: "35px",
                  height: "35px",
                  color: "#ffffff",
                  marginRight: "10px",
                }}
              />

              <div className="why-choose-box-text">
                <strong>Advance Care</strong>
                <p>Lorem ipsum dolor sit</p>
              </div>
            </div>
          </div>
          <Link to="https://insurance-morgphealth.netlify.app/" className="why-choose-us-btn">
            Apply for Insurance
          </Link>
        </div>
        <div className="why-choose-us-right">
          <h3>
            Emergency?
            <br />
            Contact Us
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
            nemo!
          </p>

          <div className="w-right-contact-container">
            <div className="w-right-contact-box">
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#4060b3",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                <FaPhone
                  style={{
                    color: "#ffffff",
                    fontSize: "1.2rem",
                  }}
                />
              </div>
              <div className="w-right-contact-box-text">
                <span>Call Us Now</span>
                <strong>+123 456 789</strong>
              </div>
            </div>
            <div className="w-right-contact-box">
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#4060b3",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                <MdOutlineMessage
                  style={{
                    color: "#ffffff",
                    fontSize: "1.2rem",
                  }}
                />
              </div>
              <div className="w-right-contact-box-text">
                <span>Mail Us</span>
                <strong>info@gmail.com</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonials">
        <div className="testimonials-heading">
          <h3>Our Patients FeedBack About</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            reiciendis rerum possimus pariatur fugit. Voluptatibus,
            reprehenderit praesentium! Quisquam, labore molestias?
          </p>
        </div>

        <div className="testimonials-content">
          <div className="testimonials-img">
            <img src={TestImg} alt="" />
          </div>

          <div className="testimonials-box-container">
            <div className="testimonials-box">
              <div className="t-profile">
                <div className="t-profile-img">
                  <img src={TProfile} alt="" />
                </div>

                <div className="t-profile-text">
                  <strong>Client Name</strong>
                  <span>From China</span>
                  <div style={{ display: "flex" }}>
                    <CiStar
                      style={{
                        fontSize: "0.8rem",
                        color: "gold",
                        marginTop: "5px",
                      }}
                    />

                    <CiStar
                      style={{
                        fontSize: "0.8rem",
                        color: "gold",
                        marginTop: "5px",
                      }}
                    />

                    <CiStar
                      style={{
                        fontSize: "0.8rem",
                        color: "gold",
                        marginTop: "5px",
                      }}
                    />

                    <CiStar
                      style={{
                        fontSize: "0.8rem",
                        color: "gold",
                        marginTop: "5px",
                      }}
                    />

                    <CiStar
                      style={{
                        fontSize: "0.8rem",
                        color: "gold",
                        marginTop: "5px",
                      }}
                    />
                  </div>

                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Eligendi modi consequuntur tempora dolore magni aliquam
                    autem? Veniam ipsam optio dolorum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
