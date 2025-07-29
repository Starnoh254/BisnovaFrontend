import { useState, useEffect } from 'react'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const carouselData = [
    {
      image: '/cereals6.jpeg',
      title: 'Premium Cereals & Grains',
      description:
        'High-quality rice, maize, wheat, and specialty grains for wholesale and retail distribution across Kenya.',
      highlight: 'Quality Cereals',
    },
    {
      image: '/carousel2.jpeg',
      title: 'Professional Medical Equipment',
      description:
        'Reliable medical devices and equipment for healthcare facilities, clinics, and medical professionals.',
      highlight: 'Medical Excellence',
    },
    {
      image: '/carousel1.jpeg',
      title: 'Complete Stationery Solutions',
      description:
        'Comprehensive range of office and school supplies for businesses, schools, and organizations.',
      highlight: 'Office Supplies',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [carouselData.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length)
  }

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselData.length) % carouselData.length
    )
  }

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0">
        {carouselData.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bisnova-blue-900/80 via-bisnova-blue-800/70 to-bisnova-blue-600/60"></div>
          </div>
        ))}
      </div>

      {/* Background Logo Watermark */}
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 opacity-10 z-10">
        <img src="/bisnova.jpeg" alt="" className="w-64 h-64 object-contain" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="mb-4">
                <span className="inline-block bg-bisnova-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase animate-pulse">
                  {carouselData[currentSlide].highlight}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Welcome to{' '}
                <span className="text-bisnova-green-400 animate-fade-in">
                  Bisnova Supplies
                </span>
              </h1>

              {/* Dynamic content based on current slide */}
              <div className="transition-all duration-500 ease-in-out transform">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-bisnova-green-200">
                  {carouselData[currentSlide].title}
                </h2>
                <p className="text-lg md:text-xl mb-8 leading-relaxed">
                  {carouselData[currentSlide].description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#services"
                  className="bg-bisnova-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-bisnova-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Explore Our Services
                </a>
                <a
                  href="#products"
                  className="border-2 border-bisnova-green-400 text-bisnova-green-400 px-8 py-4 rounded-lg font-semibold hover:bg-bisnova-green-400 hover:text-white transition-all duration-300"
                >
                  View Products
                </a>
              </div>
            </div>

            {/* Right Content - Carousel Indicators and Controls */}
            <div className="hidden md:flex flex-col items-center justify-center space-y-8">
              {/* Slide Indicators */}
              <div className="flex space-x-3">
                {carouselData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-bisnova-green-400 scale-125'
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="flex space-x-4">
                <button
                  onClick={prevSlide}
                  className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
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

      {/* Mobile Carousel Controls */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 md:hidden z-20">
        <div className="flex space-x-3">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-bisnova-green-400' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
