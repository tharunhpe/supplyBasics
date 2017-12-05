import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import App from 'grommet/components/App';
import { appContainer } from 'modules/app';
import { HeaderComponent } from './header';
import messages from './messages';

const propTypes = {
  intl: intlShape.isRequired,
};
const defaultProps = {
  username: '',
};
class MainContainer extends Component { // eslint-disable-line
  // TODO replace default redirect to default component when more routes are added.
  render() {
     // Get the window location after login redirect to set the token.
    return (
      <BrowserRouter>
        <App centered={false}>
          <HeaderComponent
            title={this.props.intl.formatMessage(messages.productNameTitle)}
            colorIndex="light-1"
          />
          <Switch>
            <Route component={appContainer} />
          </Switch>
        </App>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => ({
});
const mapDispatchToProps = {
};
MainContainer.propTypes = propTypes;
MainContainer.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MainContainer));
