import { SignInForm } from "../SignInForm";

export function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">B</span>
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                BankShield
              </div>
              <div className="text-sm text-gray-500 font-medium">Sign in to continue</div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Sign in with email & password. New here? Use <span className="font-semibold">Sign up</span>. Need help?
            Use <span className="font-semibold">Forgot password</span> to reset, or <span className="font-semibold">Verify email</span>
            if your account requires verification.
          </p>

          <SignInForm />
        </div>

        <div className="mt-6 text-center text-xs text-white/70">
          By continuing, you agree to BankShield’s security and data handling policies.
        </div>
      </div>
    </div>
  );
}
