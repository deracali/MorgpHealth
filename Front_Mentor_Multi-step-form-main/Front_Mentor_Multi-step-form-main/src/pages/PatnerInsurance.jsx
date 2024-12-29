import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PersonalInfoContext } from "../context/PersonalInfoContext";

const PatnerForm = () => {
  const { setPersonalInfo } = useContext(PersonalInfoContext);
  const navigate = useNavigate();
  const { userId } = useParams();  // Extract userId from the URL
  const [formData, setLocalFormData] = useState({
    userId: "",       // Added userId field
    name: "",
    spouseName: "",
    spouseAge: "",
    age: "",
    location: "",
    email: "",        // Added email field
    insured: false,
  });

  useEffect(() => {
    if (userId) {
      setLocalFormData((prevData) => ({
        ...prevData,
        userId: userId,  // Populate the userId field
      }));
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setPersonalInfo((prev) => ({
      ...prev,
      userId: formData.userId,  // Added userId field to context
      name: formData.name,
      location: formData.location,
      email: formData.email,     // Added email field to context
    }));

    navigate('/selectplan');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-6 p-4 sm:p-6 bg-white shadow-lg rounded-lg w-full sm:w-[25rem] md:w-[35rem] lg:w-[45rem] mx-auto overflow-y-scroll max-h-[80vh] sm:max-h-[90vh]"
    >
      {/* Name Field */}
      <div className="form-group">
        <label className="block text-primary-marineBlue font-semibold mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-marineBlue"
          placeholder="Enter your name"
        />
      </div>

      {/* Spouse Name and Age */}
      <div className="form-group">
        <label className="block text-primary-marineBlue font-semibold mb-2">Spouse Name</label>
        <input
          type="text"
          name="spouseName"
          value={formData.spouseName}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-marineBlue"
          placeholder="Enter spouse's name"
        />
      </div>
      <div className="form-group">
        <label className="block text-primary-marineBlue font-semibold mb-2">Spouse Age</label>
        <input
          type="text"
          name="spouseAge"
          value={formData.spouseAge}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-marineBlue"
          placeholder="Enter spouse's age"
        />
      </div>

      {/* Age Field */}
      <div className="form-group">
        <label className="block text-primary-marineBlue font-semibold mb-2">Your Age</label>
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-marineBlue"
          placeholder="Enter your age"
        />
      </div>

      {/* Location Field */}
      <div className="form-group">
        <label className="block text-primary-marineBlue font-semibold mb-2">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-marineBlue"
          placeholder="Enter your location"
        />
      </div>

      {/* Email Field */}
      <div className="form-group">
        <label className="block text-primary-marineBlue font-semibold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-marineBlue"
          placeholder="Enter your email"
        />
      </div>

      {/* Insured Checkbox */}
      <div className="form-group flex items-center space-x-3">
        <label className="text-primary-marineBlue font-semibold">Insured</label>
        <input
          type="checkbox"
          name="insured"
          checked={formData.insured}
          onChange={handleInputChange}
          className="h-5 w-5 border border-gray-300 rounded focus:ring-2 focus:ring-primary-marineBlue"
        />
      </div>

      <button
        className="bg-primary-marineBlue text-white border-0 rounded-md px-6 py-3 transition-all duration-300 hover:opacity-75"
        type="submit"
      >
        Next Step
      </button>
    </form>
  );
};

export default PatnerForm;
