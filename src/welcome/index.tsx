import React, { useEffect, useRef, useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import Header from 'components/header';
import AnimatedHOC from 'components/AnimatedHOC';

import { liveStreamTime, liveStreamStatuses } from './constants';
import { ReactComponent as IcPointingHandWhite } from 'assets/images/icPointingHandWhite.svg';
import FoutainLoop from 'assets/videos/Fountain_loop.mp4';
import FoutainToExpose from 'assets/videos/Fountain_Science_Expose.mp4'
import styles from './WelcomePage.module.scss';

const WelcomePage = () => {
  const BackgroundRef = useRef<HTMLVideoElement | null>(null);
  const GotoScienceExposeVideoRef = useRef<HTMLVideoElement | null>(null);
  const [ liveStreamStatus, setLiveStreamStatus ] = useState<string>(liveStreamStatuses.BEFORE_LIVESTREAM_DAY);
  const [ isGoingToScienceExpose, setIsGoingToScienceExpose ] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (moment().isBefore(liveStreamTime.LIVESTREAM_DAY_IS_STARTED)) 
        setLiveStreamStatus(liveStreamStatuses.BEFORE_LIVESTREAM_DAY);
      
      if (
        moment().isAfter(liveStreamTime.LIVESTREAM_DAY_IS_STARTED)
        && moment().isBefore(liveStreamTime.LIVESTREAM_IS_STARTED)
      )
        setLiveStreamStatus(liveStreamStatuses.BEFORE_LIVESTREAM_TIME_BUT_IN_LIVESTREAM_DAY);
      
      if (
        moment().isAfter(liveStreamTime.LIVESTREAM_IS_STARTED)
        && moment().isBefore(liveStreamTime.LIVESTREAM_IS_ENDED)
      )
        setLiveStreamStatus(liveStreamStatuses.IN_LIVESTREAM_TIME);
      
      if (moment().isAfter(liveStreamTime.LIVESTREAM_IS_ENDED))
        setLiveStreamStatus(liveStreamStatuses.AFTER_LIVESTREAM_TIME);
    }, 1000);
    return () => clearInterval(interval) 
  },[])

  const handleClickOnFingerButton = (event: MouseEvent<HTMLButtonElement>):void => {
    event.preventDefault();
    setIsGoingToScienceExpose(true);
    GotoScienceExposeVideoRef?.current?.play();
    BackgroundRef?.current?.pause();
  }
  const handleEndGoToScienceExpose = ():void => {
    goToScienceExposePage();
  }

  const goToLiveStreamPage = ():void => {
    navigate('/livestream');
  }
  const goToScienceExposePage = ():void => {
    navigate('/science-expose')
  }

  return (
    <AnimatedHOC>
      <section className={styles.container}>
        {!isGoingToScienceExpose && 
            <>
              <Header isHiddenBtnBack isSound />
              <button className={styles.fingerButton} onClick={handleClickOnFingerButton }>
                <IcPointingHandWhite />
              </button>
              <div className={styles.overlay}>
                <p className={styles.introText}>{t('welcome.description')}</p>
                {/* {liveStreamStatus === liveStreamStatuses.BEFORE_LIVESTREAM_TIME_BUT_IN_LIVESTREAM_DAY
                  && 
                  <button 
                    className={styles.beforeLivestreamButton}
                    onClick={goToLiveStreamPage}
                  >
                    {t('welcome.joinLiveStreamButtonText')}
                  </button>
                }
                {liveStreamStatus === liveStreamStatuses.IN_LIVESTREAM_TIME
                  && 
                  <button 
                    className={styles.inLivestreamButton}
                    onClick={goToLiveStreamPage}
                  >
                    <span/>
                    {t('welcome.joinLiveStreamButtonText')}
                  </button>
                }
                {liveStreamStatus === liveStreamStatuses.AFTER_LIVESTREAM_TIME
                  && 
                  <button 
                    className={styles.afterLivestreamButton}
                    onClick={goToLiveStreamPage}
                  >
                    {t('welcome.replayLiveStreamButtonText')}
                  </button>
                } */}
              </div>
            </>
        }
        <video
          loop
          autoPlay
          muted
          controls={false}
          playsInline={true} 
          className={!isGoingToScienceExpose? styles.background : styles.backgroundHidden} 
          ref={BackgroundRef}
        >
          <source src={FoutainLoop} type="video/mp4"/> 
        </video>
        <video
          controls={false}
          muted={true}
          playsInline={true} 
          className={isGoingToScienceExpose? styles.background : styles.backgroundHidden} 
          ref={GotoScienceExposeVideoRef}
          onEnded={handleEndGoToScienceExpose}
        >
          <source src={FoutainToExpose} type="video/mp4"/>
        </video>
      </section>
    </AnimatedHOC>
  );
}


export default WelcomePage;
