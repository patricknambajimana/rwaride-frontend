export default function CTASection() {
  return (
    <section className="w-full py-16 text-center container mx-auto px-6">
      <div className="bg-linear-to-r from-primary-500 to-secondary-500 rounded-3xl p-12 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Commute?
        </h2>
        <p className="text-primary-100 mb-8 max-w-2xl mx-auto text-lg">
          Join thousands of Rwandans who are already enjoying smarter, cheaper,
          and more social travel experiences.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button className="px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white rounded-xl font-semibold text-lg transition-colors shadow-lg">
            Get Started Today
          </button>
          <button className="px-8 py-4 bg-white hover:bg-gray-100 text-primary-600 rounded-xl font-semibold text-lg transition-colors">
            Download App
          </button>
        </div>
      </div>
    </section>
  );
}
