import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import LinkUpIcon from 'grommet/components/icons/base/LinkUp';
import Button from 'grommet/components/Button';
import Layer from 'grommet/components/Layer';
import Animate from 'grommet/components/Animate';
import Spinning from 'grommet/components/icons/Spinning';
import InfoIcon from 'grommet/components/icons/base/Info';
import LoadingLayer from 'components/LoadingLayer';

import LayerHeader from 'components/LayerHeader';
import ErrorHandler from './ErrorHandler';
import ActionMessageForm from './ActionMessageForm';
import ResourceFilterComponent from './ResourceFilterComponent';
import FilterComponent from './FilterComponent';
import SearchSection from './SearchSection';
import BulkSelectHeader from './BulkSelectHeader';
import NavControlComponent from './NavControlComponent';
import TitleSection from './TitleSection';
import messages from './messages';

const propTypes = {
  id: PropTypes.string,
  intl: intlShape.isRequired,
  errors: PropTypes.array,
  onDismissError: PropTypes.func,
  attributes: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        sort: PropTypes.shape({
          direction: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        filter: PropTypes.shape({
          values: PropTypes.array.isRequired,
        }),
      }).isRequired,
      PropTypes.shape({
        other: PropTypes.shape({
          all: PropTypes.bool,
          label: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          values: PropTypes.array.isRequired,
        }),
      }).isRequired,
    ]),
  ).isRequired,
  complianceAttributes: PropTypes.array,
  sourceAttributes: PropTypes.array,
  vulnerabilityAttributes: PropTypes.array,
  filterActive: PropTypes.bool,
  importEntities: PropTypes.bool,
  sections: PropTypes.array,
  params: PropTypes.object.isRequired,
  inline: PropTypes.bool,
  fill: PropTypes.bool,
  selectedStatus: PropTypes.object,
  totalCount: PropTypes.number,
  currentCount: PropTypes.number,
  searchValue: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.node.isRequired,
    ]).isRequired,
  })),
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
  changeStatus: PropTypes.func.isRequired,
  onFilterDeactivate: PropTypes.func.isRequired,
  sortList: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  onImport: PropTypes.func,
  onFilter: PropTypes.func,
  onSelectOtherFilter: PropTypes.func.isRequired,
  iconComp: PropTypes.node,
  isNavSideBarActive: PropTypes.bool,
  onResourceIconClick: PropTypes.func,
  onAdd: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  optionsSelect: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
  })),
  onOptionSelect: PropTypes.func,
  selectedOption: PropTypes.string,
  selectBool: PropTypes.bool,
  actions: PropTypes.array,
  selectedTotal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  bulkOptionBool: PropTypes.bool,
  clearAllSelection: PropTypes.func,
  onBulkSelect: PropTypes.func,
  onSelectAll: PropTypes.func,
  onClearAll: PropTypes.func,
  onActionLayerClose: PropTypes.func,
  currentAction: PropTypes.string,
  numberEntities: PropTypes.string,
  actionLayerActive: PropTypes.bool,
  errorBool: PropTypes.bool,
  onBulkSelectBool: PropTypes.bool,
  closeErrorBulk: PropTypes.func,
  headerColor: PropTypes.string,
  bulkAssociateResourceGroupAction: PropTypes.bool,
  resourceGroupName: PropTypes.string,
  onAction: PropTypes.func,
  removeFromResourceGroupBulk: PropTypes.bool,
  onChangeTableMode: PropTypes.func.isRequired,
  viewMode: PropTypes.string,
  isHeaderFixed: PropTypes.bool,
  loadingHeading: PropTypes.string,
  loadingMessage: PropTypes.string,
  fetchingBool: PropTypes.bool,
  searchSpinnerBool: PropTypes.bool,
};

export const defaultProps = {
  id: '',
  indexList: {
    count: 0,
    start: 0,
    total: 0,
    sections: [],
  },
  filterActive: false,
  attributes: [],
  params: {
    start: 0,
    count: 0,
    sort: {
      prop: {
        name: '',
        type: '',
      },
      direction: 'asc',
    },
  },
  inline: true,
  fill: true,
  importEntities: false,
  searchValue: '',
  suggestions: [],
  selectedOther: [],
  sortList: () => {},
  onFilterDeactivate: () => {},
  onSelectOtherFilter: () => {},
  onSelect: () => {},
  onSearch: () => {},
  onFilter: null,
  onImport: () => {},
  changeStatus: () => {},
  isNavSideBarActive: false,
  onResourceIconClick: () => { },
  actions: [],
  selectedTotal: 0,
  bulkOptionBool: false,
  clearAllSelection: () => {},
  currentAction: '',
  numberEntities: '',
  actionLayerActive: false,
  errorBool: false,
  onChangeTableMode: () => {},
  viewMode: 'TABLE',
  isHeaderFixed: true,
  loadingHeading: '',
  loadingMessage: '',
  fetchingBool: false,
  searchSpinnerBool: false,
};

function ListWrapper(props) {
  const {
    id,
    errors,
    onDismissError,
    filterActive,
    sections,
    onFilter,
    onAdd,
    sortList,
    params,
    changeStatus,
    attributes,
    onFilterDeactivate,
    selectedStatus,
    inline,
    fill,
    totalCount,
    currentCount,
    searchValue,
    suggestions,
    onSelect,
    onSearch,
    complianceAttributes,
    sourceAttributes,
    vulnerabilityAttributes,
    iconComp,
    isNavSideBarActive,
    onResourceIconClick,
    onSelectOtherFilter,
    selectedOther,
    intl,
    optionsSelect,
    selectBool,
    selectedOption,
    onOptionSelect,
    actions,
    selectedTotal,
    bulkOptionBool,
    clearAllSelection,
    onBulkSelect,
    onSelectAll,
    onClearAll,
    onImport,
    currentAction,
    numberEntities,
    onActionLayerClose,
    actionLayerActive,
    errorBool,
    onBulkSelectBool,
    closeErrorBulk,
    headerColor,
    bulkAssociateResourceGroupAction,
    resourceGroupName,
    onAction,
    removeFromResourceGroupBulk,
    importEntities,
    onChangeTableMode,
    viewMode,
    isHeaderFixed,
    loadingHeading,
    loadingMessage,
    fetchingBool,
    searchSpinnerBool,
} = props;

  let listFilter;

  if (id === 'Resources') {
    listFilter = (
      <ResourceFilterComponent
        id={`Filter${id}`}
        attributes={attributes}
        selectedStatus={selectedStatus}
        onClose={onFilterDeactivate}
        params={params}
        sortList={sortList}
        changeStatus={changeStatus}
        complianceAttributes={complianceAttributes}
        sourceAttributes={sourceAttributes}
        vulnerabilityAttributes={vulnerabilityAttributes}
      />
    );
  } else {
    listFilter = (
      <FilterComponent
        id={`Filter${id}`}
        attributes={attributes}
        selectedStatus={selectedStatus}
        onClose={onFilterDeactivate}
        params={params}
        sortList={sortList}
        selectedOther={selectedOther}
        onSelectOtherFilter={onSelectOtherFilter}
        changeStatus={changeStatus}
      />
    );
  }

  const actionLayer = (
    <Layer
      closer
      flush
      align="center"
      onClose={onActionLayerClose}
    >
      <Box size={{ width: 'medium' }}>
        <LayerHeader title={currentAction} />
        <ActionMessageForm
          submittedAction={currentAction}
          numberOfEntities={numberEntities}
          resourceGroupName={resourceGroupName}
        />
      </Box>
    </Layer>
  );
  return (
    <Box>
      {fetchingBool &&
        <LoadingLayer />
      }
      <ErrorHandler
        errors={errors}
        onDismissError={onDismissError}
      />
      <a name="top">
        <BulkSelectHeader
          intl={intl}
          actions={actions}
          selectedTotal={selectedTotal}
          bulkOptionBool={bulkOptionBool}
          clearAllSelection={clearAllSelection}
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          errorBool={errorBool}
          closeErrorBulk={closeErrorBulk}
          headerColor={headerColor}
          bulkAssociateResourceGroupAction={bulkAssociateResourceGroupAction}
          onAction={onAction}
          removeFromResourceGroupBulk={removeFromResourceGroupBulk}
          closeIconBool={!!resourceGroupName}
          isFixed={isHeaderFixed}
        />
      </a>
      {
        bulkAssociateResourceGroupAction &&
          <TitleSection
            title={resourceGroupName}
            isNavSideBarActive={isNavSideBarActive}
            visibleProgress
          />
      }
      <Box pad={{ horizontal: 'medium', vertical: 'none' }}>
        { actionLayerActive && actionLayer }
        <Header size="large" pad={{ horizontal: 'none', vertical: 'none' }}>
          <Box align="start">
            <NavControlComponent
              iconComp={iconComp}
              isNavSideBarActive={isNavSideBarActive}
              onResourceIconClick={onResourceIconClick}
            />
          </Box>
          <Box flex="grow" direction="column">
            <SearchSection
              id={id}
              inline={inline}
              fill={fill}
              searchValue={searchValue}
              suggestions={suggestions}
              onSelect={onSelect}
              onSearch={onSearch}
              onImport={onImport}
              onFilter={onFilter}
              onAdd={onAdd}
              optionsSelect={optionsSelect}
              importEntities={importEntities}
              selectBool={selectBool}
              selectedOption={selectedOption}
              onOptionSelect={onOptionSelect}
              onBulkSelect={onBulkSelect}
              onBulkSelectBool={onBulkSelectBool}
              onChangeTableMode={onChangeTableMode}
              viewMode={viewMode}
              filterBool={!!resourceGroupName}
              searchSpinnerBool={searchSpinnerBool}
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
        {sections}
      </Box>
      <Box align="center" pad={{ vertical: 'large' }}>
        {
          totalCount === 10 && currentCount === 0 &&
          <Box direction="row" align="center" className="loadingMain" pad={{ vertical: 'large' }}>
            <Box pad={{ horizontal: 'small' }}><InfoIcon id="infoIcon" size="large" colorIndex="neutral-1" /></Box>
            <Box pad={{ horizontal: 'small' }} size="large" justify="center">
              <span><strong>{loadingHeading}</strong></span>
              <Box id="loadingMessage"><span>{loadingMessage}</span></Box>
            </Box>
            <Box pad={{ horizontal: 'small' }} id="loadingIcon" align="center">
              <Spinning className="loadingListWrapper" />
              <span> {`${intl.formatMessage(messages.loadingData)}`}</span>
            </Box>
          </Box>
        }
        {
          totalCount === 0 && currentCount === 0 &&
          <span>{`${intl.formatMessage(messages.noElementsMessage)}`}</span>
        }
        <Button icon={<LinkUpIcon />} href="#top" id="floatButton" />
      </Box>
    </Box>
  );
}

ListWrapper.propTypes = propTypes;
ListWrapper.defaultProps = defaultProps;

export default injectIntl(ListWrapper);
