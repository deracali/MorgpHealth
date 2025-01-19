import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlansContext from "../context/PlansContext";
import { PersonalInfoContext } from "../context/PersonalInfoContext";

const SelectPlan = () => {
  const navigate = useNavigate();
  const [toggleYearly, setToggleYearly] = useState(false);
  const [num, setNum] = useState(0);

  // Example plan data
  const monthlyPlans = [
    {
      id: '1',
      type: '6 month',
      price: '$68/mn',
      details: { cover: '1 Crore', hospitalLocator: '65 view', policyTerm: '1 year' },
      title1: "Comprehensive Health Checkups",
      frequency1: "Annually",
      title2: "Dental Care",
      frequency2: "Twice a year",
      title3: "Vision Care",
      frequency3: "Once a year",
      title4: "Maternity Benefits",
      frequency4: "Once per policy term",
      title5: "Emergency Ambulance Service",
      frequency5: "Unlimited within network",
    },
    {
      id: '2',
      type: '12 month',
      price: '$110/yr',
      details: { cover: '50 Lakhs', hospitalLocator: '65 view', policyTerm: '1 year' },
      title1: "Dental Care",
      frequency1: "Twice a year",
      title2: "Health Checkups",
      frequency2: "Annually",
      title3: "Hospital Cash Benefit",
      frequency3: "Daily during hospitalization",
      title4: "Emergency Ambulance Service",
      frequency4: "Unlimited within network",
      title5: "Accidental Death Benefit",
      frequency5: "Once per policy term",
    },
    {
      id: '3',
      type: '1 month',
      price: '$15.99/mn',
      details: { cover: '25 Lakhs', hospitalLocator: '50 view', policyTerm: '1 year' },
      title1: "Dental Care",
      frequency1: "Twice a year",
      title2: "Vision Care",
      frequency2: "Once a year",
      title3: "Emergency Ambulance Service",
      frequency3: "Unlimited within network",
      title4: "Hospitalization Cover",
      frequency4: "Per hospitalization",
      title5: "Accidental Injury Cover",
      frequency5: "Once per policy term",
    },
    {
      id: '4',
      type: '3 month',
      price: '$46/mn',
      details: { 
          cover: '25 Lakhs', 
          hospitalLocator: '50 view', 
          policyTerm: '1 year' 
      },
      title1: "Wellness Check-up",
      frequency1: "Quarterly",
      title2: "Pharmacy Benefits",
      frequency2: "Monthly",
      title3: "Mental Health Support",
      frequency3: "Twice per year",
      title4: "Health Monitoring Devices",
      frequency4: "Annual one-time subsidy",
      title5: "Fitness Club Membership",
      frequency5: "Reimbursement per policy term",
  }
  
  ];
  

  const yearlyPlans = [
    // Include your yearly plans if needed
    ...monthlyPlans,
  ];

  const { selectedMonthlyPlan, selectedYearlyPlan, setSelectedMonthlyPlan, setSelectedYearlyPlan } = useContext(PlansContext);
  const { personalInfo } = useContext(PersonalInfoContext);

  const handleToggleYearly = () => {
    setToggleYearly((prev) => !prev);
  };

  const getMonthlyDetails = (id) => {
    setSelectedMonthlyPlan(monthlyPlans[id]);
    setNum(id + 1);
  };

  const getYearlyDetails = (id) => {
    setSelectedYearlyPlan(yearlyPlans[id]);
    setNum(id + 1);
  };

  const handleSumbit = async (event) => {
    event.preventDefault();
    if (selectedMonthlyPlan || selectedYearlyPlan) {
      // Submit to API or context here
      // For example, you can use an API call like: saveSelectedPlan(selectedMonthlyPlan or selectedYearlyPlan);

      // Example redirect:
      navigate("/addons");
    } else {
      alert("Please choose a plan");
    }
  };

  return (
    <div className="sm:basis-[60%] w-[300px] sm:w-[100%] h-[100%] sm:pr-[80px]">
      <h1 className="mt-10 text-3xl font-[800] mb-2 text-primary-marineBlue">
        Select your Plan
      </h1>
      <p className="text-neutral-coolGray mb-6">
        You have the option of monthly or yearly billing.
      </p>
      <form onSubmit={handleSumbit} className="flex flex-col relative">
        <div
          className={`${
            toggleYearly ? "hidden" : "block"
          } plansMonthly mb-8 flex flex-col sm:flex-row justify-between cursor-pointer`}
        >
          {monthlyPlans.map((item, idx) => {
            return (
              <div
                onClick={() => getMonthlyDetails(idx)}
                key={item.id}
                className={`plan ${
                  num !== idx + 1 ? "bg-white" : "bg-primary-lightBlue"
                } border-2 ${
                  num !== idx + 1
                    ? "border-neutral-lightGray"
                    : "border-primary-purplishBlue"
                } rounded-md p-4 flex items-center justify-around mb-4 sm:mb-0 sm:block basis-[31%] transition-all duration-300 hover:border-primary-purplishBlue`}
              >
                <h4 className="text-primary-marineBlue font-[500]">
                  {item.type}
                </h4>
                <p className="text-neutral-coolGray text-[14px] font-[500]">
                  {item.price}
                </p>
              </div>
            );
          })}
        </div>

        <div
          className={`${
            toggleYearly ? "block" : "hidden"
          } plansYearly mb-8 flex flex-col sm:flex-row justify-between cursor-pointer`}
        >
          {yearlyPlans.map((item, idx) => {
            return (
              <div
                onClick={() => getYearlyDetails(idx)}
                key={item.id}
                className={`plan ${
                  num !== idx + 1 ? "bg-white" : "bg-primary-lightBlue"
                } border-2 ${
                  num !== idx + 1
                    ? "border-neutral-lightGray"
                    : "border-primary-purplishBlue"
                } rounded-md p-4 flex items-center justify-around mb-4 sm:mb-0 sm:block sm:basis-[31%] transition-all duration-300 hover:border-primary-purplishBlue`}
              >
                {/* <img className="sm:mb-10" src={item.image} alt="plan image" /> */}
                <h4 className="text-primary-marineBlue font-[500]">
                  {item.type}
                </h4>
                <p className="text-neutral-coolGray text-[14px] font-[500]">
                  {item.price}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="text-neutral-coolGray font-[500] capitalize transition-all duration-300 hover:text-primary-marineBlue cursor-pointer"
          >
            Go back
          </button>

          <button
            className="bg-primary-marineBlue text-white border-0 rounded-md px-6 py-3 transition-all duration-300 hover:opacity-75"
            type="submit"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
};

export default SelectPlan;
