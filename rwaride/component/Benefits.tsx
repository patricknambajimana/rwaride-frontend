const benefits = [
  "Reduce traffic congestion in urban areas",
  "Lower carbon emissions through shared rides",
  "Save travel costs for passengers and drivers",
  "Build community connections across Rwanda",
  "Support smart city infrastructure development",
];

export default function Benefits() {
  return (
    <section className="w-full py-16 container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-color-800 mb-6">
            Supporting Rwanda's Vision 2050
          </h2>
          <div className="space-y-4">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-secondary-700">{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-secondary-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-secondary-800 mb-6">
            Community Impact
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-secondary-200">
              <span className="text-secondary-600">Active Passengers</span>
              <span className="text-primary-color-600 font-bold text-lg">
                2,500+
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-secondary-200">
              <span className="text-secondary-600">Registered Drivers</span>
              <span className="text-primary-color-600 font-bold text-lg">
                800+
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-secondary-200">
              <span className="text-secondary-600">Rides Completed</span>
              <span className="text-primary-color-600 font-bold text-lg">
                15,000+
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-secondary-200">
              <span className="text-secondary-600">CO₂ Reduced</span>
              <span className="text-accent-600 font-bold text-lg">45 tons</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
