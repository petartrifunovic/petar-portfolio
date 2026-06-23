import Row from '../row/Row';
import Social from '../../social/Social';
import Copyright from '../../copyright/Copyright';

const Footer = () => {
  return (
    <footer>
      <Row className='flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-4 border-t border-border'>
        <Copyright />
        <Social />
      </Row>
    </footer>
  );
};

export default Footer;
