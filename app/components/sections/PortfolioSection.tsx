import Badge from '../badge/Badge';
import Row from '../layout/row/Row';
import Section from '../layout/section/Section';
import Portfolio from '../portfolio/Portfolio';
import Heading from '../typography/heading/Heading';
import Paragraph from '../typography/paragraph/Paragraph';

const PortfolioSection = () => {
  return (
    <Section id='portfolio'>
      <Row>
        <Badge className='mb-4'>Portfolio</Badge>

        <Heading level={2} size='xl' variant='primary'>
          Selected Projects & Creative Work
        </Heading>

        <Heading level={3} size='md' className='mb-4'>
          A showcase of development, design, and digital experiences
        </Heading>

        <Paragraph className='mb-6'>
          Explore a collection of projects that reflect my experience in web
          development, UI/UX design, and graphic design. Each project is focused
          on combining modern aesthetics, functionality, and user-centered
          solutions to deliver engaging digital experiences and meaningful
          results.
        </Paragraph>

        <Portfolio />
      </Row>
    </Section>
  );
};

export default PortfolioSection;
