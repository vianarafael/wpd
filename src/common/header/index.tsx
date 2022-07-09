import icBack from 'assets/images/icBack.svg';
import icLogo from 'assets/images/icLogo.svg';
import styles from './header.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

function Header({ className }: Props) {
  return (
    <div className={`${styles.header} ${className}`}>
      <img className={styles.leftBtn} src={icBack} />
      <img className={styles.logo} src={icLogo} />
      <button className={styles.rightBtn}>EN</button>
    </div>
  );
}

export default Header;
