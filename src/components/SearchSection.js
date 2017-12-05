import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from 'grommet/components/Header';
import Search from 'grommet/components/Search';
import FilterControl from 'grommet-addons/components/FilterControl';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Select from 'grommet/components/Select';
import Add from 'grommet/components/icons/base/Add';
import TaskIcon from 'grommet/components/icons/base/Task';
import UploadIcon from 'grommet/components/icons/base/Upload';
import TableIcon from 'grommet/components/icons/base/Table';
import SplitIcon from 'grommet/components/icons/base/Split';
import Spinning from 'grommet/components/icons/Spinning';
import _ from 'lodash';
import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const propTypes = {
  id: PropTypes.string,
  intl: intlShape.isRequired,
  inline: PropTypes.bool,
  fill: PropTypes.bool,
  searchValue: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.node.isRequired,
    ]).isRequired,
  })),
  onSelect: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  importEntities: PropTypes.bool,
  onFilter: PropTypes.func,
  onImport: PropTypes.func,
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
  onBulkSelect: PropTypes.func,
  onBulkSelectBool: PropTypes.bool,
  onChangeTableMode: PropTypes.func,
  viewMode: PropTypes.string,
  filterBool: PropTypes.bool,
  searchSpinnerBool: PropTypes.bool,
};

export const defaultProps = {
  intl: '',
  id: '',
  inline: true,
  fill: true,
  importEntities: false,
  searchValue: '',
  suggestions: [],
  onSelect: () => { },
  onSearch: () => { },
  onImport: () => { },
  onFilter: null,
  selectBool: false,
  onBulkSelectBool: false,
  filterBool: false,
  searchSpinnerBool: false,
};

class SearchSection extends React.Component {

  // We need this in order prevent the component to rerender and come in focus
  // when the next page of the list is loading
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.searchValue !== this.props.searchValue ||
      nextProps.onBulkSelectBool !== this.props.onBulkSelectBool ||
      nextProps.selectedOption !== this.selectedOption ||
      nextProps.viewMode !== this.viewMode ||
      (
        // Check if the arrays are identical only if their length differs
        // to avoid a lot of processing
        nextProps.suggestions.length !== this.props.suggestions.length &&
        !_.isEqual(nextProps.suggestions.sort(), this.props.suggestions.sort())
      )
    );
  }

  render() {
    const {
      id,
      inline,
      fill,
      searchValue,
      suggestions,
      onSelect,
      onSearch,
      onImport,
      onFilter,
      onAdd,
      selectBool,
      optionsSelect,
      selectedOption,
      onOptionSelect,
      onBulkSelect,
      onBulkSelectBool,
      importEntities,
      onChangeTableMode,
      viewMode,
      filterBool,
      intl,
      searchSpinnerBool,
    } = this.props;

    return (
      <Header id="headerSearchSelect" size="large" pad={{ horizontal: 'small', vertical: 'small' }}>
        <Box flex="grow" direction="row" justify="between" align="center" id="searchMainBox">
          <Box flex="grow" direction="row" id="SearchBox">
            {selectBool &&
              <Select
                id="listSelect"
                placeHolder={'Search by'}
                options={optionsSelect}
                value={selectedOption || optionsSelect[0].label}
                onChange={onOptionSelect}
              />
            }
            {
              onSearch &&
              <Box flex="grow">
                <Search
                  id={`Search${id}`}
                  inline={inline}
                  fill={fill}
                  size="medium"
                  placeHolder="Search"
                  value={searchValue}
                  suggestions={suggestions}
                  onSelect={onSelect}
                  onDOMChange={onSearch}
                />
              </Box>
            }
            { searchSpinnerBool &&
              <div className="searchSpinnerContainer2">
                <Spinning className="searchSpinnerIcon" />
              </div>
            }
          </Box>
          <Box direction="row" className="secondary" align="center" id="iconsBox">
            {
              !!onFilter &&
                (
                  !onSearch ?
                    <Box align="end" className="tooltip">
                      <FilterControl onClick={onFilter} />
                      <span className="tooltiptextfilter">{intl.formatMessage(messages.filterIcon)}</span>
                    </Box>
                    :
                    <Box className="tooltip">
                      <FilterControl onClick={onFilter} />
                      <span className="tooltiptextfilter">{intl.formatMessage(messages.filterIcon)}</span>
                    </Box>
                )
            }
            {
              onAdd && typeof onAdd === 'function' &&
              <Button
                id="Add"
                icon={<Add />}
                onClick={onAdd}
                className="tooltip"
              >
                <span className="tooltiptext">{intl.formatMessage(messages.createIcon)}</span>
              </Button>
            }
            {
              onAdd && typeof onAdd === 'string' &&
              <Link to={onAdd}>
                <Button
                  id="Add"
                  icon={<Add />}
                  onClick={() => { }}
                  className="tooltip"
                >
                  <span className="tooltiptext">{intl.formatMessage(messages.createIcon)}</span>
                </Button>
              </Link>
            }
            {
              onBulkSelect && typeof onBulkSelect === 'function' && !filterBool &&
                <Button
                  id="onSelectBulkMode"
                  icon={<TaskIcon colorIndex={onBulkSelectBool ? 'brand' : ''} />}
                  onClick={onBulkSelect}
                  className="tooltip"
                >
                  <span className="tooltiptext">{intl.formatMessage(messages.bulkSelectIcon)}</span>
                </Button>
            }
            {
              importEntities && !filterBool &&
              <Button
                id="importFile"
                icon={<UploadIcon />}
                onClick={onImport}
                className="tooltip"
              >
                <span className="tooltiptext">{intl.formatMessage(messages.importIcon)}</span>
              </Button>
            }
            <Button
              id="TileView"
              plain
              onClick={() => { onChangeTableMode('TILE'); }}
              icon={<SplitIcon {...viewMode === 'TILE' ? { colorIndex: 'brand' } : ''} />}
              className="tooltip"
            >
              <span className="tooltiptext">{intl.formatMessage(messages.tileIcon)}</span>
            </Button>
            <Button
              id="TableView"
              plain
              onClick={() => { onChangeTableMode('TABLE'); }}
              icon={<TableIcon {...viewMode === 'TABLE' ? { colorIndex: 'brand' } : ''} />}
              className="tooltip"
            >
              <span className="tooltiptext">{intl.formatMessage(messages.tableIcon)}</span>
            </Button>
          </Box>
        </Box>
      </Header>
    );
  }
}

SearchSection.propTypes = propTypes;
SearchSection.defaultProps = defaultProps;

export default injectIntl(SearchSection);
