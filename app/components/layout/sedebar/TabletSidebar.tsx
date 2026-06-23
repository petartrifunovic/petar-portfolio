import Image from 'next/image';
import Heading from '../../typography/heading/Heading';
import Button from '../../button/Button';
import Theme from '../../theme/Theme';
import Row from '../row/Row';

const TabletSidebar = () => {
  return (
    <aside className='py-10 relative hidden sm:block xl:hidden bg-gradient-to-b from-background/80 to-background border-b border-border'>
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

      <Row>
        <div className='w-full relative z-10'>
          <div className='flex items-center gap-4'>
            <div className='rounded-full p-[2px] bg-foreground'>
              <Image
                width={100}
                height={100}
                src='/petar_trifunovic.jpg'
                alt='Petar Trifunovic'
                className='rounded-full w-48 h-48'
              />
            </div>

            <div className='space-y-1'>
              <Heading
                level={3}
                variant='primary'
                className='font-medium text-3xl'
              >
                Petar Trifunovic
              </Heading>

              <Heading level={4} className='text-xl mb-4'>
                Full-Stack Software Engineer & UI/UX Designer
              </Heading>

              <Button
                href='#contact'
                variant='accent'
                size='sm'
                className='px-12 mb-4'
              >
                Hire Me!
              </Button>
              <div className='flex items-center gap-2'>
                <Theme variant='secondary' />{' '}
                <span className='text-sm'>Choose Mode</span>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </aside>
  );
};

export default TabletSidebar;
