import React from 'react';
import styles from './text-play.module.scss';
import icPlay from '../../assets/images/icPlay.svg';
import icLogo from '../../assets/images/logoPitera.svg';

interface Props{
    content: string;
}

const TextPlay = ({ content }: Props) => {
  return(
    <div className={styles.wrapper_text_play}>
      <img src={icLogo} alt="play-icon" className={styles.imgLogo}/>
      <span className={styles.txtContent}>{content}</span>
      <img src={icPlay} alt="play-icon" className={styles.imgPlay}/>
    </div>
  )
};

export default TextPlay;