import { Link } from "react-router-dom";

const Hero = () => {
    return (
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              A healthcare data marketplace
            </h1>
            <p className="mb-8 leading-relaxed">
              A healthcare data marketplace, driven by blockchain technology,
              serves as a secure platform enabling patients to safely share and
              monetize their medical information with researchers & various
              entities
            </p>
            <div className="flex justify-center">
              <Link to="/buy" className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Buy
              </Link>
              <Link to="/sell" className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Sell
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded-2xl"
              alt="hero"
              src="https://firebasestorage.googleapis.com/v0/b/storagetester-6fff0.appspot.com/o/tachyon-2-dr.gif?alt=media&token=c47b3fb5-6d32-426c-9ff9-bf8426633f7e"
            />
          </div>
        </div>
      </section>
    );
}

export default Hero;