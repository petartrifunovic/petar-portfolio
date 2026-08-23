import Badge from '../badge/Badge';
import Row from '../layout/row/Row';
import Section from '../layout/section/Section';
import ClientSlider from '../slider/Slider';
import Heading from '../typography/heading/Heading';

const ClientsSection = () => {
  return (
    <Section id='clients'>
      <Row>
        <Badge className='mb-4'>Testimonials</Badge>
        <Heading level={2} size='xl' variant='primary'>
          What Clients Say
        </Heading>
        <Heading level={3} size='md' className='mb-4'>
          Feedback from people I have worked with
        </Heading>
        <ClientSlider />
      </Row>
    </Section>
  );
};

export default ClientsSection;
