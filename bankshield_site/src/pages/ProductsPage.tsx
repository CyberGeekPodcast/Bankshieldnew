import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function ProductsPage() {
  const products = useQuery(api.products.getAllProducts) || [];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">The BankShield Suite</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive security solutions designed for India's digital finance ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{product.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{product.tagline}</p>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">Target: {product.targetAudience}</div>
                  {product.pricing && (
                    <div className="text-sm font-medium text-green-600">{product.pricing}</div>
                  )}
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading products...</p>
          </div>
        )}
      </div>
    </div>
  );
}
