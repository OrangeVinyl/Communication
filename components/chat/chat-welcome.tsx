import { Hash } from 'lucide-react';

interface ChatWelcomeProps {
  name: string;
  type: 'channel' | 'conversation';
}

export const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
  return (
    <div className={'space-y-2 px-4 mb-4'}>
      {type === 'channel' && (
        <div
          className={
            'h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center'
          }
        >
          <Hash className={'h-12 w-12 text-white'} />
        </div>
      )}
      <p className={'text-xl md:text-3xl font-bold'}>
        {type === 'channel' ? `#${name}채널에 오신 걸 환영합니다` : `${name}`}
      </p>
      <p className={'text-zinc-600 dark:text-zinc-400 text-sm'}>
        {type === 'channel'
          ? `${name} 채널에서의 대화를 시작해보세요`
          : `${name}과의 대화를 시작해보세요`}
      </p>
    </div>
  );
};
