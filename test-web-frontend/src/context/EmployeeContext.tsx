import { createContext, useContext, useState } from "react";
import api from "../services/api";
import type { Employee } from "../types/Employee";
import type { EmployeeCreateRequest } from "../types/EmployeeCreateRequest";

type EmployeeContextType = {
  employees: Employee[];
  fetchEmployees: () => Promise<void>;
  createEmployee: (data: EmployeeCreateRequest) => Promise<void>;
  updateEmployee: (id: number, data: EmployeeCreateRequest) => Promise<void>;
  deleteEmployee: (id: number) => Promise<void>;
};

const EmployeeContext = createContext<EmployeeContextType>({} as EmployeeContextType);

export const EmployeeProvider = ({ children }: { children: React.ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = async () => {
    const res = await api.get("/employees");
    setEmployees(res.data);
  };

  const createEmployee = async (data: EmployeeCreateRequest) => {
    await api.post("/employees", data);
    await fetchEmployees(); // 🔥 refresh otomatis
  };

  const updateEmployee = async (id: number, data: EmployeeCreateRequest) => {
    await api.put(`/employees/${id}`, data);
    await fetchEmployees();
  };

  const deleteEmployee = async (id: number) => {
    await api.delete(`/employees/${id}`);
    await fetchEmployees();
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        fetchEmployees,
        createEmployee,
        updateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => useContext(EmployeeContext);