import Link from 'next/link';
import React from 'react';

interface IProps {}

const Home: React.FC<IProps> = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Awesome App</h1>
        <p className="text-lg text-gray-600 mb-6">Explore amazing features and functionalities tailored just for you.</p>
        <div className="flex w-full items-center justify-center">
          <Link href="/users" className='className="bg-blue-500 text-balck font-semibold py-2 px-4 rounded  hover:text-white hover:bg-blue-600 transition duration-200"'>
            Users
          </Link>
          <Link href="/multi-step-form" className='className="bg-blue-500 text-balck font-semibold py-2 px-4 rounded  hover:text-white hover:bg-blue-600 transition duration-200"'>
            Multi Step Form
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
