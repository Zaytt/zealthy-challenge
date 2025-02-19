import OnboardingPageWrapper from './OnboardingPageWrapper'
import OnboardingHeader from './OnboardingHeader'

export default function OnboardingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#fffc]">
      <OnboardingHeader />
      <div className="pt-8">
        <OnboardingPageWrapper />
      </div>
    </div>
  )
}
