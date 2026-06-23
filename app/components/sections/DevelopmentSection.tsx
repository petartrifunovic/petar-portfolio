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

const developmentSkills = [
  { title: 'HTML 5', icon: '/dev-icons/html.svg', alt: 'HTML5' },
  { title: 'CSS 3', icon: '/dev-icons/css3.svg', alt: 'CSS3' },
  { title: 'SASS', icon: '/dev-icons/sass.svg', alt: 'SASS' },
  { title: 'Bootstrap', icon: '/dev-icons/bootstrap.svg', alt: 'Bootstrap' },
  { title: 'Tailwind', icon: '/dev-icons/tailwind.svg', alt: 'Tailwind' },
  { title: 'jQuery', icon: '/dev-icons/jquery.svg', alt: 'jQuery' },
  { title: 'Python', icon: '/dev-icons/python.svg', alt: 'Python' },
  { title: 'JavaScript', icon: '/dev-icons/js.svg', alt: 'JavaScript' },
  {
    title: 'Alpine.js',
    icon: '/dev-icons/alpinejs_light.svg',
    alt: 'Alpine.js',
  },
  { title: 'Node.js', icon: '/dev-icons/nodejs.svg', alt: 'Node.js' },
  { title: 'Express', icon: '/dev-icons/express_light.svg', alt: 'Express' },
  { title: 'PHP', icon: '/dev-icons/php.svg', alt: 'PHP' },
  { title: 'MySQL', icon: '/dev-icons/mysql.svg', alt: 'MySQL' },
  { title: 'MongoDB', icon: '/dev-icons/mongodb.svg', alt: 'MongoDB' },
  { title: 'Mongoose', icon: '/dev-icons/mongoose.svg', alt: 'Mongoose' },
  { title: 'React', icon: '/dev-icons/react.svg', alt: 'React' },
  { title: 'Redux', icon: '/dev-icons/redux.svg', alt: 'Redux' },
  { title: 'WordPress', icon: '/dev-icons/wordpress.svg', alt: 'WordPress' },
];

const developmentTools = [
  { title: 'VS Code', icon: '/dev-tools-icons/vscode.svg', alt: 'VS Code' },
  { title: 'GitHub', icon: '/dev-tools-icons/github_light.svg', alt: 'GitHub' },
  { title: 'GitLab', icon: '/dev-tools-icons/gitlab.svg', alt: 'GitLab' },
  { title: 'Azure', icon: '/dev-tools-icons/azure.svg', alt: 'Azure' },
  {
    title: 'BugHerd',
    icon: '/dev-tools-icons/bugherd_light.svg',
    alt: 'BugHerd',
  },
  { title: 'Vercel', icon: '/dev-tools-icons/vercel_light.svg', alt: 'Vercel' },
  { title: 'npm', icon: '/dev-tools-icons/npm.svg', alt: 'npm' },
  { title: 'Webpack', icon: '/dev-tools-icons/webpack.svg', alt: 'Webpack' },
  { title: 'Parcel', icon: '/dev-tools-icons/parcel.svg', alt: 'Parcel' },
  { title: 'Jira', icon: '/dev-tools-icons/jira.svg', alt: 'Jira' },
  { title: 'Trello', icon: '/dev-tools-icons/trello.svg', alt: 'Trello' },
  {
    title: 'Bitbucket',
    icon: '/dev-tools-icons/bitbucket.svg',
    alt: 'Bitbucket',
  },
  { title: 'Slack', icon: '/dev-tools-icons/slack.svg', alt: 'Slack' },
  { title: 'AWeber', icon: '/dev-tools-icons/aweber.svg', alt: 'AWeber' },
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
};

const getLightModeIcon = (icon: string) => {
  if (icon.includes('_light')) return icon.replace('_light', '_dark');
  return icon;
};

const getDarkModeIcon = (icon: string) => {
  if (icon.includes('_dark')) return icon.replace('_dark', '_light');
  return icon;
};

const SkillCardGrid = ({ items }: SkillCardGridProps) => {
  return (
    <div className='mx-auto grid w-full grid-cols-3 gap-1 md:grid-cols-5 lg:w-max lg:grid-cols-7'>
      {items.map((item) => {
        const lightModeIcon = getLightModeIcon(item.icon);
        const darkModeIcon = getDarkModeIcon(item.icon);

        return (
          <Card
            key={item.title}
            className='flex h-24 w-full flex-col items-center justify-center gap-1 lg:w-24 transition duration-200 ease-in-out hover:-translate-y-1 dark-hover:shadow-2xl hover:shadow-lg'
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
              I design, develop, and maintain responsive, high-performance
              websites and web applications tailored to real business needs.
              With experience across front-end and back-end technologies, I
              focus on building clean, scalable, and user-friendly solutions
              that combine strong functionality with modern design.
            </Paragraph>
          </div>

          <Paragraph>
            I enjoy working in collaborative environments where clear
            communication, problem-solving, and attention to detail are
            essential. My approach is focused on delivering reliable digital
            products, improving user experience, and supporting projects from
            initial idea through final implementation.
          </Paragraph>
        </div>

        <Tabs className='mb-8'>
          <Tab title='Development'>
            <SkillCardGrid items={developmentSkills} />
          </Tab>

          <Tab title='Development Tools'>
            <SkillCardGrid items={developmentTools} />
          </Tab>
        </Tabs>

        <Heading level={4} size='md' className='mb-4'>
          Core Responsibilities
        </Heading>

        <List className='grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2 lg:grid-cols-[repeat(3,max-content)]'>
          {responsibilities.map((item) => (
            <ListItem key={item} listIcon='Tick02Icon'>
              {item}
            </ListItem>
          ))}
        </List>
      </Row>
    </Section>
  );
};

export default DevelopmentSection;
