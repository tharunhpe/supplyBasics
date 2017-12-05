import React, { PropTypes, Component } from 'react';
import { injectIntl } from 'react-intl';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';

const propTypes = {
  htmlFor: PropTypes.string.isRequired,
  errors: PropTypes.object,
  label: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  selectValue: PropTypes.string.isRequired,
  selectOptions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const defaultProps = {
  htmlFor: '',
  errors: {},
  label: '',
  inputName: '',
  inputValue: '',
  selectValue: '',
  selectOptions: [],
  onChange: () => {},
};

export const showErrorMessage = (errors, input) => {
  if (errors[input]) {
    return 'Required Field';
  }

  return '';
};

class InputWithUnits extends Component {
  constructor(props) {
    super(props);

    const {
      inputValue,
      selectValue,
    } = this.props;

    this.onChangeInputValue = this.onChangeInputValue.bind(this);
    this.onChangeInputUnits = this.onChangeInputUnits.bind(this);
    this.change = this.change.bind(this);

    this.state = {
      inputValue,
      inputUnits: selectValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      inputValue,
      selectValue,
    } = nextProps;
    this.setState({
      inputValue: inputValue.toString(),
      inputUnits: selectValue,
    });
  }

  onChangeInputValue(event) {
    const val = event.target.value.toString();
    const NumbersRegexp = new RegExp(/^\d+$/g);

    if (!val.length) {
      this.setState({
        inputValue: 0,
      });

      this.change({ inputValue: 0 });
    }

    if (NumbersRegexp.test(val) && val.length < 4) {
      this.setState({
        inputValue: event.target.value,
      });

      this.change({ inputValue: event.target.value });
    }
  }

  onChangeInputUnits(event) {
    this.setState({
      inputUnits: event.option,
    });

    this.change({ inputUnits: event.option });
  }

  change({ inputValue, inputUnits }) {
    this.props.onChange({
      inputName: this.props.inputName,
      value: inputValue !== undefined ? inputValue : this.state.inputValue,
      units: inputUnits || this.state.inputUnits,
    });
  }

  render() {
    const {
      htmlFor,
      errors,
      label,
      selectOptions,
    } = this.props;

    return (
      <FormField
        htmlFor={htmlFor}
        label={label}
        error={showErrorMessage(errors, htmlFor)}
      >
        <div>
          <input
            id={htmlFor}
            className={`formSectionInput js-${htmlFor}`}
            type="text"
            value={this.state.inputValue}
            onChange={this.onChangeInputValue}
          />
          <Select
            className="formSectionSelect"
            value={this.state.inputUnits}
            onChange={this.onChangeInputUnits}
            options={selectOptions}
          />
        </div>
      </FormField>
    );
  }
}

InputWithUnits.propTypes = propTypes;
InputWithUnits.defaultProps = defaultProps;

export default injectIntl(InputWithUnits);
