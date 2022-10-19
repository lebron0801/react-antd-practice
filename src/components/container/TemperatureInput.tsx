import React from 'react';

const scaleNames: Record<string, string> = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

type PropsType = {
  scale: string;
  temperature: string;
  onTemperatureChange: (value: string) => void;
};

class TemperatureInput extends React.Component<PropsType, any> {
  constructor(props: PropsType) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: any) {
    this.props.onTemperatureChange(e.target.value);
  }

  render(): React.ReactNode {
    const temperature = this.props.temperature;
    const scale = this.props.scale;

    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

export default TemperatureInput;
