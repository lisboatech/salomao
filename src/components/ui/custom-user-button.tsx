'use client';

import { useRouter } from 'next/navigation';

interface CustomUserButtonProps {
  showUserInfo?: boolean;
}

export function CustomUserButton({ showUserInfo = true }: CustomUserButtonProps) {
  const router = useRouter();

  return (
    <button
      className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center border border-white/20 hover:border-white/40 transition-all duration-300"
      onClick={() => router.push('/')}
    >
      <span className="text-white text-xs">J</span>
    </button>
  );
}
