interface HeaderProps {
  total: number;
}

export default function Header({ total }: HeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div>
        <p className="text-sm font-medium text-blue-600">
          SISTEM INFORMASI SEKOLAH
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-800">
          Manajemen Data Siswa
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Kelola informasi dan data siswa sekolah.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-blue-50 px-4 py-2">
          <p className="text-xs text-slate-500">Total Terdaftar</p>
          <p className="text-lg font-bold text-blue-700">{total} Siswa</p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
          DS
        </div>
      </div>
    </header>
  );
}
