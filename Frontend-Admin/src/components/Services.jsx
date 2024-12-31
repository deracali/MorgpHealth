import React from 'react';
import { FaAmbulance, FaHeartbeat, FaStethoscope, FaSyringe, FaBaby, FaFemale } from 'react-icons/fa';


const HospitalServices = () => {
  return (
    <div className="section-full mb-10 mt-20 bg-cover bg-center" style={{ backgroundImage: 'url(https://thewebmax.org/indusza/images/background/map-bg-dark2.png)' }}>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="text-2xl text-blue-400 mb-2">
            <div className="inline-block border-l-2 border-t-2 p-1">
              Our Hospital Services
            </div>
          </div>
          <h2 className="text-4xl font-semibold text-gray-800">We Provide Best Healthcare Services</h2>
        </div>

        <div className="grid-mobile-services grid gap-8">
      {/* Service 1 */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <div className="flex justify-center mb-4">
          <span className="text-blue-400 text-6xl">
            <FaAmbulance />
          </span>
        </div>
        <h4 className="text-2xl font-semibold mb-3 text-gray-800">
          <div>Emergency Care</div>
        </h4>
        <p className="text-gray-600 mb-4">
          Fast and reliable emergency care to save lives and provide immediate treatment.
        </p>
       
      </div>

      {/* Service 2 */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <div className="flex justify-center mb-4">
          <span className="text-blue-400 text-6xl">
            <FaHeartbeat />
          </span>
        </div>
        <h4 className="text-2xl font-semibold mb-3 text-gray-800">
          <div>General Medicine</div>
        </h4>
        <p className="text-gray-600 mb-4">
          Comprehensive healthcare services for diagnosis, treatment, and prevention.
        </p>
       
      </div>

      {/* Service 3 */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <div className="flex justify-center mb-4">
          <span className="text-blue-400 text-6xl">
            <FaStethoscope />
          </span>
        </div>
        <h4 className="text-2xl font-semibold mb-3 text-gray-800">
          <div>Health Screening</div>
        </h4>
        <p className="text-gray-600 mb-4">
          Advanced health screening for early detection and prevention of diseases.
        </p>
       
      </div>

      {/* Service 4 */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <div className="flex justify-center mb-4">
          <span className="text-blue-400 text-6xl">
            <FaSyringe />
          </span>
        </div>
        <h4 className="text-2xl font-semibold mb-3 text-gray-800">
          <div>Surgical Services</div>
        </h4>
        <p className="text-gray-600 mb-4">
          High-quality surgical care provided by experienced surgeons for various procedures.
        </p>
       
      </div>

      {/* Service 5 */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <div className="flex justify-center mb-4">
          <span className="text-blue-400 text-6xl">
            <FaBaby />
          </span>
        </div>
        <h4 className="text-2xl font-semibold mb-3 text-gray-800">
          <div>Pediatric Care</div>
        </h4>
        <p className="text-gray-600 mb-4">
          Specialized care for children, from newborns to adolescents, with expert pediatricians.
        </p>
       
      </div>

      {/* Service 6 */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <div className="flex justify-center mb-4">
          <span className="text-blue-400 text-6xl">
            <FaFemale />
          </span>
        </div>
        <h4 className="text-2xl font-semibold mb-3 text-gray-800">
          <div>Maternity Services</div>
        </h4>
        <p className="text-gray-600 mb-4">
          Comprehensive maternity care, including prenatal and postnatal services for mothers and babies.
        </p>
       
      </div>
    </div>
      </div>
    </div>
  );
};

export default HospitalServices;
