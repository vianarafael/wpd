import React, { useRef, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AnimatedHOC from 'components/AnimatedHOC';
import Header from 'components/header'

import ClickDropAnimation from 'assets/videos/Flythrough.mp4'
import { ReactComponent as IcPointingHandBlack } from 'assets/images/icPointingHandBlack.svg';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const [isTextVisible, setIsTextVisisble] = useState<boolean>(true);
  const [isPlayButtonVisible, setIsPlayButtonVisible] = useState<boolean>(true);
  const { t, i18n } = useTranslation();
  const isEng = i18n.language === 'enUS' || i18n.language === 'home';
  const dropWaterAnimationRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  const handleOnClickDropWater = (event: MouseEvent<Element>) => {
    event.preventDefault();
    dropWaterAnimationRef?.current?.play();
    setIsTextVisisble(false);
    setIsPlayButtonVisible(false);
  }
  const handleVideoEnded = () => {
    goToWelcomeScreen();
  }
  const goToWelcomeScreen = () => {
    navigate('/welcome');
  }

  return (
    <AnimatedHOC>
      <section className={styles.container}>
        <Header
          isHiddenBtnBack
          isHiddenLogo={false}
          isSound
          isHiddenLanguageSelect={false}
        />
        {isTextVisible && 
            <div className={styles.overlay}>
              <IcPointingHandBlack onClick={handleOnClickDropWater}/>
              <p className={styles.instructionText} onClick={handleOnClickDropWater}>{t('home.instructionText')}</p>
              <div className={styles.links}>
                <a href='https://privacypolicy.pg.com/en/' target="_blank" rel="noreferrer">{t('home.privacyLinkText')}</a>
                <a href='https://termsandconditions.pg.com/en-us/' target="_blank" rel="noreferrer">{t('home.termsLinkText')}</a>
                {isEng && 
                  <> 
                    <a href='#' target="_blank" rel="noreferrer">{t('home.DoNotSellMyPersonalInformationLinkText')}</a>{' '}
                    <a href='https://privacypolicy.pg.com/en/#CCPA' target="_blank" rel="noreferrer">{t('home.CAPrivacyLinkText')}</a>
                  </>
                }
              </div>
            </div>
        }
        {isPlayButtonVisible && <button className={styles.button} onClick={handleOnClickDropWater}></button>}
        <video
          controls={false}
          muted={true}
          playsInline={true} 
          className={styles.background} 
          ref={dropWaterAnimationRef}
          onEnded={handleVideoEnded}
        >
          <source src={ClickDropAnimation+'#t=0.001'} type="video/mp4"/>
        </video>
      </section>
    </AnimatedHOC>
  );
}

export default HomePage;
