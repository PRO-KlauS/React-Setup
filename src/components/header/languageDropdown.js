import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { changeLanguageAction } from '../../actions/internationalization';

const LanguageDropdown = ({ dispatch, language }) => {
  const { t, i18n } = useTranslation();
  const onChangeLanguage = (language) => {
    dispatch(changeLanguageAction(language));
    i18n.changeLanguage(language);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle variant="default" id="dropdown-basic">
        {language === 'en' ? (
          <ReactCountryFlag countryCode="US" svg />
        ) : (
          <ReactCountryFlag countryCode="JP" svg />
        )}
        <span className="user-name">
          {language === 'en'
            ? t('header.englishPlaceholder')
            : t('header.japanesePlaceholder')}
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu align={'right'}>
        <Dropdown.Item onClick={() => onChangeLanguage('en')}>
          <ReactCountryFlag countryCode="US" svg />
          {t('header.englishPlaceholder')}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onChangeLanguage('ja')}>
          <ReactCountryFlag countryCode="JP" svg />
          {t('header.japanesePlaceholder')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;
