import AzureVideo from '../common/AzureVideo';

import drop from '../assets/images/drop.svg';
import logo from '../assets/images/skii-logo.svg';
import styles from './Landing.module.scss';

function LandingPage() {
  return (
    <section className={styles.container}>
      <div className={styles.overlay}>
        <img className={styles.logo} src={logo} alt="SK-II Logo" />
        <div className={styles.title}>
          World<br></br>
          &nbsp;&nbsp;PITERA<sup>TM</sup>
          <br></br>
          Day
        </div>
        <img className={styles.drop} src={drop} alt="Tap to begin" />
      </div>
      <div className={styles.background}>
        <AzureVideo
          src={[
            {
              src: 'http://amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest',
              type: 'application/vnd.ms-sstr+xml',
            },
          ]}
          options={{ controls: false }}
        />
      </div>
    </section>
  );
}

export default LandingPage;
