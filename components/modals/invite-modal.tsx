'use client';

import { useState } from 'react';
import axios from 'axios';
import { Check, Copy, RefreshCw } from 'lucide-react';

// components
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// hooks
import { useModal } from '@/hooks/use-modal-store';
import { useOrigin } from '@/hooks/use-origin';

export const InviteModal = () => {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();
  const { server } = data;

  const isModalOpen = isOpen && type === 'invite';

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl).then();
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);

      onOpen('invite', { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className={'bg-white text-black p-0 overflow-hidden'}>
        <DialogHeader className={'pt-8 px-6'}>
          <DialogTitle className={'text-2xl text-center'}>🎉 멤버를 초대해보세요</DialogTitle>
        </DialogHeader>
        <div className={'p-6'}>
          <Label className={'uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'}>
            멤버 초대 링크
          </Label>
          <div className={'flex items-center mt-2 gap-x-2'}>
            <Input
              disabled={isLoading}
              className={
                'bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
              }
              value={inviteUrl}
            />
            <Button onClick={onCopy} disabled={isLoading} size={'icon'}>
              {copied ? <Check className={'w-4 h-4'} /> : <Copy className={'w-4 h-4'} />}
            </Button>
          </div>
          <Button
            onClick={onNew}
            disabled={isLoading}
            variant={'link'}
            size={'sm'}
            className={'text-xs text-zinc-500 mt-4'}
          >
            새로운 링크 생성하기
            <RefreshCw className={'w-4 h-4 ml-2'} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
