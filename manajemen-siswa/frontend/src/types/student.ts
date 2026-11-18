export interface Student {
  id: number;
  nis: string;
  nama: string;
  kelas: string;
  jurusan: string;
  alamat: string;
  tanggal_lahir: string | null;
}

export interface StudentInput {
  nis: string;
  nama: string;
  kelas: string;
  jurusan: string;
  alamat: string;
  tanggal_lahir: string;
}
