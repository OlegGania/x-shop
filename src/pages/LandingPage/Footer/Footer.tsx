import useMedia from '@/shared/hooks/useMediaQuery';
import classes from './Footer.module.scss';

const Footer = () => {
  const { isSmallDevice, isMediumDevice, isLargeDevice } = useMedia();

  return (
    <section className={classes.section}>
      <div className="container">
        <div
          className={classes.footer}
          style={{
            flexWrap: isMediumDevice ? 'wrap' : undefined,
            gap: isMediumDevice ? '40px' : isLargeDevice ? '65px' : '112px',
            marginBottom: isMediumDevice ? '35px' : '50px',
          }}>
          <div
            className={classes.footerWrap}
            style={{ maxWidth: isMediumDevice ? undefined : '248px' }}>
            <a href="/" className="logo logo--footer">
              xshop
            </a>

            <p className={classes.footerText}>
              We have clothes that suits your style and which you're proud to wear. From women to
              men.
            </p>

            <ul className={classes.footerSocialList}>
              <li className={classes.footerSocialItem}>
                <a href="/" className={classes.footerSocialLink} aria-label="Twitter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11.17"
                    height="9.03"
                    viewBox="0 0 11.174 9.032"
                    fill="currentColor">
                    <path d="M11.174 1.048a5 5 0 0 1-1.327.372c.466-.28.838-.722 1.001-1.257a5 5 0 0 1-1.467.559A2.32 2.32 0 0 0 7.705 0a2.285 2.285 0 0 0-2.281 2.281c0 .187.023.35.07.512A6.52 6.52 0 0 1 .768.396a2.4 2.4 0 0 0-.302 1.14c0 .792.395 1.49 1.024 1.91a2.7 2.7 0 0 1-1.048-.28v.023a2.3 2.3 0 0 0 1.84 2.258c-.187.047-.396.07-.606.07-.14 0-.303-.023-.442-.046.302.907 1.14 1.583 2.141 1.583a4.66 4.66 0 0 1-2.84.977c-.186 0-.372 0-.535-.023a6.5 6.5 0 0 0 3.515 1.024c4.214 0 6.518-3.492 6.518-6.518v-.302a4.2 4.2 0 0 0 1.14-1.164Z" />
                  </svg>
                </a>
              </li>

              <li className={classes.footerSocialItem}>
                <a href="/" className={classes.footerSocialLink} aria-label="Facebook">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6.32"
                    height="12.17"
                    viewBox="0 0 6.32 12.17"
                    fill="currentColor">
                    <path d="M1.87 12.17V6.62H0V4.46h1.87V2.86C1.87 1.01 3 0 4.65 0c.79 0 1.47.06 1.67.09v1.94H5.18c-.9 0-1.07.43-1.07 1.05v1.38h2.14l-.28 2.16H4.10v5.55z" />
                  </svg>
                </a>
              </li>

              <li className={classes.footerSocialItem}>
                <a href="/" className={classes.footerSocialLink} aria-label="Instagram">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13.55"
                    height="13.55"
                    viewBox="0 0 13.55 13.55"
                    fill="currentColor">
                    <path d="M6.77 1.22c1.81 0 2.02 0 2.74 0.04.43 0 .86.08 1.26.23a2.24 2.24 0 0 1 1.29 1.29c.15.4.23.83.23 1.26.03.72.04.93.04 2.74s-.01 2.02-.04 2.74c0 .43-.08.86-.23 1.26a2.24 2.24 0 0 1-1.29 1.29 3.8 3.8 0 0 1-1.26.23c-.72.03-.93.04-2.74.04s-2.02-.01-2.74-.04a3.8 3.8 0 0 1-1.26-.23 2.24 2.24 0 0 1-1.29-1.29 3.8 3.8 0 0 1-.23-1.26c-.03-.72-.04-.93-.04-2.74 0-1.81 0-2.02.04-2.74 0-.43.08-.86.23-1.26a2.24 2.24 0 0 1 1.29-1.29 3.8 3.8 0 0 1 1.26-.23c.72-.03.93-.04 2.74-.04zM6.77 3.3a3.48 3.48 0 1 0 0 6.96 3.48 3.48 0 0 0 0-6.96zm0 5.74a2.26 2.26 0 1 1 0-4.52 2.26 2.26 0 0 1 0 4.52zm3.62-5.06a.81.81 0 1 0 0-1.62.81.81 0 0 0 0 1.62" />
                  </svg>
                </a>
              </li>

              <li className={classes.footerSocialItem}>
                <a href="/" className={classes.footerSocialLink} aria-label="GitHub">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 12.96 12.645"
                    fill="none">
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M6.48 0A6.464 6.464 0 0 0 0 6.48c0 2.862 1.863 5.292 4.428 6.156.324.054.432-.135.432-.324v-1.107c-1.81.405-2.187-.864-2.187-.864-.297-.756-.729-.945-.729-.945-.594-.405.054-.405.054-.405.648.054.999.675.999.675.567.999 1.512.702 1.89.54.054-.432.216-.702.405-.864-1.431-.162-2.943-.73-2.943-3.213 0-.702.243-1.296.675-1.728-.054-.162-.297-.81.054-1.728 0 0 .54-.162 1.782.675a6.5 6.5 0 0 1 1.62-.216c.54 0 1.107.081 1.62.216 1.242-.837 1.782-.675 1.782-.675.35.89.135 1.539.054 1.728.405.459.675 1.026.675 1.728 0 2.484-1.512 3.024-2.97 3.186.243.189.432.594.432 1.188v1.782c0 .162.108.378.459.324a6.45 6.45 0 0 0 4.428-6.13A6.464 6.464 0 0 0 6.48 0"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div
            className={classes.footerColumnWrap}
            style={{
              gridTemplateColumns: isSmallDevice ? 'repeat(2, auto)' : 'repeat(4, auto)',
              justifyContent: isSmallDevice ? 'space-around' : undefined,
            }}>
            <div className={classes.footerColumn}>
              <span className={classes.footerTitle}>Company</span>
              <ul className={classes.footerList}>
                <li className={classes.footerItem}>
                  <a href="/" className={classes.footerLink}>
                    About
                  </a>
                </li>
                <li className={classes.footerItem}>
                  <a href="/" className={classes.footerLink}>
                    Features
                  </a>
                </li>
                <li className={classes.footerItem}>
                  <a href="/" className={classes.footerLink}>
                    Works
                  </a>
                </li>
                <li className={classes.footerItem}>
                  <a href="/" className={classes.footerLink}>
                    Career
                  </a>
                </li>
              </ul>
            </div>

            <div className={classes.footerColumn}>
              <span className={classes.footerTitle}>Help</span>
              <ul className={classes.footerList}>
                <li className={classes.footerItem}>
                  <a href="/" className={classes.footerLink}>
                    Customer Support
                  </a>
                </li>
                <li className={classes.footerItem}>
                  <a href="/" className={classes.footerLink}>
                    Delivery Details
                  </a>
                </li>
                <li className={classes.footerItem}>
                  <a href="/" className={classes.footerLink}>
                    Terms & Conditions
                  </a>
                </li>
                <li className={classes.footerItem}>
                  <a href="/" className={classes.footerLink}>
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div className={classes.footerColumn}>
              <span className={classes.footerTitle}>FAQ</span>
              <ul className={classes.footerList}>
                <li className={classes.footerItem}>
                  <a href="/" className={classes.footerLink}>
                    Account
                  </a>
                </li>
                <li className={classes.footerItem}>
                  <a href="/" className={classes.footerLink}>
                    Manage Deliveries
                  </a>
                </li>
                <li className={classes.footerItem}>
                  <a href="/" className={classes.footerLink}>
                    Orders
                  </a>
                </li>
                <li className={classes.footerItem}>
                  <a href="/" className={classes.footerLink}>
                    Payments
                  </a>
                </li>
              </ul>
            </div>

            <div className={classes.footerColumn}>
              <span className={classes.footerTitle}>Resources</span>
              <ul className={classes.footerList}>
                <li className={classes.footerItem}>
                  <a href="/" className={classes.footerLink}>
                    Free eBooks
                  </a>
                </li>
                <li className={classes.footerItem}>
                  <a href="/" className={classes.footerLink}>
                    Development Tutorial
                  </a>
                </li>
                <li className={classes.footerItem}>
                  <a href="/" className={classes.footerLink}>
                    How to - Blog
                  </a>
                </li>
                <li className={classes.footerItem}>
                  <a href="/" className={classes.footerLink}>
                    Youtube Playlist
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={classes.footerLine} />

        <div
          className={classes.footerBottom}
          style={{
            flexDirection: isMediumDevice ? 'column' : undefined,
            gap: isMediumDevice ? '15px' : undefined,
            paddingBottom: isMediumDevice ? '40px' : undefined,
          }}>
          <p className={classes.footerCopy}>XShop © 1998–2026, All Rights Reserved</p>

          <a
            className={classes.footerAutorLink}
            href="https://github.com/OlegGania"
            aria-label="GitHub — Oleg Gania"
            target="_blank"
            rel="noopener noreferrer">
            <span className={classes.footerAutorspan}>Developed by</span>
            <span className={classes.footerAutorName}>Oleg Gania</span>
          </a>

          <ul className={classes.footerPaymentList}>
            <li className={`${classes.footerPaymentItem} ${classes.footerPaymentItemVisa}`} />
            <li className={`${classes.footerPaymentItem} ${classes.footerPaymentItemMasterCard}`} />
            <li className={`${classes.footerPaymentItem} ${classes.footerPaymentItemPayPal}`} />
            <li className={`${classes.footerPaymentItem} ${classes.footerPaymentItemApplePay}`} />
            <li className={`${classes.footerPaymentItem} ${classes.footerPaymentItemGooglePay}`} />
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Footer;
