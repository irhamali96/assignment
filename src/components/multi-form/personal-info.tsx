import React, { useState } from 'react';

interface IPersonalInfo {}

const PersonalInfo: React.FC<{ formData: any; setFormData: (data: any) => void; next: () => void }> = ({ formData, setFormData, next }) => {
  const [errors, setErrors] = useState({ name: '', email: '' });

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', email: '' };

    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validate()) {
      next();
    }
  };

  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Step 1: Personal Information</h2>
      <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      <button onClick={handleNext} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
        Next
      </button>
    </div>
  );
};

export default PersonalInfo;
