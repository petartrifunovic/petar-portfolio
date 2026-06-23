import Image from 'next/image';
import Badge from '@/app/components/badge/Badge';
import Card from '@/app/components/card/Card';
import GridContainer from '@/app/components/layout/grid-container/GridContainer';
import Row from '@/app/components/layout/row/Row';
import Section from '@/app/components/layout/section/Section';
import Heading from '@/app/components/typography/heading/Heading';
import Paragraph from '@/app/components/typography/paragraph/Paragraph';
import Link from 'next/link';

const topics = [
  {
    title: 'Development',
    description:
      'Building high-quality, scalable websites and web applications - from architecture and front-end to back-end and deployment.',
    icon: '/development.svg',
    href: '#development',
  },
  {
    title: 'Web Design',
    description:
      'Crafting intuitive, visually polished UI/UX designs that put the user first and turn ideas into seamless digital experiences.',
    icon: '/web_design.svg',
    href: '#web-design',
  },
  {
    title: 'Graphic Design',
    description:
      'Creating compelling visual identities, branding assets, and graphic design solutions for digital and print media.',
    icon: '/graphic_design.svg',
    href: '#graphic-design',
  },
];

const HotTopics = () => {
  return (
    <Section id='hot-topics'>
      <Row>
        <Badge className='mb-4'>What I Do</Badge>

        <Heading level={2} size='xl' variant='primary'>
          Areas of Expertise
        </Heading>

        <Heading level={3} size='md' className='mb-8'>
          Core skills and quick links to each section
        </Heading>

        <GridContainer col='col-3'>
          {topics.map((topic) => (
            <Link key={topic.title} href={topic.href} className='h-full'>
              <Card className='relative flex h-full flex-col cursor-pointer transition duration-200 ease-in-out hover:-translate-y-1 dark-hover:shadow-2xl hover:shadow-lg group'>
                <div className='mb-2 flex items-center gap-2'>
                  <Image
                    width={24}
                    height={24}
                    src={topic.icon}
                    alt={topic.title}
                  />

                  <Heading level={4} size='sm'>
                    {topic.title}
                  </Heading>
                </div>

                <Paragraph>{topic.description}</Paragraph>

                <Image
                  width={20}
                  height={20}
                  src='/arrow.svg'
                  alt='Arrow'
                  className='absolute right-4 top-5 -translate-x-2 opacity-0 transition duration-200 ease-in-out group-hover:translate-x-0 group-hover:opacity-100'
                />
              </Card>
            </Link>
          ))}
        </GridContainer>
      </Row>
    </Section>
  );
};

export default HotTopics;
