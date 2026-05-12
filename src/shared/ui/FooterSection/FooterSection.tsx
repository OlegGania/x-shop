import classes from './FooterSection.module.scss';
import Footer from '@/pages/LandingPage/Footer/Footer';
import SubscribeForm from '@/pages/LandingPage/SubscribeForm/SubscribeForm';

const FooterSection = () => {
  return (
    <div className="section">
      <div className={classes.footerSection}>
        <div className={classes.subscribeFormWrap}>
          <SubscribeForm />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default FooterSection;
