import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-primary-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Image src="/logo.png" alt="RwaRide Logo" width={32} height={32} />
            <span className="text-xl font-bold text-primary-700">RwaRide</span>
          </div>
          <p className="text-secondary-600 text-sm">
            Building better transportation for Rwanda's future.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-primary-800 mb-4">
            For Passengers
          </h4>
          <div className="space-y-2 text-sm">
            <a
              href="#"
              className="block text-secondary-600 hover:text-secondary-500"
            >
              How to book
            </a>
            <a
              href="#"
              className="block text-secondary-600 hover:text-secondary-500"
            >
              Safety tips
            </a>
            <a
              href="#"
              className="block text-secondary-600 hover:text-secondary-500"
            >
              Cities we serve
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-primary-800 mb-4">For Drivers</h4>
          <div className="space-y-2 text-sm">
            <a
              href="#"
              className="block text-secondary-600 hover:text-secondary-500"
            >
              Become a driver
            </a>
            <a
              href="#"
              className="block text-secondary-600 hover:text-secondary-500"
            >
              Driver requirements
            </a>
            <a
              href="#"
              className="block text-secondary-600 hover:text-secondary-500"
            >
              Earnings calculator
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-primary-800 mb-4">Company</h4>
          <div className="space-y-2 text-sm">
            <a
              href="#"
              className="block text-secondary-600 hover:text-secondary-500"
            >
              About us
            </a>
            <a
              href="#"
              className="block text-secondary-600 hover:text-secondary-500"
            >
              Careers
            </a>
            <a
              href="#"
              className="block text-secondary-600 hover:text-secondary-500"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-primary-100 text-center">
        <p className="text-secondary-500 text-sm">
          © 2025 RwaRide. Building better transportation for Rwanda. |{" "}
          <a href="#" className="mx-2 hover:text-secondary-400">
            Privacy
          </a>{" "}
          •{" "}
          <a href="#" className="mx-2 hover:text-secondary-400">
            Terms
          </a>{" "}
          •{" "}
          <a href="#" className="mx-2 hover:text-secondary-400">
            Safety
          </a>
        </p>
      </div>
    </footer>
  );
}
