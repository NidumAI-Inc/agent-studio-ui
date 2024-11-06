import { create } from 'zustand';

type state = {
  open: string
  data: any
}

type actions = {
  updateModel: (open: string, data?: any) => void
  closeModel: () => void
}

const useModelStore = create<state & actions>()(set => ({
  open: "",
  data: null,

  updateModel: (open, data = null) => set({ open, data }),
  closeModel: () => set({ open: "", data: null }),
}))

export default useModelStore
