import { useState } from 'react';
import '../landingPage.scss';
import { useTranslation } from 'react-i18next';

import dropDesktop from '../../assets/images/01July/drop-desktop.png';
import dropMobile from '../../assets/images/01July/drop-mobile.png';
import logoSKII from '../../assets/images/01July/logo.svg';
import logoWPD from '../../assets/images/01July/WPD.svg';
import backgroundDesktop from '../../assets/images/01July/background-desktop.jpg';
import backgroundMobile from '../../assets/images/01July/background-mobile.jpg';
import qr from '../../assets/images/01July/qr.svg';

const Landing01JulyQR = () => {
  const { t, i18n } = useTranslation();
  const isMobile = window.innerWidth < 768;
  const containerClass = `${i18n.language === 'zhCN' ? 'isChineseSC' : ''} ${
    i18n.language === 'zhTW' ? 'isChineseTC' : ''
  } landing-page-container landing-page-13-july`;

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
            <span>{t('landingPageQR.date.01')}</span>
            <br />
            {t('landingPageQR.date.02')}
          </p>
          <p className="content__text-description">
            {t('landingPage.description.01')}
            <br />
            {t('landingPage.description.02')}
            <br />
            {t('landingPage.description.03')}
          </p>
          <img className="content__image-qr" src={qr} alt="drop" />
          <p className="content__text-qr">{t('landingPage.description.05')}</p>
        </div>
      </div>
    </div>
  );
};

export default Landing01JulyQR;
