const Products = () => {
  const productCategories = [
    {
      name: "Industrial Equipment",
      description: "High-quality industrial machinery and equipment for manufacturing operations.",
      image: "🏭",
      products: ["Conveyor Systems", "Packaging Machines", "Quality Control Equipment", "Production Tools"]
    },
    {
      name: "Safety Equipment",
      description: "Comprehensive safety gear and equipment to protect your workforce.",
      image: "🦺",
      products: ["Personal Protective Equipment", "Safety Barriers", "Emergency Equipment", "Warning Systems"]
    },
    {
      name: "Office Supplies",
      description: "Everything you need to keep your office running efficiently.",
      image: "📁",
      products: ["Stationery", "Furniture", "Electronics", "Printing Materials"]
    },
    {
      name: "Construction Materials",
      description: "Durable construction materials for building and infrastructure projects.",
      image: "🏗️",
      products: ["Building Materials", "Tools & Hardware", "Safety Equipment", "Finishing Materials"]
    },
    {
      name: "Technology Solutions",
      description: "Modern technology solutions to enhance business operations.",
      image: "💻",
      products: ["Computer Hardware", "Software Solutions", "Networking Equipment", "Communication Systems"]
    },
    {
      name: "Maintenance Supplies",
      description: "Essential supplies for equipment maintenance and facility upkeep.",
      image: "🔧",
      products: ["Cleaning Supplies", "Repair Tools", "Replacement Parts", "Lubricants & Chemicals"]
    }
  ]

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our extensive catalog of high-quality products across multiple categories, 
            carefully selected to meet your business needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="text-5xl mb-4 text-center">{category.image}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4 text-center">
                  {category.description}
                </p>
                <div className="space-y-2">
                  {category.products.map((product, productIndex) => (
                    <div key={productIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {product}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <button className="w-full text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                  View Products →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h3>
          <p className="text-lg mb-6">
            We offer custom sourcing services to find exactly what your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Our Team
            </a>
            <a
              href="#"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
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
