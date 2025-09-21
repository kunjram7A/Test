import LoginClient from './client';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <LoginClient />
      </div>
    </div>
  );
}
