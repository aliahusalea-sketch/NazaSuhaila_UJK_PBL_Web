import { pool } from "../config/database";
import { Student, StudentInput } from "../types/student";

// GET ALL STUDENTS
export const getAllStudents = async (): Promise<Student[]> => {
  const result = await pool.query("SELECT * FROM student ORDER BY id ASC");

  return result.rows;
};

// GET STUDENT BY ID
export const getStudentById = async (id: number): Promise<Student | null> => {
  const result = await pool.query("SELECT * FROM student WHERE id = $1", [id]);

  return result.rows[0] ?? null;
};

// CREATE STUDENT
export const createStudent = async (data: StudentInput): Promise<Student> => {
  const result = await pool.query(
    `INSERT INTO student
      (nis, nama, kelas, jurusan, alamat, tanggal_lahir)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      data.nis,
      data.nama,
      data.kelas,
      data.jurusan,
      data.alamat,
      data.tanggal_lahir ?? null,
    ],
  );

  return result.rows[0];
};

// UPDATE STUDENT
export const updateStudent = async (
  id: number,
  data: StudentInput,
): Promise<Student | null> => {
  const result = await pool.query(
    `UPDATE student
     SET nis = $1,
         nama = $2,
         kelas = $3,
         jurusan = $4,
         alamat = $5,
         tanggal_lahir = $6
     WHERE id = $7
     RETURNING *`,
    [
      data.nis,
      data.nama,
      data.kelas,
      data.jurusan,
      data.alamat,
      data.tanggal_lahir ?? null,
      id,
    ],
  );

  return result.rows[0] ?? null;
};

// DELETE STUDENT
export const deleteStudent = async (id: number): Promise<Student | null> => {
  const result = await pool.query(
    "DELETE FROM student WHERE id = $1 RETURNING *",
    [id],
  );

  return result.rows[0] ?? null;
};
