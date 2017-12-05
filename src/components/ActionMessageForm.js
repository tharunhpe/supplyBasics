import React, { PropTypes } from 'react';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const propTypes = {
  intl: intlShape.isRequired,
  submittedAction: PropTypes.string,
  numberOfEntities: PropTypes.string,
  resourceGroupName: PropTypes.string,
};

export const defaultProps = {
  submittedAction: '',
  numberOfEntities: '',
};

function ActionMessageForm(props) {
  const {
    intl,
    submittedAction,
    numberOfEntities,
    resourceGroupName,
  } = props;

  let resourceMessage;
  if (numberOfEntities <= 1) {
    resourceMessage = `${intl.formatMessage(messages.singleResource)}`;
  } else {
    resourceMessage = `${intl.formatMessage(messages.multipleResources)}`;
  }

  switch (submittedAction) {
    case 'Discover Resources':
      return (
        <Form>
          <Box pad="medium" direction="row">
            <Heading tag="h3">{intl.formatMessage(messages.discoverSubmitted)}{numberOfEntities}{resourceMessage}</Heading>
          </Box>
        </Form>
      );
    case 'Add Resource Group':
      return (
        <Form>
          <Box pad="medium" direction="row">
            <Heading tag="h3">{`${intl.formatMessage(messages.associateResourceGroupSubmitted)}${numberOfEntities}${resourceMessage}
               ${intl.formatMessage(messages.with)}${intl.formatMessage(messages.resourceGroup)}${resourceGroupName}`}</Heading>
          </Box>
        </Form>
      );
    case 'Remove Resource Group':
      return (
        <Form>
          <Box pad="medium" direction="row">
            <Heading tag="h3">{`${intl.formatMessage(messages.removeResourceGroupSubmitted)}${numberOfEntities}${resourceMessage}
               ${intl.formatMessage(messages.from)}${intl.formatMessage(messages.resourceGroup)}${resourceGroupName}`}</Heading>
          </Box>
        </Form>
      );
    default:
      return (
        <Form>
          <Box pad="medium" direction="row">
            <Heading tag="h3">{intl.formatMessage(messages.actionSubmitted)}</Heading>
          </Box>
        </Form>
      );
  }
}

ActionMessageForm.propTypes = propTypes;
ActionMessageForm.defaultProps = defaultProps;

export default injectIntl(ActionMessageForm);
