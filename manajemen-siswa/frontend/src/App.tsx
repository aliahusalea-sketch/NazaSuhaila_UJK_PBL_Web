import { useState } from "react";

import Header from "./components/layout/Header";
import StudentStats from "./components/students/StudentStats";
import StudentTable from "./components/students/StudentTable";
import StudentModal from "./components/students/StudentModal";

import { useStudents } from "./hooks/useStudents";

import type { Student, StudentInput } from "./types/student";

export default function App() {
  const {
    students,
    loading,
    error,
    stats,
    addStudent,
    editStudent,
    removeStudent,
  } = useStudents();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [deleteError, setDeleteError] = useState("");

  const handleAdd = () => {
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: StudentInput) => {
    if (selectedStudent) {
      await editStudent(selectedStudent.id, data);
    } else {
      await addStudent(data);
    }
  };

  const handleDelete = async (student: Student) => {
    const confirmed = window.confirm(
      `Yakin ingin menghapus data ${student.nama}?`,
    );

    if (!confirmed) return;

    try {
      setDeleteError("");
      await removeStudent(student.id);
    } catch {
      setDeleteError("Gagal menghapus data siswa.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header total={stats.total} />

      <main className="mx-auto max-w-[1600px] space-y-7 px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Dashboard</h2>
            <p className="mt-1 text-sm text-slate-500">
              Ringkasan dan pengelolaan data siswa.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <span className="text-lg">+</span>
            Tambah Siswa
          </button>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
            <p className="mt-4 text-sm text-slate-500">
              Mengambil data siswa...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-semibold text-red-700">{error}</p>
            <p className="mt-2 text-sm text-red-500">
              Pastikan backend dan PostgreSQL sedang aktif.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          <>
            <StudentStats total={stats.total} ipa={stats.ipa} ips={stats.ips} />

            {deleteError && (
              <p className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                {deleteError}
              </p>
            )}

            <StudentTable
              students={students}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white px-5 py-5 text-center text-xs text-slate-400">
        © 2026 Data Siswa. Sistem Manajemen Data Siswa.
      </footer>

      <StudentModal
        isOpen={isModalOpen}
        student={selectedStudent}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
