import React, { useState, MouseEvent, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { languages } from './constants';
import styles from './Select.module.scss';

interface Language {
  key: string;
  name: string;
}

const LanguageSelect: React.FC = () => {
  const [currentLanguage, setCurrentlanguage] = useState<Language>(languages[0]);
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const [isSelectTouched, setIsSelectTouched] = useState<boolean>(false);
  const [languagesInDropDown, setLanguagesInDropDown] = useState<Language[]>(languages); 
  const { i18n } = useTranslation();
 
  useEffect(() => {
    if (isDropDownOpen) 
      setLanguagesInDropDown(
        languages.filter(
          language => language.key !== currentLanguage.key
        )
      )
  }, [isDropDownOpen, currentLanguage.key])

  useEffect(() => {
    const currentLanguage = languages.find((language) => language.key === i18n.language) || languages[0];
    setCurrentlanguage(currentLanguage);
  },[i18n.language])

  const handleOnClickSelect = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDropDownOpen(!isDropDownOpen);
    setIsSelectTouched(true)
  }

  const handleOnClickDropDownItem = (language: Language) => {
    setCurrentlanguage(language);
    setIsDropDownOpen(false);
    i18n.changeLanguage(language.key);
  }

  return (
    <div className={styles.select}>
      <div 
        className={`
          ${styles.language} 
          ${styles['current-language']}
        `}
        onClick={handleOnClickSelect}
      >
        {currentLanguage.name}
      </div>       
      <div className={`
        ${styles['drop-down']} 
        ${isDropDownOpen && styles['drop-down-open']}
        ${isSelectTouched && !isDropDownOpen && styles['drop-down-closed']}  
      `}>
        {languagesInDropDown?.map((language) => 
          <div 
            className={styles.language}
            key={language.key}
            onClick={() => handleOnClickDropDownItem(language)}
          >
            {language.name}
          </div>
        )}
      </div>
    </div>
  );
}

export default LanguageSelect;
