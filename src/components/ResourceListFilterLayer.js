// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Layer from 'grommet/components/Layer';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Select from 'grommet/components/Select';
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
    ]),
  ).isRequired,
  complianceAttributes: PropTypes.array,
  flush: PropTypes.bool,
  plain: PropTypes.bool,
  inline: PropTypes.bool,
  multiple: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  sortList: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  selectedStatus: PropTypes.object,
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
          PropTypes.number.isRequired,
        ]),
      }).isRequired,
      groupBy: PropTypes.oneOf(['id', 'name', 'number', false]),
      direction: PropTypes.oneOf(['asc', 'desc']).isRequired,
    }).isRequired,
  }).isRequired,
};

export const defaultProps = {
  id: '',
  flush: true,
  plain: true,
  inline: true,
  multiple: true,
  attributes: [],
  capacityAttributes: [],
  complianceAttributes: [],
  onClose: () => {},
  sortList: () => {},
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
  label: 'All',
  changeStatus: () => {},
};

const StatusLabel = (properties) => (
  <Box direction="row" align="center" pad={{ between: 'small' }}>
    <CustomStatusIconComponent value={properties.value} />
    <span>{properties.label}</span>
  </Box>
);

const utilizationParams = ['Utilization', 'Allocation', 'Optimization', 'Forecast'];

class ResourceListFilterLayer extends Component {
  constructor() {
    super();
    this._onChangeSort = this._onChangeSort.bind(this);
    this._onChangeInitialSort = this._onChangeInitialSort.bind(this);
    this._renderStatus = this._renderStatus.bind(this);
    this._renderComplianceStatus = this._renderComplianceStatus.bind(this);
    this._onChangeStatus = this._onChangeStatus.bind(this);
    this._onChangeComplianceStatus = this._onChangeComplianceStatus.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.state = {
      renderCapacitySort: false,
      selectedUtilParam: undefined,
      capacitySortValue: 'Cpu',
      status: [],
      complianceStatus: [],
    };
  }

  componentWillMount() {
    const { params } = this.props;
    const sortParamName = params.sort.prop.name;
    let firstSortLabel;
    let secondSortLabel;
    const isUtilSort = utilizationParams.some((v) => {
      const isPresent = sortParamName.indexOf(v) >= 0;
      if (isPresent) {
        firstSortLabel = sortParamName.substring(sortParamName.indexOf(v));
        secondSortLabel = sortParamName.substring(0, sortParamName.indexOf(v));
      }
      return isPresent;
    });
    this.setState({
      renderCapacitySort: isUtilSort,
      selectedUtilParam: firstSortLabel,
      capacitySortValue: secondSortLabel || 'Cpu',
    });
  }

  getOptions(values) {
    const options = values.map((value) => {
      const optionValue = value;
      optionValue.label = <StatusLabel value={value.value} label={value.label} />;
      optionValue.value = value.value;
      return optionValue;
    });
    let allOptions = [{ label: 'All', value: 'all' }];
    allOptions = allOptions.concat(options);
    return allOptions;
  }

  _onChangeSort(sort) {
    const capacitySortParam = Object.assign({}, sort);
    this.setState({ capacitySortValue: sort.value });
    capacitySortParam.value = `${sort.value}${this.state.selectedUtilParam}`;
    const { sortList } = this.props;
    sortList(capacitySortParam);
  }

  _onChangeInitialSort(sort) {
    const { sortList } = this.props;
    if (_.indexOf(utilizationParams, sort.value) === -1) {
      this.setState({ renderCapacitySort: false, selectedUtilParam: undefined });
      sortList(sort);
    } else {
      const capacitySortParam = Object.assign({}, sort);
      capacitySortParam.value = `${this.state.capacitySortValue}${sort.value}`;
      sortList(capacitySortParam);
      this.setState({ renderCapacitySort: true, selectedUtilParam: sort.value });
    }
  }

  _onChangeStatus(event) {
    const { selectedStatus, changeStatus } = this.props;
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

    if (nextFilter.status[nextFilter.status.length - 1] === 'all') {
      filter = {
        status: [],
      };
    } else {
      filter = {
        status: nextFilter.status.filter((f) => f !== 'all'),
      };
    }
    this.setState({ status: filter.status });
    filter.complianceStatus = this.state.complianceStatus;
    changeStatus(filter);
  }

  _onChangeComplianceStatus(event) {
    const { selectedStatus, changeStatus } = this.props;
    const name = 'complianceStatus';
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

    if (nextFilter.complianceStatus[nextFilter.complianceStatus.length - 1] === 'all') {
      filter = {
        complianceStatus: [],
      };
    } else {
      filter = {
        complianceStatus: nextFilter.complianceStatus.filter((f) => f !== 'all'),
      };
    }
    this.setState({ complianceStatus: filter.complianceStatus });
    filter.status = this.state.status;
    changeStatus(filter);
  }

  _renderStatus() {
    const { id, inline, multiple, attributes, selectedStatus } = this.props;
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
            value={selectedStatus.status && selectedStatus.status.length ? selectedStatus.status : ['all']}
          />
        </Box>
      );
    }
    return null;
  }

  _renderComplianceStatus() {
    const { id, inline, multiple, complianceAttributes, selectedStatus } = this.props;
    const filterAttributes = complianceAttributes.filter((attribute) => attribute.filter);
    if (Object.keys(filterAttributes).length) {
      const options = this.getOptions(filterAttributes[0].filter.values);
      return (
        <Box>
          <Heading tag="h3">Compliance Status</Heading>
          <Select
            id={`ComplianceStatus${id}`}
            inline={inline}
            multiple={multiple}
            options={options}
            onChange={this._onChangeComplianceStatus}
            value={selectedStatus.complianceStatus && selectedStatus.complianceStatus.length ? selectedStatus.complianceStatus : ['all']}
          />
        </Box>
      );
    }
    return null;
  }

  render() {
    const { id, onClose, flush, plain } = this.props;
    const filterStatus = this._renderStatus();
    const complianceFilterStatus = this._renderComplianceStatus();
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
              {complianceFilterStatus}
            </Section>
          </div>
        </Sidebar>
      </Layer>
    );
  }
}

ResourceListFilterLayer.propTypes = propTypes;
ResourceListFilterLayer.defaultProps = defaultProps;

export default ResourceListFilterLayer;
