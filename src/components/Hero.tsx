import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative min-h-[400px] md:min-h-[500px] lg:h-[600px] bg-gradient-to-r from-sky-100 to-green-50">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
          alt="Fashion Store"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 lg:px-8 flex items-center">
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
            Découvrez votre style unique
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8">
            Les dernières tendances de la mode à Djibouti. Des vêtements de qualité pour toute la famille.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/hommes"
              className="bg-sky-600 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-sky-700 transition-colors text-sm md:text-base"
            >
              <span>Collection Hommes</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/femmes"
              className="bg-white text-sky-600 px-6 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors text-sm md:text-base"
            >
              <span>Collection Femmes</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
      
      
    </div>
  );
}