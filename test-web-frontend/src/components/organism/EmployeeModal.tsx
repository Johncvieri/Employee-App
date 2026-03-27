import React, { useState } from 'react';
import { useEmployeeContext } from '../../context/EmployeeContext';
import { useLoading } from '../../hooks/useLoading';
import { Button } from '../atoms';

export const EmployeeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { addEmployee } = useEmployeeContext();
  const { isLoading, error, handleRequest } = useLoading();
  const [form, setForm] = useState({ name: '', idNumber: '', gender: 'MALE', positionId: 1 });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRequest(async () => {
      await addEmployee(form);
      onClose();
      setForm({ name: '', idNumber: '', gender: 'MALE', positionId: 1 });
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <h2 className="text-xl font-bold">Add Employee</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <input 
            className="w-full border-2 p-3 rounded-xl outline-none focus:border-blue-500" 
            placeholder="Full Name" 
            required 
            onChange={e => setForm({...form, name: e.target.value})} 
          />
          <input 
            className="w-full border-2 p-3 rounded-xl outline-none focus:border-blue-500" 
            placeholder="NIK" 
            required 
            onChange={e => setForm({...form, idNumber: e.target.value})} 
          />
          <select 
            className="w-full border-2 p-3 rounded-xl outline-none focus:border-blue-500"
            onChange={e => setForm({...form, gender: e.target.value})}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="flex-1 font-bold text-gray-400">Cancel</button>
            <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};