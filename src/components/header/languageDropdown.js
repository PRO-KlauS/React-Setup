import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { changeLanguageAction } from '../../actions/internationalization';
import dayjs from 'dayjs';
import constants from '../../constants/constants';

const LanguageDropdown = ({ dispatch, language }) => {
  const { t, i18n } = useTranslation();
  const onChangeLanguage = (language = '') => {
    dispatch(changeLanguageAction(language));
    let locale = language.substring(0, 2);
    dayjs.locale(locale);
    dayjs.updateLocale(
      locale,
      locale === 'en' ? constants.enDayJSLocaleObj : constants.jaDayJSLocaleObj,
    );
    i18n.changeLanguage(language);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle variant="default" id="dropdown-basic">
        {language === 'en-US' ? (
          <ReactCountryFlag countryCode="US" svg />
        ) : (
          <ReactCountryFlag countryCode="JP" svg />
        )}
        <span className="user-name">
          {language === 'en-US'
            ? t('header.englishPlaceholder')
            : t('header.japanesePlaceholder')}
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu align={'right'}>
        <Dropdown.Item onClick={() => onChangeLanguage('en-US')}>
          <ReactCountryFlag countryCode="US" svg />
          {t('header.englishPlaceholder')}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onChangeLanguage('ja-JP')}>
          <ReactCountryFlag countryCode="JP" svg />
          {t('header.japanesePlaceholder')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;
