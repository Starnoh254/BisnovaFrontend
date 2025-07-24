import { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-bisnova-green-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              {/* Logo Image */}
              <div className="bg-bisnova-dark rounded-lg p-2 shadow-sm">
                <img
                  src="/bisnova.jpeg"
                  alt="Bisnova Supplies Limited Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              {/* Company Name */}
              <div className="hidden sm:block">
                <div className="text-xl font-bold text-bisnova-blue-500">
                  Bisnova{' '}
                  <span className="text-bisnova-green-500">Supplies</span>
                </div>
                <div className="text-xs text-gray-500 font-medium">Limited</div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-bisnova-blue-600 transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-bisnova-blue-600 transition-colors font-medium"
            >
              About
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-bisnova-blue-600 transition-colors font-medium"
            >
              Services
            </a>
            <a
              href="#products"
              className="text-gray-700 hover:text-bisnova-blue-600 transition-colors font-medium"
            >
              Products
            </a>
            <a
              href="#contact"
              className="bg-bisnova-green-600 text-white px-4 py-2 rounded-lg hover:bg-bisnova-green-700 transition-colors font-medium"
            >
              Contact
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-bisnova-blue-600 hover:text-bisnova-blue-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 border-t border-gray-200 pt-4">
            <a
              href="#home"
              className="block py-2 text-gray-700 hover:text-bisnova-blue-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className="block py-2 text-gray-700 hover:text-bisnova-blue-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#services"
              className="block py-2 text-gray-700 hover:text-bisnova-blue-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#products"
              className="block py-2 text-gray-700 hover:text-bisnova-blue-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </a>
            <a
              href="#contact"
              className="block py-2 bg-bisnova-green-600 text-white rounded-lg text-center hover:bg-bisnova-green-700 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
