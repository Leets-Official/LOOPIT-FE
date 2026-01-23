import { SignupForm } from './SignupForm';
import { SignupHeader } from './SignupHeader';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen w-full justify-center overflow-x-hidden bg-white">
      <div className="flex w-full max-w-[1440px] flex-col items-center px-6 pb-24">
        <SignupHeader />
        <SignupForm />
      </div>
    </div>
  );
}
