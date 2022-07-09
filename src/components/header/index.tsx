import React, { ReactNode, MouseEvent, useState } from 'react';

import LanguageSelect from 'components/LanguageSelect';

import { ReactComponent as IconLogo } from 'assets/images/icLogo.svg';
import IconBack from 'assets/images/icBack.png';
import { ReactComponent as IcUnMuted } from 'assets/images/icSound.svg';
import  icMuted from 'assets/images/icMuted.png'; 
import styles from './Header.module.scss';

interface Props {
  isHiddenBtnBack?: boolean;
  isHiddenLogo?: boolean;
  isHiddenLanguageSelect?: boolean;
  isSound?: boolean;
  logo?: ReactNode;
  onMuted?: () => void;
  onUnMuted?: () => void;
  onBack?: () => void;
}

const Header: React.FC<Props> = ({
  isHiddenBtnBack = false,
  isHiddenLanguageSelect = false,
  isHiddenLogo = false,
  isSound = false,
  logo = <IconLogo />,
  onMuted = () => {},
  onUnMuted = () => [],
  onBack = () => {},
}: Props) => {

  const [isMuted, setIsMuted] = useState<boolean>()
  const handleClickBack = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onBack();
  };

  const handleClickToggleSound = () => {
    if (isMuted) {
      console.log('un muted');
      onUnMuted();
      setIsMuted(false);
    } else {
      onMuted();
      console.log('muted');
      setIsMuted(true);
    }
  }

  return (
    <header className={styles.container}>
      {!isHiddenBtnBack && (
        <button className={styles['back-button']} onClick={handleClickBack}>
          <img src={IconBack} />
        </button>
      )}
      {!isHiddenLogo && <div className={styles.logo}>{logo}</div>}
      {isSound && (
        <div
          className={styles['sound-container']}
          onClick={handleClickToggleSound}
        >
          {isMuted? <img src={icMuted}/> : <IcUnMuted/>}
        </div>
      )}
      {!isHiddenLanguageSelect && <LanguageSelect />}
    </header>
  );
};

export default Header;
