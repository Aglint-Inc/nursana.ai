'use client';
import { useQueryClient } from '@tanstack/react-query';

import { useLogout } from '@/common/hooks/useLogout';
import { Button } from '@/components/ui/button';

export const SignOut = () => {
  const queryClient = useQueryClient();
  const { logout } = useLogout();
  return (
    <Button variant='outline' onClick={() => logout(queryClient)}>
      Sign Out
    </Button>
  );
};
