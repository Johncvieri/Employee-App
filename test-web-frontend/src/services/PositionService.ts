import api from "./api";
import type { Position } from "../types/Position";

export const getPositions = async (): Promise<Position[]> => {
  const res = await api.get("/positions");
  return res.data;
};