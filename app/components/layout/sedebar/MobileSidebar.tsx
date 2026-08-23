import Image from 'next/image';
import Heading from '../../typography/heading/Heading';
import Button from '../../button/Button';
import Theme from '../../theme/Theme';
import Founder from '../../founder/Founder';

const MobileSidebar = () => {
  return (
    <aside className='relative block sm:hidden min-h-screen overflow-hidden bg-gradient-to-b from-background/80 to-background border-b border-border'>
      <Image
        src='/pattern_dark.svg'
        alt=''
        fill
        priority
        className='object-cover -z-10 dark:hidden'
      />
      <Image
        src='/pattern_light.svg'
        alt=''
        fill
        priority
        className='object-cover -z-10 hidden dark:block'
      />
      <div className='relative z-10 flex min-h-screen flex-col items-center justify-start px-6 pt-40 pb-10 text-center'>
        <div className='rounded-full p-[2px] bg-foreground mb-4'>
          <Image
            width={220}
            height={220}
            src='/petar_trifunovic.jpg'
            alt='Petar Trifunovic'
            className='rounded-full w-44 h-44 object-cover'
          />
        </div>
        <div className='max-w-xs w-full'>
          <Heading
            level={2}
            variant='primary'
            className='font-medium text-3xl leading-tight mb-3'
          >
            Petar Trifunovic
          </Heading>
          <Heading level={3} className='text-lg leading-snug mb-4'>
            Full-Stack Developer & UI/UX Designer
          </Heading>
          <Founder className='mb-6' logoWidth={104} />
          <Button
            href='/petar-trifunovic-cv.pdf'
            download='Petar Trifunovic - CV.pdf'
            variant='accent'
            className='w-full justify-center rounded-full mb-6'
          >
            Download CV
            <span
              aria-hidden='true'
              className='block h-4 w-4 shrink-0 bg-accent-50'
              style={{
                maskImage: 'url(/download.svg)',
                WebkitMaskImage: 'url(/download.svg)',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
              }}
            />
          </Button>
          <div className='flex flex-col items-center justify-center'>
            <Theme variant='secondary' className='mb-1' />
            <span className='mb-4'>Choose Mode</span>
            <div className='mx-auto h-0.5 w-8 bg-primary rounded-full'>
              &nbsp;
            </div>
          </div>
        </div>
        <div className='mt-auto pt-16 flex justify-center'>
          <Button
            href='#introduction'
            variant='ghost'
            size='none'
            aria-label='Scroll to introduction'
          >
            <span
              aria-hidden='true'
              className='scroll-arrow block h-10 w-10 shrink-0 bg-primary'
              style={{
                maskImage: 'url(/chevron_light.svg)',
                WebkitMaskImage: 'url(/chevron_light.svg)',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
              }}
            />
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default MobileSidebar;
