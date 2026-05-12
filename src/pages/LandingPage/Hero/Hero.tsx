import { Link } from 'react-router-dom';
import { fontSize, fontWeight, lineHeight } from '@/styles/fonts';
import useMedia from '@/shared/hooks/useMediaQuery';
import heroImg from '@/assets/images/content/heroImg.png';
import iconHero from '@/assets/images/icon/iconHero.svg';
import iconHero2 from '@/assets/images/icon/iconHero2.svg';
import Button from '@/shared/ui/Button/Button';
import Title from '@/shared/ui/Title/Title';
import classes from './Hero.module.scss';

const Hero = () => {
  const { isSmallDevice, isLargeDevice } = useMedia();

  return (
    <section className={classes.section}>
      <div className="container">
        <div className={classes.hero}>
          <div
            className={classes.heroWrap}
            style={{
              flexDirection: isLargeDevice ? 'column' : undefined,
              alignItems: isLargeDevice ? 'center' : undefined,
              gap: isLargeDevice ? '45px' : undefined,
            }}>
            <div
              className={classes.heroContent}
              style={{ alignItems: isLargeDevice ? undefined : 'flex-start' }}>
              <div
                className={classes.heroTextWrap}
                style={{
                  maxWidth: isLargeDevice ? undefined : '577px',
                  alignItems: isLargeDevice ? 'center' : undefined,
                }}>
                <Title
                  level={1}
                  text="FIND CLOTHES THAT MATCHES YOUR STYLE"
                  size={isLargeDevice ? fontSize.h2 : fontSize.h1}
                  weight={fontWeight.bold}
                  lineHeight={lineHeight.h1}
                  style={{
                    fontFamily: 'Integral CF, sans-serif',
                    textAlign: isLargeDevice ? 'center' : undefined,
                  }}
                />

                <p
                  className={classes.heroText}
                  style={{ textAlign: isLargeDevice ? 'center' : undefined }}>
                  Browse through our diverse range of meticulously crafted garments, designed to
                  bring out your individuality and cater to your sense of style.
                </p>

                <Link
                  to="/productscatalog"
                  className={classes.heroButtonWrap}
                  style={{ display: isLargeDevice ? undefined : 'block' }}>
                  <Button
                    text="Shop Now"
                    variant="dark"
                    style={{ width: isLargeDevice ? '100%' : undefined }}
                  />
                </Link>
              </div>

              <div className={classes.heroStats} style={{ gap: isSmallDevice ? '40px' : '64px' }}>
                <div className={classes.heroStatWrap}>
                  <p className={classes.heroStatNumber}>200+</p>
                  <span className={classes.heroStatText}>International Brands</span>
                </div>
                <div className={classes.heroStatWrap}>
                  <p className={classes.heroStatNumber}>2,000+</p>
                  <span className={classes.heroStatText}>High-Quality Products</span>
                </div>
                <div className={classes.heroStatWrap}>
                  <p className={classes.heroStatNumber}>30,000+</p>
                  <span className={classes.heroStatText}>Happy Customers</span>
                </div>
              </div>
            </div>

            <div className={classes.heroImgWrap}>
              <img
                className={classes.heroImg}
                src={heroImg}
                width="512"
                height="507"
                alt="Man and woman wearing stylish denim jackets and glasses"
              />
              <img
                className={classes.iconHero}
                src={iconHero}
                width="56"
                height="56"
                alt=""
                aria-hidden="true"
              />
              <img
                className={classes.iconHero2}
                src={iconHero2}
                width="104"
                height="104"
                alt=""
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
