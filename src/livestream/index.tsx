import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import YouTube from 'react-youtube';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import Header from 'components/header';
import AnimatedHOC from 'components/AnimatedHOC';

import {
  videoId,
  items,
  liveStreamTime,
  liveStreamStatuses,
  youTubeOpt,
} from './constants';
import { ReactComponent as IcArrowRightBlack } from 'assets/images/icArrowRightBlack.svg';
import icRoom7 from '../assets/images/Room 7.png';
import liveStreamImg from 'assets/images/livestream_img.png';
import styles from './Livestream.module.scss';

export default function LiveStreamPage() {
  const { t } = useTranslation();
  const [liveStreamStatus, setLiveStreamStatus] = useState<string>(
    liveStreamStatuses.BEFORE_LIVESTREAM_TIME
  );
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (moment().isAfter(liveStreamTime.LIVESTREAM_IS_STARTED))
        setLiveStreamStatus(liveStreamStatuses.IN_AND_AFTER_LIVESTREAM_TIME);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const goToPreviousPage = (): void => {
    navigate(-1);
  };
  const goToWelcomePage = (): void => {
    navigate('/welcome');
  };

  return (
    <AnimatedHOC>
      <div className={styles.container}>
        <Header onBack={goToPreviousPage} isSound/>
        <main className={styles.content}>
          <div className={styles.introduction}>
            <div className={styles.title}>{t('livestream.title')}</div>
            <div className={styles.desc}>{t('livestream.desc')}</div>
          </div>
          {liveStreamStatus === liveStreamStatuses.BEFORE_LIVESTREAM_TIME && (
            <img
              className={styles.overlayImage}
              src={liveStreamImg}
            />
          )}
          {liveStreamStatus ===
              liveStreamStatuses.IN_AND_AFTER_LIVESTREAM_TIME && (
            <YouTube
              className={styles.video}
              videoId={videoId}
              opts={youTubeOpt}
            />
          )}
          <ul className={styles.items}>
            {items.map((e, i) => {
              return (
                <li className={styles.item} key={i}>
                  {e.isLive && (
                    <span className={styles.itemBadge}>
                      {t('livestream.LIVE')}
                    </span>
                  )}
                  <div className={styles.itemTitle}>{t(e.title)}</div>
                  <div className={styles.itemTime}>{t(e.time)}</div>
                </li>
              );
            })}
          </ul>
        </main>
        <footer className={styles.footer}>
          <button className={styles.mainButton} onClick={goToWelcomePage}>
            <img src={icRoom7}></img>
            {t('livestream.cta')}
            <IcArrowRightBlack />
          </button>
        </footer>
      </div>
    </AnimatedHOC>
  );
}
