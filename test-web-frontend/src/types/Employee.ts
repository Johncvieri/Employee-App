export type Gender = "MALE" | "FEMALE";

export interface Employee {
  id: number;
  name: string;
  birthDate: string;
  idNumber: number;
  gender: Gender;
  positionId: number;
  positionName: string;
}

export interface EmployeeRequest {
  name: string;
  birthDate: string;
  idNumber: number;
  gender: Gender;
  positionId: number;
}