import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full py-16 md:py-24 flex flex-col md:flex-row items-center justify-between container mx-auto px-6">
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-color-800 leading-tight">
          Smarter Travel.
          <span className="text-accent-500"> Stronger </span>
          Communities.
        </h1>
        <p className="text-lg text-secondary-600 leading-relaxed max-w-xl">
          Join Rwanda's community-driven carpooling platform. Reduce travel
          costs, save time, and build connections while supporting sustainable
          mobility in Rwanda.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
          <button className="px-8 py-4 bg-primary-color-500 hover:bg-primary-color-600 text-white rounded-xl font-semibold text-lg transition-colors shadow-lg">
            Find a Ride
          </button>
          <button className="px-8 py-4 bg-secondary-500 hover:bg-secondary-600 text-white rounded-xl font-semibold text-lg transition-colors">
            Offer a Ride
          </button>
        </div>
      </div>

      <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
        <div className="relative w-full max-w-md">
          <div className="bg-primary-color-100 rounded-2xl p-6 transform rotate-3">
            <div className="bg-white rounded-xl p-4 shadow-lg transform -rotate-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary-color-200 rounded-full"></div>
                <div>
                  <p className="font-semibold text-primary-color-800">
                    Alice M.
                  </p>
                  <p className="text-sm text-secondary-600">
                    Kigali to Musanze
                  </p>
                </div>
              </div>
              <div className="bg-accent-50 border border-accent-200 rounded-lg p-3">
                <p className="text-accent-700 font-medium">
                  3 seats available • Leaving in 30min
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
