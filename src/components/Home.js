import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-green-50 to-blue-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Food That
              <span className="text-primary-600"> Works For You</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get food recommendations based on how you're feeling. Track what works and learn about nutrition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition shadow-lg hover:shadow-xl"
              >
                Sign Up
              </Link>
              <Link
                to="/contact"
                className="bg-white hover:bg-gray-50 text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold transition shadow-lg hover:shadow-xl border-2 border-primary-600"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            NutriMatch 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;