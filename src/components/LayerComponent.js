import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import Layer from 'grommet/components/Layer';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import CustomStatus from 'components/CustomStatusComponent';
import messages from './messages';

const propTypes = {
  intl: intlShape.isRequired,
  onClose: PropTypes.func.isRequired,
  align: PropTypes.string,
  flush: PropTypes.bool,
  headerText: PropTypes.string.isRequired,
  statusObj: PropTypes.shape({
    size: PropTypes.string,
    value: PropTypes.string,
    text: PropTypes.string,
    timestamp: PropTypes.number,
  }),
  textarea: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    text: PropTypes.string,
    onChange: PropTypes.func,
  }),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.array,
    }),
  ),
  button: PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
  }),
};

const defaultProps = {
  onClose: () => {},
  align: 'center',
  flush: true,
  headerText: '',
  textarea: null,
  items: [],
};

function LayerComponent(props) {
  const {
    intl,
    onClose,
    align,
    flush,
    headerText,
    statusObj,
    textarea,
    items,
    button,
  } = props;

  let alignButton = '';
  if (button) {
    alignButton = button.label === intl.formatMessage(messages.doneButton) ? 'center' : 'start';
  }

  let headerNode;
  if (headerText) {
    headerNode = (
      <Header pad={{ vertical: 'small', horizontal: 'medium' }}>
        <Heading tag="h3" strong>
          {headerText}
        </Heading>
      </Header>
    );
  }

  let statusNode;
  if (statusObj) {
    statusNode = (
      <Box flex={false}>
        <CustomStatus
          size={statusObj.size}
          value={statusObj.value}
          text={statusObj.text}
          timestamp={statusObj.timestamp ? statusObj.timestamp : null}
        />
      </Box>
    );
  }

  let itemsNode;
  if (items) {
    itemsNode = (
      <Box flex={false}>
        { items.map((item, index) => (
          <Section key={index} className="label-text word-break" pad={{ vertical: 'small', horizontal: 'large' }}>
            <Heading tag="h3" margin="small" strong>
              {item.label}
            </Heading>
            {
              item.link ? (
                <Link to={item.link}>
                  <span id={item.label}>
                    {item.value}
                  </span>
                </Link>
              ) : item.value.map((val, i) => (
                <span key={i} id={item.label}>
                  {val}
                </span>
              ))
            }
          </Section>
        ))}
      </Box>
    );
  }

  let textareaNode;
  if (textarea) {
    textareaNode = (
      <Box size={{ width: 'xlarge', height: 'xlarge' }}>
        <textarea
          className="layer-component-textarea"
          id={textarea.id}
          type="text"
          name={textarea.name}
          value={textarea.script}
          onChange={textarea.onChange}
        />
      </Box>
    );
  }

  let buttonNode;
  if (button) {
    buttonNode = (
      <Section align={alignButton} pad={{ vertical: 'small', horizontal: 'large' }}>
        <Button
          primary
          label={button.label}
          onClick={button.onClick}
        />
      </Section>
    );
  }

  return (
    <Layer onClose={onClose} flush={flush} closer align={align}>
      <Box size={{ width: 'xlarge' }}>
        {headerNode}
        {statusNode}
        {textareaNode}
        {itemsNode}
        <Box pad="small" />
        {buttonNode}
        {(button && button.label) === intl.formatMessage(messages.doneButton) ? <Box pad="small" /> : null}
      </Box>
    </Layer>
  );
}

LayerComponent.propTypes = propTypes;
LayerComponent.defaultProps = defaultProps;

export default injectIntl(LayerComponent);
