import Badge from '../badge/Badge';
import ContactForm from '../forms/ContactForm';
import Row from '../layout/row/Row';
import Section from '../layout/section/Section';
import Heading from '../typography/heading/Heading';

const ContactSection = () => {
  return (
    <Section id='contact'>
      <Row>
        <Badge className='mb-4'>Contact</Badge>
        <Heading level={2} size='xl' variant='primary'>
          Get in Touch
        </Heading>
        <Heading level={3} size='md' className='mb-4'>
          Have a question or a project in mind? Send me a message.
        </Heading>
        <ContactForm />
      </Row>
    </Section>
  );
};

export default ContactSection;
