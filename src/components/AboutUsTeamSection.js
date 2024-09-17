import React, { useRef } from "react";
import AboutUsCarouselItem from "./AboutUsCarouselItem";
import classes from "./AboutUsTeamSection.css";
import "./AboutUsTeamSection.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import arrowIcon from "./images/aboutus-team-carouse-arrow-icon.png";

function AboutUsTeamSection({ teamMembers }) {
  const slider = useRef(null);

  const sliderSettings = {
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    speed: 500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <h4 className="aboutUsOurTeamTitle">meet the team</h4>
      <div className="row justify-content-center">
        <div
          className={`col-xxl-9 col-xl-10 col-lg-9 col-md-10 col-sm-8 col-12`}
        >
          <div className="App position-relative aboutUsTeamCarousel">
            <Slider {...sliderSettings} ref={slider}>
              {teamMembers.map((member, key) => (
                <AboutUsCarouselItem profile={member} key={key} />
              ))}
            </Slider>
            <img
              src={arrowIcon}
              className="aboutUsPrevArrow"
              onClick={() => slider?.current?.slickPrev()}
            />
            <img
              src={arrowIcon}
              className="aboutUsNextArrow"
              onClick={() => slider?.current?.slickNext()}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUsTeamSection;
