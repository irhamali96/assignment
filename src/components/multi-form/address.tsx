import { useState } from 'react';

export const Address: React.FC<{ formData: any; setFormData: (data: any) => void; back: () => void; submit: () => void }> = ({ formData, setFormData, back, submit }) => {
  const [error, setError] = useState('');

  const validate = () => {
    if (!formData.address) {
      setError('Address is required');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      submit();
    }
  };

  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Step 2: Address</h2>
      <input type="text" placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex justify-between">
        <button onClick={back} className="bg-gray-300 text-black font-semibold py-2 px-4 rounded hover:bg-gray-400 transition duration-200">
          Back
        </button>
        <button onClick={handleSubmit} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
          Submit
        </button>
      </div>
    </div>
  );
};
