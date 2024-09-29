'use client';
import { RootState } from '@/redux/store';
import { addUser, updateUser } from '@/redux/userSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface UserFormProps {
  userId?: number;
  onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ userId, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.users.find((u) => u.id === userId));

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId) {
      dispatch(updateUser({ id: userId, updates: { name, email } }));
    } else {
      dispatch(addUser({ id: Date.now(), name, email }));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">{userId ? 'Edit User' : 'Add User'}</h2>
      <div className="mb-4">
        <label className="block mb-2 font-medium" htmlFor="name">
          Name
        </label>
        <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium" htmlFor="email">
          Email
        </label>
        <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          {userId ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
