import React from 'react';
import PropTypes from 'prop-types';
import FormField from 'grommet/components/FormField';
import CheckBox from 'grommet/components/CheckBox';
import Header from 'grommet/components/Header';

const propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  items: [],
  onChange: () => {},
};

function FormRenderer(props) {
  const items = props.items;
  const onChange = props.onChange;
  return (

    <fieldset>
      <legend>Deployment Parameters</legend>
      {
        items.map((item, index) => {
          let counter = 0;
          const dparams = item.deploymentParameters.map((param) => {
            if (param.renderType === 'Checkbox') {
              counter = counter + 1;
              return (
                <FormField>
                  <CheckBox id={`${item.resourceId}::${counter}`} name={param.name} label={param.displayLabel} />
                </FormField>
              );
            } else if (param.renderType === 'Text') {
              counter = counter + 1;
              return (
                <FormField label={param.displayLabel} htmlFor={param.name} hidden={false}>
                  <input
                    id={`${item.resourceId}::${counter}`}
                    name={param.name}
                    type={param.renderType}
                    defaultValue={param.defaultValue}
                    onChange={onChange}
                  />
                </FormField>
              );
            } else if (param.renderType === 'Password') {
              counter = counter + 1;
              return (
                <FormField label={param.displayLabel} htmlFor={param.name} hidden={false}>
                  <input id={`${item.resourceId}::${counter}`} name={param.name} type="password" onChange={onChange} />
                </FormField>
              );
            }
            return null;
          });

          return (
            <div key={index}>
              <Header>
                <h3>{item.name}</h3>
              </Header>
              <FormField>
                {dparams}
              </FormField>
            </div>
          );
        })
      }
    </fieldset>
  );
}

FormRenderer.propTypes = propTypes;
FormRenderer.defaultProps = defaultProps;

export default FormRenderer;
