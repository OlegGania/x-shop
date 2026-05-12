import classes from './StyleBrowse.module.scss';
import Title from '@/shared/ui/Title/Title';
import { fontSize, fontWeight, lineHeight } from '@/styles/fonts';
import casual from '@/assets/images/content/casual.png';
import formal from '@/assets/images/content/formal.png';
import party from '@/assets/images/content/party.png';
import gym from '@/assets/images/content/gym.png';
import useMedia from '@/shared/hooks/useMediaQuery';

const StyleBrowse = () => {
  const { isMediumDevice } = useMedia();
  return (
    <section className="section">
      <div className="container">
        <div
          className={classes.styleBrowse}
          style={{ padding: isMediumDevice ? '32px 20px' : '76px 64px' }}>
          <Title
            level={2}
            text="BROWSE BY dress STYLE"
            size={isMediumDevice ? '35px' : fontSize.h2}
            weight={fontWeight.bold}
            lineHeight={lineHeight.h2}
            style={{
              fontFamily: 'Integral CF, sans-serif',
              marginBottom: isMediumDevice ? '40px' : '60px',
              textAlign: 'center',
            }}
          />
          <ul
            className={classes.styleBrowseList}
            style={{
              gridTemplateColumns: isMediumDevice ? ' 1fr' : 'repeat(auto-fit, minmax(250px, 1fr)',
            }}>
            <li
              className={classes.styleBrowseItem}
              style={{ gridColumn: isMediumDevice ? 'span 2' : '' }}>
              <img
                className={classes.styleBrowseImg}
                src={casual}
                width={407}
                height={289}
                loading="lazy"
                alt="Casual"
              />
              <p className={classes.styleBrowseText}>Casual</p>
            </li>
            <li className={`${classes.styleBrowseItem} ${classes.styleBrowseItemBig}`}>
              <img
                className={classes.styleBrowseImg}
                src={formal}
                width={684}
                height={289}
                loading="lazy"
                alt="Formal"
              />
              <p className={classes.styleBrowseText}>Formal</p>
            </li>
            <li className={`${classes.styleBrowseItem} ${classes.styleBrowseItemBig}`}>
              <img
                className={classes.styleBrowseImg}
                src={party}
                width={689}
                height={289}
                loading="lazy"
                alt="Party"
              />
              <p className={classes.styleBrowseText}>Party</p>
            </li>
            <li className={classes.styleBrowseItem}>
              <img
                className={classes.styleBrowseImg}
                src={gym}
                width={407}
                height={289}
                loading="lazy"
                alt="Gym"
              />
              <p className={classes.styleBrowseText}>Gym</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default StyleBrowse;
