import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PersonalInfoContext } from "../context/PersonalInfoContext";

const PersonalInfo = () => {
  const { setPersonalInfo } = useContext(PersonalInfoContext);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [formData, setLocalFormData] = useState({
    userId: "",
    name: "",
    email: "",
    age: "",
    insured: false,
    location: "",
  });

  // Use useEffect to set the userId in the form data once the component is mounted
  useEffect(() => {
    if (userId) {
      setLocalFormData((prevData) => ({
        ...prevData,
        userId: userId, // Populate the userId field
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
      userId: formData.userId, // Added userId field to context
      name: formData.name,
      email: formData.email,  // Added email field to context
      location: formData.location,
    }));

    navigate("/selectplan");
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
          required
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

export default PersonalInfo;
