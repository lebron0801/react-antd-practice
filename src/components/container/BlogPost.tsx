import React from 'react';
import { ThemeContext } from '@/utils/themeContext';

type PropsType = {
  data: any;
};

class BlogPost extends React.Component<PropsType, any> {
  render(): React.ReactNode {
    return (
      <div className="blog-post">
        <ThemeContext.Consumer>
          {(value) => {
            return this.props.data.map((item: any) => (
              <div style={{ color: value.foreground, backgroundColor: value.background }} key={item.id}>
                {item.name}
              </div>
            ));
          }}
        </ThemeContext.Consumer>
      </div>
    );
  }
}

export default BlogPost;
