import { Helmet } from "react-helmet"; // Import React Helmet
import abouImg from "../assets/abou.png";
import hardworksImg from "../assets/hardworks.png";
import briefingImg from "../assets/briefing.png";
import supportImg from "../assets/support.png";
import teamworkImg from "../assets/Teamwork.png";
import AOS from "aos";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

AOS.init({
  duration: 1200,
});

function AboutUs() {
  return (
    <div>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>
          About Us - IT & Web Software Development | UX/UI Design Experts
        </title>
        <meta
          name="description"
          content="We specialize in IT and web software development with a focus on UX/UI design and social media marketing to create user-friendly, innovative solutions for businesses."
        />
        <meta
          property="og:title"
          content="About Us - IT & Web Software Development | UX/UI Design Experts"
        />
        <meta
          property="og:description"
          content="Our dedicated team crafts tailored IT solutions, web applications, custom UX/UI designs, and social media marketing strategies that enhance user experience and drive business growth."
        />
        <meta property="og:image" content={abouImg} />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="About Us - IT & Web Software Development | UX/UI Design Experts"
        />
        <meta
          name="twitter:description"
          content="Explore our web development, UX/UI design services, and social media marketing strategies that help businesses streamline their processes and enhance user experiences."
        />
      </Helmet>

      {/* About Us Text */}
      <div className="px-4 mx-auto my-8 lg:px-14 max-w-screen-2xl" id="about">
        <div className="flex flex-col items-center justify-between gap-12 mx-auto md:w-11/12 md:flex-row">
          <div>
            {/* Lottie Animation */}
            <DotLottieReact
              src="https://lottie.host/438a9bf8-eeb6-4472-823d-a03caee45c3a/qH9jlr5haW.lottie"
              loop
              autoplay
              style={{ width: "600px" }} // Customize the size here
            />
          </div>
          <div data-aos="fade-left" className="mx-auto md:w-4/5">
            <h2 className="mb-4 text-4xl font-semibold text-naturalDGrey md:w-4/5">
              Discover Our IT Solutions, Web Development & UX/UI Design Services
            </h2>
            <p className="mb-8 text-sm md:w-4/4 text-neutralGray">
              At Nextoex Pvt ltd, we are passionate about leveraging technology
              to help businesses thrive. As experts in IT solutions, web
              software development, UX/UI design, and social media marketing, we
              focus on building custom applications and services that are both
              functional and user-friendly. Our talented team creates seamless
              user experiences through thoughtful design, ensuring that each
              project aligns with your business goals and user needs. Whether
              you need a dynamic website, web app, innovative software, or a
              powerful social media marketing strategy, we are committed to
              delivering solutions that drive growth and efficiency.
            </p>
            <button className="py-2 text-white transition-all duration-300 rounded px-7 bg-naturalPrimary hover:bg-neutralDGrey hover:translate-y-4">
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Company Stats */}
      <div className="px-4 py-16 mx-auto lg:px-14 max-w-screen-2xl bg-neutralSilver">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div data-aos="fade-up-right" className="md:w-1/2">
            <h2 className="mb-4 text-4xl font-semibold text-naturalDGrey md:w-2/3">
              Explore how we brought value to our clients
            </h2>
            <p>We reached here with our hard work and dedication.</p>
          </div>
          <div
            data-aos="fade-up-left"
            className="flex flex-col justify-around gap-12 p-4 mx-auto md:w-1/2 sm:flex-row sm:items-center sm:p-0"
          >
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <img
                  src={hardworksImg}
                  alt="Happy Clients"
                  style={{ width: "40px", height: "40px" }}
                />
                <div>
                  <h4 className="text-2xl font-semibold text-naturalDGrey">
                    +20
                  </h4>
                  <p>Happy Clients</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={briefingImg}
                  alt="Projects"
                  style={{ width: "40px", height: "40px" }}
                />
                <div>
                  <h4 className="text-2xl font-semibold text-naturalDGrey">
                    +20
                  </h4>
                  <p>Projects</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <img
                  src={supportImg}
                  alt="Hours Of Support"
                  style={{ width: "40px", height: "40px" }}
                />
                <div>
                  <h4 className="text-2xl font-semibold text-naturalDGrey">
                    +100
                  </h4>
                  <p>Hours Of Support</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={teamworkImg}
                  alt="Hard Workers"
                  style={{ width: "40px", height: "40px" }}
                />
                <div>
                  <h4 className="text-2xl font-semibold text-naturalDGrey">
                    +50
                  </h4>
                  <p>Hard Workers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional content or services section */}
      {/* <div className="px-4 py-16 mx-auto lg:px-14 max-w-screen-2xl">
        <h3 className="mb-4 text-3xl font-semibold text-naturalDGrey">
          Why Choose Us for Web Software Development, UX/UI Design & Social
          Media Marketing?
        </h3>
        <ul>
          <li>Expert web developers skilled in various technologies</li>
          <li>Custom solutions tailored to meet business objectives</li>
          <li>User-centric designs for an enhanced user experience</li>
          <li>
            Powerful social media marketing strategies to enhance brand
            visibility and engagement
          </li>
          <li>Proven track record with satisfied clients across industries</li>
        </ul>
      </div> */}
    </div>
  );
}

export default AboutUs;
