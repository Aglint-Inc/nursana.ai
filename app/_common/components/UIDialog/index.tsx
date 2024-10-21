import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

function UIDialog({
  slotButtons,
  title = 'Title',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose = () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClickPrimary = () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClickSecondary = () => {},
  children,
  open,
  size = 'md',
  isPrimaryActionLoading = false,
}: {
  slotButtons?: React.ReactNode;
  title?: string | React.ReactNode;
  onClose?: () => void;
  onClickPrimary?: () => void;
  onClickSecondary?: () => void;
  children?: React.ReactNode;
  open: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isPrimaryActionLoading?: boolean;
}) {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-xl',
    xl: 'max-w-3xl',
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={`${sizeClasses[size]} w-full p-4`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div>{children}</div>
        <DialogFooter>
          {slotButtons ?? (
            <>
              <Button variant='secondary' size='sm' onClick={onClickSecondary}>
                Cancel
              </Button>
              <Button
                variant='default'
                size='sm'
                onClick={onClickPrimary}
                disabled={isPrimaryActionLoading}
              >
                Confirm
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UIDialog;
