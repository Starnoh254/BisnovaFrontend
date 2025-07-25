const Services = () => {
  const services = [
    {
      icon: '🌾',
      title: 'Cereals & Grains Supply',
      description:
        'Delivering premium-quality cereals and grains for wholesale distributors, retailers, and food processing companies across Kenya. Our products are carefully sourced to ensure freshness, quality, and competitive pricing.',
      features: [
        'Premium Rice Varieties (long-grain, basmati, pishori, etc.)',
        'Maize & Corn Products (whole maize, maize flour, animal feed)',
        'Dried Beans (green grams, red kidney beans, black beans, and more)',
      ],
    },
    {
      icon: '🏥',
      title: 'Medical Equipment',
      description:
        'Professional medical devices and equipment for healthcare facilities, clinics, and medical professionals.',
      features: [
        'Diagnostic Equipment',
        'Monitoring Devices',
        'Surgical Instruments',
        'Laboratory Tools',
      ],
    },
    {
      icon: '📝',
      title: 'Stationery Supplies',
      description:
        'Complete range of office and school stationery supplies for businesses, schools, and organizations.',
      features: [
        'Writing Materials',
        'Office Supplies',
        'School Supplies',
        'Filing Solutions',
      ],
    },
    {
      icon: '🚚',
      title: 'Logistics & Distribution',
      description:
        'Reliable logistics and distribution services to ensure timely delivery of all your supply needs.',
      features: [
        'Warehousing',
        'Transportation',
        'Inventory Management',
        'Supply Chain',
      ],
    },
    // {
    //   icon: '🔧',
    //   title: 'Maintenance Services',
    //   description:
    //     'Professional maintenance and repair services to keep your equipment in optimal condition.',
    //   features: [
    //     'Preventive Maintenance',
    //     'Emergency Repairs',
    //     'Technical Support',
    //     'Parts Replacement',
    //   ],
    // },
    // {
    //   icon: '💼',
    //   title: 'Business Consulting',
    //   description:
    //     'Expert consulting services to optimize your supply chain and improve operational efficiency.',
    //   features: [
    //     'Process Optimization',
    //     'Cost Analysis',
    //     'Vendor Management',
    //     'Strategic Planning',
    //   ],
    // },
    {
      icon: '📋',
      title: 'Custom Solutions',
      description:
        'Tailored supply solutions designed specifically for your unique business requirements.',
      features: [
        'Custom Manufacturing',
        'Specialized Products',
        'Bulk Orders',
        'Long-term Contracts',
      ],
    },
  ]

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of services designed to meet all your
            supply needs and help your business operate at peak efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <svg
                      className="w-4 h-4 text-bisnova-green-600 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="bg-bisnova-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-bisnova-blue-700 transition-colors inline-block shadow-lg"
          >
            Request a Quote
          </a>
        </div>
      </div>
    </section>
  )
}

export default Services
