import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import NewListWrapper from 'components/NewListWrapper';
import { DEFAULT_FILTER_VALUE } from 'utils/constants';
import messages from './messages';

const propTypes = {
  intl: intlShape.isRequired,
};

function NewListWrapperIntl(props) {
  const { intl } = props;

  const defaultLabelNames = {
    clear: intl.formatMessage(messages.clear),
    selectAll: intl.formatMessage(messages.selectAll),
    selected: intl.formatMessage(messages.selected),
    errorMessage: intl.formatMessage(messages.selectionError),
    allFilterLabel: intl.formatMessage(messages.all),
  };

  return (<NewListWrapper
    {...props}
    defaultLabelNames={defaultLabelNames}
    allFilterValue={DEFAULT_FILTER_VALUE}
  />);
}

NewListWrapperIntl.propTypes = propTypes;

export default injectIntl(NewListWrapperIntl);
