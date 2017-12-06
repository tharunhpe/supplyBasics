import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import CartIcon from 'grommet/components/icons/base/Cart';
import Button from 'grommet/components/Button';
import Select from 'grommet/components/Select';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Split from 'grommet/components/Split';
import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';
import Heading from 'grommet/components/Heading';
import Animate from 'grommet/components/Animate';
import Search from 'grommet/components/Search';
import Label from 'grommet/components/Label';
import CheckBox from 'grommet/components/CheckBox';
import {
  DEBOUNCE_SEARCH_TIME,
  FILTER_SQL_OPERATORS,
} from 'utils/constants';
import {
  getApp,
  getRequestParams,
} from './appSelector';
import {
  loadApp,
  loadNextApp,
  setQueryParams,
} from './appStore';
import {
  DEFAULT_QUERY,
  filter,
} from './constants';


const propTypes = {
  requestParams: PropTypes.shape({
    start: PropTypes.number,
    count: PropTypes.number,
    query: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    filters: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
  }),
  app: PropTypes.shape({
    count: PropTypes.number,
    start: PropTypes.number,
    total: PropTypes.number,
    members: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      category: PropTypes.string,
      brand: PropTypes.string,
    })),
  }),
  dispatchGetApp: PropTypes.func.isRequired,
  dispatchGetNext: PropTypes.func.isRequired,
  dispatchSetParams: PropTypes.func.isRequired,
};

const defaultProps = {
  requestParams: JSON.parse(JSON.stringify(DEFAULT_QUERY)),
  app: {
    count: 0,
    start: 0,
    total: 10,
    members: [],
  },
  isNavSideBarActive: false,
  selectModeOn: false,
  match: {},
  searchSpinnerBool: false,
};

let typingTimer;

class appContainer extends Component {
  constructor() {
    super();
    this.getApp = this.getApp.bind(this);
    this.loadNextApp = this.loadNextApp.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onClear = this.onClear.bind(this);
    this.state = {
      searchString: '',
    };
  }

  componentWillMount() {
    this.getApp();
  }

  onSearch({ target }) {
    this.setState({
      searchString: target.value,
    });

    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
      const {
        requestParams,
        dispatchSetParams,
        dispatchGetApp,
      } = this.props;

      const appQueryParams = {
        ...requestParams,
        start: 0,
        count: 6,
        search: {
          value: this.state.searchString,
          searchBy: 'name',
          queryOperator: 'query',
        },
      };

      dispatchSetParams(appQueryParams);
      dispatchGetApp();
    }, DEBOUNCE_SEARCH_TIME);
  }

  onFilter(type, value, bool) {
    const {
      requestParams,
      dispatchSetParams,
      dispatchGetApp,
    } = this.props;
    const categoryValues = requestParams.filters.category.values;
    const brandValues = requestParams.filters.brand.values;
    if (type === 'category' && !bool) {
      categoryValues.push(value);
    } else if (type === 'category' && bool) {
      const index = categoryValues.indexOf(value);    // <-- Not supported in <IE9
      if (index !== -1) {
        categoryValues.splice(index, 1);
      }
    }
    if (type === 'brand' && !bool) {
      brandValues.push(value);
    } else if (type === 'brand' && bool) {
      const index = brandValues.indexOf(value);    // <-- Not supported in <IE9
      if (index !== -1) {
        brandValues.splice(index, 1);
      }
    }
    const appQueryParams = {
      ...requestParams,
      start: 0,
      count: 6,
      filters: {
        category: {
          values: categoryValues,
          sqlOperator: FILTER_SQL_OPERATORS.EQ,
        },
        brand: {
          values: brandValues,
          sqlOperator: FILTER_SQL_OPERATORS.EQ,
        },
      },
    };
    dispatchSetParams(appQueryParams);
    dispatchGetApp();
  }

  onClear() {
    const params = JSON.parse(JSON.stringify(DEFAULT_QUERY));
    this.props.dispatchSetParams(params);
    this.props.dispatchGetApp();
  }

  getApp() {
    const params = JSON.parse(JSON.stringify(DEFAULT_QUERY));
    this.props.dispatchSetParams(params);
    this.props.dispatchGetApp();
  }

  loadNextApp() {
    const params = Object.assign({}, this.props.requestParams);
    params.start = this.props.app.start + params.count;
    if (params.start < this.props.app.total) {
      this.props.dispatchGetNext(params);
    }
    return false;
  }

  // TODO replace default redirect to default component when more routes are added.
  render() {
    const { app } = this.props;
    const getNext =
      (app.start + app.count) <
      app.total ? this.loadNextApp : null;
    const filters = (
      <Box flex="grow" pad="small">
        {filter.map((items, index) => (
          <Box flex="grow">
            <Label uppercase>{items.type}</Label>
            {items.options.map((item, index2) => (
              <Box justify="between" flex="grow" align="center" direction="row">
                <Box>{item.name}</Box>
                <CheckBox
                  reverse
                  checked={this.props.requestParams.filters[items.type].values.indexOf(item.name) !== -1} //eslint-disable-line
                  onChange={() => this.onFilter(items.type, item.name, this.props.requestParams.filters[items.type].values.indexOf(item.name) !== -1)} //eslint-disable-line
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    );
    return (
      <Box flex="grow">
        <Box direction="row" align="center" justify="center" pad={{ vertical: 'small' }} separator="bottom">
          <Box pad={{ horizontal: 'small', vertical: 'small' }}>
            <Image className="mainLogo" src="/assets/images/supplyBasics.png" />
          </Box>
          <Select
            className="mainSearchBy"
            placeHolder="Shop By"
            options={['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']}
            onChange={() => {}}
          />
          <Search
            className="mainSearch"
            placeHolder="Search"
            inline
            fill
            value={this.state.searchString}
            onDOMChange={this.onSearch}
          />
          <Button
            className="mainCart"
            icon={<CartIcon />}
            label="CART"
            onClick={() => {}}
            primary
            colorIndex="light-2"
          />
        </Box>
        <Split flex="right" className="split-component">
          <Sidebar colorIndex="light-1" className="mainSidebar">
            <Header
              pad="medium"
              justify="between"
              separator="bottom"
            >
              <Title className="filterTitle">
                Filter
              </Title>
              <Button
                className="clearButton"
                plain
                onClick={this.onClear}
              >
                Clear
              </Button>
            </Header>
            {filters}
          </Sidebar>
          <Box colorIndex="light-1" className="listWrapper">
            <Header fixed margin="none">
              <Box direction="row" align="center">
                <Box separator="right" pad={{ horizontal: 'small' }}>
                  <Heading margin="none" tag="h2" strong>Devices</Heading>
                </Box>
                <Box pad={{ horizontal: 'small' }}>{app.members.length} of {app.total} Results</Box>
              </Box>
            </Header>
            <Tiles flush={false} onMore={getNext}>
              {app.members.map((item, index) => (
                <Tile size="small" colorIndex="light-1" id="tile">
                  <Animate enter={{ animation: 'slide-up', duration: 1000, delay: 0 }}>
                    <Box flex="grow" pad="small" size="medium">
                      <Box pad={{ vertical: 'medium' }} separator="bottom" flex="grow" align="center"><Box size="small" className="emptyBox" colorIndex="unknown" align="end"><Box className="offerBox" colorIndex="unknown">25%</Box></Box></Box>
                      <Box pad={{ vertical: 'small' }} flex="grow">
                        <Box className="itemName"><strong>{item.name}</strong></Box>
                      </Box>
                    </Box>
                    <Box pad={{ horizontal: 'small' }}>Seller</Box>
                    <Box align="center" direction="row" pad={{ horizontal: 'small', vertical: 'small' }}>
                      <Box className="cost">&#x20b9; 500</Box>
                      <Box className="discount" pad={{ horizontal: 'medium' }}>800</Box>
                    </Box>
                  </Animate>
                </Tile>
              ))}
            </Tiles>
          </Box>
        </Split>
      </Box>
    );
  }
}
const mapStateToProps = (state) => ({
  app: getApp(state),
  requestParams: getRequestParams(state),
});
const mapDispatchToProps = {
  dispatchGetApp: loadApp,
  dispatchSetParams: setQueryParams,
  dispatchGetNext: loadNextApp,
};
appContainer.propTypes = propTypes;
appContainer.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(appContainer));
