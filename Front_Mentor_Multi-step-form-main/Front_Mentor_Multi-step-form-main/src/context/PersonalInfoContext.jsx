// PersonalInfoContext.js
import React, { createContext, useState } from "react";

// Create the context
export const PersonalInfoContext = createContext();

// Create the provider component
export const PersonalInfoProvider = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    number: "",
  });

  return (
    <PersonalInfoContext.Provider value={{ personalInfo, setPersonalInfo }}>
      {children}
    </PersonalInfoContext.Provider>
  );
};
