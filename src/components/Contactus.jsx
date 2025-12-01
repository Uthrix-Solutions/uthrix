import  { useEffect } from "react";
import { Card } from "flowbite-react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

function Contactus() {
  useEffect(() => {
    AOS.init({
      // defines which position of the element regarding to window should trigger the animation
    });
  }, []);

  return (
    <div
      data-aos="zoom-in"
      className="px-4 mx-auto my-8 lg:px-14 max-w-screen-2xl"
    >
      <div className="grid grid-cols-1 gap-12 mx-auto mt-14 lg:grid-cols-3 md:grid-cols-2 md:w-11/12">
        <Card className="max-w-sm text-center">
          <FaMapMarkerAlt className="mx-auto mb-2 text-5xl text-naturalDGrey" />
          <h1 className="mb-2 text-4xl font-semibold text-naturalDGrey">
            Our Address
          </h1>
          <p>Colombo, Sri Lanka</p>
        </Card>

        <Card className="max-w-sm text-center">
          <FaEnvelope className="mx-auto mb-2 text-5xl text-naturalDGrey" />
          <h1 className="mb-2 text-4xl font-semibold text-naturalDGrey">
            Email Us
          </h1>
          <p>work.nextoex@gmail.com</p>
        </Card>

        <Card className="max-w-sm text-center">
          <FaPhone className="mx-auto mb-2 text-5xl text-naturalDGrey" />
          <h1 className="mb-2 text-4xl font-semibold text-naturalDGrey">
            Call Us
          </h1>
          <p>+94713311593</p>
        </Card>
      </div>

      {/* form */}
      <div></div>
    </div>
  );
}

export default Contactus;
