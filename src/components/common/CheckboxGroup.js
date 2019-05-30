import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class CheckboxGroup extends React.Component {
    renderError = ({touched, valid, error}) => <FormHelperText error={touched && !valid}>{error}</FormHelperText>;

    render() {
        const { input, meta, options, label, required} = this.props;

        return (
            <FormControl component="fieldset">
                <FormLabel component="legend" required={required} error={meta.touched && !meta.valid}>{label}</FormLabel>
                {this.renderError(meta)}
                <FormGroup>
                    { options.map((option, index) => (
                        <div className="checkbox" key={index}>
                            <FormControlLabel label={option.name} control={
                                <Checkbox name={`${input.name}[${index}]`}
                                          value={option.id}
                                          checked={input.value.indexOf(option.id) !== -1}
                                          onChange={event => {
                                              const newValue = [...input.value];
                                              if(event.target.checked) {
                                                  newValue.push(option.id);
                                              } else {
                                                  newValue.splice(newValue.indexOf(option.id), 1);
                                              }
                                              return input.onChange(newValue);
                                          }}/>
                            } />
                        </div>))
                    }
                </FormGroup>
            </FormControl>
        );
    }
}

export default CheckboxGroup;
