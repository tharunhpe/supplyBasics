// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Select from 'grommet/components/Select';
import Box from 'grommet/components/Box';
import CloseIcon from 'grommet/components/icons/base/Close';
import CustomStatusIconComponent from 'components/CustomStatusIconComponent';
import ResourceSortComponent from './ResourceSortComponent';

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
  sourceAttributes: PropTypes.array,
  vulnerabilityAttributes: PropTypes.array,
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
  complianceAttributes: [],
  sourceAttributes: [],
  vulnerabilityAttributes: [],
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

const allOption = 'all';
const StatusLabel = (properties) => (
  <Box direction="row" align="center" pad={{ between: 'small' }}>
    <CustomStatusIconComponent value={properties.value} />
    <span>{properties.label}</span>
  </Box>
);

class ResourceListFilterLayer extends Component {
  constructor() {
    super();
    this._onChangeSort = this._onChangeSort.bind(this);
    this._renderStatus = this._renderStatus.bind(this);
    this._renderComplianceStatus = this._renderComplianceStatus.bind(this);
    this._onChangeStatus = this._onChangeStatus.bind(this);
    this._onChangeComplianceStatus = this._onChangeComplianceStatus.bind(this);
    this._onChangeSource = this._onChangeSource.bind(this);
    this._onChangeVulnerabilityStatus = this._onChangeVulnerabilityStatus.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.state = {
      selectedSort: null,
      status: [],
      complianceStatus: [],
      vulnerabilityStatus: [],
      source: [],
    };
  }

  getOptions(values) {
    const options = values.map((value) => {
      const optionValue = value;
      optionValue.label = <StatusLabel value={value.value} label={value.label} />;
      optionValue.value = value.value;
      return optionValue;
    });
    let allOptions = [{ label: 'All', value: allOption }];
    allOptions = allOptions.concat(options);
    return allOptions;
  }

  getOptionsForSource(values) {
    const options = values.map((value) => {
      const optionValue = value;
      optionValue.label = value.label;
      optionValue.value = value.value;
      return optionValue;
    });
    let allOptions = [{ label: 'All', value: allOption }];
    allOptions = allOptions.concat(options);
    return allOptions;
  }


  _onChangeSort(sort) {
    const { sortList } = this.props;
    this.setState({
      selectedSort: sort,
    });

    sortList(sort);
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

    if (nextFilter.status[nextFilter.status.length - 1] === allOption) {
      filter = {
        status: [],
      };
    } else {
      filter = {
        status: nextFilter.status.filter((f) => f !== allOption),
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

    if (nextFilter.complianceStatus[nextFilter.complianceStatus.length - 1] === allOption) {
      filter = {
        complianceStatus: [],
      };
    } else {
      filter = {
        complianceStatus: nextFilter.complianceStatus.filter((f) => f !== allOption),
      };
    }
    this.setState({ complianceStatus: filter.complianceStatus });
    filter.status = this.state.status;
    changeStatus(filter);
  }

  _onChangeVulnerabilityStatus(event) {
    const { selectedStatus, changeStatus } = this.props;
    const name = 'vulnerabilityStatus';
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

    if (nextFilter.vulnerabilityStatus[nextFilter.vulnerabilityStatus.length - 1] === allOption) {
      filter = {
        vulnerabilityStatus: [],
      };
    } else {
      filter = {
        vulnerabilityStatus: nextFilter.vulnerabilityStatus.filter((f) => f !== allOption),
      };
    }
    this.setState({ vulnerabilityStatus: filter.vulnerabilityStatus });
    filter.status = this.state.status;
    changeStatus(filter);
  }

  _onChangeSource(event) {
    const { selectedStatus, changeStatus } = this.props;
    const name = 'source';
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

    if (nextFilter.source[nextFilter.source.length - 1] === allOption) {
      filter = {
        source: [],
      };
    } else {
      filter = {
        source: nextFilter.source.filter((f) => f !== allOption),
      };
    }
    this.setState({ source: filter.source });
    filter.status = this.state.status;
    changeStatus(filter);
  }

  _renderStatus() {
    const { id, inline, multiple, attributes, selectedStatus } = this.props;
    const filterAttributes = attributes.filter((attribute) => attribute.filter);
    if (Object.keys(filterAttributes).length) {
      const options = this.getOptions(filterAttributes[0].filter.values);
      return (
        <Box direction="column">
          <Heading tag="h4">Status</Heading>
          <Select
            id={`Status${id}`}
            inline={inline}
            multiple={multiple}
            options={options}
            onChange={this._onChangeStatus}
            value={selectedStatus.status && selectedStatus.status.length ?
              selectedStatus.status : [allOption]}
            className="filterSelect"
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
        <Box direction="column">
          <Heading tag="h4">Compliance Status</Heading>
          <Select
            id={`ComplianceStatus${id}`}
            inline={inline}
            multiple={multiple}
            options={options}
            onChange={this._onChangeComplianceStatus}
            value={selectedStatus.complianceStatus && selectedStatus.complianceStatus.length ?
              selectedStatus.complianceStatus : [allOption]}
            className="filterSelect"
          />
        </Box>
      );
    }
    return null;
  }
  _renderVulnerabilityStatus() {
    const { id, inline, multiple, vulnerabilityAttributes, selectedStatus } = this.props;
    const filterAttributes = vulnerabilityAttributes.filter((attribute) => attribute.filter);
    if (Object.keys(filterAttributes).length) {
      const options = this.getOptions(filterAttributes[0].filter.values);
      return (
        <Box direction="column">
          <Heading tag="h4">Vulnerability Status</Heading>
          <Select
            id={`VulnerabilityStatus${id}`}
            inline={inline}
            multiple={multiple}
            options={options}
            onChange={this._onChangeVulnerabilityStatus}
            value={selectedStatus.vulnerabilityStatus && selectedStatus.vulnerabilityStatus.length ?
              selectedStatus.vulnerabilityStatus : [allOption]}
            className="filterSelect"
          />
        </Box>
      );
    }
    return null;
  }

  _renderSource() {
    const { id, inline, multiple, sourceAttributes, selectedStatus } = this.props;
    const filterAttributes = sourceAttributes.filter((attribute) => attribute.filter);
    if (Object.keys(filterAttributes).length) {
      const options = this.getOptionsForSource(filterAttributes[0].filter.values);
      return (
        <Box direction="column">
          <Heading tag="h4">Source</Heading>
          <Select
            id={`Source${id}`}
            inline={inline}
            multiple={multiple}
            options={options}
            onChange={this._onChangeSource}
            value={selectedStatus.source && selectedStatus.source.length ?
              selectedStatus.source : [allOption]}
            className="filterSelect"
          />
        </Box>
      );
    }
    return null;
  }

  render() {
    const { id, onClose, plain, attributes, params, sortList } = this.props;
    const filterStatus = this._renderStatus();
    const complianceFilterStatus = this._renderComplianceStatus();
    const vulnerabilityFilterStatus = this._renderVulnerabilityStatus();
    const sourceFilterStatus = this._renderSource();
    return (
      <Box
        id={`Filter${id}`}
      >
        <Box>
          <div>
            <Header
              size="large"
              justify="between"
              align="start"
              pad={{ horizontal: 'small', vertical: 'small' }}
            >
              <Box direction="row">
                <Section pad={{ horizontal: 'medium', vertical: 'none' }} separator="right">
                  {filterStatus}
                </Section>
                <Section pad={{ horizontal: 'medium', vertical: 'none' }} separator="right">
                  {complianceFilterStatus}
                </Section>
                <Section pad={{ horizontal: 'medium', vertical: 'none' }} separator="right">
                  {sourceFilterStatus}
                </Section>
                <Section pad={{ horizontal: 'medium', vertical: 'none' }} separator="right">
                  {vulnerabilityFilterStatus}
                </Section>
                <Section pad={{ horizontal: 'medium', vertical: 'none' }} separator="none">
                  <ResourceSortComponent
                    id={`Filter${id}`}
                    attributes={attributes}
                    params={params}
                    sortList={sortList}
                  />
                </Section>
              </Box>
              <Button
                id={`Close${id}`}
                icon={<CloseIcon />}
                plain={plain}
                onClick={onClose}
              />
            </Header>
          </div>
        </Box>
      </Box>
    );
  }
}

ResourceListFilterLayer.propTypes = propTypes;
ResourceListFilterLayer.defaultProps = defaultProps;

export default ResourceListFilterLayer;
