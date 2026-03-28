import api from "./api";
import type { Employee, EmployeeRequest } from "../types/Employee";

export const getEmployees = async (): Promise<Employee[]> => {
  const res = await api.get("/employees");
  return res.data;
};

export const createEmployee = async (data: EmployeeRequest) => {
  const res = await api.post("/employees", data);
  return res.data;
};

export const updateEmployee = async (
  id: number,
  data: EmployeeRequest
) => {
  const res = await api.put(`/employees/${id}`, data);
  return res.data;
};

export const deleteEmployee = async (id: number) => {
  await api.delete(`/employees/${id}`);
};