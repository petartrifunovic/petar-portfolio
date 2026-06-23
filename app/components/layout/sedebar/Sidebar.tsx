import Image from 'next/image';
import Card from '../../card/Card';
import Heading from '../../typography/heading/Heading';
import Social from '../../social/Social';
import Button from '../../button/Button';
import Copyright from '../../copyright/Copyright';
import Theme from '../../theme/Theme';
import Section from '../section/Section';

const Sidebar = () => {
  return (
    <aside className='min-h-screen hidden xl:block'>
      <Card className='sticky top-4 h-max flex flex-col items-center text-center'>
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
            variant='primary'
            className='font-medium'
          >
            Petar Trifunovic
          </Heading>

          <div className='mx-auto h-0.5 w-8 bg-primary rounded-full'>
            &nbsp;
          </div>

          <Heading level={4} className='text-sm mb-4'>
            Full-Stack Software Engineer & UI/UX Designer
          </Heading>
        </div>

        <Social className='mb-12' />

        <Button
          href='#contact'
          variant='accent'
          size='sm'
          className='w-full mb-4'
        >
          Hire Me!
        </Button>

        <Copyright className='text-xs' />
      </Card>
    </aside>
  );
};

export default Sidebar;
