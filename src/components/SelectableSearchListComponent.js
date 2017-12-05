import React, { PropTypes, Component } from 'react';
import ListPlaceholder from 'grommet-addons/components/ListPlaceholder';
import TitleSection from 'components/TitleSection';
import Anchor from 'grommet/components/Anchor';
import Layer from 'grommet/components/Layer';
import Paragraph from 'grommet/components/Paragraph';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Search from 'grommet/components/Search';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Button from 'grommet/components/Button';
import RadioButton from 'grommet/components/RadioButton';
import Add from 'grommet/components/icons/base/Add';
import Next from 'grommet/components/icons/base/Next';
import _ from 'lodash';
import { findRecursiveItemById } from 'utils/common';
import ErrorHandler from 'components/ErrorHandler';

const propTypes = {
  errors: PropTypes.array,
  onDismissError: PropTypes.func,
  actionButtonIcon: PropTypes.node,
  searchPlaceholder: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  emptyListMessage: PropTypes.string.isRequired,
  layerTitle: PropTypes.string,
  infoMessage: PropTypes.string,
  noItems: PropTypes.bool,
  listMessage: PropTypes.shape({
    action: PropTypes.object,
    messages: PropTypes.array,
  }),
  items: PropTypes.shape({
    members: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
  selectedItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
    index: PropTypes.number,
  }),
  selectableList: PropTypes.oneOf([true, false, 'multiple']),
  listSourceTypes: PropTypes.array,
  listSourceSelectedType: PropTypes.string,
  onChangeListSource: PropTypes.func,
  onSearch: PropTypes.func.isRequired,
  onButtonAction: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  getNext: PropTypes.func.isRequired,
  onCloseLayer: PropTypes.func.isRequired,
};

export const defaultProps = {
  errors: [],
  onDismissError: () => { },
  actionButtonIcon: <Add />,
  searchPlaceholder: 'Search',
  emptyListMessage: 'No results',
  layerTitle: '',
  infoMessage: '',
  noItems: false,
  listMessage: null,
  searchValue: '',
  items: {
    members: [],
    total: 0,
    count: 0,
    start: 0,
  },
  selectableList: false,
  selectedItem: null,
  listSourceTypes: null,
  onChangeListSource: () => {},
  onSearch: () => {},
  onConfirm: () => {},
  onButtonAction: () => {},
  onItemClick: () => {},
  getNext: () => {},
  onCloseLayer: () => {},
};

class SelectableSearchListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentItem: null,
      filteredItems: props.items.members,
      visibleItems: props.items.members,
    };

    this.onBack = this.onBack.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onExpandItem = this.onExpandItem.bind(this);
    this.getNextVisibleItems = this.getNextVisibleItems.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.items, nextProps.items)) {
      this.setState({
        filteredItems: nextProps.items.members,
      });
    }
  }

  onBack() {
    const {
      parentItem,
    } = this.state;
    const nextParentItemId =
      parentItem &&
      parentItem.parent &&
      !parentItem.parent.topLevel ? parentItem.parent.id : null;
    const nextVisibleItems = this.getNextVisibleItems(nextParentItemId);
    this.setState({
      parentItem: parentItem.parent,
      filteredItems: nextVisibleItems,
      visibleItems: nextVisibleItems,
    });
  }

  onExpandItem(event) {
    const {
      visibleItems,
    } = this.state;
    const itemId = event.currentTarget.getAttribute('data-value');
    const nextVisibleItems = this.getNextVisibleItems(itemId);
    const selectedItem = visibleItems.filter((item) => item.id === itemId)[0];
    this.setState({
      parentItem: selectedItem,
      visibleItems: nextVisibleItems,
      filteredItems: nextVisibleItems,
    });
  }

  onSearch(event) {
    this.props.onSearch(event, this.state.visibleItems);
  }

  getNextVisibleItems(itemId) {
    const {
      items,
    } = this.props;
    if (!itemId) {
      return items.members;
    }
    return findRecursiveItemById({
      list: items.members,
      childrenKey: 'children',
      id: itemId,
    }).children;
  }

  render() {
    const {
      errors,
      onDismissError,
      actionButtonIcon,
      searchPlaceholder,
      searchValue,
      emptyListMessage,
      layerTitle,
      infoMessage,
      noItems,
      listMessage,
      items,
      selectedItem,
      selectableList,
      listSourceTypes,
      listSourceSelectedType,
      onChangeListSource,
      onButtonAction,
      onItemClick,
      getNext,
      onCloseLayer,
    } = this.props;

    const {
      filteredItems,
      parentItem,
    } = this.state;

    const getNextAction = (items.start + items.count) <
    items.total ? getNext : null;
    const buttonAction = selectedItem && selectedItem.name ? onButtonAction : null;

    const titleSection = layerTitle ? (
      <Header size="small" pad={{ vertical: 'small', horizontal: 'small' }}>
        <Heading tag="h3" strong>{layerTitle}</Heading>
      </Header>
    ) : null;

    const infoSection = infoMessage ? (
      <Heading tag="h6" className="info-section layer-width">{infoMessage}</Heading>
    ) : null;

    const headerSection = (
      <Header size="large" pad={{ horizontal: 'none', vertical: 'none' }}>
        <Box direction="row" pad={{ vertical: 'small' }}>
          <Box pad={{ vertical: 'none', horizontal: 'none' }}>
            <Search
              id="searchListComponent"
              inline
              size="medium"
              placeHolder={searchPlaceholder}
              onDOMChange={this.onSearch}
              value={selectedItem && selectedItem.name ? selectedItem.name : searchValue}
            />
          </Box>
          {
            selectedItem && selectedItem.name &&
              <Button
                id="selectableListComponentAddButton"
                className="js-select-btn"
                primary
                icon={actionButtonIcon}
                onClick={buttonAction}
              />
          }
        </Box>
      </Header>
    );

    const listSourceSelectSection = listSourceTypes ? (
      <Box direction="column" pad={{ vertical: 'medium' }} flex={false}>
        {
          listSourceTypes.map((listType, index) => (
            <Box key={index} pad={{ vertical: 'small', horizontal: 'small' }}>
              <RadioButton
                id={listType.value}
                name={listType.value}
                label={listType.label}
                value={listType.value}
                onChange={onChangeListSource}
                checked={listType.value === listSourceSelectedType}
              />
            </Box>
          ))
        }
      </Box>
    ) : null;
    const listResultsSection = (
      <Box separator="top">
        <Box>
          {
            parentItem && !parentItem.topLevel &&
              (<TitleSection
                title={parentItem.name}
                onBack={this.onBack}
                backURL="#"
              />)
          }
          <List
            onMore={getNextAction}
            selected={selectedItem && selectedItem.index}
            selectable={selectableList}
          >
            {
              filteredItems.length ?
                filteredItems.map((item, index) => (
                  <Box pad="none" key={`key-${index}`}>
                    {
                      !!item.children && !!item.children.length &&
                        <ListItem
                          pad={{ vertical: 'none', horizontal: 'small' }}
                          justify="between"
                          data-value={item.id}
                          id={`listItem${item.id}`}
                        >
                          <Box
                            size="medium"
                            onClick={onItemClick.bind(this, item)} // eslint-disable-line
                            id={`listItemBox${item.id}`}
                          >
                            {item.name}
                          </Box>
                          <Button
                            className="js-expand-btn expand-btn"
                            icon={<Next />}
                            href="#"
                            data-value={item.id}
                            onClick={this.onExpandItem}
                          />
                        </ListItem>
                    }
                    {
                      (!item.children || !item.children.length) &&
                        <ListItem
                          pad={{ vertical: 'none', horizontal: 'small' }}
                          onClick={onItemClick.bind(this, item)} // eslint-disable-line
                          justify="between"
                          data-value={item.id}
                          id={`listItem${item.id}`}
                        >
                          {item.name}
                          <Button
                            icon={<Next />}
                            style={{ visibility: 'hidden' }}
                          />
                        </ListItem>
                    }
                  </Box>
                ))
                :
                <ListPlaceholder
                  emptyMessage={emptyListMessage}
                  unfilteredTotal={items.total}
                  filteredTotal={items.count}
                />
            }
          </List>
        </Box>
      </Box>
    );

    const listMessageSection = listMessage ? (
      <Paragraph className="layer-width">
        <span>{listMessage.message}</span>{' '}
        <Anchor className="decoration-none strong-font official-color" onClick={listMessage.action.onClick}>
          <span>{listMessage.action.label}</span>
        </Anchor>
      </Paragraph>
    ) : null;

    const mainSection = noItems ?
      null :
      (<Box separator="bottom" size="medium">
        {listSourceSelectSection}
        {headerSection}
        {listResultsSection}
      </Box>);

    const errorSection = (
      <ErrorHandler
        errors={errors}
        onDismissError={onDismissError}
      />
    );

    return (
      <Layer closer align="right" onClose={onCloseLayer}>
        {errorSection}
        {titleSection}
        {infoSection}
        {mainSection}
        {listMessageSection}
      </Layer>
    );
  }
}

SelectableSearchListComponent.propTypes = propTypes;
SelectableSearchListComponent.defaultProps = defaultProps;

export default SelectableSearchListComponent;
