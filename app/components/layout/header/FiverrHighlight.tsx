import Image from 'next/image';
import Link from 'next/link';
import Paragraph from '../../typography/paragraph/Paragraph';

const FiverrHighlight = () => {
  return (
    <div>
      <div className='mb-1 flex gap-4'>
        <Image
          width={100}
          height={100}
          src='/fiverr_logo_dark.svg'
          alt='Fiverr'
          className='h-auto w-20 dark:hidden'
        />

        <Image
          width={100}
          height={100}
          src='/fiverr_logo_light.svg'
          alt='Fiverr'
          className='h-auto w-20 hidden dark:block'
        />

        <div className='mt-1'>
          <div className='flex gap-0.5'>
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                width={12}
                height={12}
                src='/star.svg'
                alt='Star'
                className='h-3 w-3'
              />
            ))}
          </div>

          <div className='space-x-2 text-text'>
            <span>
              Fiverr Score: <span className='font-medium text-title'>5.0</span>
            </span>
            <span>
              Reviews: <span className='font-medium text-title'>29</span>
            </span>
          </div>
        </div>
      </div>

      <div className='flex items-center gap-1'>
        <Image
          width={20}
          height={20}
          src='/trophy.svg'
          alt='Trophy'
          className='h-11 sm:w-5 w-11 sm:h-5'
        />

        <Paragraph className='italic text-muted text-sm sm:text-base'>
          <span className='text-title'>Title:</span> Fiverr&apos;s top
          recommended{' '}
          <Link
            href='https://www.fiverr.com/petar_rs?public_mode=true'
            target='_blank'
            rel='noopener noreferrer'
            className='text-title hover:underline block sm:inline'
          >
            (Profile on Fiverr)
          </Link>
        </Paragraph>
      </div>
    </div>
  );
};

export default FiverrHighlight;
