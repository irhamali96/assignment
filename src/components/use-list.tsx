'use client';
import { RootState } from '@/redux/store';
import { appendUsers, deleteUser, setHasMore, setLoading, setUsers } from '@/redux/userSlice';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserForm from './user-form';

const UserList: React.FC = () => {
  const fetchRef = useRef(false);
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const loading = useSelector((state: RootState) => state.users.loading);
  const hasMore = useSelector((state: RootState) => state.users.hasMore);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const fetchUsers = async (page: number) => {
    if (page === 1 || users.length) {
      dispatch(setUsers([]));
    }
    dispatch(setLoading(true));
    const cleanupTimeout = setTimeout(() => {
      dispatch(setUsers([]));
      dispatch(setLoading(false));
    }, 20000);

    try {
      const response = await fetch(`/api/users?page=${page}`);
      const data = await response.json();
      if (data.users.length) dispatch(appendUsers(data.users));
      dispatch(setHasMore(data.hasMore));
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      clearTimeout(cleanupTimeout);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (fetchRef.current || users.length) return;
    fetchRef.current = true;

    fetchUsers(page);
  }, []);

  const handleLoadMore = () => {
    if (hasMore)
      setPage((prev) => {
        const newPage = prev + 1;
        fetchUsers(newPage);
        return newPage;
      });
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  const openForm = (userId?: number) => {
    setSelectedUserId(userId || null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="w-3/4 ">
        <div className="top-0 bg-white sticky flex justify-between items-center w-full">
          <h1 className="text-xl font-bold">User List</h1>
          <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded" onClick={() => openForm()}>
            Add User
          </button>
        </div>
        <hr className="w-full mt-3" />
        <div className="w-full flex justify-center items-center mt-4">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : users.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No users found.</div>
          ) : (
            <ul className="divide-y divide-gray-200 w-4/5 rounded border border-solid">
              {users.map((user) => (
                <li key={user.id} className="flex justify-between py-10 px-20">
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex flex-row gap-3">
                    <button className="mr-2 text-blue-500" onClick={() => openForm(user.id)}>
                      Edit
                    </button>
                    <button className="text-red-500" onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-center my-4">
          {hasMore && (
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleLoadMore} disabled={loading}>
              {loading ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
        {isFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
            <div className="bg-white p-4 rounded w-1/2">
              <UserForm userId={selectedUserId || undefined} onClose={closeForm} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
