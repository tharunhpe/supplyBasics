import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import FormField from 'grommet/components/FormField';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import TextInput from 'grommet/components/TextInput';
import Select from 'grommet/components/Select';
import Button from 'grommet/components/Button';
import UserIcon from 'grommet/components/icons/base/User';

const propTypes = {
  title: PropTypes.string,
};

function HeaderComponent(props) {
  const {
    title,
  } = props;
  return (
    <Box justify="between" separator="bottom" flex="grow" direction="row" pad={{ horizontal: 'small' }}>
      <Menu
        label="PINCODE"
        inline={false}
        className="mainMenu"
      />
      <Box direction="row">
        <Box pad="small">
          <Button
            className="mainButton"
            label="DAILY DEALS"
            plain
            onClick={() => {}}
          />
        </Box>
        <Box pad="small">
          <Button
            className="mainButton"
            label="GIFT CARDS"
            plain
            onClick={() => {}}
          />
        </Box>
        <Box pad="small">
          <Button
            className="mainButton"
            label="SELL"
            plain
            onClick={() => {}}
          />
        </Box>
        <Box pad="small">
          <Button
            className="mainButton"
            label="CUSTOMER SERVICE"
            plain
            onClick={() => {}}
          />
        </Box>
        <Box pad="small">
          <Button
            className="mainButton"
            label="SUPPLY PRO"
            plain
            onClick={() => {}}
          />
        </Box>
        <Box pad="small">
          <Button
            className="mainButton"
            label="TRACK ORDER"
            plain
            onClick={() => {}}
          />
        </Box>
        <Box pad="small" direction="row">
          <UserIcon />
          <Button
            className="mainButton"
            label="Login"
            plain
            onClick={() => {}}
          />
        </Box>
      </Box>
    </Box>
  );
}

HeaderComponent.propTypes = propTypes;
export default injectIntl(HeaderComponent);
