import React from 'react';
import PropTypes from 'prop-types';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

const propTypes = {
  onSelect: PropTypes.func,
  nameHeader: PropTypes.string.isRequired,
  countHeader: PropTypes.number,
  tableContent: PropTypes.array,
};

export default function TableComponent(props) {
  return (
    <Table selectable onSelect={props.onSelect}>
      <thead>
        <TableRow>
          <th>
            {props.nameHeader}
          </th>
          <th>
            {props.countHeader}
          </th>
        </TableRow>
      </thead>
      <tbody>
        {props.tableContent}
      </tbody>
    </Table>
  );
}

TableComponent.propTypes = propTypes;
