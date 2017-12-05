// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Heading from 'grommet/components/Heading';
import Sort from 'grommet-addons/components/Sort';
import Box from 'grommet/components/Box';

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
  sortList: PropTypes.func.isRequired,
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
};

export const defaultProps = {
  id: '',
  attributes: [],
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
};

class SortComponent extends Component {
  constructor(props) {
    super(props);
    this._onChangeComboSort = this._onChangeComboSort.bind(this);
  }

  _onChangeComboSort(sort) {
    const { sortList } = this.props;
    sortList(sort);
  }

  render() {
    const { id, attributes, params } = this.props;
    const sortAttributes = attributes.filter((attribute) => attribute.sort);

    return (
      <Box direction="column" align="start" className="SortSelectBox">
        <Heading tag="h4">Sort</Heading>
        <Sort
          id={`Sort${id}`}
          options={sortAttributes}
          value={params.sort.prop.name}
          direction={params.sort.direction}
          onChange={this._onChangeComboSort}
          className="SortSelect"
        />
      </Box>
    );
  }
}

SortComponent.propTypes = propTypes;
SortComponent.defaultProps = defaultProps;

export default SortComponent;
