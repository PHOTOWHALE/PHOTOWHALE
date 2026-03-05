'use client';

import * as React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent as ShadcnDialogContent,
  DialogDescription,
  DialogFooter as ShadcnDialogFooter,
  DialogHeader as ShadcnDialogHeader,
  DialogPortal,
  DialogTitle as ShadcnDialogTitle,
} from '@/lib/shadcn/components/ui/dialog';
import { cn } from '@/lib/utils';
import Button from '@/components/common/Button';

interface ModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  isOpen: boolean;
  onToggle?: (open: boolean) => void;
}

const DialogContent = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof ShadcnDialogContent>) => (
  <DialogPortal>
    <ShadcnDialogContent
      className={cn('flex flex-col shadow-xl border-none bg-white', className)}
      {...props}
    >
      {children}
    </ShadcnDialogContent>
  </DialogPortal>
);

const DialogHeader = ({ className, ...props }: React.ComponentProps<typeof ShadcnDialogHeader>) => (
  <ShadcnDialogHeader className={cn('gap-1.5', className)} {...props} />
);

const DialogFooter = ({ className, ...props }: React.ComponentProps<typeof ShadcnDialogFooter>) => (
  <ShadcnDialogFooter className={cn('mt-4', className)} {...props} />
);

const DialogTitle = ({ className, ...props }: React.ComponentProps<typeof ShadcnDialogTitle>) => (
  <ShadcnDialogTitle className={cn('text-xl font-bold tracking-tight', className)} {...props} />
);

export default function Modal({
  title,
  description,
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
  isOpen,
  onToggle,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
      <DialogContent className="text-center sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter className="flex flex-row justify-center gap-4 sm:justify-center">
          <Button variant="primary" className="w-[40%] sm:w-[30%]" onClick={onConfirm}>
            {confirmText}
          </Button>
          <DialogClose asChild>
            <Button variant="secondary" className="w-[40%] sm:w-[30%]">
              {cancelText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
