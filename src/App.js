import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import { getCurrentLocale, getLocaleData } from 'grommet/utils/Locale';
import en from 'react-intl/locale-data/en'; // add similar locale data for each supported languages
import ja from 'react-intl/locale-data/ja';
import store from 'store/store';
import 'assets/styles/styles.scss';
import MainContainer from 'modules/main/MainContainer';
import 'ie-array-find-polyfill';

export default function App() {
  const locale = getCurrentLocale();
  addLocaleData(en); // add more languages as needed
  addLocaleData(ja);

  let messages;
  try {
    messages = require(`./messages/${locale}.json`); // eslint-disable-line
  } catch (e) {
    messages = require('./messages/en-US.json'); // eslint-disable-line global-require
  }
  const localeData = getLocaleData(messages, 'en-US');

  return (
    <Provider store={store}>
      <IntlProvider locale={localeData.locale} messages={localeData.messages}>
        <MainContainer />
      </IntlProvider>
    </Provider>
  );
}
