import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const propTypes = {
  date: PropTypes.string.isRequired,
  header: PropTypes.string,
  intl: intlShape.isRequired,
};

function DateComponent(props) {
  const { date, header, intl } = props;
  let text = null;
  if (header && date) {
    text = `${intl.formatMessage(messages[date])} - ${header}`;
  } else if (!header && date) {
    text = `${intl.formatMessage(messages[date])}`;
  }

  return (
    <span>
      {text}
    </span>
  );
}

DateComponent.propTypes = propTypes;

export default injectIntl(DateComponent);
