import  { useEffect, useState } from 'react';
import api from '../services/api';
import { useLoading } from '../hooks/useLoading';
import type { Employee } from '../types/Employee';



const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const { isLoading, error, handleRequest } = useLoading();
  const [formData, setFormData] = useState({ name: '', idNumber: '', gender: 'MALE', positionId: 1 });

  const loadData = () => {
    handleRequest(async () => {
      const res = await api.get('/employees');
      setEmployees(res.data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Employee List</h1>
      
      {error && <div className="p-4 mb-4 bg-red-100 text-red-700 rounded">{error}</div>}
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">NIK</th>
              <th className="p-4">Gender</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b">
                <td className="p-4">{emp.name}</td>
                <td className="p-4">{emp.idNumber}</td>
                <td className="p-4">{emp.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <p className="p-4 text-center">Loading data...</p>}
      </div>
    </div>
  );
};


export default EmployeeList;