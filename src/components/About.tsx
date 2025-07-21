const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Bisnova Supplies Limited
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            With years of experience in the supply industry, we have built a reputation 
            for reliability, quality, and customer satisfaction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Our Mission
            </h3>
            <p className="text-gray-600 mb-6">
              To provide exceptional supply solutions that empower businesses to thrive. 
              We are committed to delivering quality products, reliable service, and 
              innovative solutions that exceed our clients' expectations.
            </p>
            <p className="text-gray-600 mb-8">
              Our team of experienced professionals works tirelessly to ensure that 
              every aspect of our service meets the highest standards of excellence.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-bisnova-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-bisnova-green-600 mb-2">10+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why Choose Us?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-bisnova-green-600 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">Quality Assurance</h4>
                  <p className="text-gray-600 text-sm">All products undergo rigorous quality checks</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-bisnova-blue-600 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">Fast Delivery</h4>
                  <p className="text-gray-600 text-sm">Quick and reliable delivery services</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-bisnova-green-600 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">24/7 Support</h4>
                  <p className="text-gray-600 text-sm">Round-the-clock customer support</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-bisnova-blue-600 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">Competitive Pricing</h4>
                  <p className="text-gray-600 text-sm">Best value for your investment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
