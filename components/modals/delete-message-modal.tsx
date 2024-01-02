'use client';

import { useState } from 'react';
import axios from 'axios';
import qs from 'query-string';

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

export const DeleteMessageModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose, type, data } = useModal();
  const { apiUrl, query } = data;

  const isModalOpen = isOpen && type === 'deleteMessage';

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query,
      });

      await axios.delete(url);

      onClose();
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
          <DialogTitle className={'text-2xl text-center'}>메세지 삭제하기</DialogTitle>
          <DialogDescription className={'text-center text-zinc-500'}>
            정말로 메세지을 삭제할 예정입니까? <br />
            메세지는 영구적으로 삭제됩니다.
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
