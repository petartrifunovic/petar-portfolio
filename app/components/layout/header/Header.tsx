import Image from 'next/image';
import Badge from '../../badge/Badge';
import Button from '../../button/Button';
import Heading from '../../typography/heading/Heading';
import Paragraph from '../../typography/paragraph/Paragraph';
import Row from '../row/Row';
import Section from '../section/Section';
import FiverrHighlight from './FiverrHighlight';
import StatsGrid from './StatsGrid';
import MobileNavigation from '../navigation/MobileNavigation';

const Header = () => {
  return (
    <header>
      <Section inset='none' className='pt-12 xl:pt-4 mb-23' id='introduction'>
        <MobileNavigation />
        <Row>
          <Badge className='mb-4'>Introduction</Badge>

          <Heading level={1} size='xxl' className='mb-2'>
            Hi, I&apos;m <span className='text-primary'>Petar Trifunovic</span>.
            <span className='block'>
              Full-Stack Software Engineer & UI/UX Designer
            </span>
          </Heading>

          <Heading level={2} size='lg' className='mb-4'>
            Crafting modern digital experiences with precision, creativity, and
            purpose.
          </Heading>

          <Paragraph className='mb-8'>
            I specialize in building scalable web applications and visually
            engaging user interfaces that combine performance, functionality,
            and clean design. With a strong attention to detail and a
            collaborative mindset, I focus on delivering high-quality digital
            solutions that create meaningful user experiences and real business
            value.
          </Paragraph>

          <div className='flex flex-col md:flex-row items-start md:items-center mb-8 gap-4'>
            <Button href='#portfolio'>Show Portfolio</Button>

            <Button
              href='#contact'
              variant='ghost'
              className='group flex items-center'
            >
              Let&apos;s work together
              <Image
                width={20}
                height={20}
                src='/arrow.svg'
                alt='Arrow'
                className='transition-transform duration-300 group-hover:translate-x-1'
              />
            </Button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-[max-content_1fr] gap-8'>
            <StatsGrid />
            <FiverrHighlight />
          </div>
        </Row>
      </Section>
    </header>
  );
};

export default Header;
