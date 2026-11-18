import { useCallback, useEffect, useMemo, useState } from "react";

import { studentService } from "../services/studentService";
import type { Student, StudentInput } from "../types/student";

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await studentService.getAll();
      setStudents(data);
    } catch {
      setError("Gagal mengambil data siswa dari server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const addStudent = async (data: StudentInput) => {
    await studentService.create(data);
    await fetchStudents();
  };

  const editStudent = async (id: number, data: StudentInput) => {
    await studentService.update(id, data);
    await fetchStudents();
  };

  const removeStudent = async (id: number) => {
    await studentService.delete(id);
    await fetchStudents();
  };

  const stats = useMemo(
    () => ({
      total: students.length,
      ipa: students.filter((student) => student.jurusan === "IPA").length,
      ips: students.filter((student) => student.jurusan === "IPS").length,
    }),
    [students],
  );

  return {
    students,
    loading,
    error,
    stats,
    fetchStudents,
    addStudent,
    editStudent,
    removeStudent,
  };
}
