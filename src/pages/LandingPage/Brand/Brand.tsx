import useMedia from '@/shared/hooks/useMediaQuery';
import iconCalvinKlein from '@/assets/images/icon/iconCalvinKlein.svg';
import iconGucci from '@/assets/images/icon/iconGucci.svg';
import iconPrada from '@/assets/images/icon/iconPrada.svg';
import iconVersace from '@/assets/images/icon/iconVersace.svg';
import iconZara from '@/assets/images/icon/iconZara.svg';
import classes from './Brand.module.scss';

const Brand = () => {
  const { isMediumDevice, isLargeDevice } = useMedia();

  return (
    <section
      className={classes.section}
      id="brands"
      style={{ padding: isMediumDevice ? '34px' : '44px' }}>
      <div className="container">
        <ul
          className={classes.brandList}
          style={{
            justifyContent: isLargeDevice ? 'center' : 'space-between',
            gap: isMediumDevice ? '20px' : '35px',
          }}>
          <li className={classes.brandItem}>
            <img src={iconVersace} width="167" height="34" alt="Versace" />
          </li>
          <li className={classes.brandItem}>
            <img src={iconZara} width="92" height="34" alt="Zara" />
          </li>
          <li className={classes.brandItem}>
            <img src={iconGucci} width="157" height="36" alt="Gucci" />
          </li>
          <li className={classes.brandItem}>
            <img src={iconPrada} width="195" height="32" alt="Prada" />
          </li>
          <li className={classes.brandItem}>
            <img src={iconCalvinKlein} width="208" height="34" alt="Calvin Klein" />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Brand;
