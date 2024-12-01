import { Star } from "lucide-react";

const featuredProducts = [
  {
    id: "1",
    name: "Robe d'été florale",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "2",
    name: "Chemise lin homme",
    price: 5500,
    image:
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "3",
    name: "Ensemble enfant",
    price: 6000,
    image:
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Star className="w-6 h-6 text-sky-600 mr-2" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <span className="text-teal-600">Nos Meilleur Produits</span>
          </h2>
          </div>
          <a
                href="/femmes"
                className="btn inline-block bg-teal-600 text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:bg-teal-700 transition duration-300"
              >
                Shop Now
              </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-60 object-cover transform group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-sky-600">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-2">
                  <span className="text-sky-600 font-medium">
                    {product.price.toLocaleString()} FDJ
                  </span>
                </p>
                {/* <button className="mt-4 w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors">
                  Acheter maintenant
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
