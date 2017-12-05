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
import Footer from 'grommet/components/Footer';
import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';
import Heading from 'grommet/components/Heading';
import Animate from 'grommet/components/Animate';
import Search from 'grommet/components/Search';
import {
  DEBOUNCE_SEARCH_TIME,
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
} from './constants';


const propTypes = {
  requestParams: PropTypes.shape({
    start: PropTypes.number,
    count: PropTypes.number,
    query: PropTypes.oneOfType([
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
        count: 20,
        search: {
          value: this.state.searchString,
        },
      };

      dispatchSetParams(appQueryParams);
      dispatchGetApp();
    }, DEBOUNCE_SEARCH_TIME);
  }

  getApp() {
    const params = JSON.parse(JSON.stringify(DEFAULT_QUERY));
    this.props.dispatchSetParams(params);
    this.props.dispatchGetApp();
  }

  loadNextApp() {
    const params = Object.assign({}, this.props.requestParams);
    params.start = this.props.app.start + params.count;
    this.props.dispatchGetNext(params);
  }

  // TODO replace default redirect to default component when more routes are added.
  render() {
    const { app } = this.props;
     // Get the window location after login redirect to set the token.
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
            onDOMChange={() => {}}
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
                onClick={() => {}}
              >
                Clear
              </Button>
            </Header>
          </Sidebar>
          <Box pad="medium" full colorIndex="light-2">
            <Box direction="row" align="center">
              <Box separator="right" pad={{ horizontal: 'small' }}>
                <Heading margin="none" tag="h2" strong>Devices</Heading>
              </Box>
              <Box pad={{ horizontal: 'small' }}>{app.members.length} of 1000 Results</Box>
            </Box>
            <Tiles flush={false} onMore={this.loadNextApp}>
              {app.members.map((item, index) => (
                <Tile size="medium" colorIndex="light-1" id="tile">
                  <Animate enter={{ animation: 'slide-up', duration: 1000, delay: 0 }}>
                    <Box flex="grow" pad="small" size="medium">
                      <Box pad={{ vertical: 'medium' }} separator="bottom" flex="grow" align="center"><Box size="small" className="emptyBox" colorIndex="unknown" /></Box>
                      <Box pad={{ vertical: 'small' }} flex="grow">
                        <Box><strong>{item.name}</strong></Box>
                      </Box>
                    </Box>
                    <Footer justify="between" colorIndex="light-2" />
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
