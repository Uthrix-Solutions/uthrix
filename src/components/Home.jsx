
import { Helmet } from "react-helmet";

function Home() {
  return (
    <div className="relative px-6 isolate pt-14 lg:px-8">
      {/* SEO Meta Tags */}
      <Helmet>
        <title >Empowering Digital Growth | Innovative Software Solutions</title>
        <meta
          name="description"
          content="Transform your ideas into reality with innovative software development, cloud services, and IT consulting. Let's build the future together."
        />
        <meta
          name="keywords"
          content="software development, cloud services, IT consulting, digital transformation, software solutions"
        />
        <meta name="author" content="Your Company Name" />
      </Helmet>

      {/* Decorative Background */}
      <div
        className="absolute inset-x-0 overflow-hidden -top-40 -z-10 transform-gpu blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl py-32 mx-auto sm:py-30 lg:py-30" id="home">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative px-3 py-1 text-gray-600 rounded-full text-sm/6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Announcing our next round of funding.{" "}
            <a href="#" className="font-semibold text-primary">
              <span className="absolute inset-0" aria-hidden="true"></span>
              Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="font-poppin font-medium text-gray-900 tracking-tight text-10xl text-balance sm:text-7xl">
            Empowering Digital Growth
          </h1>
          <p className="font-poppin mt-8 text-sm  text-gray-400 text-pretty sm:text-xl/8">
            Transform your ideas into reality with innovative software
            development, cloud services, and IT consulting. Let&apos;s build the
            future together.
          </p>
          <div className="flex items-center justify-center mt-10 gap-x-6">
            <a
              href="/contact"
              className="px-4 py-2 text-white rounded bg-primary hover:bg-secondory"
            >
              Get started
            </a>
            <a
              href="/contact"
              className="font-semibold text-gray-900 text-sm/6"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

      </div>

      {/* Footer Decorative */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Home;
