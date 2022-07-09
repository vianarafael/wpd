import icBack from 'assets/images/icBack.svg';
import icLogo from 'assets/images/logoScienceExpose.svg';

import styles from './header.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onBack?: any;
}

function Header({ onBack, className }: Props) {
  return (
    <div className={`${styles.header} ${className}`}>
      <img className={styles.back} src={icBack} onClick={onBack ?? undefined} />
      <img className={styles.logo} src={icLogo} />
    </div>
  );
}

export default Header;
