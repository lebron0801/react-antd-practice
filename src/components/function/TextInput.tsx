import React from 'react';

const TextInput = React.forwardRef((props: any, ref: React.LegacyRef<HTMLInputElement>) => {
  return (
    <div>
      <span>我是函数式组件</span>
      <input type="text" ref={ref} />
    </div>
  );
});

export default TextInput;
