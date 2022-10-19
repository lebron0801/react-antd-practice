import React from 'react';
import CustomTextInput from '@/components/container/CustomTextInput';

class AutoFocusTextInput extends React.Component<any, any> {
  textInput: React.RefObject<CustomTextInput>;

  constructor(props: any) {
    super(props);

    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current?.focusTextInput();
  }

  render(): React.ReactNode {
    return <CustomTextInput ref={this.textInput}></CustomTextInput>;
  }
}

export default AutoFocusTextInput;
