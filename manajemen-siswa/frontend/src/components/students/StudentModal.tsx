import { useEffect, useState } from "react";
import type { Student, StudentInput } from "../../types/student";

interface StudentModalProps {
  isOpen: boolean;
  student: Student | null;
  onClose: () => void;
  onSubmit: (data: StudentInput) => Promise<void>;
}

const initialForm: StudentInput = {
  nis: "",
  nama: "",
  kelas: "",
  jurusan: "IPA",
  alamat: "",
  tanggal_lahir: "",
};

export default function StudentModal({
  isOpen,
  student,
  onClose,
  onSubmit,
}: StudentModalProps) {
  const [form, setForm] = useState<StudentInput>(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (student) {
      setForm({
        nis: student.nis,
        nama: student.nama,
        kelas: student.kelas,
        jurusan: student.jurusan,
        alamat: student.alamat,
        tanggal_lahir: student.tanggal_lahir?.slice(0, 10) || "",
      });
    } else {
      setForm(initialForm);
    }

    setError("");
  }, [student, isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await onSubmit({
        ...form,
        tanggal_lahir: form.tanggal_lahir || "",
      });

      onClose();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Gagal menyimpan data siswa.",
      );
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {student ? "Edit Data Siswa" : "Tambah Siswa"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Lengkapi informasi siswa di bawah ini.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                NIS
              </label>
              <input
                name="nis"
                value={form.nis}
                onChange={handleChange}
                placeholder="Contoh: 2026021"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Nama Lengkap
              </label>
              <input
                name="nama"
                value={form.nama}
                onChange={handleChange}
                placeholder="Nama siswa"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Kelas
              </label>
              <select
                name="kelas"
                value={form.kelas}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">Pilih kelas</option>
                {["10A", "10B", "11A", "11B", "12A", "12B"].map((kelas) => (
                  <option key={kelas} value={kelas}>
                    {kelas}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Jurusan
              </label>
              <select
                name="jurusan"
                value={form.jurusan}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="IPA">IPA</option>
                <option value="IPS">IPS</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Tanggal Lahir
              </label>
              <input
                type="date"
                name="tanggal_lahir"
                value={form.tanggal_lahir || ""}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Alamat
              </label>
              <textarea
                name="alamat"
                value={form.alamat}
                onChange={handleChange}
                placeholder="Masukkan alamat lengkap"
                rows={3}
                required
                className={inputClass}
              />
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-100 pt-5 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {saving
                ? "Menyimpan..."
                : student
                  ? "Simpan Perubahan"
                  : "Tambah Siswa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
