export type ComponentType = 'datepicker' | 'textfield' | 'textarea'

export interface OnboardingComponent {
  id: string
  pageNumber: number
  componentType: ComponentType
  name: string
  label: string
  isActive: boolean
  order: number
}
