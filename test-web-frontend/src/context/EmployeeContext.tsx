import React, { createContext, useState, useContext } from 'react';
import api from '../services/Api';
import type { Employee } from '../types/Employee';

// 1. Definisi bentuk data yang akan dibagikan
interface EmployeeContextType {
  employees: Employee[];
  fetchEmployees: () => Promise<void>;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

// 2. Provider: Komponen yang akan membungkus aplikasi
export const EmployeeProvider = ({ children }: { children: React.ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/employees');
      // Pastikan backend mengembalikan array, jika tidak sesuaikan res.data
      setEmployees(res.data);
    } catch (err) {
      console.error("Gagal mengambil data karyawan:", err);
      throw err; // Lempar error agar ditangkap oleh hook useLoading
    }
  };

  return (
    <EmployeeContext.Provider value={{ employees, fetchEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};

// 3. Hook Custom: Agar panggil data di komponen tinggal satu baris
export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployeeContext harus digunakan di dalam EmployeeProvider");
  }
  return context;
};