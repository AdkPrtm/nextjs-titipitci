import { create } from "zustand";

export interface ResiData {
  user_id: number;
  nama_penerima: string;
  nomor_resi: string;
  tanggal_diterima: Date;
  posisi_paket: string;
  estimasi_tiba: Date;
  status_paket: string;
  status_cod: boolean;
  jumlah_cod: number;
  status_pembayaran_cod: string;
  tanggal_pembayaran: string | Date;
  created_at: Date;
}

interface ResiState {
  resi: ResiData[] | null;
  messageOnError: string;
  setAllResi: (resi: ResiData[] | null) => void;
  setMessageOnError: (message: string | null) => void;
}

export const useResiStore = create<ResiState>((set) => ({
  resi: null,
  messageOnError: '',
  setAllResi: (resi) => set(() => ({ resi })),
  setMessageOnError: (message) => set(() => ({ messageOnError: message || '' })),
}));
