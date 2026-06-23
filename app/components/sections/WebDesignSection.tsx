import Image from 'next/image';
import Badge from '@/app/components/badge/Badge';
import Row from '@/app/components/layout/row/Row';
import Section from '@/app/components/layout/section/Section';
import Heading from '@/app/components/typography/heading/Heading';
import Paragraph from '@/app/components/typography/paragraph/Paragraph';
import Timeline from '../timeline/Timeline';

const WebDesignSection = () => {
  return (
    <Section id='web-design'>
      <Row>
        <Badge className='mb-4'>Web Design</Badge>

        <Heading level={2} size='xl' variant='primary'>
          Web Design - UI/UX
        </Heading>

        <Heading level={3} size='md' className='mb-4'>
          Designing intuitive, modern, and engaging digital experiences
        </Heading>

        <div className='mb-20'>
          <div className='mb-4 text-text leading-relaxed'>
            <div className='float-right ml-4 mb-2 flex w-max flex-col items-center gap-2 rounded-lg bg-card p-3'>
              <Image
                width={50}
                height={50}
                src='/adobe.svg'
                alt='Adobe'
                className='rounded'
              />
              <span className='text-center text-sm'>Master at Adobe</span>
            </div>
            <Paragraph>
              I focus on creating visually refined and user-centered digital
              experiences that combine aesthetics, usability, and functionality.
              My goal is to design interfaces that are intuitive, accessible,
              and easy to navigate while helping users interact with content in
              a clear and meaningful way.
            </Paragraph>
          </div>

          <Paragraph>
            Beyond visual design, I transform UI/UX concepts and wireframes into
            fully functional, responsive interfaces. By bridging design and
            development, I ensure consistency across the entire user experience
            while delivering modern, high-quality web solutions optimized for
            performance and usability.
          </Paragraph>
        </div>

        <Heading level={3} size='xs' className='text-left md:text-center'>
          Creativity, Strategy, Experience
        </Heading>

        <Heading
          level={2}
          size='lg'
          variant='primary'
          className='text-left md:text-center mb-8 md:mb-12'
        >
          Turning Ideas into Exceptional Digital Experiences
        </Heading>

        <Timeline />
      </Row>
    </Section>
  );
};

export default WebDesignSection;
