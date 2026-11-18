import axios from "axios";
import type { Student, StudentInput } from "../types/student";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const studentService = {
  // GET ALL
  getAll: async (): Promise<Student[]> => {
    const response = await api.get("/students");
    return response.data.data;
  },

  // GET BY ID
  getById: async (id: number): Promise<Student> => {
    const response = await api.get(`/students/${id}`);
    return response.data.data;
  },

  // CREATE
  create: async (data: StudentInput): Promise<Student> => {
    const response = await api.post("/students", data);
    return response.data.data;
  },

  // UPDATE
  update: async (id: number, data: StudentInput): Promise<Student> => {
    const response = await api.put(`/students/${id}`, data);
    return response.data.data;
  },

  // DELETE
  delete: async (id: number): Promise<void> => {
    await api.delete(`/students/${id}`);
  },
};
