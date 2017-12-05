/*
 * - Generates a 'sections' array on given $indexList
 *
 *
 */
import React from 'react';

import _ from 'lodash';
import Tiles from 'grommet/components/Tiles';
import Section from 'grommet/components/Section';
import Header from 'grommet/components/Header';
import Label from 'grommet/components/Label';
import Table from 'grommet/components/Table';
import TableHeader from 'grommet/components/TableHeader';
import DateComponent from 'components/DateComponent';
import { PARAM_TYPES } from './constants';
import { naturalCompare } from './common';

export function getSections(indexList, requestParams) {
  if (
    Object.keys(requestParams.sort).length &&
    requestParams.sort.prop.name !== 'none' &&
    requestParams.sort.prop.group !== false
  ) {
    const propObj = requestParams.sort.prop;
    const prop = propObj.name;
    const groupType = propObj.type;
    const direction = requestParams.sort.direction;
    const display = propObj.display;
    const group = typeof propObj.group !== 'undefined' ? propObj.group : true;
    const nextList = Object.assign(indexList, {});
    let keyToCompare = 'label';

    if (groupType === PARAM_TYPES.TIMESTAMP) {
      keyToCompare = 'value';
    }

    if (groupType === PARAM_TYPES.NUMBER) {
      keyToCompare = 'value';
    }

    let sections = [];
    sections = groupByObj(nextList, prop, groupType, display, group);
    sections = sortDirection(sections, direction, keyToCompare);
    if (groupType === PARAM_TYPES.STRING) {
      sections = sections.map((section) => {
        const elem = section;
        elem.items = sortDirection(elem.items, direction, prop);
        return elem;
      });
    }

    if (groupType === PARAM_TYPES.NUMBER) {
      sections = sections.map((section) => {
        const elem = section;
        elem.items = sortDirection(elem.items, direction, prop);
        return elem;
      });
    }

    nextList.sections = sections;
    return nextList;
  }

  const nextList = Object.assign(indexList, {});
  nextList.items = nextList.members.map((member, index) => {
    const item = member;
    item.uri = `/${index}`; // Needed for Grommet Index to handle unique key warning);
    return item;
  });
  if (nextList.members.length > 0) {
    const value = '';
    const label = '';
    const sections = [];
    const outputSections = {
      count: 1,
      items: nextList.members,
      label,
      value,
    };
    sections.push(outputSections);
    nextList.sections = sections;
  }
  return nextList;
}

function groupByObj(list, prop, groupType, display, group) {
  const listMembers = list.members;
  const outputSections = [];

  listMembers.forEach((member, index) => {
    const listMember = member;
    const property = listMember[prop];
    let value = '';
    let label = '';

    listMember.uri = `/${index}`; // Needed for Grommet Index to handle unique key warning

    if (!group) {
      value = '';
      label = '';
    } else if (groupType === PARAM_TYPES.OBJECT) {
      value = property.id;
      label = property.name;
    } else if (groupType === PARAM_TYPES.STRING) {
      value = property;
      label = property;
    } else if (groupType === PARAM_TYPES.NUMBER) {
      const sortedValue = groupByNumber(property);
      value = sortedValue.value;
      label = <DateComponent date={sortedValue.label} header={prop} />;
    } else if (groupType === PARAM_TYPES.TIMESTAMP) {
      const sortedDate = groupByDate(property);
      value = sortedDate.value;
      label = <DateComponent date={sortedDate.label} />;
    }

    const existingSection = _.find(outputSections, (section) => section.value === value);


    if (existingSection) {
      existingSection.items.push(listMember);
      existingSection.count = existingSection.count + 1;
    } else {
      outputSections.push({
        count: 1,
        items: [listMember],
        label,
        value,
      });
    }
  });

  return outputSections;
}

export function renderSections(
  nextResults, getNext, component, viewMode, navigateToDetails, tableHeaders) {
  const sections = [];
  if (nextResults.sections) {
    const sectionsLength = nextResults.sections.length;

    if (viewMode !== 'TABLE') {
      nextResults.sections.forEach((section, index) => {
        if (section.items.length > 0) {
          sections.push(
            renderSection(section.label, section.items, getNext, sectionsLength, index, component),
          );
        }
      });
    } else {
      nextResults.sections.forEach((section, index) => {
        if (section.items.length > 0) {
          sections.push(
            renderTableSection(section.label, section.items, getNext,
              sectionsLength, index, component, navigateToDetails, tableHeaders),
          );
        }
      });
    }
  }
  return sections;
}

function renderSection(label, items = [], onMore, sectionsLength, index, component) {
  const TileComponent = component;
  const tiles = items.map((item, tilesindex) => (
    <TileComponent id={item.id || ''} key={item.uri} item={item} index={tilesindex} />
  ));
  let header;
  if (label) {
    header = (
      <Header
        size="medium"
        justify="start"
        responsive={false}
        pad={{ horizontal: 'small' }}
      >
        <span>{label}</span>
      </Header>
    );
  }
  return (
    <Section key={`section-${index}`} pad="none">
      {header}
      <Tiles
        key={index}
        flush={false}
        fill={false}
        onMore={index === sectionsLength - 1 ? onMore : undefined}
        selectable
      >
        {tiles}
      </Tiles>
    </Section>
  );
}

function renderTableSection(label, items = [], onMore, sectionsLength, index,
  component, navigateToDetails, tableHeaders) {
  const TableComponent = component;
  const tables = items.map((item, tilesindex) => (
    <TableComponent id={item.id || ''} key={item.uri} item={item} index={tilesindex} navigateToDetails={navigateToDetails} />
  ));
  let header;
  if (label) {
    header = (
      <Header
        size="medium"
        justify="start"
        responsive={false}
        pad={{ horizontal: 'small' }}
      >
        <Label size="medium">{label}</Label>
      </Header>
    );
  }
  return (
    <Section key={`section-${index}`} pad="none">
      {header}
      <Table
        id="listTable"
        key={index}
        onMore={index === sectionsLength - 1 ? onMore : undefined}
        selectable
      >
        <TableHeader labels={tableHeaders} />
        <tbody>
          {tables}
        </tbody>
      </Table>
    </Section>
  );
}

export function renderBulkSections(nextResults, getNext, component,
  bulkOperationToDo = () => { }, selectedEntities, checkBoxBool, selectAllBool,
  viewMode, navigateToDetails, tableHeaders) {
  const sections = [];
  if (nextResults.sections) {
    const sectionsLength = nextResults.sections.length;
    if (viewMode !== 'TABLE') {
      nextResults.sections.forEach((section, index) => {
        if (section.items.length > 0) {
          sections.push(
            renderBulkSection(section.label,
              section.items, getNext, sectionsLength, index, component,
              bulkOperationToDo, selectedEntities, checkBoxBool, selectAllBool, navigateToDetails),
          );
        }
      });
    } else {
      nextResults.sections.forEach((section, index) => {
        if (section.items.length > 0) {
          sections.push(
            renderBulkTableSection(section.label,
              section.items, getNext, sectionsLength, index, component,
              bulkOperationToDo, selectedEntities, checkBoxBool, selectAllBool,
              navigateToDetails, tableHeaders),
          );
        }
      });
    }
  }
  return sections;
}

function renderBulkSection(label, items = [], onMore, sectionsLength,
  index, component, bulkOperationToDo,
  selectedEntities, checkBoxBool, selectAllBool, navigateToDetails) {
  const TileComponent = component;
  const tiles = items.map((item, tilesindex) => (
    <TileComponent
      id={item.id || ''}
      key={item.uri}
      item={item}
      index={tilesindex}
      onCheckBoxClick={bulkOperationToDo}
      selectedResources={selectedEntities}
      checkBoxBool={checkBoxBool}
      selectAllBool={selectAllBool}
      navigateToDetails={navigateToDetails}
    />
  ));
  let header;
  if (label) {
    header = (
      <Header
        size="medium"
        justify="start"
        responsive={false}
        pad={{ horizontal: 'small' }}
      >
        <span>{label}</span>
      </Header>
    );
  }
  return (
    <Section key={`section-${index}`} pad="none">
      {header}
      <Tiles
        key={index}
        flush={false}
        fill={false}
        onMore={index === sectionsLength - 1 ? onMore : undefined}
        selectable={!checkBoxBool}
      >
        {tiles}
      </Tiles>
    </Section>
  );
}

function renderBulkTableSection(label, items = [], onMore, sectionsLength,
  index, component, bulkOperationToDo,
  selectedEntities, checkBoxBool, selectAllBool, navigateToDetails, tableHeaders) {
  const TableComponent = component;
  const tables = items.map((item, tilesindex) => (
    <TableComponent
      id={item.id || ''}
      key={item.uri}
      item={item}
      index={tilesindex}
      onCheckBoxClick={bulkOperationToDo}
      selectedResources={selectedEntities}
      checkBoxBool={checkBoxBool}
      selectAllBool={selectAllBool}
      navigateToDetails={navigateToDetails}
    />
  ));
  let header;
  if (label) {
    header = (
      <Header
        size="medium"
        justify="start"
        responsive={false}
        pad={{ horizontal: 'small' }}
      >
        <Label size="medium">{label}</Label>
      </Header>
    );
  }
  return (
    <Section key={`section-${index}`} id="tableSection" pad="none">
      {header}
      <Table
        key={index}
        id="listTableBulk"
        onMore={index === sectionsLength - 1 ? onMore : undefined}
        selectable
      >
        <TableHeader labels={tableHeaders} />
        <tbody>
          {tables}
        </tbody>
      </Table>
    </Section>
  );
}


function sortDirection(nextList, direction, keyToCompare) {
  const list = nextList;
  if (direction === 'asc') {
    list.sort((a, b) => naturalCompare(a[keyToCompare], b[keyToCompare]));
  } else {
    list.sort((a, b) => naturalCompare(b[keyToCompare], a[keyToCompare]));
  }
  return list;
}

export function groupByDate(date) {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  const serverDate = new Date(parseInt(date, 10));
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset();

  const today = {
    label: 'today', // These labels are used with intl (e.g. messages['today']);
    value: '1',
  };
  const lastWeek = {
    label: 'lastWeek',
    value: '2',
  };
  const lastMonth = {
    label: 'lastMonth',
    value: '3',
  };
  const older = {
    label: 'older',
    value: '4',
  };
  let sortedTime = {};


  let localDate = serverDate.getTime() + (timezoneOffset * MINUTE);
  localDate = new Date(localDate);

  const todayOffset = {
    seconds: now.getSeconds(),
    minutes: now.getMinutes(),
    hours: now.getHours(),
  };

  const todayTimeOffset =
    (todayOffset.seconds * SECOND) +
    (todayOffset.minutes * MINUTE) +
    (todayOffset.hours * HOUR);

  const weekTimeOffset = todayTimeOffset + (DAY * 6);
  const monthTimeOffset = todayTimeOffset + (DAY * 29);

  if ((now - todayTimeOffset) < localDate) {
    sortedTime = today;
  } else if ((now - weekTimeOffset) < localDate) {
    sortedTime = lastWeek;
  } else if ((now - monthTimeOffset) < localDate) {
    sortedTime = lastMonth;
  } else {
    sortedTime = older;
  }

  return sortedTime;
}

function groupByNumber(property) {
  const lessThanTen = {
    label: 'lessThanTen',
    value: '5',
  };
  const tenOrMore = {
    label: 'tenOrMore',
    value: '6',
  };
  const fortyOrMore = {
    label: 'fortyOrMore',
    value: '7',
  };
  const ninetyOrMore = {
    label: 'ninetyOrMore', // These labels are used with intl (e.g. messages['today']);
    value: '8',
  };

  let sortedValue = {};
  if (property < 10) {
    sortedValue = lessThanTen;
  } else if (property < 40) {
    sortedValue = tenOrMore;
  } else if (property < 90) {
    sortedValue = fortyOrMore;
  } else if (property >= 90) {
    sortedValue = ninetyOrMore;
  }
  return sortedValue;
}
