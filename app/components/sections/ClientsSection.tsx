import Badge from '../badge/Badge';
import Row from '../layout/row/Row';
import Section from '../layout/section/Section';
import ClientSlider from '../slider/Slider';
import Heading from '../typography/heading/Heading';

const ClientsSection = () => {
  return (
    <Section id='clients'>
      <Row>
        <Badge className='mb-4'>Clients</Badge>
        <Heading level={2} size='xl' variant='primary'>
          Happy Clients
        </Heading>
        <Heading level={3} size='md' className='mb-4'>
          Words from Happy Clients
        </Heading>

        <ClientSlider />
      </Row>
    </Section>
  );
};

export default ClientsSection;
