import { useState } from 'react';
import './landingPage.scss';
import { useTranslation } from 'react-i18next';

import dropDesktop from '../assets/images/01July/drop-desktop.png';
import dropMobile from '../assets/images/01July/drop-mobile.png';
import logoSKII from '../assets/images/01July/logo.svg';
import logoWPD from '../assets/images/01July/WPD.svg';
import backgroundDesktop from '../assets/images/01July/background-desktop.jpg';
import backgroundMobile from '../assets/images/01July/background-mobile.jpg';

const Landing01JulyQR = () => {
  const { t, i18n } = useTranslation();
  const isMobile = window.innerWidth < 768;
  const containerClass = `${
    i18n.language === 'zhCN' || i18n.language === 'zh-CN' || i18n.language === 'zh' ? 'isChineseSC' : ''
  } ${
    i18n.language === 'zhTW' || i18n.language === 'zh-TW' || i18n.language === 'zhHK' || i18n.language === 'zh-HK' ? 'isChineseTC' : ''
  } landing-page-container`;

  return (
    <div
      className={containerClass}
      style={{
        backgroundImage: `url(${
          isMobile ? backgroundMobile : backgroundDesktop
        })`,
      }}
    >
      <div className="wrap-image-drop">
        <img className="desktop" src={dropDesktop} alt="drop" />
        <img className="mobile" src={dropMobile} alt="drop" />
      </div>
      <div className="content">
        <div className="content__logo">
          <img src={logoSKII} alt="Logo SK-II" />
          <img src={logoWPD} alt="Logo WPD" />
        </div>
        <div className="content__text">
          <p className="content__text-date">
            {t('landingPage.date.01')}
            <br />
            {/* {t('7:00PM JST')} */}
          </p>
          <p className="content__text-description">
            {t('landingPage.description.01')}
            <br />
            {t('landingPage.description.02')}
            <br />
            {t('landingPage.description.03')}
            <br />
            <br />
            {t('landingPage.description.04')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing01JulyQR;
