import React from 'react';
import PropTypes from 'prop-types';
import Header from 'grommet/components/Header';
import Search from 'grommet/components/Search';
import FilterControl from 'grommet-addons/components/FilterControl';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Select from 'grommet/components/Select';
import TaskIcon from 'grommet/components/icons/base/Task';
import _ from 'lodash';

const propTypes = {
  id: PropTypes.string,
  inline: PropTypes.bool,
  fill: PropTypes.bool,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  searchValue: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.node.isRequired,
    ]).isRequired,
  })),
  onSelect: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  onFilter: PropTypes.func.isRequired,
  optionsSelect: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
  })),
  onBulkSelectBool: PropTypes.bool,
  showBulkButton: PropTypes.bool,
  showBulkActions: PropTypes.bool,
  onShowBulkActions: PropTypes.func,
  onHideBulkActions: PropTypes.func,
};

export const defaultProps = {
  id: '',
  inline: true,
  fill: true,
  actions: [],
  importEntities: false,
  showBulkButton: false,
  searchValue: '',
  suggestions: [],
  optionsSelect: [],
  onSelect: () => {},
  onSearch: () => {},
  onFilter: () => {},
  onImport: () => {},
};

class SearchSection extends React.Component {
  constructor(props) {
    super(props);

    this.onOptionSelect = this.onOptionSelect.bind(this);
    this.onSearch = this.onSearch.bind(this);

    this.state = {
      selectedSearchBy: '',
    };
  }

  componentWillMount() {
    const {
      searchValue,
      optionsSelect,
    } = this.props;

    if (optionsSelect.length) {
      this.setState({
        selectedSearchBy: optionsSelect[0],
        searchValue,
      });
    }
  }

  // We need this in order prevent the component to rerender and come in focus
  // when the next page of the list is loading
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.searchValue !== this.props.searchValue ||
      nextProps.onBulkSelectBool !== this.props.onBulkSelectBool ||
      nextProps.selectedOption !== this.selectedOption ||
      nextProps.showBulkActions !== this.props.showBulkActions ||
      nextState.selectedSearchBy !== this.state.selectedSearchBy ||
      (
        // Check if the arrays are identical only if their length differs
        // to avoid a lot of processing
        nextProps.suggestions.length !== this.props.suggestions.length &&
        !_.isEqual(nextProps.suggestions.sort(), this.props.suggestions.sort())
      )
    );
  }

  onOptionSelect({ option }) {
    const { searchValue } = this.state;
    this.setState({
      selectedSearchBy: option,
    });
    this.props.onSearch(searchValue, option);
  }

  onSearch({ target: { value } }) {
    const {
      selectedSearchBy,
    } = this.state;

    this.setState({
      searchValue: value,
    });

    if (selectedSearchBy) {
      this.props.onSearch(value, selectedSearchBy);
    } else {
      this.props.onSearch(value);
    }
  }

  render() {
    const {
      id,
      inline,
      fill,
      actions,
      searchValue,
      suggestions,
      onSelect,
      onSearch,
      onFilter,
      optionsSelect,
      showBulkActions,
      onShowBulkActions,
      onHideBulkActions,
      showBulkButton,
    } = this.props;

    const {
      selectedSearchBy,
    } = this.state;

    return (
      <Header id="headerSearchSelect" size="large" pad={{ horizontal: 'medium', vertical: 'none' }}>
        { !!optionsSelect.length &&
          <Select
            id="listSelect"
            placeHolder={'Search by'}
            options={optionsSelect}
            value={selectedSearchBy}
            onChange={this.onOptionSelect}
          />
        }
        {
          onSearch &&
            <Search
              id={`Search${id}`}
              inline={inline}
              fill={fill}
              size="medium"
              placeHolder="Search"
              value={searchValue}
              suggestions={suggestions}
              onSelect={onSelect}
              onDOMChange={this.onSearch}
            />
        }
        {
          !onSearch ?
            <Box basis="full" pad="small" align="end">
              <FilterControl onClick={onFilter} />
            </Box>
            :
            <FilterControl onClick={onFilter} />
        }
        {
          showBulkButton &&
            <Button
              icon={<TaskIcon colorIndex={showBulkActions ? 'brand' : ''} />}
              onClick={showBulkActions ? onHideBulkActions : onShowBulkActions}
            />
        }
        {
          !!actions && !!actions.length &&
            actions.map((action) => (
              <Button
                icon={action.icon}
                onClick={action.onClick}
              />
          ))
        }
      </Header>
    );
  }
}

SearchSection.propTypes = propTypes;
SearchSection.defaultProps = defaultProps;

export default SearchSection;
