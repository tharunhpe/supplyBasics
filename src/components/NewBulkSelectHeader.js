import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Label from 'grommet/components/Label';
import CloseIcon from 'grommet/components/icons/base/Close';

const propTypes = {
  bulkActions: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  bulkAction: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  }),
  selectedItem: PropTypes.string,
  selectedItems: PropTypes.array.isRequired,
  parentName: PropTypes.string,
  defaultLabelNames: PropTypes.shape({
    clear: PropTypes.string,
    selectAll: PropTypes.string,
    selected: PropTypes.string,
    errorMessage: PropTypes.string,
  }),
  selectedItemsTypeLabel: PropTypes.shape({
    singular: PropTypes.string.isRequired,
    plural: PropTypes.string.isRequired,
  }),
  multipleSelection: PropTypes.bool,
  onCloseAction: PropTypes.func,
  onClearAction: PropTypes.func,
  onSelectAllAction: PropTypes.func,
};

export const defaultProps = {
  bulkActions: [],
  selectedItems: [],
  multipleSelection: false,
  defaultLabelNames: {
    clear: 'Clear',
    selectAll: 'Select all',
    selected: 'Selected',
    errorMessage: 'At least one entity needs to be selected to perform the action',
  },
};

class NewBulkSelectHeader extends Component {
  constructor(props) {
    super(props);

    this.getAllActions = this.getAllActions.bind(this);
    this.getCloseIcon = this.getCloseIcon.bind(this);
    this.onShowError = this.onShowError.bind(this);
    this.onCloseError = this.onCloseError.bind(this);

    this.state = {
      error: false,
    };
  }

  onShowError() {
    this.setState({ error: true });
  }

  onCloseError() {
    this.setState({ error: false });
  }

  componentWillReceiveProps() {
    this.setState({ error: false });
  }

  getAllActions() {
    const {
      multipleSelection,
      bulkActions,
      bulkAction,
      defaultLabelNames,
      selectedItem,
      selectedItems,
      onClearAction,
      onSelectAllAction,
    } = this.props;

    const defaultButtonsMap = [
      {
        onClick: onClearAction,
        label: defaultLabelNames.clear,
      },
    ];

    if (multipleSelection) {
      defaultButtonsMap.push({
        onClick: onSelectAllAction,
        label: defaultLabelNames.selectAll,
      });
    }

    const defaultButtons = defaultButtonsMap.map((button, index) => (
      <Button
        key={index}
        label={button.label}
        onClick={button.onClick}
        plain
      />
    ));

    const listActionOnClick = selectedItem || selectedItems.length ?
      () => bulkAction.onClick(multipleSelection ? selectedItems : selectedItem)
      : this.onShowError;
    const listActionButton = (
      !!bulkAction &&
        <Button
          label={bulkAction.label}
          onClick={listActionOnClick}
          plain
        />
    );

    const actionButtons = (
      !!bulkActions.length &&
        <Menu
          label={'Actions'}
          dropAlign={{ right: 'right' }}
          responsive
        >
          <Menu
            direction="row"
            justify="start"
            responsive
            inline
          >
            {
              bulkActions.map((act, index) => {
                const actionOnClick = selectedItem || selectedItems.length ?
                  () => act.onClick(multipleSelection ? selectedItems : selectedItem)
                  : this.onShowError;

                return (
                  <Box key={index} pad={{ vertical: 'small' }}>
                    <Button
                      onClick={actionOnClick}
                      label={act.label}
                      plain
                    />
                  </Box>
                );
              })
            }
          </Menu>
        </Menu>
    );

    return (
      <Box
        flex
        justify="end"
        direction="row"
        responsive={false}
      >
        {defaultButtons}
        {listActionButton}
        {actionButtons}
      </Box>
    );
  }

  getCloseIcon() {
    return (
      typeof this.props.onCloseAction === 'function' &&
        <Button
          icon={<CloseIcon />}
          onClick={this.props.onCloseAction}
        />
    );
  }

  getSelectedItemsCount() {
    const {
      selectedItem,
      selectedItems,
      defaultLabelNames,
      multipleSelection,
      selectedItemsTypeLabel,
    } = this.props;

    const selectedItemsLength = multipleSelection ? selectedItems.length : +!!selectedItem;
    let selectedItemsType = '';
    if (selectedItemsTypeLabel) {
      selectedItemsType = selectedItemsLength === 1 ?
        ` ${selectedItemsTypeLabel.singular}` : ` ${selectedItemsTypeLabel.plural}`;
    }
    const message = `${selectedItemsLength}${selectedItemsType} ${defaultLabelNames.selected}`;

    return (
      <Title margin={{ left: 'small' }}>
        {message}
      </Title>
    );
  }

  render() {
    const {
      parentName,
      defaultLabelNames: {
        errorMessage,
      },
    } = this.props;
    const {
      error,
    } = this.state;

    const closeIcon = this.getCloseIcon();
    const allActions = this.getAllActions();
    const selectedItemsCount = this.getSelectedItemsCount();

    return (
      <Box>
        <Box
          direction="row"
          pad="small"
          colorIndex={error ? 'critical' : 'accent-2'}
          fill
        >
          {
            error &&
              <div>
                <Button id="closeBulkActionError" icon={<CloseIcon />} onClick={this.onCloseError} />
                <Label id="bulkErrorLabel">
                  {errorMessage}
                </Label>
              </div>
          }
          {!error && closeIcon}
          {!error && selectedItemsCount}
          {!error && allActions}
        </Box>
        {
          parentName &&
            <Box direction="row" separator="bottom" pad="small" fill>
              <Title>
                {parentName}
              </Title>
            </Box>
        }
      </Box>
    );
  }
}

NewBulkSelectHeader.propTypes = propTypes;
NewBulkSelectHeader.defaultProps = defaultProps;

export default NewBulkSelectHeader;
