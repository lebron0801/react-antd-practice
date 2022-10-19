import React from 'react';

class CustomTextInput extends React.Component<any, any> {
  textInput: React.RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);

    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    this.textInput.current?.focus();
  }

  render(): React.ReactNode {
    return (
      <div>
        <input type="text" ref={this.textInput} />
        <input type="button" value="获取焦点" onClick={this.focusTextInput} />
      </div>
    );
  }
}

export default CustomTextInput;
