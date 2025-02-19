import { OnboardingComponent } from '@/types/OnboardingComponent.type'
import { create } from 'zustand'

interface OnboardingComponentsState {
  isLoading: boolean
  isSaving: boolean
  components: OnboardingComponent[]
  setIsLoading: (isLoading: boolean) => void
  setIsSaving: (isSaving: boolean) => void
  setComponents: (components: OnboardingComponent[]) => void
}

export const useOnboardingComponentsStore = create<OnboardingComponentsState>(set => ({
  components: [],
  isLoading: true,
  isSaving: false,
  setIsLoading: isLoading => set({ isLoading }),
  setIsSaving: isSaving => set({ isSaving }),
  setComponents: components => set({ components }),
}))
