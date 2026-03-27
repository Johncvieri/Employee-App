import { useEffect } from 'react';
import { EmployeeProvider, useEmployeeContext } from './context/EmployeeContext';
import { useLoading } from './hooks/useLoading';
import EmployeeManager from './components/organism/EmployeeManagers'; // <--- Panggil file baru

const Dashboard = () => {
  const { fetchEmployees } = useEmployeeContext();
  const { isLoading, handleRequest } = useLoading();

  useEffect(() => {
    handleRequest(fetchEmployees);
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <header className="mb-12">
        <h1 className="text-6xl font-black text-gray-900 tracking-tighter leading-none">
          ENIGMA <span className="text-blue-600 italic">HR</span>
        </h1>
        <div className="h-1.5 w-24 bg-blue-600 mt-2 rounded-full"></div>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-4 ml-1">
          Internal Management Portal v2.0
        </p>
      </header>

      <EmployeeManager isLoading={isLoading} />
    </div>
  );
};

export default function App() {
  return (
    <EmployeeProvider>
      <div className="min-h-screen bg-gray-50 selection:bg-blue-100">
        <Dashboard />
      </div>
    </EmployeeProvider>
  );
}