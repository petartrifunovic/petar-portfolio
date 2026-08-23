import Badge from '../../badge/Badge';
import Button from '../../button/Button';
import Heading from '../../typography/heading/Heading';
import Paragraph from '../../typography/paragraph/Paragraph';
import Row from '../row/Row';
import Section from '../section/Section';
import FiverrHighlight from './FiverrHighlight';
import StatsGrid from './StatsGrid';

const Header = () => {
  return (
    <header>
      <Section inset='none' className='pt-12 xl:pt-4 mb-23' id='introduction'>
        <Row>
          <Badge className='mb-4'>Introduction</Badge>
          <Heading level={1} size='xxl' className='mb-2'>
            Hi, I&apos;m <span className='text-primary'>Petar Trifunovic</span>.
            <span className='block'>Full-Stack Developer &</span>
            <span className='block'>UI/UX Designer</span>
          </Heading>
          <Heading level={2} size='lg' className='mb-4'>
            Fifteen years of building for the web, from small sites to full
            production systems.
          </Heading>
          <Paragraph className='mb-8'>
            I build web applications from start to finish, from the database
            and API design to the interface people actually use. I care just as
            much about how something works underneath as about how it looks on
            the surface.
          </Paragraph>
          <div className='flex flex-col md:flex-row items-start md:items-center mb-8 gap-4'>
            <Button href='#portfolio'>Show Portfolio</Button>
            <Button
              href='#contact'
              variant='ghost'
              className='group flex items-center'
            >
              Get in Touch
              <span
                aria-hidden='true'
                className='block h-5 w-5 shrink-0 bg-primary transition-transform duration-300 group-hover:translate-x-1'
                style={{
                  maskImage: 'url(/arrow_long.svg)',
                  WebkitMaskImage: 'url(/arrow_long.svg)',
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
