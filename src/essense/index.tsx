import React, { useContext } from 'react';
import essence1 from '../assets/images/product-images/FTE/product.png';
import essence2 from '../assets/images/product-images/FTE/skin.png';
import tearDrop from '../assets/images/product-images/FTE/drop.png';
import woman1 from '../assets/images/product-images/FTE/woman1.png';
import woman3 from '../assets/images/product-images/FTE/woman2.png';
import woman4 from '../assets/images/product-images/FTE/woman3.png';
import logo from '../assets/images/logo-black.png';
import Carousel from '../Carousel/Carousel';
import s from './EssencePDP.module.scss';
import { useTranslation } from 'react-i18next';
import { isInChina } from '../utils';
import { useNavigate } from 'react-router-dom';
import { MainContext } from 'App';

export default function EssensePDP() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { hasSeenEssentials, setHasSeenEssentials } = useContext(MainContext);

  const isChinese =
    i18n.language === 'zh-CN' ||
    i18n.language === 'zhCN' ||
    i18n.language === 'zh-TW' ||
    i18n.language === 'zhTW';

  const carouselItems = [
    {
      header: t('essence.carousel1.header'),
      text: t('essence.carousel1.text'),
      footnote: t('essence.carousel1.footnote'),
      img: woman1,
    },
    {
      header: t('essence.carousel2.header'),
      text: t(`essence.carousel2.${isInChina ? 'altText' : 'text'}`),
      footnote: t('essence.carousel2.footnote'),
      img: woman3,
    },
    {
      header: t('essence.carousel3.header') + (isInChina ? ' AND REPAIR' : ''),
      text: t(`essence.carousel3.${isInChina ? 'altText' : 'text'}`),
      footnote: t('essence.carousel3.footnote'),
      img: woman4,
    },
  ];
  const fonts = (lang: string) => {
    if (lang === 'zh-TW' || lang === 'zhTW') return 'Noto Sans CJK SC';
    if (lang === 'zh-CN' || lang === 'zhCN') return 'Noto Sans CJK TC';
    return 'Trenda';
  };

  const font = fonts(i18n.language);

  const next = () => {
    setHasSeenEssentials({ ...hasSeenEssentials, FTE: true, lastSeen: 'FTE' });
    navigate('/pitera-essentials');
  };

  return (
    <div className={s.body} style={{ fontFamily: font }}>
      <Page1>
        <img src={essence1} className={`${s.img} ${s.img1}`}></img>
      </Page1>
      <Page2>
        <div className={s.img2Container}>
          <img src={essence2} className={`${s.img} ${s.img2}`}></img>
        </div>
      </Page2>
      <Page3>
        <img src={tearDrop} className={`${s.img} ${s.img3}`}></img>
      </Page3>
      <div
        className={`${s.container} ${s.container4}`}
        style={{ backgroundColor: '#FAF5F0' }}
      >
        <div className={`${s.carouselText} ${isChinese ? s.chinese : ''}`}>
          <h2>{t('essence.04.header')}</h2>
          <h1>{t('essence.04.title')}</h1>
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
    <div
      className={s.container}
      style={{ scrollSnapAlign: 'end', height: '100vh' }}
    >
      <div className={`${s.textContainer} ${s.textContainer1}`}>
        <h2
          className={s.header}
          style={{ fontSize: isChinese ? '16px' : '17px' }}
        >
          <div className={s.backContainer} onClick={returnToFront}>
            <div className={s.backTop}></div>
            <div className={s.backBottom}></div>
          </div>
          <img src={logo} className={s.logo}></img>&nbsp;{t('essence.01.logo')}
        </h2>
        <h1 className={`${s.name} ${isChinese ? s.chinese : ''}`}>
          {t('essence.01.name')}
        </h1>
        <h3 className={`${s.tagLine} ${isChinese ? s.chinese : ''}`}>
          {t('essence.01.tagLine')}
        </h3>
        <p className={`${s.hook} ${isChinese ? s.chinese : ''}`}>
          {t('essence.01.hook')}
        </p>
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
    <div className={s.container}>
      <div
        className={`${s.textContainer} ${s.textContainer2} ${
          isChinese ? s.chinese : ''
        }`}
      >
        <h2>
          <>{t('essence.02.title')}</>
        </h2>
        <h3>
          <>{t('essence.02.desc')}</>
        </h3>
      </div>
      {children}
    </div>
  );
};

const Page3 = ({ children }: { children: React.ReactElement }) => {
  const { t, i18n } = useTranslation();
  const isChinese =
    i18n.language === 'zh-CN' ||
    i18n.language === 'zhCN' ||
    i18n.language === 'zh-TW' ||
    i18n.language === 'zhTW';
  return (
    <div className={s.container}>
      <div
        className={`${s.textContainer3} ${s.textContainer} ${
          isChinese ? s.chinese : ''
        }`}
      >
        <h2>
          <>{t('essence.03.title')}</>
        </h2>
        <h1>
          <>{t('essence.03.name')}</>
        </h1>
        <h3>
          <>{t('essence.03.desc')}</>
        </h3>
        <p>
          <>{t('essence.03.footnote1')}</>
          <br />
          <>{t('essence.03.footnote2')}</>
        </p>
      </div>
      {children}
    </div>
  );
};
