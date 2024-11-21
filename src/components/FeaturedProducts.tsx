import { Star } from "lucide-react";

const featuredProducts = [
  {
    id: "1",
    name: "Robe d'été florale",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "2",
    name: "Chemise lin homme",
    price: 8500,
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <Star className="w-6 h-6 text-sky-600 mr-2" />
          <h2 className="text-3xl font-bold text-gray-800">
            Produits en vedette
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform "
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sky-600 font-medium">
                  {product.price.toLocaleString()} FDJ
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
