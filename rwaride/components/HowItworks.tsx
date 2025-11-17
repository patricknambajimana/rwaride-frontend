const steps = [
  {
    step: "1",
    title: "Create Profile",
    desc: "Sign up as passenger or driver with verified identity",
    icon: "",
  },
  {
    step: "2",
    title: "Find Matches",
    desc: "Get matched with people going your way in real-time",
    icon: "",
  },
  {
    step: "3",
    title: "Ride Together",
    desc: "Travel safely, save costs, and rate your experience",
    icon: "",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="w-full py-16 bg-(--primary-50) rounded-3xl px-6 container mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-(--primary-800) mb-4">
          How RwaRide Works
        </h2>
        <p className="text-(--secondary-600) max-w-2xl mx-auto">
          Simple, safe, and efficient carpooling for everyone in Rwanda
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((item, i) => (
          <div
            key={i}
            className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-4">{item.icon}</div>
            <div
              className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold text-lg bg-(--primary-500)`}
            >
              {item.step}
            </div>
            <h3 className="text-xl font-semibold text-(--primary-800) mb-3">
              {item.title}
            </h3>
            <p className="text-(--secondary-600) leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
