import { create } from "zustand";
interface Category {
  type_id: string;
  setTypeId: Function;
}
export const useCategory = create<Category>((set) => ({
  type_id: "",
  setTypeId: (type_id: string) => set(() => ({ type_id })),
}));
