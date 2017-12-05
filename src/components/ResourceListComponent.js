import React from 'react';
import PropTypes from 'prop-types';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Heading from 'grommet/components/Heading';
import ListPlaceholder from 'grommet-addons/components/ListPlaceholder';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';

const propTypes = {
  name: PropTypes.string.isRequired,
  helpText: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      status: PropTypes.shape({
        icon: PropTypes.object,
        text: PropTypes.string,
      }),
      name: PropTypes.string,
    }),
  ).isRequired,
  total: PropTypes.number,
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
  isIndexed: PropTypes.bool,
  indexPrefix: PropTypes.string,
  emptyListMessage: PropTypes.string,
  errors: PropTypes.object,
};

export const defaultProps = {
  name: '',
  helpText: '',
  items: [],
  errors: {},
  onItemClick: () => { },
};

function ResourceListComponent(props) {
  const {
    name,
    helpText,
    items,
    total,
    onItemClick,
    listAction,
    listItemAction,
    isIndexed,
    indexPrefix,
    emptyListMessage,
    errors,
  } = props;
  const selectable = !!onItemClick;
  let headerAction = null;
  if (listAction) {
    headerAction = (
      <Button
        icon={listAction.icon}
        label={listAction.text}
        onClick={listAction.onListAction}
      />
    );
  }

  const titleSection = name ? (
    <ListItem
      justify="between"
      pad={{ horizontal: 'none', vertical: 'none', between: 'small' }}
    >
      <Box>
        <Box direction="row" align="center">
          <Heading id={name} tag="h4" strong>
            {name}
          </Heading>
          { total ?
            <Box>
              <Heading id={`${name}-total`} tag="h5" strong className="total-ResourceListComponent">
                ({total})
              </Heading>
            </Box> :
            null
          }
        </Box>
        {helpText &&
          <span>{helpText}</span>
        }
      </Box>
      {headerAction}
    </ListItem>
  ) : null;

  return (
    <List>
      {titleSection}
      <List
        selectable={selectable}
        className={errors.resourceTypes && 'errorColor'}
      >
        <ListPlaceholder
          unfilteredTotal={items.length}
          filteredTotal={items.length}
          emptyMessage={emptyListMessage || ''}

        />
        {
          items.map((item, index) => (
            <ListItem
              pad={{ horizontal: 'none' }}
              key={index}
              id={item.id}
              onClick={selectable && onItemClick.bind(this, item, index)}
            >
              <Box direction="row" size="large" align="start" className="pad-for-list-item">
                {
                  isIndexed &&
                  <Box margin="none">
                    {indexPrefix && `${indexPrefix}.`}
                    {`${index + 1}`}
                    {!indexPrefix && '.'}
                    {' \u00A0'}
                  </Box>
                }
                <Box margin="none">{item.name}</Box>
              </Box>
              {item.status &&
                <Box size="medium" align="start" className="pad-for-list-item">
                  <Box margin="none" direction="row" align="center"><Box>{item.status.icon}</Box> <Box pad={{ horizontal: 'small' }}>{item.status.text}</Box></Box>
                </Box>
              }
              {
                listItemAction &&
                <Button
                  icon={listItemAction.icon}
                  label={listItemAction.text}
                  onClick={listItemAction.onListItemAction}
                  data-value={item.id}
                />
              }
            </ListItem>
          ))
        }
      </List>
    </List>
  );
}

ResourceListComponent.propTypes = propTypes;
ResourceListComponent.defaultProps = defaultProps;

export default ResourceListComponent;
