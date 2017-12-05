import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import { DATE_FORMAT } from 'modules/provision/exceptions/constants';

const propTypes = {
  title: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      exceptionid: PropTypes.number,
      approvedBy: PropTypes.string,
      reason: PropTypes.string,
      expirationDT: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  onItemClick: PropTypes.func,
  listAction: PropTypes.shape({
    icon: PropTypes.node,
    text: PropTypes.string,
    onListAction: PropTypes.func,
    path: PropTypes.string,
  }),
  listItemAction: PropTypes.shape({
    icon: PropTypes.node,
    text: PropTypes.string,
    onListItemAction: PropTypes.func,
  }),
  emptyListMessage: PropTypes.string,
};

export const defaultProps = {
  title: ' ',
  helpText: ' ',
  items: [],
};

function ExceptionListComponent(props) {
  const {
    title,
    helpText,
    items,
    onItemClick,
    listAction,
    listItemAction,
    emptyListMessage,
  } = props;
  const selectable = !!onItemClick;
  let headerAction = null;
  if (listAction) {
    headerAction = (
      <Button
        id={listAction.id}
        icon={listAction.icon}
        label={listAction.text}
        onClick={listAction.onListAction}
      />
    );
  }

  const titleSection = title ? (
    <ListItem
      justify="between"
      pad={{ horizontal: 'none', vertical: 'none', between: 'small' }}
    >
      <Box>
        <Heading tag="h4" strong>
          {title}
        </Heading>
        {helpText &&
        <span>{helpText}</span>
        }
      </Box>
      {headerAction}
    </ListItem>
  ) : null;

  return (
    <List >
      {titleSection}
      <List selectable={selectable}>
        { items.length === 0 &&
          <ListItem pad="none">
            <Box size="medium" pad="none">
              <span className="pad-for-list-item">
                {emptyListMessage}
              </span>
            </Box>
          </ListItem>
        }
        {
          items.map((item, index) => (
            <ListItem
              pad="none"
              key={index}
              id={item.exceptionid}
              onClick={selectable ? onItemClick.bind(this, item.exceptionid, index) : () => {}}
            >
              <Box direction="row" justify="between" className="pad-for-list-item">
                <Box size="small" pad={{ vertical: listItemAction ? 'small' : 'none' }}>{item.name}</Box>
                <Box size="small" pad={{ vertical: listItemAction ? 'small' : 'none' }}>
                  {moment(item.expirationDT).format(DATE_FORMAT)}
                </Box>
                <Box size="small" pad={{ vertical: listItemAction ? 'small' : 'none' }}>
                  {item.approvedBy}
                </Box>
                <Box size="small" pad={{ vertical: listItemAction ? 'small' : 'none' }}>
                  {`${item.resources.length} resources`}
                </Box>
                {
                  listItemAction &&
                  <Button
                    icon={listItemAction.icon}
                    onClick={() => listItemAction.onListItemAction(item.exceptionid)}
                  />
                }
              </Box>
            </ListItem>
          ))
        }
      </List>
    </List>
  );
}

ExceptionListComponent.propTypes = propTypes;
ExceptionListComponent.defaultProps = defaultProps;

export default injectIntl(ExceptionListComponent);
