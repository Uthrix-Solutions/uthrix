import Contactus from "./Contactus";
import TypeformEmbed from "./TypeformEmbed";
import Navbar from "./Navbar";

function ContactPage() {
  return (
    <div>
      <Navbar />
      <div className="mt-16 text-center">
        <h1 className="text-4xl sm:text-2xl font-semibold text-[#1E1C34]">
          <br />
          You like coffee? Us too! Have a chat{" "}
        </h1>
      </div>
      <div className="flex justify-center mt-8">
        <TypeformEmbed />
      </div>
      <Contactus />
    </div>
  );
}

export default ContactPage;
