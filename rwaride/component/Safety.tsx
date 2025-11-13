const features = [
  {
    icon: "🆔",
    title: "Verified Users",
    desc: "All drivers and passengers are identity-verified",
  },
  {
    icon: "📱",
    title: "Real-time Tracking",
    desc: "Share your ride status with trusted contacts",
  },
  {
    icon: "⭐",
    title: "Rating System",
    desc: "Rate your experience after each journey",
  },
  {
    icon: "🛡️",
    title: "24/7 Support",
    desc: "Emergency assistance whenever you need it",
  },
];

export default function Safety() {
  return (
    <section
      id="safety"
      className="w-full py-16 bg-primary-color-50 rounded-3xl px-6 container mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-color-800 mb-4">
          Your Safety is Our Priority
        </h2>
        <p className="text-secondary-600 max-w-2xl mx-auto">
          Built-in features to ensure secure and comfortable journeys
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="text-center p-6 bg-white rounded-xl shadow-sm"
          >
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="font-semibold text-primary-color-700 mb-2">
              {f.title}
            </h3>
            <p className="text-sm text-secondary-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
