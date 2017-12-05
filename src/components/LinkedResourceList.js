/**
 * This component is similar to ResourceListComponent, but the navigation thorugh the list
 * is done using Link component and not onClick callbacks
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import EditIcon from 'grommet/components/icons/base/Edit';
import ListPlaceholder from 'grommet-addons/components/ListPlaceholder';

const propTypes = {
  getPathToRoute: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  helpText: PropTypes.string.isRequired,
  noDataMessage: PropTypes.string.isRequired,
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
  listAction: PropTypes.shape({
    icon: PropTypes.node,
    text: PropTypes.string,
    onListAction: PropTypes.func,
    path: PropTypes.string,
  }),
  isIndexed: PropTypes.bool,
  editMode: PropTypes.bool,
  indexPrefix: PropTypes.string,
  disableLinks: PropTypes.bool,
  onItemClick: PropTypes.func,
};

export const defaultProps = {
  name: '',
  helpText: '',
  items: [],
  noDataMessage: '',
  editMode: false,
  disableLinks: false,
};

function LinkedResourceList(props) {
  const {
    name,
    helpText,
    items,
    listAction,
    isIndexed,
    indexPrefix,
    getPathToRoute,
    noDataMessage,
    editMode,
    disableLinks,
    onItemClick,
  } = props;

  let headerAction = null;
  let button = null;
  if (listAction) {
    button = (
      <Button
        icon={listAction.icon}
        label={listAction.text}
        onClick={disableLinks ? () => {} : listAction.onListAction}
      />
    );
  }

  if (listAction && listAction.path && !disableLinks) {
    headerAction = (
      <Link to={disableLinks ? '#' : listAction.path}>
        {button}
      </Link>
    );
  } else if (listAction) {
    headerAction = (
      <div>
        {button}
      </div>
    );
  }

  function getVisibleName(item) {
    let visibleName = item.name;
    if (item.name && item.name.length > 70) {
      const trimmedName = item.name.substring(0, 70);
      visibleName = `${trimmedName
        .substring(0, Math.min(trimmedName.length, trimmedName.lastIndexOf(' ')))}...`;
    }
    return visibleName;
  }

  const titleSection = name ? (
    <ListItem
      justify="between"
      pad={{ horizontal: 'none', vertical: 'none', between: 'small' }}
    >
      <Box>
        <Heading tag="h4" margin="none" strong >
          {name}
        </Heading>
        <Heading tag="h6">{helpText}</Heading>
      </Box>
      <Box>
        {headerAction}
      </Box>
    </ListItem>
  ) : null;

  const listItemNode = (item, index) => (
    <ListItem
      pad="none"
      key={index}
      id={`entity-${item.id}`}
      onClick={onItemClick}
    >
      <Box direction="row" size="large" align="start" className="pad-for-list-item">
        {
          isIndexed &&
            <span>
              {indexPrefix && `${indexPrefix}.`}
              {`${index + 1}`}
              {!indexPrefix && '.'}
              {' \u00A0'}
            </span>
        }
        <span>{getVisibleName(item)}</span>
      </Box>
      {!!editMode &&
        <Box size="auto" align="end" pad={{ horizontal: 'small' }}>
          <EditIcon id={`entity-edit-${item.id}`} size="xsmall" className="size-list-icon" />
        </Box>
      }
      { item.status &&
        <Box size="small" align="start">
          <span>{item.status.icon} {item.status.text}</span>
        </Box>
      }
    </ListItem>
  );

  return (
    <List>
      {titleSection}
      <List>
        <ListPlaceholder
          emptyMessage={noDataMessage}
          unfilteredTotal={items.length}
          filteredTotal={items.length}
        />
        {disableLinks ?
          items.map((item, index) => (listItemNode(item, index)))
          :
          items.map((item, index) => (
            <Link
              id={`entity-link-${item.id}`}
              key={index}
              className="decoration-none"
              to={getPathToRoute(item.id || item.uuid)}
            >
              {listItemNode(item, index)}
            </Link>
          ))
        }
      </List>
    </List>
  );
}

LinkedResourceList.propTypes = propTypes;
LinkedResourceList.defaultProps = defaultProps;

export default LinkedResourceList;
