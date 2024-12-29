import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-primary-marineBlue mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 mb-6">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary-marineBlue text-white rounded-lg shadow-md hover:bg-opacity-75 transition-all duration-300"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default Error;
