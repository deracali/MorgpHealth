import { createContext, useState } from "react";

const AddOnsContext = createContext();

export const AddOnsProvider = ({ children }) => {
  const [addOns, setAddOns] = useState([
    
      {
        id: '1',
        type: 'Health Plus cover',  // Changed the type
        price: '$250/yr',
        title1: "Comprehensive Health Checkup",
        frequency1: "Annually",
        title2: "Emergency Care",
        frequency2: "Twice a year",
        title3: "Dental Care",
        frequency3: "Once a year",
        title4: "Vision Care",
        frequency4: "Once a year",
        title5: "General Checkup",
        frequency5: "Once a year",
      },
      {
        id: '2',
        type: 'Wellness Plus cover',  // Changed the type
        price: '$200/yr',
        title1: "Dental Care",
        frequency1: "Twice a year",
        title2: "Eye Care",
        frequency2: "Once a year",
        title3: "Heart Checkup",
        frequency3: "Annually",
        title4: "Physiotherapy",
        frequency4: "Once a year",
        title5: "Mental Health Support",
        frequency5: "Once a year",
      },
      {
        id: '3',
        type: 'Elite Care cover',  // Changed the type
        price: '$150/yr',
        title1: "Basic Dental Care",
        frequency1: "Once a year",
        title2: "Annual Health Checkup",
        frequency2: "Once a year",
        title3: "Health Monitoring",
        frequency3: "Quarterly",
        title4: "Vaccination",
        frequency4: "Once a year",
        title5: "Emergency Services",
        frequency5: "As needed",
      }
  
    
  ]);

  const [selectedAddOnsValue, setSelectedAddOnsValue] = useState([]);

  return (
    <AddOnsContext.Provider
      value={{
        addOns,
        setAddOns,
        selectedAddOnsValue,
        setSelectedAddOnsValue
      }}
    >
      {children}
    </AddOnsContext.Provider>
  );
};

export default AddOnsContext;
