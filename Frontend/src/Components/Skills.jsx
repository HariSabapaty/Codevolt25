import React from 'react'; 
import feature1 from "../assets/img/feature1.svg";
import feature2 from "../assets/img/feature2.svg";
import feature3 from "../assets/img/feature3.svg";
import feature4 from "../assets/img/feature4.svg";
import feature5 from "../assets/img/feature5.svg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png";

const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>EV Connect Features</h2>
                        <p>Explore the key features of our EV Connect platform that enhance the EV experience.</p>
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                            <div className="item">
                                <img src={feature1} alt="Feature 1" />
                                <h5>Community Forums</h5>
                                <p>Connect with EV enthusiasts in your area! Join local communities, participate in discussions, ask questions, and share your experiences with electric vehicles.</p>
                            </div>
                            <div className="item">
                                <img src={feature2} alt="Feature 2" />
                                <h5>Information Hub</h5>
                                <p>Find answers to common EV questions, discuss charging options, and compare the environmental impact of specific electric vehicles.</p>
                            </div>
                            <div className="item">
                                <img src={feature3} alt="Feature 3" />
                                <h5>Insights</h5>
                                <p>Access data-driven insights about EV performance, cost savings, and environmental impact to make informed decisions.</p>
                            </div>
                            <div className="item">
                                <img src={feature4} alt="Feature 4" />
                                <h5>Events Scheduling</h5>
                                <p>Discover and schedule local EV-related events, meetups, and workshops.</p>
                            </div>
                            <div className="item">
                                <img src={feature5} alt="Feature 5" />
                                <h5>Tutorials</h5>
                                <p>Browse the best tutorials for EV users and learn how to optimize your electric vehicle experience.</p>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Background" />
    </section>
  );
}
export default Skills;
