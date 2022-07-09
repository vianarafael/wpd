import React from 'react';
import styles from './text-bottom.module.scss';
import active1 from '../../assets/images/active1.svg';
import active2 from '../../assets/images/active2.svg';
import active3 from '../../assets/images/active3.svg';
import active4 from '../../assets/images/active4.svg';
import active5 from '../../assets/images/active5.svg';

interface Props{
    content: string;
    indexActive: number;
}

const TextButtonBottom = ({ content, indexActive }: Props) => {

  const getNameImage = () => {
    switch (indexActive){
    case 1:
      return active1;
    case 2:
      return active2;
    case 3:
      return active3;
    case 4:
      return active4;
    case 5:
      return active5;
    default:
      return active1
    }
  }

  const imgBottom = getNameImage();
  return(
    <div className={styles.wrapper_text_bottom}>
      <p className={`${styles.txtContent} ${indexActive === 2 && styles.txtWhite}`}>{content}</p>
      <img src={imgBottom} alt="play-icon" className={styles.imgPlay}/>
    </div>
  )
};

TextButtonBottom.defaultProps = {
  indexActive: 1
}

export default TextButtonBottom;