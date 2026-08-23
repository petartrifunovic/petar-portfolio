import Image from 'next/image';
import Card from '../../card/Card';
import Heading from '../../typography/heading/Heading';
import Social from '../../social/Social';
import Founder from '../../founder/Founder';
import Button from '../../button/Button';
import Theme from '../../theme/Theme';

const Sidebar = () => {
  return (
    <aside className='min-h-screen hidden xl:block'>
      <Card
        className='sticky top-4 h-max flex flex-col items-center text-center'
      >
        <Theme className='absolute right-4 top-4' />
        <Image
          width={100}
          height={100}
          src='/petar_trifunovic.jpg'
          alt='Petar Trifunovic'
          className='rounded-full w-36 h-36 mb-2'
        />
        <div className='space-y-2'>
          <Heading
            level={3}
            size='md'
            variant='title'
            className='font-medium'
          >
            Petar Trifunovic
          </Heading>
          <div className='mx-auto h-0.5 w-8 bg-accent rounded-full'>
            &nbsp;
          </div>
          <Heading level={4} className='text-sm mb-4'>
            <span className='block'>Full-Stack Developer &</span>
            <span className='block'>UI/UX Designer</span>
          </Heading>
          <Founder logoWidth={96} />
        </div>
        <Button
          href='/petar-trifunovic-cv.pdf'
          download='Petar Trifunovic - CV.pdf'
          variant='accent'
          size='sm'
          className='w-full mt-8 mb-6'
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
        <Social iconClassName='bg-title' />
      </Card>
    </aside>
  );
};

export default Sidebar;
