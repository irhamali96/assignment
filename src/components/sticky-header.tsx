import Link from 'next/link';
import React from 'react';

interface IStickyHeader {}

const StickyHeader: React.FC<IStickyHeader> = (props) => {
  const {} = props;
  return (
    <div className="sticky top-0 bg-white z-50 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Welcome</h1>
      <div className="flex space-x-4">
        <Link href="/" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Home
        </Link>
        <Link href="/users" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Users
        </Link>
        <Link href="/multi-step-form" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Multi Step Form
        </Link>
      </div>
    </div>
  );
};

export default StickyHeader;
