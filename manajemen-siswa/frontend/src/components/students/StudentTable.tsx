import { useMemo, useState } from "react";
import type { Student } from "../../types/student";

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

export default function StudentTable({
  students,
  onEdit,
  onDelete,
}: StudentTableProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("SEMUA");

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        student.nama.toLowerCase().includes(keyword) ||
        student.nis.toLowerCase().includes(keyword);

      const matchesFilter = filter === "SEMUA" || student.jurusan === filter;

      return matchesSearch && matchesFilter;
    });
  }, [students, search, filter]);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Daftar Siswa</h2>
          <p className="mt-1 text-sm text-slate-500">
            Informasi seluruh siswa yang terdaftar.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Cari nama atau NIS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-64"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="SEMUA">Semua Jurusan</option>
            <option value="IPA">IPA</option>
            <option value="IPS">IPS</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-4">No</th>
              <th className="px-5 py-4">NIS</th>
              <th className="px-5 py-4">Nama Siswa</th>
              <th className="px-5 py-4">Kelas</th>
              <th className="px-5 py-4">Jurusan</th>
              <th className="px-5 py-4">Alamat</th>
              <th className="px-5 py-4 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredStudents.map((student, index) => (
              <tr key={student.id} className="transition hover:bg-slate-50">
                <td className="px-5 py-4 text-slate-500">{index + 1}</td>

                <td className="px-5 py-4 font-medium text-slate-600">
                  {student.nis}
                </td>

                <td className="px-5 py-4 font-semibold text-slate-800">
                  {student.nama}
                </td>

                <td className="px-5 py-4 text-slate-600">{student.kelas}</td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      student.jurusan === "IPA"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-violet-100 text-violet-700"
                    }`}
                  >
                    {student.jurusan}
                  </span>
                </td>

                <td className="max-w-48 truncate px-5 py-4 text-slate-500">
                  {student.alamat}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(student)}
                      className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(student)}
                      className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredStudents.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-12 text-center text-slate-400"
                >
                  Data siswa tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-500">
        Menampilkan {filteredStudents.length} dari {students.length} siswa
      </div>
    </section>
  );
}
