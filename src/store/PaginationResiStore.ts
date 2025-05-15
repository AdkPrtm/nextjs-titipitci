import { create } from "zustand";

interface PaginationResiStore {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  currentCursor: number;
  setCurrentCursor: (cursor: number) => void;
  totalPage : number;
  setTotalPage: (page: number) => void;
  pages: Record<number, any[]>;
  setPageData: (page: number, data: any[]) => void;
}

export const usePaginationStore = create<PaginationResiStore>((set) => ({
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  currentCursor: 0,
  setCurrentCursor: (cursor) => set({ currentCursor: cursor }),
  totalPage: 0,
  setTotalPage: (page) => set({ totalPage: page }),
  pages: {},
  setPageData: (page, data) => set((state) => ({ pages: { ...state.pages, [page]: data } })),
}));
