export default function Hero() {
  return (
    <section className="w-full py-20 md:py-32 flex flex-col md:flex-row items-center justify-between container mx-auto px-6 bg-linear-to-br from-(--primary-50) via-(--white) to-(--secondary-50)">
      <div className="md:w-1/2 space-y-8 animate-fade-in">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-(--primary-900) leading-tight">
          Smarter Travel.
          <span className="text-(--secondary-600) animate-pulse">
            {" "}
            Stronger{" "}
          </span>
          Communities.
        </h1>
        <p className="text-xl text-(--primary-700) leading-relaxed max-w-xl font-medium">
          Join Rwanda's community-driven carpooling platform. Reduce travel
          costs, save time, and build connections while supporting sustainable
          mobility in Rwanda.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 pt-6">
          <button className="group px-8 py-4 bg-linear-to-r from-(--primary-600) to-(--primary-500) text-(--white) rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-(--primary-300)/50 active:scale-95">
            <span className="flex items-center gap-2 justify-center">
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              Find a Ride
            </span>
          </button>
          <button className="group px-8 py-4 bg-linear-to-r from-(--secondary-500) to-(--secondary-600) text-(--white) rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-(--secondary-300)/50 active:scale-95">
            <span className="flex items-center gap-2 justify-center">
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Offer a Ride
            </span>
          </button>
        </div>
      </div>

      <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center animate-bounce-slow">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-0 bg-linear-to-r from-(--primary-200) to-(--secondary-200) rounded-3xl blur-3xl opacity-30"></div>
          <div className="relative bg-(--white) rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-linear-to-br from-(--primary-400) to-(--secondary-400) rounded-full shadow-md"></div>
              <div>
                <p className="font-bold text-lg text-(--primary-900)">
                  Alice M.
                </p>
                <p className="text-sm text-(--primary-600) font-medium">
                  Kigali → Musanze
                </p>
              </div>
            </div>
            <div className="bg-linear-to-r from-(--accent-50) to-(--secondary-50) border-2 border-(--accent-200) rounded-xl p-4">
              <p className="text-(--accent-700) font-bold text-center">
                3 seats available • In 30min
              </p>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm">
              <div className="p-3 bg-(--primary-50) rounded-lg">
                <p className="font-bold text-(--primary-600)">25%</p>
                <p className="text-xs text-(--primary-700)">Cheaper</p>
              </div>
              <div className="p-3 bg-(--secondary-50) rounded-lg">
                <p className="font-bold text-(--secondary-600)">⚡</p>
                <p className="text-xs text-(--secondary-700)">Faster</p>
              </div>
              <div className="p-3 bg-(--accent-50) rounded-lg">
                <p className="font-bold text-(--accent-600)">🌍</p>
                <p className="text-xs text-(--accent-700)">Green</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
