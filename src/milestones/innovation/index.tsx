import Progress from 'components/Progress';
import { useTranslation } from 'react-i18next';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './innovation.scss';

import { useState, useContext, ReactElement } from 'react';
import { MainContext } from 'App';

import P1 from 'assets/images/innovations-img/1.png';
import P2 from 'assets/images/innovations-img/2.png';
import P3 from 'assets/images/innovations-img/3.png';
import P4 from 'assets/images/innovations-img/4.png';
import P5 from 'assets/images/innovations-img/5.png';
import P6 from 'assets/images/innovations-img/6.png';
import P7 from 'assets/images/innovations-img/7.png';
import P8 from 'assets/images/innovations-img/8.png';
import PEmpty from 'assets/images/innovations-img/empty.png';

const products = [P1, P2, P3, P4, P5, P6, P7, P8];

const Innovation = () => {
  const { t } = useTranslation('', { keyPrefix: 'innovation' });
  const years = [
    t('0.year'),
    t('1.year'),
    t('2.year'),
    t('3.year'),
    t('4.year'),
    t('5.year'),
    t('6.year'),
    t('7.year'),
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const { hasSeenMilestones: hasSeen, setHasSeenMilestones: setHasSeen } =
    useContext(MainContext);

  const numOfPages = hasSeen.innovations ? 8 : 9;

  let touchStart: number;
  let touchEnd: number;
  const minSwipeDistance = 50;
  const onTouchStart = (e: any) => {
    touchEnd = 0;
    touchStart = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: any) => {
    touchEnd = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      if (activeIndex === numOfPages) {
        setHasSeen({ discoveries: true, innovations: hasSeen.innovations });
        return;
      }
      setActiveIndex(activeIndex + 1);
    }

    if (isRightSwipe) {
      if (activeIndex === 0) return;
      setActiveIndex(activeIndex - 1);
    }
  };
  return (
    <div
      className="wrapper"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    >
      <img src={'https://i.postimg.cc/GmhB4bV1/Foreground.png'} />
      <div className="main-image">
        <img src={PEmpty} />
        <AliceCarousel
          disableDotsControls
          // mouseTracking
          disableButtonsControls
          items={products.map((p, index) => (
            <img src={p} key={index} />
          ))}
          touchMoveDefaultEvents={false}
        />
        <Pages />
      </div>
      <Progress years={years} activeIndex={activeIndex} />
    </div>
  );
};

function Pages() {
  const { t } = useTranslation('', { keyPrefix: 'innovation' });
  return (
    <>
      <Page>
        <div className="page-container">
          <h1>{t('0.title')}</h1>
          <h2>{t('0.subtitle')}</h2>
          <p>{t('0.footnote')}</p>
        </div>
      </Page>
      <Page>
        <div>
          <h1>{t('1.title')}</h1>
          <h2>{t('1.subtitle')}</h2>
        </div>
      </Page>
      <Page>
        <div>
          <h1>{t('2.title')}</h1>
          <h2>{t('2.subtitle')}</h2>
        </div>
      </Page>
      <Page>
        <div>
          <h1>{t('3.title')}</h1>
          <h2>{t('3.subtitle')}</h2>
        </div>
      </Page>
      <Page>
        <div>
          <h1>{t('4.title')}</h1>
          <h2>{t('4.subtitle')}</h2>
        </div>
      </Page>
      <Page>
        <div>
          <h1>{t('5.title')}</h1>
          <h2>{t('5.subtitle')}</h2>
        </div>
      </Page>
      <Page>
        <div>
          <h1>{t('6.title')}</h1>
          <h2>{t('6.subtitle')}</h2>
        </div>
      </Page>
      <Page>
        <div>
          <h1>{t('7title')}</h1>
          <h2>{t('7.subtitle')}</h2>
        </div>
      </Page>
    </>
  );
}
function Page({ children }: { children: ReactElement }) {
  return <div className="page">{children}</div>;
}

export default Innovation;
