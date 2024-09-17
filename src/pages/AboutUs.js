// TODO: this page has hidden divs, search the keyword "HIDDEN SECTION" to find them

import React, { useContext, useState } from "react";
import { Carousel, Button } from "react-bootstrap";

import classes from "./AboutUs.module.css";
import AboutUsValueBox from "../components/AboutUsValueBox";
import AboutUsTestimonialCarouselItem from "../components/AboutUsTestimonialCarouselItem";
import testimonialPrevArrow from "./images/about-us-testimonial-carousel-prev-arrow.png";
import testimonialNextArrow from "./images/about-us-testimonial-carousel-next-arrow.png";

import OfficePhoto from "./images/About-us-office-img.png";
import icon01 from "./images/icon01.png";
import icon02 from "./images/icon02.png";
import icon03 from "./images/icon03.png";
import icon04 from "./images/icon04.png";
import icon05 from "./images/icon05.png";
import icon06 from "./images/icon06.png";
import AboutUsTeamSection from "../components/AboutUsTeamSection";
import { authContext } from "../App";
import AboutUsJoinWithUsButton from "../components/AboutUsJoinWithUsButton";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";

const AboutUs = () => {
  const { isAuthenticated } = useContext(authContext);

  // set Docuement title
  useDocumentTitle("Puplier | About Us");

  const teamMembers = [
    {
      name: "Mr. John Smith",
      position: "Director",
      photo: "https://picsum.photos/id/56/500",
    },
    {
      name: "Ms. Jane Doe",
      position: "Manager",
      photo: "https://picsum.photos/id/57/500",
    },
    {
      name: "Mr. David Lee",
      position: "Assistant Manager",
      photo: "https://picsum.photos/id/58/500",
    },
    {
      name: "Ms. Sarah Lee",
      position: "Senior Analyst",
      photo: "https://picsum.photos/id/59/500",
    },
    {
      name: "Mr. Kevin Chen",
      position: "Marketing Specialist",
      photo: "https://picsum.photos/id/60/500",
    },
  ];

  const [index, setIndex] = useState(0);

  const testimonials = [
    {
      name: "john doe",
      jobTitle: "Chief Executive Officer",
      company: "ABC Pvt Ltd",
      review:
        "Pellentesque convallis dolor mauris, vitae congue urna porttitor eu. Aenean in varius dui. Mauris imperdiet porttitor nisl, quis ullamcorper ligula sollicitudin ut. Morbi accumsan id massa convallis facilisis. Pellentesque gravida mi vel ante vestibulum consectetur. Proin maximus sapien ac maximus condimentum. Praesent accumsan ipsum ut massa tincidunt, at faucibus neque finibus. Ut auctor velit sed massa suscipit hendrerit.",
      photo: "https://picsum.photos/200/200?random=1",
    },
    {
      name: "Jane Smith",
      jobTitle: "Marketing Director",
      company: "XYZ Inc.",
      review:
        "Suspendisse non magna non orci lacinia ultricies. Nulla rhoncus dolor eu pulvinar vulputate. Nunc sodales enim et nisl luctus, sed volutpat velit venenatis. Duis vitae augue auctor, congue nibh nec, tristique lorem. Morbi pretium rutrum lorem, at consequat augue accumsan a. Mauris ut leo in lorem auctor interdum. Fusce semper augue vel neque aliquam, non bibendum purus efficitur. ",
      photo: "https://picsum.photos/200/200?random=2",
    },
    {
      name: "Michael Johnson",
      jobTitle: "Creative Director",
      company: "LMN Agency",
      review:
        "Nam rhoncus sapien vel augue venenatis imperdiet. Praesent ac augue eget enim consequat tincidunt. Pellentesque mattis felis eu quam malesuada sollicitudin. Sed euismod auctor felis, in semper ipsum lobortis a. Morbi rutrum lobortis sapien at rhoncus. Nam venenatis enim ut pharetra luctus. Duis viverra, libero sit amet scelerisque fermentum, nibh lacus imperdiet odio, sit amet aliquam libero ex non turpis. ",
      photo: "https://picsum.photos/200/200?random=3",
    },
    {
      name: "David Lee",
      jobTitle: "Product Manager",
      company: "PQR Corporation",
      review:
        "Vivamus vel mi non metus iaculis elementum id at neque. Fusce auctor elit nec ex feugiat, quis suscipit felis rutrum. Nullam a tellus aliquam, dictum risus quis, efficitur arcu. In in eros consequat, ornare dolor quis, aliquam lacus. Sed sodales fringilla erat ac convallis. Integer vel lectus eget enim dictum faucibus. Nullam sollicitudin sit amet velit vitae facilisis. ",
      photo: "https://picsum.photos/200/200?random=4",
    },
  ];

  return (
    <>
      <section className={classes.coverImg}>
        <div className="container customContainer">
          <div className="row justify-content-center">
            <div className="col-xxl-11 col-12">
              <h2 className={`text-lg-end text-center ${classes.title}`}>
                About Us
              </h2>
            </div>
          </div>
        </div>
        <div className={classes.overlay} />
      </section>
      <section>
        <div className="container customContainer">
          <div className={`row justify-content-center`}>
            <div className={`col-xxl-11 col-12  ${classes.ourStoryContainer}`}>
              <div className="row gy-lg-0 gy-5">
                <div
                  className={`col-lg-5 col-12 d-flex ${classes.ourStoryLeftDiv}`}
                >
                  <div className="m-auto">
                    <h4 className={classes.ourStoryTitle}>our story</h4>
                    <p className={classes.ourStoryTagline}>
                      why we started it?
                    </p>
                  </div>
                </div>
                <div className={`col-lg-6 col-12 offset-lg-1 offset-0`}>
                  <p className={classes.ourStoryContent}>
                    Our story began with a group of researchers who were
                    frustrated with the time-consuming process of writing
                    research papers
                    <br />
                    <br /> They saw a need for a tool that could streamline the
                    writing process and make it easier for experts in the field
                    to collaborate. After months of development, Puplier was
                    born
                    <br />
                    <br />
                    Our mission at Puplier is to simplify and streamline the
                    research paper writing process, while making it easier for
                    researchers to collaborate with each other. We helps
                    researchers focus on their work and produce high-quality
                    research that drives progress and advances knowledge
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className={`col-xxl-11 col-12 ${classes.weAreATeamContainer}`}>
              <div className={`row gy-lg-0 gy-5`}>
                {/* this div is only show in screens greater than lg */}
                <div
                  className={`col-lg-5 col-12 justify-content-center d-lg-flex d-none`}
                >
                  <div className={`${classes.weAreATeamImgDiv}`}>
                    <img src={OfficePhoto} className={classes.weAreATeamImg} />
                  </div>
                </div>
                <div
                  className={`col-lg-6 col-12 offset-lg-1 offset-0 d-flex align-items-center`}
                >
                  <div>
                    <h4
                      className={`text-lg-start text-center ${classes.weAreATeamTitle}`}
                    >
                      we are a team of creators and Innovators
                    </h4>
                    {/* this div is only show in screens smaller than lg */}
                    <div className="row d-lg-none d-flex">
                      <div
                        className={`col-12 justify-content-center d-flex mb-sm-5 mb-4 mt-3`}
                      >
                        <div className={`${classes.weAreATeamImgDiv}`}>
                          <img
                            src={OfficePhoto}
                            className={classes.weAreATeamImg}
                          />
                        </div>
                      </div>
                    </div>
                    <p
                      className={`text-lg-start text-center ${classes.weAreATeamContent}`}
                    >
                      Working together to simplify the research writing process
                      and help researchers make breakthrough discoveries that
                      have a real-world impact.
                    </p>
                    {isAuthenticated ? null : (
                      <AboutUsJoinWithUsButton
                        style={{ width: "212px" }}
                        buttonText="join with us"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* HIDDEN SECTION: hide below section from release 1.0 */}
      <section className="d-none">
        <div className="container customContainer">
          <div className={classes.ourPartnersSection}>
            <div className={classes.ourPartners}>
              <h4 className={classes.ourPartnersTitle}>our partners</h4>
              <div className={classes.ourPartnersIconDiv}>
                <div className="row row-cols-md-6 row-cols-3 g-3 gx-md-5">
                  <div className="col d-flex justify-content-center">
                    <img src={icon01} className={classes.ourPartnersIcon} />
                  </div>
                  <div className="col d-flex justify-content-center">
                    <img src={icon02} className={classes.ourPartnersIcon} />
                  </div>
                  <div className="col d-flex justify-content-center">
                    <img src={icon03} className={classes.ourPartnersIcon} />
                  </div>
                  <div className="col d-flex justify-content-center">
                    <img src={icon04} className={classes.ourPartnersIcon} />
                  </div>
                  <div className="col d-flex justify-content-center">
                    <img src={icon05} className={classes.ourPartnersIcon} />
                  </div>
                  <div className="col d-flex justify-content-center">
                    <img src={icon06} className={classes.ourPartnersIcon} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={classes.valuesDiv}>
        <div className={`container customContainer`}>
          <h4 className={classes.valuesTitle}>
            Let’s Revolutionize the Research writing
          </h4>
          <p className={classes.valuesTagline}>
            Our mission is to revolutionize research writing by providing
            innovative tools that make it easier for researchers to share their
            knowledge with the world.
          </p>
          <div className={classes.valuesInnerDiv}>
            <div className={`row gx-lg-5 gy-4 gy-lg-0 ${classes.valuesRow}`}>
              <div className={`col-lg-4 col-12 ${classes.valuesCol}`}>
                <AboutUsValueBox
                  title="Increased Efficiency"
                  content="Our research writing tool streamlines the writing process, allowing users to save time and focus on producing high-quality content."
                />
              </div>
              <div className={`col-lg-4 col-12 ${classes.valuesCol}`}>
                <AboutUsValueBox
                  title="Improved Quality"
                  content="With our peer review feature, we eliminate the need to go back and forth between authors and reviewers, saving users valuable time and increasing the quality of research output"
                />
              </div>
              <div className={`col-lg-4 col-12 ${classes.valuesCol}`}>
                <AboutUsValueBox
                  title="Enhanced Visibility"
                  content="Our innovative technology helps users to increase their research visibility by optimizing search engine results and providing seamless integration with academic databases."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* HIDDEN SECTION: hide below section from release 1.0 */}
      <div
        className={`container customContainer d-none ${classes.meetTheTeamSection}`}
      >
        <AboutUsTeamSection teamMembers={teamMembers} />
      </div>
      {/* HIDDEN SECTION: hide below section from release 1.0 */}
      <div className={`d-none ${classes.testimonialSection}`}>
        <h4 className={classes.testimonialsTitle}>testimonials</h4>
        <div className={classes.border} />
        <div className={classes.testimonialCarouselSection}>
          <div className={`container customContainer ${classes.carouselDiv}`}>
            <Carousel
              variant="dark"
              activeIndex={index}
              controls={false}
              indicators={true}
              interval={null}
            >
              {testimonials.map((testimonial, index) => {
                return (
                  <Carousel.Item key={index}>
                    <AboutUsTestimonialCarouselItem data={testimonial} />
                  </Carousel.Item>
                );
              })}
            </Carousel>
            <div className={classes.controls}>
              <Button
                variant="prev"
                onClick={() =>
                  setIndex(
                    (index - 1 + testimonials.length) % testimonials.length
                  )
                }
                className={classes.prevButton}
              >
                <img src={testimonialPrevArrow} />
              </Button>
              <Button
                variant="next"
                onClick={() => setIndex((index + 1) % testimonials.length)}
                className={classes.nextButton}
              >
                <img src={testimonialNextArrow} alt="" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* HIDDEN SECTION: hide the below section from release 1.0 */}
      <div
        className={`container customContainer d-none ${classes.joinWithPuplierSection}`}
      >
        {isAuthenticated ? null : (
          <AboutUsJoinWithUsButton
            style={{ width: "247px" }}
            buttonText="join with puplier now"
          />
        )}
      </div>
    </>
  );
};

export default AboutUs;
