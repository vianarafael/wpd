import { useContext, ReactElement, useState } from 'react';
import cream1 from '../assets/images/product-images/SPC/Cream.png';
import cream2 from '../assets/images/product-images/SPC/Cream22.png';
import cream3 from '../assets/images/product-images/SPC/Cream3.png';
import tearDrop from '../assets/images/product-images/SPC/drop.png';
import whispy from '../assets/images/product-images/SPC/whispy.png';
import woman1 from '../assets/videos/skinpower1.mp4';
import woman2 from '../assets/videos/skinpower2.mp4';
import woman3 from '../assets/videos/skinpower3.mp4';
import logo from '../assets/images/logo-black.png';
import Carousel from '../Carousel/Carousel';
import s from './CreamPDP.module.scss';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';
import { MainContext } from 'App';

export default function CreamPDP() {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const { hasSeenEssentials, setHasSeenEssentials } = useContext(MainContext);

  const carouselItems = [
    {
      header: t('cream.carousel1.header'),
      text: t('cream.carousel1.text'),
      video: woman1,
    },
    {
      header: t('cream.carousel2.header'),
      text: t('cream.carousel2.text'),
      video: woman2,
    },
    {
      header: t('cream.carousel3.header'),
      text: t('cream.carousel3.text'),
      video: woman3,
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
    setHasSeenEssentials({ ...hasSeenEssentials, SPC: true, lastSeen: 'SPC' });
    navigate('/pitera-essentials');
  };

  return (
    <div className={s.body} style={{ fontFamily: font }}>
      <Page1>
        <img src={cream1} className={`${s.img} ${s.img1}`}></img>
      </Page1>
      <Page2>
        <div className={s.img2Container}>
          <img
            src={cream2}
            style={{ borderRadius: '12px' }}
            className={`${s.img} ${s.img2}`}
          ></img>
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
          <h2>{t('cream.04.header')}</h2>
          <h1>{t('cream.04.title')}</h1>
        </div>
        <Carousel next={next} cards={carouselItems} />
      </div>
    </div>
  );
}

const Page1 = ({ children }: { children: React.ReactElement }) => {
  const navigate = useNavigate();
  const returnToFront = () => navigate(-1);
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
          <img src={logo} className={s.logo}></img>&nbsp;{t('cream.01.logo')}
        </h2>
        <h1>{t('cream.01.name')}</h1>
        <h3>{t('cream.01.tagLine')}</h3>
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
          <>{t('cream.02.title')}</>
        </h2>
        <h3>{t('cream.02.01')}</h3>
        <h3>{t('cream.02.02')}</h3>
        <h3>{t('cream.02.03')}</h3>
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
  const imgs = [cream3, tearDrop, whispy];
  const { t, i18n } = useTranslation();
  const isChinese =
    i18n.language === 'zh-CN' ||
    i18n.language === 'zhCN' ||
    i18n.language === 'zh-TW' ||
    i18n.language === 'zhTW';

  const isActive = (index: number) => (index === activeIndex ? s.active : '');
  const isSimpChin = i18n.language === 'zh-TW' || i18n.language === 'zhTW';
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
                <>{t(`cream.03.0${i + 1}.title`)}</>
              </h2>
              <h1>
                <>{t(`cream.03.0${i + 1}.name`)}</>
              </h1>
              <h3>
                <>{t(`cream.03.0${i + 1}.desc`)}</>
              </h3>
              <p className={isSimpChin ? s.simpChin : ''}>
                {t(`cream.03.0${i + 1}.finePrint`)}
              </p>
              <p
                className={`${s.carouselFootnote} ${
                  isChinese ? s.chinese : ''
                }`}
              >
                {t(`cream.03.0${i + 1}.footnotes`)}
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
