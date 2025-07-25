import { useState } from 'react'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const productCategories = [
    {
      name: 'Cereals & Grains',
      description:
        'High-quality cereals and grains for wholesale distribution and retail supply.',
      image: '🌾',
      products: [
        'Rice Varieties',
        'Maize & Corn',
        'Wheat Products',
        'Specialty Grains',
      ],
      detailedProducts: [
        {
          name: 'Premium Rice',
          image:
            'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop',
          description:
            'High-quality long grain rice, perfect for retail and wholesale',
          price: 'From KSh 120/kg',
        },
        {
          name: 'Maize Grain',
          image: '/cereals2.jpeg',
          description:
            'Fresh yellow maize grain for animal feed and human consumption',
          price: 'From KSh 45/kg',
        },
        {
          name: 'Wheat Flour',
          image: '/wheatflour.jpg',
          description: 'Premium wheat flour for baking and cooking purposes',
          price: 'From KSh 85/kg',
        },
        {
          name: 'Mixed Cereals',
          image: '/mixedcereals.jpg',
          description:
            'Nutritious mixed cereal blend for breakfast and cooking',
          price: 'From KSh 95/kg',
        },
        {
          name: 'Barley Grains',
          image:
            'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
          description:
            'Premium barley grains for brewing and cooking applications',
          price: 'From KSh 110/kg',
        },
        {
          name: 'Oats',
          image: '/oats.jpg',
          description:
            'Nutritious whole oats for breakfast cereals and cooking',
          price: 'From KSh 180/kg',
        },
        {
          name: 'Millet',
          image: '/millet.jpg',
          description:
            'Traditional millet grains, rich in nutrients and minerals',
          price: 'From KSh 75/kg',
        },
        {
          name: 'Quinoa',
          image: '/quinoa.jpg',
          description:
            'Premium quinoa grains, superfood with complete proteins',
          price: 'From KSh 350/kg',
        },
      ],
    },
    {
      name: 'Medical Equipment',
      description:
        'Professional medical devices and equipment for healthcare facilities.',
      image: '🏥',
      products: [
        'Diagnostic Equipment',
        'Surgical Instruments',
        'Monitoring Devices',
        'Laboratory Equipment',
      ],
      detailedProducts: [
        {
          name: 'Digital Thermometer',
          image: '/med1.jpeg',
          description:
            'Digital thermometer with accurate temperature readings and memory',
          price: 'From KSh 2,500',
        },
        {
          name: 'Blood Pressure Monitor',
          image: '/med2.jpeg',
          description:
            'Automatic blood pressure monitor with large LCD display',
          price: 'From KSh 8,500',
        },
        {
          name: 'Stethoscope',
          image: '/med3.jpeg',
          description:
            'Professional cardiology stethoscope with excellent acoustics',
          price: 'From KSh 12,000',
        },
        {
          name: 'Pulse Oximeter',
          image: '/med4.jpeg',
          description:
            'Fingertip pulse oximeter for oxygen saturation monitoring',
          price: 'From KSh 4,500',
        },
        {
          name: 'Medical Scale',
          image: '/med5.jpeg',
          description: 'Digital medical scale with BMI calculation and memory',
          price: 'From KSh 15,000',
        },
      ],
    },
    {
      name: 'Stationery Supplies',
      description:
        'Complete range of office and school stationery for all your writing needs.',
      image: '📝',
      products: [
        'Writing Materials',
        'Office Supplies',
        'School Supplies',
        'Filing Solutions',
      ],
      detailedProducts: [
        {
          name: 'Executive Pen Set',
          image: '/stationary1.jpeg',
          description:
            'Premium executive pen set with ballpoint and fountain pens',
          price: 'From KSh 2,500',
        },
        {
          name: 'Office Notebooks',
          image: '/stationary2.jpeg',
          description: 'High-quality lined notebooks for office and school use',
          price: 'From KSh 350',
        },
        {
          name: 'Filing Folders',
          image: '/stationary3.jpeg',
          description: 'Durable filing folders for document organization',
          price: 'From KSh 85',
        },
        {
          name: 'Stationery Bundle',
          image: '/stationary4.jpeg',
          description:
            'Complete stationery set with pens, pencils, erasers, and rulers',
          price: 'From KSh 1,200',
        },
      ],
    },
  ]

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our extensive catalog of high-quality products across
            multiple categories, carefully selected to meet your business needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="text-5xl mb-4 text-center">
                  {category.image}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4 text-center">
                  {category.description}
                </p>
                <div className="space-y-2">
                  {category.products.map((product, productIndex) => (
                    <div
                      key={productIndex}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div className="w-2 h-2 bg-bisnova-green-600 rounded-full mr-3"></div>
                      {product}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <button
                  onClick={() => setSelectedCategory(category.name)}
                  className="w-full text-bisnova-blue-600 font-semibold hover:text-bisnova-blue-800 transition-colors"
                >
                  View Products →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Product View */}
        {selectedCategory && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedCategory} - Product Catalog
              </h3>
              <button
                onClick={() => setSelectedCategory(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                ← Back to Categories
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {productCategories
                .find((cat) => cat.name === selectedCategory)
                ?.detailedProducts.map((product, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `https://via.placeholder.com/300x200/e5e7eb/6b7280?text=${encodeURIComponent(product.name)}`
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-bisnova-blue-600">
                          {product.price}
                        </span>
                        <button className="bg-bisnova-green-600 hover:bg-bisnova-green-700 text-white px-3 py-1 rounded text-sm transition-colors">
                          Inquire
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="mt-16 bg-bisnova-blue-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h3>
          <p className="text-lg mb-6">
            We offer custom sourcing services to find exactly what your business
            needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-bisnova-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-bisnova-green-700 transition-colors shadow-lg"
            >
              Contact Our Team
            </a>
            <a
              href="#"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-bisnova-blue-600 transition-colors"
            >
              Request Catalog
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products
