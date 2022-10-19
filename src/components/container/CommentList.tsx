import React from 'react';
import { ThemeContext } from '@/utils/themeContext';

type PropsType = {
  data: any;
};

class CommentList extends React.Component<PropsType, any> {
  static contextType = ThemeContext;
  render(): React.ReactNode {
    const context: any = this.context;

    return (
      <div className="comment-list" style={{ color: context.foreground, backgroundColor: context.background }}>
        <ul>
          {this.props.data.map((item: any) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CommentList;
