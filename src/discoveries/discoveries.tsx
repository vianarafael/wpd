import { useState, ReactElement, useContext } from 'react';
import s from './Discoveries.module.scss';
import logo from '../assets/images/logo-black.png';
import { useTranslation } from 'react-i18next';
import graph from '../assets/images/discoveries/Graph.png';
import ifscc from '../assets/images/discoveries/ifscc.png';
import dermLogo from '../assets/images/discoveries/dermLogo.png';
import addLogo from '../assets/images/discoveries/addLogo.png';
import pentagon from '../assets/images/discoveries/pentagon.png';
import one from '../assets/images/discoveries/390/Discoveries1.png';
import two from '../assets/images/discoveries/390/Discoveries2.png';
import three from '../assets/images/discoveries/390/Discoveries3.png';
import four from '../assets/images/discoveries/390/Discoveries4.png';
import five from '../assets/images/discoveries/390/Discoveries5.png';
import six from '../assets/images/discoveries/390/Discoveries6.png';
import seven from '../assets/images/discoveries/390/Discoveries7.png';
import eight from '../assets/images/discoveries/390/Discoveries8.png';
import nine from '../assets/images/discoveries/390/Discoveries9.png';
import { MainContext } from 'App';
import Progress from '../components/Progress';
import { useNavigate } from 'react-router-dom';

export default function Discoveries() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { hasSeenMilestones: hasSeen, setHasSeenMilestones: setHasSeen } =
    useContext(MainContext);
  const { t } = useTranslation('', { keyPrefix: 'discoveries' });

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

  const src = [one, two, three, four, five, six, seven, eight, nine, nine];
  const years = [
    t('0.year'),
    t('1.year'),
    t('2.year'),
    t('3.year'),
    t('4.year'),
    t('5.year'),
    t('6.year'),
    t('7.year'),
    t('8.year'),
  ];

  return (
    <div className={s.body}>
      {src.map((item, index) => (
        <img
          key={index}
          className={`${s.bgImg} ${activeIndex === index ? '' : s.hidden}`}
          src={item}
        />
      ))}
      <Header />
      <div className={s.carousel}>
        <div
          className={s.inner}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          <Pages />
        </div>
      </div>
      <Progress years={years} activeIndex={activeIndex} />
    </div>
  );
}

function Header() {
  const returnToFront = () => {
    console.log('back');
  };
  return (
    <div className={s.header}>
      <div className={s.backContainer} onClick={returnToFront}>
        <div className={s.backTop}></div>
        <div className={s.backBottom}></div>
      </div>
      <div className={s.logoBox}>
        <img src={logo} className={s.logo}></img>
        <h2>&nbsp;{'DISCOVERIES'}</h2>
      </div>
    </div>
  );
}

function Pages() {
  const { hasSeenMilestones: hasSeen } = useContext(MainContext);
  const { t } = useTranslation('', { keyPrefix: 'discoveries' });
  const navigate = useNavigate();
  return (
    <>
      <Page>
        <div className={s.pageContainer}>
          <h1>{t('0.title')}</h1>
          <h2>{t('0.subtitle')}</h2>
        </div>
      </Page>
      <Page>
        <div className={s.pageContainer}>
          <h1>{t('1.title')}</h1>
          <h2>{t('1.subtitle')}</h2>
        </div>
      </Page>
      <Page>
        <div className={s.pageContainer}>
          <div className={s.graph}>
            <img src={graph}></img>
          </div>
          <h1>{t('2.title')}</h1>
          <h2>{t('2.subtitle')}</h2>
          <div className={s.ifsccLogo}>
            <img src={ifscc}></img>
          </div>
        </div>
      </Page>
      <Page>
        <div className={s.pageContainer}>
          <h1>{t('3.title')}</h1>
          <h2>{t('3.subtitle')}</h2>
          <img className={s.dermLogo} src={dermLogo} />
        </div>
      </Page>
      <Page>
        <div className={s.pageContainer}>
          <h1>{t('4.title')}</h1>
          <h2>{t('4.subtitle')}</h2>
          <h1>{t('4.title2')}</h1>
          <h2>{t('4.subtitle2')}</h2>
          <img src={addLogo} className={s.addLogo} />
        </div>
      </Page>
      <Page>
        <div className={s.pageContainer}>
          <div className={s.pentagonContainer}>
            <img className={s.pentagon} src={pentagon} />
          </div>
          <h1>{t('5.title')}</h1>
          <h2>{t('5.subtitle')}</h2>
        </div>
      </Page>
      <Page>
        <div className={s.pageContainer}>
          <h1>{t('6.title')}</h1>
          <h2>{t('6.subtitle')}</h2>
          <p>{t('6.footnote')}</p>
        </div>
      </Page>
      <Page>
        <div className={s.pageContainer}>
          <h1>{t('7.title')}</h1>
          <h2>{t('7.subtitle')}</h2>
        </div>
      </Page>
      <Page>
        <div className={s.pageContainer}>
          <h1>{t('8.title')}</h1>
          <h2>{t('8.subtitle')}</h2>
          {hasSeen.innovations && (
            <button onClick={() => navigate('/milestones')}>END</button>
          )}
        </div>
      </Page>
      {!hasSeen.innovations && (
        <Page>
          <div className={`${s.pageContainer} ${s.lastPage}`}>
            <h3>{t('9.header')}</h3>
            <h1>{t('9.title')}</h1>
            <h2>{t('9.subtitle')}</h2>
            <div className={s.next} onClick={() => navigate('/innovation')}>
              <div className={s.arrow}></div>
            </div>
            <div
              className={s.buttonContainer}
              onClick={() => navigate('/milestones')}
            >
              <div className={s.button}>END</div>
            </div>
          </div>
        </Page>
      )}
    </>
  );
}
function Page({ children }: { children: ReactElement }) {
  return <div className={`${s.page}`}>{children}</div>;
}
