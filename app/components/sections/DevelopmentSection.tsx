import Image from 'next/image';
import Badge from '@/app/components/badge/Badge';
import Card from '@/app/components/card/Card';
import Row from '@/app/components/layout/row/Row';
import Section from '@/app/components/layout/section/Section';
import Heading from '@/app/components/typography/heading/Heading';
import Paragraph from '@/app/components/typography/paragraph/Paragraph';
import Tabs from '@/app/components/tabs/Tabs';
import Tab from '@/app/components/tabs/Tab';
import List from '@/app/components/list/List';
import ListItem from '@/app/components/list/ListItem';
import { cn } from '@/app/utils/cn';

const developmentSkills = [
  { title: 'HTML 5', icon: '/dev-icons/html.svg', alt: 'HTML5' },
  { title: 'CSS 3', icon: '/dev-icons/css3.svg', alt: 'CSS3' },
  { title: 'SASS', icon: '/dev-icons/sass.svg', alt: 'SASS' },
  { title: 'Tailwind', icon: '/dev-icons/tailwind.svg', alt: 'Tailwind' },
  { title: 'JavaScript', icon: '/dev-icons/js.svg', alt: 'JavaScript' },
  {
    title: 'TypeScript',
    icon: '/dev-icons/ts.svg',
    alt: 'TypeScript',
  },
  { title: 'React', icon: '/dev-icons/react.svg', alt: 'React' },
  { title: 'Next.js', icon: '/dev-icons/nextjs_light.svg', alt: 'Next.js' },
  { title: 'Node.js', icon: '/dev-icons/nodejs.svg', alt: 'Node.js' },
  { title: 'Express', icon: '/dev-icons/express_light.svg', alt: 'Express' },
  { title: 'MongoDB', icon: '/dev-icons/mongodb.svg', alt: 'MongoDB' },
  { title: 'Mongoose', icon: '/dev-icons/mongoose.svg', alt: 'Mongoose' },
];

const developmentTools = [
  { title: 'GitHub', icon: '/dev-tools-icons/github_light.svg', alt: 'GitHub' },
  { title: 'GitLab', icon: '/dev-tools-icons/gitlab.svg', alt: 'GitLab' },
  { title: 'Jira', icon: '/dev-tools-icons/jira.svg', alt: 'Jira' },
  { title: 'npm', icon: '/dev-tools-icons/npm.svg', alt: 'npm' },
  { title: 'Webpack', icon: '/dev-tools-icons/webpack.svg', alt: 'Webpack' },
  { title: 'Docker', icon: '/dev-tools-icons/docker.svg', alt: 'Docker' },
  { title: 'Linux', icon: '/dev-tools-icons/linux_light.svg', alt: 'Linux' },
  { title: 'Hetzner', icon: '/dev-tools-icons/hetzner.svg', alt: 'Hetzner Cloud' },
  { title: 'Azure', icon: '/dev-tools-icons/azure.svg', alt: 'Azure' },
  { title: 'Vercel', icon: '/dev-tools-icons/vercel_light.svg', alt: 'Vercel' },
];

const responsibilities = [
  'Proof of Concept',
  'Design and Architecture',
  'Product Development',
  'Product Testing',
  'Product Implementation',
  'Client Care and Support',
];

type SkillItem = {
  title: string;
  icon: string;
  alt: string;
};

type SkillCardGridProps = {
  items: SkillItem[];
  lgCols?: string;
};

const getLightModeIcon = (icon: string) => {
  if (icon.includes('_light')) return icon.replace('_light', '_dark');
  return icon;
};

const getDarkModeIcon = (icon: string) => {
  if (icon.includes('_dark')) return icon.replace('_dark', '_light');
  return icon;
};

const SkillCardGrid = ({
  items,
  lgCols = 'lg:grid-cols-6',
}: SkillCardGridProps) => {
  return (
    <div
      className={cn(
        'mx-auto grid w-full grid-cols-3 gap-1 md:grid-cols-5 lg:w-max',
        lgCols,
      )}
    >
      {items.map((item) => {
        const lightModeIcon = getLightModeIcon(item.icon);
        const darkModeIcon = getDarkModeIcon(item.icon);

        return (
          <Card
            key={item.title}
            className='flex h-24 w-full flex-col items-center justify-center gap-1 lg:w-24 transition duration-200 ease-in-out hover:-translate-y-1'
          >
            <>
              <Image
                width={30}
                height={30}
                src={lightModeIcon}
                alt={item.alt}
                className='mb-1 h-9 w-full dark:hidden'
              />
              <Image
                width={30}
                height={30}
                src={darkModeIcon}
                alt={item.alt}
                className='mb-1 hidden h-9 w-full dark:block'
              />
            </>
            <span>{item.title}</span>
          </Card>
        );
      })}
    </div>
  );
};

const DevelopmentSection = () => {
  return (
    <Section id='development'>
      <Row>
        <Badge className='mb-4'>Development</Badge>
        <Heading level={2} size='xl' variant='primary'>
          Building Scalable Digital Solutions
        </Heading>
        <Heading level={3} size='md' className='mb-4'>
          From concept and architecture to development, testing, and delivery
        </Heading>
        <div className='mb-8'>
          <div className='mb-4 text-text leading-relaxed'>
            <div className='float-right ml-4 mb-2 flex w-max flex-col items-center gap-2 rounded-lg bg-card p-3'>
              <Image
                width={120}
                height={24}
                src='/atlassian.svg'
                alt='Atlassian'
              />
              <span className='text-center text-sm'>Tools and Techniques</span>
            </div>
            <Paragraph>
              I work across the whole stack. On the server that means data
              models, REST APIs and the authentication around them; on the
              front end, the interface those APIs feed. Recent work includes an
              HR platform with interactive org charts and Excel and PDF
              reporting, and a studio site with a custom rich-text editor
              backed by its own publishing API.
            </Paragraph>
          </div>
          <Paragraph>
            I also own what happens after the code is written. That means
            end-to-end tests before a release, an API hardened against the
            usual abuse, and the production servers themselves: provisioning,
            reverse proxy, automated backups and the deploy that ties them
            together.
          </Paragraph>
        </div>
        <Tabs className='mb-8'>
          <Tab title='Development'>
            <SkillCardGrid items={developmentSkills} />
          </Tab>
          <Tab title='Development Tools'>
            <SkillCardGrid items={developmentTools} lgCols='lg:grid-cols-5' />
          </Tab>
        </Tabs>
        <Heading level={4} size='md' className='mb-4'>
          Core Responsibilities
        </Heading>
        <List className='grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2 lg:grid-cols-[repeat(3,max-content)]'>
          {responsibilities.map((item) => (
            <ListItem key={item} listIconSrc='/check.svg'>
              {item}
            </ListItem>
          ))}
        </List>
      </Row>
    </Section>
  );
};

export default DevelopmentSection;
