import React, { PropTypes } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router';

import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import CloseIcon from 'grommet/components/icons/base/Close';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Button from 'grommet/components/Button';
import messages from './messages';

const propTypes = {
  intl: intlShape.isRequired,
  actions: PropTypes.array,
  selectedTotal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  bulkOptionBool: PropTypes.bool,
  clearAllSelection: PropTypes.func,
  onSelectAll: PropTypes.func,
  onClearAll: PropTypes.func,
  errorBool: PropTypes.bool,
  closeErrorBulk: PropTypes.func,
  headerColor: PropTypes.string,
  bulkAssociateResourceGroupAction: PropTypes.bool,
  onAction: PropTypes.func,
  removeFromResourceGroupBulk: PropTypes.bool,
  isFixed: PropTypes.bool,
};

export const defaultProps = {
  actions: [],
  selectedTotal: 0,
  bulkOptionBool: false,
  clearAllSelection: () => {},
  onSelectAll: () => {},
  onClearAll: () => {},
  errorBool: false,
  closeErrorBulk: () => {},
  headerColor: 'accent-2',
  closeIconBool: false,
  isFixed: true,
};

function BulkSelectHeader(props) {
  const {
    intl,
    actions,
    selectedTotal,
    bulkOptionBool,
    clearAllSelection,
    onSelectAll,
    onClearAll,
    closeErrorBulk,
    errorBool,
    headerColor,
    bulkAssociateResourceGroupAction,
    onAction,
    removeFromResourceGroupBulk,
    isFixed,
} = props;

  return (
    <Box pad="none">
      { bulkOptionBool &&
        <Header
          id="BulkHeader"
          fixed={isFixed}
          justify="between"
          colorIndex={headerColor}
          pad={{ horizontal: 'small', vertical: 'none' }}
        >
          {errorBool &&
            <Box
              flex
              justify="start"
              direction="row"
              responsive={false}
              align="center"
            >
              <Button id="closeBulkActionError" icon={<CloseIcon />} onClick={closeErrorBulk} />
              <span id="bulkErrorLabel">
                {intl.formatMessage(messages.errorMessage)}
              </span>
            </Box>
          }
          {!errorBool &&
            <Box direction="row" flex>
              <Button id="closeBulkActionMode" icon={<CloseIcon />} onClick={clearAllSelection} />
              <Title margin={{ left: 'small' }}>
                {selectedTotal}
              </Title>
              <Title>
                {intl.formatMessage(messages.selectedTitle)}
              </Title>
              <Box
                flex
                justify="end"
                direction="row"
                responsive={false}
              >
                <Button
                  id="clearAllBulk"
                  label={intl.formatMessage(messages.clearButton)}
                  plain
                  onClick={onClearAll}
                />
                <Button
                  id="selectAllBulk"
                  label={intl.formatMessage(messages.selectAllButton)}
                  plain
                  onClick={onSelectAll}
                />
                { !bulkAssociateResourceGroupAction &&
                  <Menu id="Actions" label={intl.formatMessage(messages.actionsMenu)} dropAlign={{ right: 'right' }} responsive>
                    <Menu direction="row" justify="start" responsive>
                      {
                        actions.map((action, index) => {
                          if (action.onClick || !action.path) {
                            return (
                              <Box key={index} pad={{ vertical: 'small' }}>
                                <Button
                                  id={`${action.id}`}
                                  onClick={action.onClick}
                                  icon={action.icon}
                                  label={action.label}
                                  plain
                                />
                              </Box>
                            );
                          }
                          return (
                            <Link
                              key={index}
                              to={action.path}
                              style={{ textDecoration: 'none' }}
                            >
                              <Box key={index} pad={{ vertical: 'small' }}>
                                <Button
                                  id={`${action.id}`}
                                  onClick={() => {}}
                                  icon={action.icon}
                                  label={action.label}
                                  plain
                                />
                              </Box>
                            </Link>
                          );
                        })
                      }
                    </Menu>
                  </Menu>
                }
                {
                  bulkAssociateResourceGroupAction && !removeFromResourceGroupBulk &&
                    <Button
                      id="AddToResourceGroupBulk"
                      label={intl.formatMessage(messages.addToResourceGroup)}
                      plain
                      onClick={onAction.bind(this, 'Add Resource Group')} // eslint-disable-line
                    />
                }
                {
                  bulkAssociateResourceGroupAction && removeFromResourceGroupBulk &&
                    <Button
                      id="RemoveFromResourceGroupBulk"
                      label={intl.formatMessage(messages.removeFromResourceGroup)}
                      plain
                      onClick={onAction.bind(this, 'Remove Resource Group')} // eslint-disable-line
                    />
                }
              </Box>
            </Box>
          }
        </Header>
      }
    </Box>
  );
}

BulkSelectHeader.propTypes = propTypes;
BulkSelectHeader.defaultProps = defaultProps;

export default injectIntl(BulkSelectHeader);
