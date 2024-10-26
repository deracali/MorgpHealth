import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PersonalInfoContext } from "../context/PersonalInfoContext";

const InsuranceForm = () => {
  const { setPersonalInfo } = useContext(PersonalInfoContext); // Get the context function to set personal info
  const navigate = useNavigate(); // Get navigate function
  const [formData, setLocalFormData] = useState({
    name: "",
    spouseName: "",
    spouseAge: "",
    motherName: "",
    motherAge: "",
    fatherName: "",
    fatherAge: "",
    childName: "",
    childAge: "",
    age: "",
    insured: false,
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Set personal info to context
    setPersonalInfo((prev) => ({
      ...prev,
      name: formData.name,
      location: formData.location, // Assuming you want to save location too
    }));

    // Navigate to the next page
    navigate('/selectplan'); // Update the path accordingly
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

      {/* Mother Name and Age */}
      <div className="form-group">
        <label className="block text-primary-marineBlue font-semibold mb-2">Mother Name</label>
        <input
          type="text"
          name="motherName"
          value={formData.motherName}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-marineBlue"
          placeholder="Enter mother's name"
        />
      </div>
      <div className="form-group">
        <label className="block text-primary-marineBlue font-semibold mb-2">Mother Age</label>
        <input
          type="text"
          name="motherAge"
          value={formData.motherAge}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-marineBlue"
          placeholder="Enter mother's age"
        />
      </div>

      {/* Father Name and Age */}
      <div className="form-group">
        <label className="block text-primary-marineBlue font-semibold mb-2">Father Name</label>
        <input
          type="text"
          name="fatherName"
          value={formData.fatherName}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-marineBlue"
          placeholder="Enter father's name"
        />
      </div>
      <div className="form-group">
        <label className="block text-primary-marineBlue font-semibold mb-2">Father Age</label>
        <input
          type="text"
          name="fatherAge"
          value={formData.fatherAge}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-marineBlue"
          placeholder="Enter father's age"
        />
      </div>

      {/* Child Name and Age */}
      <div className="form-group">
        <label className="block text-primary-marineBlue font-semibold mb-2">Child Name</label>
        <input
          type="text"
          name="childName"
          value={formData.childName}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-marineBlue"
          placeholder="Enter child's name"
        />
      </div>
      <div className="form-group">
        <label className="block text-primary-marineBlue font-semibold mb-2">Child Age</label>
        <input
          type="text"
          name="childAge"
          value={formData.childAge}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-marineBlue"
          placeholder="Enter child's age"
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
        type="submit" // Corrected from "sumbit" to "submit"
      >
        Next Step
      </button>
    </form>
  );
};


export default InsuranceForm;
