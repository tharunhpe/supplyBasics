import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';
import TitleSection from 'components/TitleSection';
import List from 'grommet/components/List';
import ListPlaceholder from 'grommet-addons/components/ListPlaceholder';
import ListItem from 'grommet/components/ListItem';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Next from 'grommet/components/icons/base/Next';
import CheckBox from 'grommet/components/CheckBox';
import SquareIcon from 'assets/icons/SquareIcon';
import { findRecursiveItemById, recursivelyGetParentsForNode, recusivelyGetChildren } from 'utils/common';
import _ from 'lodash';

const propTypes = {
  noItemsMessage: PropTypes.string,
  buttonLabel: PropTypes.string.isRequired,
  selectedItems: PropTypes.array,
  allItems: PropTypes.array,
  onItemSelect: PropTypes.func.isRequired,
  onItemDeselect: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  uncheckWarningMessage: PropTypes.string.isRequired,
};

const defaultProps = {
  noItemsMessage: '',
  buttonLabel: '',
  onItemSelect: () => {},
  onItemDeselect: () => {},
  onButtonClick: () => {},
  allItems: [],
  selectedItems: [],
  uncheckWarningMessage: '',
};

class ExpandableSidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.getNextVisibleItems = this.getNextVisibleItems.bind(this);
    this.onExpandItem = this.onExpandItem.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.deselectItem = this.deselectItem.bind(this);
    this.onBack = this.onBack.bind(this);

    this.state = {
      parentItem: null,
      visibleItems: [],
      itemsOnPath: [],
      implicitSelections: [],
      hasWarning: false,
    };
  }
  componentDidMount() {
    const {
      selectedItems,
      allItems,
    } = this.props;
    if (selectedItems.length && allItems.length) {
      this.markTreeSelections(selectedItems, allItems);
    }
    if (allItems.length) {
      this.setState({ // eslint-disable-line
        visibleItems: allItems,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.selectedItems, this.props.selectedItems) ||
    !_.isEqual(nextProps.allItems, this.props.allItems)) {
      this.markTreeSelections(nextProps.selectedItems, nextProps.allItems);
    }
    if (nextProps.allItems.length !== this.props.allItems.length) {
      this.setState({
        visibleItems: nextProps.allItems,
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
    });
  }

  getListItem(item) {
    const isSelected = _.findIndex(this.props.selectedItems,
      (selectedItem) => selectedItem.id === item.id) !== -1;
    const isOnPath = _.findIndex(this.state.itemsOnPath,
      (itemOnPath) => itemOnPath.id === item.id) !== -1;
    const isImplicit = _.findIndex(this.state.implicitSelections,
      (selectedItem) => selectedItem.id === item.id) !== -1;
    if (item.children && item.children.length) {
      return (<ListItem
        key={`item-${item.id}`}
        pad={{ horizontal: 'medium', vertical: 'none' }}
      >
        <Box
          align="center"
          direction="row"
          justify="center"
        >
          { isOnPath &&
            <div
              className="squareIconWrapper"
            >
              <SquareIcon />
            </div>
          }
          { !isOnPath &&
            <CheckBox
              checked={isSelected || isImplicit}
              data-value={item.id}
              onChange={this.selectItem}
            />
          }
          <Box
            align="center"
            direction="row"
            justify="center"
          >
            <Box
              size="medium"
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
          </Box>
        </Box>
      </ListItem>);
    }

    return (<ListItem
      key={`item-${item.id}`}
      pad={{ horizontal: 'medium', vertical: 'none' }}
    >
      <Box
        align="center"
        direction="row"
        justify="center"
      >
        <CheckBox
          checked={isSelected || isImplicit}
          data-value={item.id}
          onChange={this.selectItem}
        />
        <Box
          align="center"
          direction="row"
          justify="center"
          data-value={item.id}
        >
          <Box
            size="medium"
          >
            {item.name}
          </Box>
          <Button
            className="js-expand-btn expand-btn"
            icon={<Next />}
            href="#"
            data-value={item.id}
            onClick={this.onExpandItem}
            style={{ visibility: 'hidden' }}
          />
        </Box>
      </Box>
    </ListItem>);
  }

  getNextVisibleItems(itemId) {
    const {
      allItems,
    } = this.props;
    if (!itemId) {
      return allItems;
    }
    return findRecursiveItemById({
      list: allItems,
      childrenKey: 'children',
      id: itemId,
    }).children;
  }

  markTreeSelections(selectedItems, allItems) {
    let itemsOnPath = [];
    let implicitSelections = [];
    selectedItems.forEach((selectedItem) => {
      const item = findRecursiveItemById({
        list: allItems,
        childrenKey: 'children',
        id: selectedItem.id,
      });
      const itemParents = recursivelyGetParentsForNode({
        node: item,
        parentKey: 'parent',
      });
      const itemChildren = recusivelyGetChildren({
        list: item,
        childrenKey: 'children',
      });
      itemsOnPath = _.unionBy(itemsOnPath.concat(itemParents), 'id');
      implicitSelections = _.unionBy(implicitSelections.concat(itemChildren), 'id');
    });
    itemsOnPath = _.differenceBy(itemsOnPath, selectedItems, 'id');

    this.setState({
      itemsOnPath,
      implicitSelections,
    });
  }

  deselectItem(itemId) {
    const {
      allItems,
      onItemDeselect,
      onItemSelect,
    } = this.props;
    const isImplicit = _.findIndex(this.state.implicitSelections,
      (selectedItem) => selectedItem.id === itemId) !== -1;
    if (isImplicit) {
      const item = findRecursiveItemById({
        list: allItems,
        childrenKey: 'children',
        id: itemId,
      });
      // select siblings (items from implicitSelections list)
      this.state.visibleItems.forEach((implicitSel) => {
        const itemChildren = recusivelyGetChildren({
          list: item,
          childrenKey: 'children',
        });
        const isChild = _.findIndex(itemChildren,
          (selection) => selection.id === implicitSel.id) !== -1;
        if (implicitSel.id !== itemId && !isChild) {
          onItemSelect(implicitSel.id);
        }
      });
      // deselect parents
      const parents = recursivelyGetParentsForNode({
        node: item,
        parentKey: 'parent',
      });
      parents.forEach((parent) => {
        onItemDeselect(parent.id);
      });
      this.setState({
        hasWarning: true,
      });
    } else {
      onItemDeselect(itemId);
    }
  }

  selectItem(event) {
    const {
      onItemSelect,
    } = this.props;
    this.setState({
      hasWarning: false,
    });
    const itemId = event.target.getAttribute('data-value');
    if (event.target.checked) {
      onItemSelect(itemId);
    } else {
      this.deselectItem(itemId);
    }
  }

  listItems(items) {
    return items.map((item) => this.getListItem(item));
  }

  render() {
    const {
      noItemsMessage,
      buttonLabel,
      uncheckWarningMessage,
      onButtonClick,
    } = this.props;

    const {
      parentItem,
      visibleItems,
      hasWarning,
    } = this.state;

    return (
      <div>
        {
          hasWarning &&
            <Box
              colorIndex="warning"
              pad={{ horizontal: 'small' }}
              className="text-bold"
              align="start"
              flex
            >
              { uncheckWarningMessage }
            </Box>
        }
        {
          parentItem && !parentItem.topLevel &&
            (<TitleSection
              title={parentItem.name}
              onBack={this.onBack}
              backURL="#"
            />)
        }
        <Box>
          <List>
            {this.listItems(visibleItems.length ? visibleItems : this.getNextVisibleItems())}
            <ListPlaceholder
              emptyMessage={noItemsMessage}
              filteredTotal={visibleItems.length}
              unfilteredTotal={visibleItems.length}
            />
          </List>
        </Box>
        <Footer pad="medium">
          <Button
            label={buttonLabel}
            primary
            onClick={onButtonClick}
          />
        </Footer>
      </div>
    );
  }
}

ExpandableSidebarComponent.propTypes = propTypes;
ExpandableSidebarComponent.defaultProps = defaultProps;

export default ExpandableSidebarComponent;
