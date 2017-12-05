// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layer from 'grommet/components/Layer';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Select from 'grommet/components/Select';
import Sort from 'grommet-addons/components/Sort';
import Box from 'grommet/components/Box';
import CloseIcon from 'grommet/components/icons/base/Close';
import CustomStatusIconComponent from 'components/CustomStatusIconComponent';

const propTypes = {
  id: PropTypes.string,
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
  flush: PropTypes.bool,
  plain: PropTypes.bool,
  inline: PropTypes.bool,
  multiple: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  sortList: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  selectedStatus: PropTypes.object,
  onSelectOtherFilter: PropTypes.func.isRequired,
  selectedOther: PropTypes.array,
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
        type: PropTypes.oneOfType([
          PropTypes.object.isRequired,
          PropTypes.string.isRequired,
        ]),
      }).isRequired,
      groupBy: PropTypes.oneOf(['id', 'name', false]),
      direction: PropTypes.oneOf(['asc', 'desc']),
    }).isRequired,
  }).isRequired,
  defaultLabelNames: PropTypes.shape({
    allFilterLabel: PropTypes.string,
  }),
  allFilterValue: PropTypes.string,
  filterActive: PropTypes.bool,
};

export const defaultProps = {
  id: '',
  flush: true,
  plain: true,
  inline: true,
  multiple: true,
  attributes: [],
  selectedOther: [],
  onClose: () => {},
  sortList: () => {},
  onSelectOtherFilter: () => {},
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
  value: 'critical',
  sort: {
    prop: {
      name: '',
      type: '',
    },
  },
  defaultLabelNames: {
    allFilterLabel: 'All',
  },
  allFilterValue: 'All',
  filterActive: true,
  changeStatus: () => {},
};

const StatusLabel = (properties) => (
  <Box direction="row" align="center" pad={{ between: 'small' }}>
    <CustomStatusIconComponent value={properties.value} />
    <span>{properties.label}</span>
  </Box>
);

class ListFilterLayer extends Component {
  constructor(props) {
    super(props);
    this._onChangeSort = this._onChangeSort.bind(this);
    this._onChangeComboSort = this._onChangeComboSort.bind(this);
    this._renderStatus = this._renderStatus.bind(this);
    this._onChangeStatus = this._onChangeStatus.bind(this);
    this._onChangeSingleSelection = this._onChangeSingleSelection.bind(this);
    this._renderOtherFilter = this._renderOtherFilter.bind(this);
    this.checkSortAttributes = this.checkSortAttributes.bind(this);
    this.renderComboAttributes = this.renderComboAttributes.bind(this);

    this.getOptions = this.getOptions.bind(this);
    this.state = {
      selectedSort: null,
      selectedCombo: null,
      comboAttributes: {},
      defaultAllObject: {
        label: props.defaultLabelNames.allFilterLabel,
        value: props.allFilterValue,
      },
    };
  }

  componentWillMount() {
    const {
      attributes,
      defaultLabelNames,
      allFilterValue,
    } = this.props;

    const sortAttributes = attributes.filter((attribute) => attribute.sort);
    this.setState({
      selectedCombo: sortAttributes[0],
      defaultAllObject: {
        label: defaultLabelNames.allFilterLabel,
        value: allFilterValue,
      },
    });
    this.checkSortAttributes(sortAttributes);
  }

  getOptions(values) {
    const options = values.map((value) => {
      const optionValue = { ...value };
      optionValue.label = <StatusLabel value={value.value} label={value.label} />;
      optionValue.value = value.value;
      return optionValue;
    });
    let allOptions = [{
      ...this.state.defaultAllObject,
    }];
    allOptions = allOptions.concat(options);
    return allOptions;
  }

  _onChangeComboSort(sort) {
    const { sortList } = this.props;
    this.setState({
      selectedCombo: sort,
    });
    if (this.state.comboAttributes[sort.value]) {
      const selectedSort = this.state.comboAttributes[sort.value][0];
      this.setState({
        selectedSort,
      });
      sortList(selectedSort);
    } else {
      sortList(sort);
    }
  }

  _onChangeSort(sort) {
    const { sortList } = this.props;
    this.setState({
      selectedSort: sort,
    });

    sortList(sort);
  }

  _onChangeStatus(event) {
    const {
      selectedStatus,
      changeStatus,
      onSelectOtherFilter,
    } = this.props;
    const {
      defaultAllObject,
    } = this.state;

    if (event.option && event.option.type && event.option.type === 'other') {
      if (event.option.value === defaultAllObject.value || event.value.length === 0) {
        onSelectOtherFilter([{
          ...defaultAllObject,
          name: event.option.name,
        }]);
      } else {
        onSelectOtherFilter(
          event.value.filter((v) => v.value !== defaultAllObject.value),
        );
      }
    } else {
      const name = 'status';
      const nextFilter = selectedStatus;
      let filter;
      if (!event.option.value) {
        // user selected the 'All' option, which has no value, clear filter
        delete nextFilter[name];
      } else {
        // we get the new option passed back as an object,
        // normalize it to just a value
        nextFilter[name] = event.value.map((value) => (
          typeof value === 'object' ? value.value : value),
        );
      }

      if (nextFilter.status[nextFilter.status.length - 1] === defaultAllObject.value) {
        filter = {
          status: [],
        };
      } else {
        filter = {
          status: nextFilter.status.filter((f) => f !== defaultAllObject.value),
        };
      }

      changeStatus(filter);
    }
  }

  _onChangeSingleSelection(event) {
    this.props.onSelectOtherFilter(event.option);
  }

  _renderStatus() {
    const {
      id,
      inline,
      multiple,
      attributes,
      selectedStatus,
    } = this.props;
    const {
      defaultAllObject,
    } = this.state;

    const filterAttributes = attributes.filter((attribute) => attribute.filter);
    if (Object.keys(filterAttributes).length) {
      const options = this.getOptions(filterAttributes[0].filter.values);
      return (
        <Box>
          <Heading tag="h3">Status</Heading>
          <Select
            id={`Status${id}`}
            inline={inline}
            multiple={multiple}
            options={options}
            onChange={this._onChangeStatus}
            value={selectedStatus.status.length ? selectedStatus.status :
              [defaultAllObject.value]}
          />
        </Box>
      );
    }
    return null;
  }

  _renderOtherFilter() {
    const {
      attributes,
      selectedOther,
    } = this.props;
    const {
      defaultAllObject,
    } = this.state;

    const filterOther = attributes.filter((attribute) => attribute.other);
    if (filterOther.length) {
      return filterOther.map((filterData, index) => {
        const selectedOtherFilters =
          selectedOther.filter((filter) => filter.name === filterData.other.name);
        let values;
        if (filterData.other.status) {
          values = filterData.other.values.map((value) => ({
            label: <StatusLabel value={value.value} label={value.label} />,
            value: value.value,
          }));
        } else {
          values = [...filterData.other.values];
        }

        const allOptions = [{
          ...defaultAllObject,
        }, ...values]
          .map((o) => {
            const option = o;
            option.type = 'other';
            option.name = filterData.other.name;
            return option;
          });
        const isDropdown = filterData.other.dropdown;
        let selectedOtherValue = isDropdown ? selectedOtherFilters[0] : selectedOtherFilters;
        if (isDropdown) {
          selectedOtherValue =
            selectedOtherValue ? selectedOtherValue.label : defaultAllObject.label;
        }
        return (
          <Box key={index} pad={{ vertical: 'small', horizontal: 'none' }}>
            <Heading tag="h3">{filterData.other.label}</Heading>
            <Box responsive={false} direction="row" justify="start">
              <Select
                id={filterData.other.name}
                options={allOptions}
                onChange={isDropdown ? this._onChangeSingleSelection : this._onChangeStatus}
                value={selectedOtherValue && selectedOtherValue.length ? selectedOtherValue :
                  [{ ...defaultAllObject, type: 'other' }]}
                multiple={!isDropdown}
                inline={!isDropdown}
              />
            </Box>
          </Box>
        );
      });
    }
    return null;
  }

  checkSortAttributes(sortAttributes) {
    const comboAttributes = {};
    sortAttributes.forEach((attr) => {
      if (attr.combo && attr.combo.length) {
        comboAttributes[attr.value] = [...attr.combo];
      }
    });
    this.setState({
      comboAttributes,
    });
  }

  renderComboAttributes() {
    const {
      id,
      params,
    } = this.props;
    const {
      selectedSort,
      selectedCombo,
      comboAttributes,
    } = this.state;

    if (selectedCombo && comboAttributes[selectedCombo.value]) {
      return (<Sort
        id={`Combo${id}`}
        options={comboAttributes[selectedCombo.value]}
        value={selectedSort.value}
        direction={params.sort.direction}
        onChange={this._onChangeSort}
      />);
    }

    return null;
  }

  render() {
    const { id, onClose, flush, plain, filterActive } = this.props;
    const filterStatus = this._renderStatus();
    const otherFilter = this._renderOtherFilter();
    const comboAttributesSort = this.renderComboAttributes();

    if (!filterActive) {
      return null;
    }

    if (!filterStatus && !otherFilter && !comboAttributesSort) {
      return null;
    }

    return (
      <Layer
        id={`Layer${id}`}
        align="right"
        flush={flush}
        closer={false}
        a11yTitle="List Filter"
        onClose={onClose}
      >
        <Sidebar size="large">
          <div>
            <Header
              size="large"
              justify="between"
              align="center"
              pad={{ horizontal: 'medium', vertical: 'medium' }}
            >
              <Heading tag="h2" margin="none">Filter</Heading>
              <Button
                id={`Close${id}`}
                icon={<CloseIcon />}
                plain={plain}
                onClick={this.props.onClose}
              />
            </Header>

            <Section pad={{ horizontal: 'large', vertical: 'small' }}>
              {filterStatus}
            </Section>
            <Section pad={{ horizontal: 'large', vertical: 'small' }}>
              {otherFilter}
            </Section>
            <Section pad={{ horizontal: 'large', vertical: 'small' }}>
              {comboAttributesSort}
            </Section>
          </div>
        </Sidebar>
      </Layer>
    );
  }
}

ListFilterLayer.propTypes = propTypes;
ListFilterLayer.defaultProps = defaultProps;

export default ListFilterLayer;
