import { createContext, useContext, useState } from "react";
import type { Employee, EmployeeRequest } from "../types/Employee";
import {
  getEmployees,
  createEmployee as createEmp,
  updateEmployee as updateEmp,
  deleteEmployee as deleteEmp,
} from "../services/EmployeeService";

type EmployeeContextType = {
  employees: Employee[];
  loading: boolean;
  error: string;
  fetchEmployees: () => Promise<void>;
  createEmployee: (data: EmployeeRequest) => Promise<void>;
  updateEmployee: (id: number, data: EmployeeRequest) => Promise<void>;
  deleteEmployee: (id: number) => Promise<void>;
};

const EmployeeContext = createContext<EmployeeContextType>(
  {} as EmployeeContextType
);

export const EmployeeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (data: EmployeeRequest) => {
    setLoading(true);
    setError("");
    try {
      await createEmp(data);
      await fetchEmployees();
    } catch (err: any) {
      setError(err.message);
      throw err; // penting untuk UI
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (id: number, data: EmployeeRequest) => {
    setLoading(true);
    setError("");
    try {
      await updateEmp(id, data);
      await fetchEmployees();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id: number) => {
    setLoading(true);
    setError("");
    try {
      await deleteEmp(id);
      await fetchEmployees();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        error,
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