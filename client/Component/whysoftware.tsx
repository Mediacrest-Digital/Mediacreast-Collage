import { FileCode, Calendar, Users, Briefcase } from "lucide-react";

export function WhyTakeCourseSection() {
  const features = [
    {
      icon: <FileCode className="w-9 h-9 text-orange-500" strokeWidth={2} />,
      bgColor: "bg-orange-50",
      title: "Practical Hands-on Learning",
      description: "Get job-ready with practical, hands-on learning. You'll learn the in-demand market languages and skills, labs and real-world portfolio development."
    },
    {
      icon: <Calendar className="w-9 h-9 text-green-600" strokeWidth={1.5} />,
      bgColor: "bg-green-50",
      title: "Technical Mentorship Schedule",
      description: "One on one with your instructor to work on technical concepts, plan out your pacing or check-in about your program milestones."
    },
    {
      icon: <Users className="w-9 h-9 text-orange-600" strokeWidth={1.5} />,
      bgColor: "bg-orange-50",
      title: "Learn in Community",
      description: "You may be learning online/hybrid but you're not alone. You can schedule one on one with your instructor for added guidance"
    },
    {
      icon: <Briefcase className="w-9 h-9 text-blue-600" strokeWidth={1.5} />,
      bgColor: "bg-blue-50",
      title: "Career Coaching and Graduate Support",
      description: "Receive career coaching and job-hunting support for up to 12 months post-graduation"
    }
  ];

  return (
    <section className="bg-gray-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center gap-8 lg:gap-12">
          {/* Section title */}
          <h2 className="text-gray-800 text-center font-semibold text-2xl lg:text-3xl leading-tight max-w-2xl">
            Why you should take this course?
          </h2>

          {/* Feature cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full max-w-5xl">
            {features.map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 flex flex-col gap-4 lg:gap-6 min-h-[250px] lg:h-[298px]">
                {/* Icon */}
                <div className={`flex items-center justify-center w-[60px] h-[60px] lg:w-[76px] lg:h-[76px] ${feature.bgColor} rounded-lg`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 lg:gap-3 pt-1">
                  <h3 className="text-gray-900 text-lg lg:text-xl font-semibold leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-normal leading-relaxed lg:leading-6">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}