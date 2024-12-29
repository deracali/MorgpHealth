import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import PlansContext from "../context/PlansContext";
import AddOnsContext from "../context/AddOnsContext";
import { PersonalInfoContext } from "../context/PersonalInfoContext";

const Summary = () => {
  const navigate = useNavigate();

  // Accessing Context Data
  const { selectedMonthlyPlan, selectedYearlyPlan } = useContext(PlansContext);
  const { selectedAddOnsValue } = useContext(AddOnsContext);
  const { personalInfo } = useContext(PersonalInfoContext);

  // Clean the price and ensure it's a number
  const cleanPrice = (price) => {
    if (!price) return 0;
    // Remove non-numeric characters (e.g., $ and commas), then convert to a float number
    return parseFloat(price.replace(/[^0-9.-]+/g, ""));
  };

  // Ensure data is valid and sanitize it (filter non-numeric values)
  const plan = selectedMonthlyPlan?.price ? selectedMonthlyPlan : selectedYearlyPlan;
  const planPrice = cleanPrice(plan?.price); // Clean and get valid price as a number
  const isMonthly = selectedMonthlyPlan?.price > 0;

  // Sanitize Add-ons to ensure all prices are valid numbers
  const totalAddOnsPrice = selectedAddOnsValue.reduce((acc, item) => {
    const addOnPrice = cleanPrice(item?.price); // Clean the add-on price
    return !isNaN(addOnPrice) ? acc + addOnPrice : acc; // Only add if it's a valid number
  }, 0);

  // Calculate total price (plan price + add-ons price)
  const totalPrice = planPrice + totalAddOnsPrice;

  console.log(planPrice);
  console.log(totalAddOnsPrice);

  // Handle Confirm Button - Submit data to the server and initiate Stripe checkout
  const handleConfirm = async () => {
    const userId = localStorage.getItem('userId') || (localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).userId);
    
    const plan = selectedMonthlyPlan.price ? selectedMonthlyPlan : selectedYearlyPlan;
    const planPrice = plan.price;
    const isMonthly = !!selectedMonthlyPlan.price;
  
    const insuranceData = {
      userId,
      // Personal Info
      name: personalInfo.name,
      spouseName: personalInfo.spouseName,
      motherName: personalInfo.motherName,
      fatherName: personalInfo.fatherName,
      childName: personalInfo.childName,
      age: personalInfo.age,
      location: personalInfo.location,
      insured: personalInfo.insured || false,
      spouseAge: personalInfo.spouseAge,
      motherAge: personalInfo.motherAge,
      fatherAge: personalInfo.fatherAge,
      childAge: personalInfo.childAge,
      // Plan Info
      plan: plan.title,
      planType: isMonthly ? "Monthly" : "Yearly",
      planPrice,
      // Add-ons Info
      addOns: selectedAddOnsValue.map(addOn => ({
        title: addOn.title,
        frequency: addOn.frequency,
        price: addOn.price,
      })),
      // Include title1 through title5 and frequency1 through frequency5
      title1: plan.title1,
      frequency1: plan.frequency1,
      title2: plan.title2,
      frequency2: plan.frequency2,
      title3: plan.title3,
      frequency3: plan.frequency3,
      title4: plan.title4,
      frequency4: plan.frequency4,
      title5: plan.title5,
      frequency5: plan.frequency5,
      totalPrice,
    };
  
    try {
      // Call the API to submit the insurance data (keep this part for your backend)
      const response = await fetch("https://morgphealth.onrender.com/api/insurance/insurance/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(insuranceData),
      });

      if (response.ok) {
        // Initiate Stripe Payment after data submission
        const stripe = await loadStripe("pk_test_51QN8mWG2ozhLuxUAf8fdoD3MqAQnfNsZZoZdbc1fRx1fHUWRbpLjbGfdeR5VEAGOVCAUqH9hrlaJPQ5lEpAmrt7q00kPKajlEa");

        const paymentResponse = await fetch("https://morgphealth.onrender.com/create-intents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: totalPrice * 100, name: personalInfo.name, email: personalInfo.email }), // Send amount in cents
        });

        const session = await paymentResponse.json();
        
        if (session.id) {
          // Redirect to the Stripe Checkout session
          const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });

          if (result.error) {
            console.error("Stripe Checkout Error:", result.error.message);
          }
        } else {
          console.error("Session ID not received:", session);
        }
      } else {
        console.error("Error submitting data", response);
      }
    } catch (error) {
      console.error("Error connecting to the server", error);
    }
  };

  return (
    <div className="sm:basis-[60%] w-[300px] sm:w-[100%] h-[100%] sm:pr-[80px] text-center">
      <h1 className="mt-10 text-3xl font-[800] mb-2 text-primary-marineBlue">Finishing up</h1>

      {/* Display Plan Info (Monthly or Yearly) */}
      <div className="bg-neutral-alabaster rounded-lg p-5">
        <h2 className="font-[800] text-primary-marineBlue mb-4">Your Selected Plan</h2>
        
        <div className="plan flex justify-between items-center mb-4">
          <div>
            <span className="text-primary-marineBlue font-[800]">{planPrice}</span>
          </div>
        </div>
        <hr />
      </div>

      {/* Display Selected Add-ons Dynamically */}
      <div className="bg-neutral-alabaster rounded-lg p-5">
        <h2 className="font-[800] text-primary-marineBlue mb-4">Selected Add-ons</h2>

        {selectedAddOnsValue.map((addOn, index) => (
          <div key={index} className="plan flex justify-between items-center mb-4">
            <div>
              <span className="text-primary-marineBlue font-[800]">{addOn.title}</span>
              <p className="text-neutral-coolGray">{addOn.frequency}</p>
            </div>
            <div>
              <span className="text-primary-marineBlue font-[800]">
                {addOn.price}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Display Total Price */}
      <div className="flex justify-between p-5">
        <div>
          <p className="text-neutral-coolGray">Total </p>
        </div>
        <div className="text-primary-purplishBlue font-[800]">
          {totalPrice}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-around sm:justify-between items-center ">
        <button
          onClick={() => navigate("/addons")}
          className="text-neutral-coolGray font-[500] capitalize transition-all duration-300 hover:text-primary-marineBlue cursor-pointer"
        >
          Go back
        </button>

        <button
          className="bg-primary-purplishBlue text-white border-0 rounded-md px-6 py-3 transition-all duration-300 hover:opacity-75"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Summary;
