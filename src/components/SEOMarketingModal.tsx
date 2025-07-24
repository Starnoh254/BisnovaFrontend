import { useState, useEffect } from 'react'

const SEOMarketingModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if modal has been shown before (using localStorage)
    const modalShown = localStorage.getItem('seoModalShown')

    if (!modalShown) {
      // Show modal after 3 seconds for better user experience
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  const closeModal = () => {
    setIsOpen(false)
    // Remember that modal was shown
    localStorage.setItem('seoModalShown', 'true')
  }

  const handleContact = (method: 'call' | 'whatsapp') => {
    closeModal()
    // Track which contact method was used (optional)
    localStorage.setItem('seoContactMethod', method)
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-bisnova-blue-500 to-bisnova-green-500 text-white p-6 rounded-t-2xl relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl"
          >
            ×
          </button>
          <div className="text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Is Your Business Missing Customers?
            </h2>
            <p className="text-white/90 text-sm">
              Let me show you something important about Bisnova Supplies...
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Problem Illustration */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="text-red-800 font-semibold mb-2 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L5.134 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              Here's What Happens Right Now:
            </h3>
            <div className="text-sm text-red-700 space-y-2">
              <p>
                • When someone in Nairobi searches{' '}
                <strong>"hospital supplies near me"</strong> - Bisnova doesn't
                appear
              </p>
              <p>
                • When they search <strong>"hospital supplies Nairobi"</strong>{' '}
                - Your competitors show up first
              </p>
              <p>• Potential customers can't find you = Lost sales every day</p>
            </div>
          </div>

          {/* Solution */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="text-green-800 font-semibold mb-2 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              With Professional SEO:
            </h3>
            <div className="text-sm text-green-700 space-y-2">
              <p>
                • Bisnova appears on Google's first page for relevant searches
              </p>
              <p>• More customers discover your business online</p>
              <p>• Your phone rings more often with qualified leads</p>
              <p>• Increase sales without spending more on advertising</p>
            </div>
          </div>

          {/* Simple Example */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-blue-800 font-semibold mb-2">Real Example:</h3>
            <div className="text-sm text-blue-700">
              <p className="mb-2">Right now, try searching Google for:</p>
              <div className="bg-white border rounded p-2 font-mono text-xs mb-2">
                "hospital supplies Nairobi"
              </div>
              <p className="text-red-600 font-medium">
                You won't find Bisnova Supplies in the results.
              </p>
              <p className="mt-2">
                <strong>That's money walking to your competitors.</strong>
              </p>
            </div>
          </div>

          {/* What's Included */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">What You Get:</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-bisnova-green-500 rounded-full"></div>
                <span>Google Business setup</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-bisnova-green-500 rounded-full"></div>
                <span>Local Nairobi targeting</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-bisnova-green-500 rounded-full"></div>
                <span>Industry keywords</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-bisnova-green-500 rounded-full"></div>
                <span>Monthly reports</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-4">
              <strong>Ready to get found by more customers?</strong>
              <br />
              Let's discuss how to get Bisnova Supplies ranking on Google.
            </p>

            <div className="space-y-3">
              <a
                href="tel:+254714296170"
                onClick={() => handleContact('call')}
                className="w-full bg-bisnova-green-500 hover:bg-bisnova-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call Now: +254 714 296 170
              </a>

              <a
                href="https://wa.me/254714296170?text=Hi%20Starnoh!%20I%20saw%20your%20message%20about%20SEO%20for%20Bisnova%20Supplies.%20I'm%20interested%20in%20getting%20more%20customers%20online.%20Can%20we%20discuss%3F"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleContact('whatsapp')}
                className="w-full bg-bisnova-blue-500 hover:bg-bisnova-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108" />
                </svg>
                WhatsApp Chat
              </a>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Free consultation • No pressure • Proven results for Kenyan
              businesses
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SEOMarketingModal
