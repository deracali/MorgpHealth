import React from 'react';

const AboutClinic = () => {
  return (
    <div className="bg-pink-50 flex flex-col lg:flex-row justify-center items-center p-10">
      {/* Left Section */}
      <div className="lg:w-1/2">
        <h4 className="text-pink-600 font-semibold mb-2">About Morgphealth</h4>
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome To Morgphealth Telemed Hospital
        </h1>
        <p className="mt-4 text-gray-600">
          Expertise: Our skilled medical professionals have years of experience in performing minor procedures, ensuring optimal results and minimal discomfort.
        </p>

        <ul className="mt-6 space-y-2 text-gray-700">
          <li>✔️ Treats minor illnesses</li>
          <li>✔️ Answers health questions</li>
          <li>✔️ Conducts health checkups</li>
          <li>✔️ Performs routine health tests</li>
          <li>✔️ Orthopaedic surgeon</li>
          <li>✔️ Endocrinologist</li>
          <li>✔️ Obstetrics & Gynaecologist</li>
        </ul>

      
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 flex flex-col items-center">
        <div className="bg-blue-100 p-8 rounded-xl shadow-lg">
          <h4 className="text-blue-600 font-semibold mb-2">Opening Time</h4>
          <p className="text-gray-700">Monday - Friday: 24HRS</p>
          <p className="text-gray-700 mt-2">Saturday: 24HRS</p>
        </div>

        
      </div>
    </div>
  );
};

export default AboutClinic;
