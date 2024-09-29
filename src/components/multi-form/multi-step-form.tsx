'use client';
import React, { useState } from 'react';
import { Address } from './address';
import PersonalInfo from './personal-info';

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    const isValid = validateFormData(formData);
    if (!isValid) {
      return;
    }

    alert(`Form submitted successfully!\nName: ${formData.name}\nEmail: ${formData.email}\nAddress: ${formData.address}`);

    setFormData({ name: '', email: '', address: '' });
    handleBack();
  };

  const validateFormData = (data: any) => {
    return data.name && data.email && data.address;
  };
  return (
    <div className="w-2/4 mx-auto mt-10 p-5 bg-gray-100 rounded-lg shadow-lg">
      {step === 0 && <PersonalInfo formData={formData} setFormData={setFormData} next={handleNext} />}
      {step === 1 && <Address formData={formData} setFormData={setFormData} back={handleBack} submit={handleSubmit} />}
    </div>
  );
};

export default MultiStepForm;
