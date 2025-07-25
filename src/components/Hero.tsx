const Hero = () => {
  return (
    <section
      id="home"
      className="bg-gradient-to-r from-bisnova-blue-600 to-bisnova-blue-800 text-white relative overflow-hidden"
    >
      {/* Background Logo Watermark */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
        <img src="/bisnova.jpeg" alt="" className="w-96 h-96 object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to{' '}
            <span className="text-bisnova-green-400">Bisnova Supplies</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Your trusted supplier of quality cereals, medical equipment, and
            stationery supplies. We deliver excellence in every product and
            service across Kenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#services"
              className="bg-bisnova-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-bisnova-green-700 transition-colors shadow-lg"
            >
              Our Services
            </a>
            <a
              href="#contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-bisnova-blue-800 transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-bisnova-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero
