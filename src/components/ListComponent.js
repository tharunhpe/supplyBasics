import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import Image from 'grommet/components/Image';
import AddIcon from 'grommet/components/icons/base/Add';
import EditIcon from 'grommet/components/icons/base/Edit';
import SubtractIcon from 'grommet/components/icons/base/Subtract';
import messages from './messages';

const propTypes = {
  intl: intlShape.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  isIndexed: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.element, // eslint-disable-line react/no-unused-prop-types
      path: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  total: PropTypes.number,
  handler: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  handlerIcon: PropTypes.node,
  defaultMessage: PropTypes.string,
  allLabel: PropTypes.string,
  listItemIcon: PropTypes.node,
  onListItemIconClick: PropTypes.func,
  extendedListItemIcons: PropTypes.object,
  fromList: PropTypes.string,
  removeResourcesHandler: PropTypes.func,
  onItemClick: PropTypes.func,
  getPathToRoute: PropTypes.func,
  disableLinks: PropTypes.bool,
  errors: PropTypes.bool,
};

export const defaultProps = {
  name: 'List Name',
  helpText: '',
  isIndexed: false,
  items: [],
  fromList: '',
  onItemClick: () => { },
  getPathToRoute: () => { },
  disableLinks: true,
  errors: false,
};

function iconImage(icon) {
  const iconName = (icon !== undefined ? `/assets/images/${icon}` : null);
  return iconName;
}

function ListComponent(props) {
  const {
    intl,
    id,
    name,
    helpText,
    items,
    total,
    isIndexed,
    handler,
    handlerIcon,
    defaultMessage,
    allLabel,
    listItemIcon,
    onListItemIconClick,
    extendedListItemIcons,
    fromList,
    removeResourcesHandler,
    onItemClick,
    getPathToRoute,
    disableLinks,
    errors,
  } = props;
  let headerAction = null;
  let actionIcon = null;

  if (handlerIcon) {
    actionIcon = handlerIcon;
  } else if (fromList) {
    actionIcon = <AddIcon />;
  } else {
    actionIcon = items.length ? <EditIcon /> : <AddIcon />;
  }

  if ((handler && typeof handler === 'function') || (removeResourcesHandler && typeof removeResourcesHandler === 'function')) {
    headerAction = (
      <Box direction="row" pad={{ horizontal: 'small' }}>
        <Button
          id="addEntity"
          icon={actionIcon}
          onClick={handler}
        />
        {
          fromList && removeResourcesHandler &&
          <Button
            id="removeEntity"
            icon={<SubtractIcon />}
            onClick={removeResourcesHandler}
          />
        }
      </Box>
    );
  } else if (handler && typeof handler === 'string') {
    headerAction = (
      <Box pad={{ horizontal: 'small' }}>
        <Link id={`${id}-handler`} to={handler}>
          {actionIcon}
        </Link>
      </Box>
    );
  }

  const noItemsMessage = !items.length && defaultMessage && !allLabel ? (
    <Box className="pad-for-list-item overflow-auto">
      {defaultMessage}
    </Box>
  ) : null;

  const allItemsLabel = !items.length && allLabel ? (
    <Box className="pad-for-list-item">
      {allLabel}
    </Box>
  ) : null;

  function ItemPath(itemProps) {
    return (
      <Box>
        <Label id={itemProps.Path} size="small" >
          {itemProps.path}
        </Label>
      </Box>
    );
  }

  const isInherited = (helpTextName) => (helpTextName && helpTextName.length > 0);

  const listItemNode = (item, index) => (
    <ListItem
      id={item.name || item.id || item.uuid}
      key={index}
      pad={listItemIcon ? 'none' : 'none'}
      justify="between"
      onClick={() => onItemClick(item, index)}
    >
      <span className="pad-for-list-item">
        {isIndexed ? `${index + 1}.\u00A0\u00A0` : ''}
        <span id="ListComponentImage">
          {item.icon && <Image src={iconImage(item.icon)} size="thumb" />}
        </span>
        {item.icon ? '\u00A0\u00A0' : ''}
        <Box direction="column">
          <Box align="start">
            {item.name}
          </Box>
          {item.listItemHelpText && <Box align="start">
            <Label size="small">{item.listItemHelpText}</Label>
          </Box> }
        </Box>
        {item.helpTextName &&
          <span>
            {`\u00A0\u00A0(${intl.formatMessage(messages.inheritedMessage)}\u00A0\u00A0`}
            <Link
              id={item.helpTextName}
              className="anchor-decoration-none link-color"
              to={`/provision/resourceGroups/${item.targetId}`}
            >
              {item.helpTextName}
            </Link>
            {')'}
          </span>
        }
        {item.path &&
          item.path.map((path, pathIndex) => <ItemPath path={path} key={pathIndex} />)
        }
      </span>
      {
        onListItemIconClick &&
        <span className="secondary">
          {extendedListItemIcons && extendedListItemIcons.showIcon(item) &&
            <Button
              id={item.name ? `${item.name} - button` : index}
              icon={extendedListItemIcons.listItemIcon}
              onClick={extendedListItemIcons.onListItemIconClick.bind(this, item)} // eslint-disable-line
            />
          }
          {!isInherited(item.helpTextName) && <Box direction="row" align="center" className="tooltip"><Button
            id={item.name ? `${item.name} - button` : index}
            icon={listItemIcon}
            onClick={item.helpTextName ? () => { } : onListItemIconClick.bind(this, item)} // eslint-disable-line
          /> {item.listIconToolTipText && <span className="tooltiptext">{item.listIconToolTipText}</span>}</Box>}
        </span>
      }
    </ListItem>
  );

  return (
    <List selectable={false} className="listComponent">
      <ListItem
        justify="between"
        pad={{ horizontal: 'none', between: 'small' }}
      >
        <Box id="headingListComponent">
          <Box direction="row" align="center">
            <Heading id={name} tag="h4" strong>
              {name}
            </Heading>
            { total ?
              <Box>
                <Heading id={`${name}-total`} tag="h5" strong className="total-ListComponent">
                  ({total})
                </Heading>
              </Box> :
              null
            }
          </Box>
          <span id={helpText}>{helpText}</span>
        </Box>
        {headerAction}
      </ListItem>
      {items.map((item, index) => (
        disableLinks ? listItemNode(item, index)
          : <Link
            key={index}
            className="decoration-none"
            to={getPathToRoute(item.id || item.uuid)}
          >
            {listItemNode(item, index)}
          </Link>
      ))}
      {noItemsMessage && (
        <ListItem id="noItems" pad="none" className={errors && 'scriptErrorMessage'} >
          {noItemsMessage}
        </ListItem>
      )}
      {allItemsLabel && (
        <ListItem id="allItems" pad="none">
          {allItemsLabel}
        </ListItem>
      )}
    </List>
  );
}

ListComponent.propTypes = propTypes;
ListComponent.defaultProps = defaultProps;

export default injectIntl(ListComponent);
