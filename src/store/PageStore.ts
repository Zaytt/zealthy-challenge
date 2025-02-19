import { create } from 'zustand'

interface PageState {
  isLoading: boolean
  currentPage: number
  lastPage: number
  setIsLoading: (loading: boolean) => void
  setCurrentPage: (page: number) => void
  setLastPage: (page: number) => void
}

export const usePageStore = create<PageState>(set => ({
  isLoading: true,
  currentPage: 1,
  lastPage: 1,
  setIsLoading: isLoading => set({ isLoading }),
  setCurrentPage: page => set({ currentPage: page }),
  setLastPage: page => set({ lastPage: page }),
}))
