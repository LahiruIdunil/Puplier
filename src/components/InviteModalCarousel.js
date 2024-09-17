import React, { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import InviteModalSuggestedPeople from "./InviteModalSuggestedPeople";
import classes from "./InviteModalCarousel.module.css";
import slickPrev from "./images/slick-prev.png";
import slickNext from "./images/slick-next.png";

export default function InviteModalCarousel({
  addSuggestedProfile,
  removeSuggestedProfile,
  suggestedPeople,
}) {
  const slider = useRef(null);

  return (
    <div className="App position-relative">
      <Slider
        ref={slider}
        dots={false}
        slidesToShow={2}
        slidesToScroll={1}
        arrows={false}
        infinite={false}
        responsive={[
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {suggestedPeople.map((profile, key) => (
          <InviteModalSuggestedPeople
            profile={profile}
            addSuggestedProfile={addSuggestedProfile}
            removeSuggestedProfile={removeSuggestedProfile}
            key={key}
          />
        ))}
      </Slider>
      <img
        src={slickPrev}
        onClick={() => slider?.current?.slickPrev()}
        className={`${classes.slickArrow} ${classes.slickPrev}`}
      />
      <img
        src={slickNext}
        onClick={() => slider?.current?.slickNext()}
        className={`material-icons ${classes.slickArrow} ${classes.slickNext}`}
      />
    </div>
  );
}
