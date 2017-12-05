import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { func, bool } from 'prop-types';
import { connect } from 'react-redux';
import { ListWrapper } from 'modules/enhancedListWrapper';
import { getToggleMenu, getMenuIcon } from 'modules/toggleMenu/selectors';
import { onToggleMenu } from 'modules/toggleMenu/menuStore';
import messages from './messages';

const propTypes = {
  intl: intlShape.isRequired,
  dispatchOnToggleMenuAction: func,
  menuIcon: func,
  toggleMenu: bool,
};

function ListWrapperIntl(props) {
  const {
    intl,
    dispatchOnToggleMenuAction,
    menuIcon,
    toggleMenu,
  } = props;

  const defaultLabelNames = {
    sectionsTimestamps: {
      today: intl.formatMessage(messages.today),
      lastWeek: intl.formatMessage(messages.lastWeek),
      lastMonth: intl.formatMessage(messages.lastMonth),
      older: intl.formatMessage(messages.older),
    },
    emptyListMessage: intl.formatMessage(messages.emptyListMessage),
    defaultButtons: {
      filters: intl.formatMessage(messages.filters),
      multipleSelection: intl.formatMessage(messages.multipleSelection),
      tileView: intl.formatMessage(messages.tileView),
      tableView: intl.formatMessage(messages.tableView),
      search: intl.formatMessage(messages.search),
      searchBy: intl.formatMessage(messages.searchBy),
    },
    loadingDataLabel: intl.formatMessage(messages.loadingData),
    allLabel: intl.formatMessage(messages.all),
  };

  return (<ListWrapper
    {...props}
    menuControls={{
      onToggleMenu: dispatchOnToggleMenuAction,
      menuIcon,
      toggleMenu,
    }}
    labels={defaultLabelNames}
  />);
}

const mapStateToProps = (state) => ({
  toggleMenu: getToggleMenu(state),
  menuIcon: getMenuIcon(state),
});

const mapDispatchToProps = {
  dispatchOnToggleMenuAction: onToggleMenu,
};

ListWrapperIntl.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ListWrapperIntl));
