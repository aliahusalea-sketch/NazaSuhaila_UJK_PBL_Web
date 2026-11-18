import { Request, Response } from "express";

import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";

// GET ALL
export const getStudents = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const students = await getAllStudents();

  res.status(200).json({
    success: true,
    message: "Data siswa berhasil ditemukan",
    data: students,
  });
};

// GET BY ID
export const getStudent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      success: false,
      message: "ID siswa tidak valid",
    });
    return;
  }

  const student = await getStudentById(id);

  if (!student) {
    res.status(404).json({
      success: false,
      message: "Data siswa tidak ditemukan",
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Detail siswa berhasil ditemukan",
    data: student,
  });
};

// CREATE
export const addStudent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { nis, nama, kelas, jurusan, alamat } = req.body;

  if (!nis || !nama || !kelas || !jurusan || !alamat) {
    res.status(400).json({
      success: false,
      message: "Semua field wajib diisi",
    });
    return;
  }

  if (!["IPA", "IPS"].includes(jurusan)) {
    res.status(400).json({
      success: false,
      message: "Jurusan harus IPA atau IPS",
    });
    return;
  }

  const student = await createStudent(req.body);

  res.status(201).json({
    success: true,
    message: "Data siswa berhasil ditambahkan",
    data: student,
  });
};

// UPDATE
export const editStudent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      success: false,
      message: "ID siswa tidak valid",
    });
    return;
  }

  const { nis, nama, kelas, jurusan, alamat } = req.body;

  if (!nis || !nama || !kelas || !jurusan || !alamat) {
    res.status(400).json({
      success: false,
      message: "Semua field wajib diisi",
    });
    return;
  }

  if (!["IPA", "IPS"].includes(jurusan)) {
    res.status(400).json({
      success: false,
      message: "Jurusan harus IPA atau IPS",
    });
    return;
  }

  const student = await updateStudent(id, req.body);

  if (!student) {
    res.status(404).json({
      success: false,
      message: "Data siswa tidak ditemukan",
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Data siswa berhasil diperbarui",
    data: student,
  });
};

// DELETE
export const removeStudent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      success: false,
      message: "ID siswa tidak valid",
    });
    return;
  }

  const student = await deleteStudent(id);

  if (!student) {
    res.status(404).json({
      success: false,
      message: "Data siswa tidak ditemukan",
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Data siswa berhasil dihapus",
    data: student,
  });
};
