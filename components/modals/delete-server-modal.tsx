'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// components
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// hooks
import { useModal } from '@/hooks/use-modal-store';

export const DeleteServerModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const { server } = data;

  const isModalOpen = isOpen && type === 'deleteServer';

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/servers/${server?.id}`);

      onClose();
      router.refresh();
      router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className={'bg-white text-black p-0 overflow-hidden'}>
        <DialogHeader className={'pt-8 px-6'}>
          <DialogTitle className={'text-2xl text-center'}>서버 제거하기</DialogTitle>
          <DialogDescription className={'text-center text-zinc-500'}>
            정말로 <span className={'font-semibold text-indigo-500'}>{server?.name}</span> 서버를
            제거할 예정입니까? <br />
            🚨 서버는 영구적으로 삭제됩니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className={'bg-gray-100 px-6 py-4'}>
          <div className={'flex items-center justify-between w-full'}>
            <Button disabled={isLoading} onClick={onClose} variant={'ghost'}>
              취소
            </Button>
            <Button disabled={isLoading} onClick={onClick} variant={'primary'}>
              나가기
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
