import { ReactElement, useContext, useState } from 'react';
import genoptics1 from '../assets/images/product-images/GAE/genoptics1.png';
import genoptics2 from '../assets/images/product-images/GAE/lotion.png';
import genoptics3 from '../assets/images/product-images/GAE/genoptics3.png';
import genoptics4 from '../assets/images/product-images/GAE/genoptics4.png';
import tearDrop from '../assets/images/product-images/SPC/drop.png';
import woman1 from '../assets/images/product-images/GAE/woman1.png';
import woman2 from '../assets/images/product-images/GAE/woman2.png';
import woman3 from '../assets/images/product-images/GAE/woman3.png';
import logo from '../assets/images/logo-black.png';
import Carousel from '../Carousel/Carousel';
import s from './genoptics.module.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MainContext } from 'App';

export default function GenopticsPDP() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { hasSeenEssentials, setHasSeenEssentials } = useContext(MainContext);
  const carouselItems = [
    {
      header: t('genoptics.carousel1.header'),
      text: t('genoptics.carousel1.text'),
      footnote: t('genoptics.carousel1.footnote'),
      img: woman1,
    },
    {
      header: t('genoptics.carousel2.header'),
      text: t('genoptics.carousel2.text'),
      img: woman2,
    },
    {
      header: t('genoptics.carousel3.header'),
      text: t('genoptics.carousel3.text'),
      img: woman3,
    },
  ];
  const fonts = (lang: string) => {
    if (lang === 'zh-TW' || lang === 'zhTW') return 'Noto Sans CJK SC';
    if (lang === 'zh-CN' || lang === 'zhCN') return 'Noto Sans CJK TC';
    return 'Trenda';
  };

  const font = fonts(i18n.language);

  const isChinese =
    i18n.language === 'zh-CN' ||
    i18n.language === 'zhCN' ||
    i18n.language === 'zh-TW' ||
    i18n.language === 'zhTW';

  const next = () => {
    setHasSeenEssentials({ ...hasSeenEssentials, GAE: true, lastSeen: 'GAE' });
    navigate('/pitera-essentials');
  };

  return (
    <div className={s.body} style={{ fontFamily: font }}>
      <Page1>
        <img src={genoptics1} className={`${s.img} ${s.img1}`}></img>
      </Page1>
      <Page2>
        <div className={s.img2Container}>
          <img src={genoptics2} className={`${s.img} ${s.img2}`}></img>
        </div>
      </Page2>
      <Page3 />
      <div
        className={`${s.container} ${s.container4} ${
          isChinese ? s.chinese : ''
        }`}
        style={{ backgroundColor: '#FAF5F0' }}
      >
        <div className={`${s.carouselText} ${isChinese ? s.chinese : ''}`}>
          <h2>{t('genoptics.04.header')}</h2>
          <h1>{t('genoptics.04.title')}</h1>
        </div>
        <Carousel next={next} cards={carouselItems} />
      </div>
    </div>
  );
}

const Page1 = ({ children }: { children: React.ReactElement }) => {
  const returnToFront = () => {
    console.log('go back');
  };
  const { t, i18n } = useTranslation();
  const isChinese =
    i18n.language === 'zh-CN' ||
    i18n.language === 'zhCN' ||
    i18n.language === 'zh-TW' ||
    i18n.language === 'zhTW';
  return (
    <div className={`${s.container} ${s.container1}`}>
      <div
        className={`${s.textContainer} ${s.textContainer1} ${
          isChinese ? s.chinese : ''
        }`}
      >
        <h2>
          <div className={s.backContainer} onClick={returnToFront}>
            <div className={s.backTop}></div>
            <div className={s.backBottom}></div>
          </div>
          <img src={logo} className={s.logo}></img>&nbsp;
          {t('genoptics.01.logo')}
        </h2>
        <h1>{t('genoptics.01.name')}</h1>
        <h3 className={s.tagLine}>{t('genoptics.01.tagLine')}</h3>
        <p>{t('genoptics.01.hook')}</p>
      </div>
      {children}
    </div>
  );
};

const Page2 = ({ children }: { children: React.ReactElement }) => {
  const { t, i18n } = useTranslation();
  const isChinese =
    i18n.language === 'zh-CN' ||
    i18n.language === 'zhCN' ||
    i18n.language === 'zh-TW' ||
    i18n.language === 'zhTW';

  return (
    <div className={s.container2}>
      <div
        className={`${s.textContainer} ${s.textContainer2} ${
          isChinese ? s.chinese : ''
        }`}
      >
        <h2>
          <>{t('genoptics.02.title')}</>
        </h2>
        <h3>{t('genoptics.02.desc')}</h3>
        <p>{t('genoptics.02.footnote')}</p>
      </div>
      {children}
    </div>
  );
};

const Page3 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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
      if (activeIndex === 2) return;
      setActiveIndex(activeIndex + 1);
    }

    if (isRightSwipe) {
      if (activeIndex === 0) return;
      setActiveIndex(activeIndex - 1);
    }
  };
  const imgs = [genoptics3, tearDrop, genoptics4];
  const { t, i18n } = useTranslation();
  const isChinese =
    i18n.language === 'zh-CN' ||
    i18n.language === 'zhCN' ||
    i18n.language === 'zh-TW' ||
    i18n.language === 'zhTW';

  const isSimpChin = i18n.language === 'zh-TW' || i18n.language === 'zhTW';

  const isActive = (index: number) => (index === activeIndex ? s.active : '');
  return (
    <div className={s.carousel}>
      <div
        className={s.inner}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
        }}
      >
        {imgs.map((img, i) => (
          <Card img={img} key={i}>
            <div className={`${s.p3Container} ${isChinese ? s.chinese : ''}`}>
              <h2>
                <>{t(`genoptics.03.0${i + 1}.title`)}</>
              </h2>
              <h1>
                <>{t(`genoptics.03.0${i + 1}.name`)}</>
              </h1>
              <h3>
                <>{t(`genoptics.03.0${i + 1}.desc`)}</>
              </h3>
              <p className={isSimpChin ? s.simpChin : ''}>
                {t(`genoptics.03.0${i + 1}.finePrint`)}
              </p>
              <p className={`${s.footnote} ${isChinese ? s.chinese : ''}`}>
                {t(`genoptics.03.0${i + 1}.footnotes`)}
              </p>
            </div>
          </Card>
        ))}
      </div>
      <div className={s.indicatorContainer}>
        <div className={`${s.indicator} ${isActive(0)}`}></div>
        <div className={`${s.indicator} ${isActive(1)}`}></div>
        <div className={`${s.indicator} ${isActive(2)}`}></div>
      </div>
    </div>
  );
};

const Card = ({ img, children }: { img: string; children: ReactElement }) => {
  return (
    <>
      <div
        className={s.carouselItem}
        style={{ backgroundImage: `url(${img})` }}
      >
        {children}
      </div>
    </>
  );
};
