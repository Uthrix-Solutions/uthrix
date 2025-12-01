import React from "react";
import { Link } from "react-router-dom";

function Hcontact() {
  return (
    <div className="px-4 mx-auto my-8 lg:px-14 max-w-screen-2xl" id="contact">
      <div className="text-center section-title">
        <h2 className="mb-3 text-4xl font-semibold text-naturalPrimary">
          Contact us
        </h2>
        <p>Feel free to get in touch with us. We'd love to hear from you!</p>

        {/* Use flex container to arrange buttons horizontally */}
        <div className="flex flex-col items-center gap-4 mt-4 sm:flex-row sm:justify-center">
          {/* <button className="w-full py-2 text-white transition-all duration-300 rounded sm:w-48 px-7 bg-naturalPrimary hover:bg-neutralDGrey hover:translate-y-4">
            Schedule a Call
          </button> */}
          <Link
            to="/contact"
            className="w-full py-2 text-white transition-all duration-300 rounded sm:w-48 px-7 bg-naturalPrimary hover:bg-neutralDGrey hover:translate-y-4"
          >
            Start a project
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hcontact;
