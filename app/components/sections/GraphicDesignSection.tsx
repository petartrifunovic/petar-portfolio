import Badge from '@/app/components/badge/Badge';
import Row from '@/app/components/layout/row/Row';
import Section from '@/app/components/layout/section/Section';
import Heading from '@/app/components/typography/heading/Heading';
import Paragraph from '@/app/components/typography/paragraph/Paragraph';
import Button from '../button/Button';
import Image from 'next/image';

const GraphicDesignSection = () => {
  return (
    <Section id='graphic-design'>
      <Row>
        <Badge className='mb-4'>Graphic Design</Badge>

        <Heading level={2} size='xl' variant='primary'>
          Creative Visual Communication
        </Heading>

        <Heading level={3} size='md' className='mb-4'>
          Modern Graphic Design Solutions for Digital & Print
        </Heading>

        <div className='mb-8'>
          <Paragraph className='mb-4'>
            I create professional and visually engaging design solutions across
            both digital and print media, focusing on clarity, creativity, and
            strong visual identity. From marketing materials and branding assets
            to web graphics and promotional content, every design is crafted to
            communicate effectively and leave a lasting impression.
          </Paragraph>

          <Paragraph className='mb-6'>
            Beyond design execution, I work closely with clients to develop
            strategic visual communication that aligns with their goals,
            audience, and brand message. By combining aesthetics with
            functionality, I help transform ideas into impactful visual
            experiences that strengthen brand presence and improve user
            engagement.
          </Paragraph>
          <Button href='#portfolio'>
            <Image width={24} height={24} src='/coffee.svg' alt='Tour' />
            Take a Tour
          </Button>
        </div>
      </Row>
    </Section>
  );
};

export default GraphicDesignSection;
