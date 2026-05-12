import { fontSize, fontWeight, lineHeight } from '@/styles/fonts';
import useMedia from '@/shared/hooks/useMediaQuery';
import Title from '@/shared/ui/Title/Title';
import classes from './SubscribeForm.module.scss';

const SubscribeForm = () => {
  const { isSmallDevice, isLargeDevice } = useMedia();

  return (
    <section className={classes.section}>
      <div className="container">
        <div
          className={classes.formWrap}
          style={{
            flexDirection: isLargeDevice ? 'column' : undefined,
            padding: isSmallDevice ? '30px 40px' : '36px 64px',
          }}>
          <Title
            level={2}
            text="STAY UPTO DATE ABOUT OUR LATEST OFFERS"
            size={isSmallDevice ? '35px' : fontSize.h2}
            weight={fontWeight.bold}
            lineHeight={isSmallDevice ? lineHeight.h3 : lineHeight.h2}
            style={{
              fontFamily: 'Integral CF, sans-serif',
              color: 'white',
              marginBottom: isLargeDevice ? 20 : undefined,
              textAlign: isLargeDevice ? 'center' : undefined,
            }}
          />

          <form className={classes.form} style={{ maxWidth: isLargeDevice ? undefined : '349px' }}>
            <div className={classes.inputWrap}>
              <input
                className={classes.formInput}
                id="email"
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address"
              />
              <svg
                className={classes.iconEmail}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none">
                <path
                  fill="#5b5b5bff"
                  fillOpacity=".4"
                  d="M21 4.125H3A1.125 1.125 0 0 0 1.875 5.25V18a1.875 1.875 0 0 0 1.875 1.875h16.5A1.875 1.875 0 0 0 22.125 18V5.25A1.125 1.125 0 0 0 21 4.125m-9 7.849L5.892 6.375h12.216zM8.7 12l-4.575 4.192V7.808zm1.664 1.526.876.804a1.125 1.125 0 0 0 1.52 0l.876-.804 4.472 4.099H5.892zM15.301 12l4.574-4.192v8.384z"
                />
              </svg>
            </div>

            <button className={classes.formButton} type="submit">
              Subscribe to Newsletter
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SubscribeForm;
