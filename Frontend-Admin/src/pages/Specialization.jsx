import React from "react";

const SpecialistCards = () => {
  const specialists = [
    {
      title: "Oncologist",
      description:
        "Our oncology specialists are at the forefront of cancer care, utilizing advanced treatments and therapies to ensure the best possible outcomes for our patients. We are committed to supporting you through every step of your cancer journey with a focus on both medical excellence and emotional well-being.",
    },
    {
      title: "Neurologist",
      description:
        "Discover comprehensive neurological care from our experts who specialize in diagnosing and treating disorders of the nervous system. Whether you’re dealing with headaches, seizures, or more complex neurological conditions, our team is dedicated to providing effective and compassionate care tailored to your unique needs.",
    },
    {
      title: "ENT Specialist",
      description:
        "Our Ear, Nose, and Throat specialists bring a wealth of experience to address a wide range of ENT conditions. From hearing loss and sinus issues to throat disorders, our team is here to provide accurate diagnoses and effective treatments, ensuring your optimal ear, nose, and throat health.",
    },
    {
      title: "Cardiologist",
      description:
        "Trust our cardiology experts to deliver top-notch cardiovascular care. With a focus on prevention, diagnosis, and treatment of heart conditions, our cardiologists are equipped with the latest technology to safeguard your heart health and improve your overall well-being.",
    },
    {
      title: "Audiologist",
      description:
        "Our audiologists are dedicated to preserving and improving your hearing health. Whether you’re experiencing hearing loss or seeking preventive care, our specialists offer comprehensive evaluations, advanced hearing solutions, and personalized support to enhance your auditory experience.",
    },
    {
      title: "Psychiatrists",
      description:
        "Mental health is an integral part of overall well-being. Our psychiatry team is committed to providing compassionate and evidence-based care for a wide range of mental health conditions. We strive to create a supportive environment where individuals can achieve emotional and psychological balance.",
    },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div
        className="mobile-grid-3 container mx-auto max-w-7xl grid gap-8"
      >
        {specialists.map((specialist, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-center"
          >
            <h3 className="text-xl font-semibold mb-4">{specialist.title}</h3>
            <p className="text-gray-600 text-sm">{specialist.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialistCards;
