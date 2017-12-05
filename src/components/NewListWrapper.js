import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Label from 'grommet/components/Label';
import Tiles from 'grommet/components/Tiles';
import Animate from 'grommet/components/Animate';
import CheckBox from 'grommet/components/CheckBox';
import RadioButton from 'grommet/components/RadioButton';
import LinkUpIcon from 'grommet/components/icons/base/LinkUp';

import {
  getSections,
} from 'utils/sections';
import NavControlComponent from './NavControlComponent';
import NewSearchSection from './NewSearchSection';
import NewBulkSelectHeader from './NewBulkSelectHeader';
import FilterComponent from './FilterComponent';

const propTypes = {
  // Bulk actions will be shown in the bulk header
  bulkAction: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  }), // Will bind the list of selected items to the function
  bulkActions: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ), // Will bind the list of selected items to the functions
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ), // Will be shown next to search bar
  items: PropTypes.object.isRequired,
  parentName: PropTypes.string,
  defaultLabelNames: PropTypes.shape({
    clear: PropTypes.string,
    selectAll: PropTypes.string,
    selected: PropTypes.string,
    errorMessage: PropTypes.string,
    allFilterLabel: PropTypes.string,
  }),
  allFilterValue: PropTypes.string,
  selectedOther: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.node.isRequired,
    ]).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
    ]).isRequired,
  })),
  params: PropTypes.shape({
    start: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    query: PropTypes.oneOfType([
      PropTypes.object.isRequired,
      PropTypes.array.isRequired,
    ]),
    sort: PropTypes.shape({
      prop: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['object', 'string', 'timestamp', 'number']).isRequired,
      }).isRequired,
      groupBy: PropTypes.oneOf(['id', 'name', 'number', false]).isRequired,
      direction: PropTypes.oneOf(['asc', 'desc']).isRequired,
    }).isRequired,
  }).isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.node.isRequired,
    ]).isRequired,
  })),
  optionsSelect: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
  })),
  showBulkActions: PropTypes.bool,
  multipleSelection: PropTypes.bool,
  selectedItemsTypeLabel: PropTypes.shape({
    singular: PropTypes.string.isRequired,
    plural: PropTypes.string.isRequired,
  }),
  tileComponent: PropTypes.func,
  attributes: PropTypes.array,
  filterActive: PropTypes.bool,
  selectedFilters: PropTypes.array,
  selectedStatus: PropTypes.object,
  searchValue: PropTypes.string,
  onSort: PropTypes.func,
  onCloseBulkActions: PropTypes.func, // Gets called when closing the bulk actions header
  onSelect: PropTypes.func,
  onSelectOtherFilter: PropTypes.func,
  onFilter: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  changeStatus: PropTypes.func,
  onFilterDeactivate: PropTypes.func.isRequired,
  onGetNext: PropTypes.func.isRequired,
};

export const defaultProps = {
  items: {
    members: [],
    start: 0,
    count: 0,
    total: 0,
  },
  multipleSelection: false,
  selectedFilters: [],
  optionsSelect: [],
  defaultLabelNames: {
    clear: 'Clear',
    selectAll: 'Select all',
    selected: 'Selected',
    errorMessage: 'At least one entity needs to be selected to perform the action',
    allFilterLabel: 'All',
  },
  allFilterValue: 'All',
};

class NewListWrapper extends Component {
  constructor(props) {
    super(props);
    this.onShowBulkActions = this.onShowBulkActions.bind(this);
    this.onHideBulkActions = this.onHideBulkActions.bind(this);
    this.renderSections = this.renderSections.bind(this);
    this.onCheckboxClick = this.onCheckboxClick.bind(this);
    this.onRadioClick = this.onRadioClick.bind(this);
    this.onSelectAllAction = this.onSelectAllAction.bind(this);
    this.onClearAction = this.onClearAction.bind(this);

    this.state = {
      showBulkActions: false,
      selectedItems: [],
      selectedItem: null,
    };
  }

  componentWillMount() {
    if (this.props.showBulkActions) {
      this.setState({
        showBulkActions: this.props.showBulkActions,
      });
    }
  }

  onSelectAllAction() {
    this.setState({
      selectedItems: this.props.items.members.map((item) => item.id || item.uuid),
    });
  }

  onClearAction() {
    this.setState({
      selectedItems: [],
      selectedItem: null,
    });
  }

  onShowBulkActions() {
    this.setState({ showBulkActions: true });
  }

  onHideBulkActions() {
    this.setState({ showBulkActions: false });
    if (this.props.onCloseBulkActions) this.props.onCloseBulkActions();
  }

  onCheckboxClick(data) {
    const id = data.target.getAttribute('data-id');
    const selectedItems = _.cloneDeep(this.state.selectedItems);
    const index = selectedItems.indexOf(id);
    if (index !== -1) {
      selectedItems.splice(index, 1);
    } else {
      selectedItems.push(id);
    }
    this.setState({ selectedItems });
  }

  onRadioClick(data) {
    const selectedItem = data.target.getAttribute('data-id');
    this.setState({ selectedItem });
  }

  renderSections(items, requestParams, TileComponent) {
    const {
      onGetNext,
      multipleSelection,
    } = this.props;
    const {
      showBulkActions,
      selectedItems,
      selectedItem,
    } = this.state;

    const getNext = (items.start + items.count) < items.total ?
      onGetNext : null;
    const sectionsObject = getSections(items, requestParams);
    let sections = null;

    if (sectionsObject.sections) {
      sections = sectionsObject.sections.map((section, index) => (
        <Section key={index} pad={{ horizontal: 'small', vertical: 'none' }} separator="top">
          {
            section.label &&
              <Header
                size="small"
                justify="start"
                responsive={false}
                pad={{ horizontal: 'small' }}
              >
                <Label size="small">{section.label}</Label>
              </Header>
          }
          <Tiles
            flush={false}
            fill={false}
            onMore={getNext}
            selectable={!showBulkActions}
          >
            {
              section.items.map((item, tileIndex) => {
                const itemId = item.id || item.uuid;
                const tile = (<TileComponent
                  id={item.id || item.uuid || ''}
                  index={tileIndex}
                  item={item}
                />);

                return (
                  <div key={tileIndex}>
                    {
                      showBulkActions ? (
                        <div style={{ display: 'inline-block' }}>
                          {
                            multipleSelection ? (
                              <CheckBox
                                id={itemId}
                                checked={
                                  !!selectedItems.find((id) => (
                                    id === itemId
                                  ))
                                }
                                label={
                                  <div style={{ pointerEvents: 'none' }}>
                                    {tile}
                                  </div>
                                }
                                onChange={this.onCheckboxClick}
                                data-id={item.id ? item.id : item.uuid}
                              />
                            ) : (
                              <RadioButton
                                className={'listRadioButton'}
                                id={itemId}
                                label={
                                  <div style={{ pointerEvents: 'none' }}>
                                    {tile}
                                  </div>
                                }
                                checked={selectedItem === itemId}
                                onChange={this.onRadioClick}
                                data-id={item.id ? item.id : item.uuid}
                              />
                            )
                        }
                        </div>
                      ) : (
                        <div style={{ display: 'inline-block' }}>
                          {tile}
                        </div>
                      )
                    }
                  </div>
                );
              })
            }
          </Tiles>
        </Section>
      ));
    }

    return sections;
  }

  renderSelectedFilters() {
    const { selectedFilters } = this.props;

    return selectedFilters.map(
      (filter, index) => (
        <Box
          align="center"
          key={`Boxkey-${index}`}
          className="filterButtonBox"
          pad={{ horizontal: 'small' }}
          direction="row"
        >
          <Label className="filterButtonLabel" >
            {filter}
          </Label>
        </Box>
      ),
    );
  }

  render() {
    const {
      bulkActions,
      bulkAction,
      actions,
      items,
      optionsSelect,
      suggestions,
      parentName,
      defaultLabelNames,
      allFilterValue,
      selectedItemsTypeLabel,
      selectedOther,
      onSelectOtherFilter,
      params,
      onFilter,
      onFilterDeactivate,
      onSearch,
      onSelect,
      attributes,
      onSort,
      filterActive,
      changeStatus,
      selectedStatus,
      searchValue,
      tileComponent,
      multipleSelection,
      onCloseBulkActions,
    } = this.props;

    const {
      selectedItem,
      selectedItems,
      showBulkActions,
    } = this.state;

    const sections = this.renderSections(items, params, tileComponent);

    const listFilter = (
      <FilterComponent
        id={'FilterNewListWrapper'}
        attributes={attributes}
        selectedStatus={selectedStatus}
        onClose={onFilterDeactivate}
        params={params}
        sortList={onSort}
        selectedOther={selectedOther}
        onSelectOtherFilter={onSelectOtherFilter}
        changeStatus={changeStatus}
        filterActive={filterActive}
        defaultLabelNames={defaultLabelNames}
        allFilterValue={allFilterValue}
      />
    );

    const filtersAppliedSection = this.renderSelectedFilters();

    return (
      <Box>
        <a name="top" style={{ textDecoration: 'none', cursor: 'default' }}>
          {
            showBulkActions &&
              <NewBulkSelectHeader
                bulkActions={bulkActions}
                bulkAction={bulkAction}
                selectedItem={selectedItem}
                selectedItems={selectedItems}
                parentName={parentName}
                defaultLabelNames={defaultLabelNames}
                onCloseAction={this.onHideBulkActions}
                onClearAction={this.onClearAction}
                onSelectAllAction={this.onSelectAllAction}
                multipleSelection={multipleSelection}
                selectedItemsTypeLabel={selectedItemsTypeLabel}
              />
          }
        </a>
        <Box>
          <Header size="large" pad={{ horizontal: 'none', vertical: 'none' }}>
            <Box align="start">
              <NavControlComponent
                onResourceIconClick={() => {}}
              />
            </Box>
            <Box flex>
              <NewSearchSection
                inline
                fill
                searchValue={searchValue}
                suggestions={suggestions}
                onSelect={onSelect}
                onSearch={onSearch}
                onFilter={onFilter}
                actions={actions}
                showBulkButton={!!(bulkAction || bulkActions) && !onCloseBulkActions}
                showBulkActions={showBulkActions}
                onShowBulkActions={this.onShowBulkActions}
                onHideBulkActions={this.onHideBulkActions}
                optionsSelect={optionsSelect}
              />
            </Box>
          </Header>
          { filterActive &&
            <Animate enter={{ animation: 'slide-left', duration: 1000, delay: 0 }}>
              <Box direction="column" colorIndex="light-2" flex="grow">
                {listFilter}
              </Box>
            </Animate>
          }
          <Box id="filtersApplied" direction="row" pad={{ horizontal: 'medium' }}>
            {filtersAppliedSection}
          </Box>
          {sections}
          <Button
            icon={<LinkUpIcon />}
            href="#top"
            id="floatButton"
          />
        </Box>
      </Box>
    );
  }
}

NewListWrapper.propTypes = propTypes;
NewListWrapper.defaultProps = defaultProps;

export default NewListWrapper;
