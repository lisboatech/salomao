'use client';

import { UserButton as StackUserButton } from "@stackframe/stack";
import { useRouter } from 'next/navigation';

interface CustomUserButtonProps {
  showUserInfo?: boolean;
}

export function CustomUserButton({ showUserInfo = true }: CustomUserButtonProps) {
  const router = useRouter();

  return (
    <StackUserButton
      showUserInfo={showUserInfo}
      afterSignOutUrl="/"
      userProfileUrl="/account"
      onUserProfileClick={() => router.push('/account')}
      avatarProps={{
        className: "border border-white/20 hover:border-white/40 transition-all duration-300"
      }}
    />
  );
}
