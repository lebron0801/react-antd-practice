import React from 'react';
import Scroll from 'react-custom-scrollbars';
import Measure from 'react-measure';
import classnames from 'classnames';

type PropsType = {
  /**
   * 监听的div元素类名
   */
  className: string;
  /**
   * 纵轴滑块是否高亮
   */
  thumbVerticalLight?: boolean;
  /**
   * 纵轴轨道是否高亮
   */
  trackVerticalLight?: boolean;
  /**
   * 子元素
   */
  children: any;
};

class Scrollbars extends React.Component<PropsType> {
  static defaultProps = {
    thumbVerticalLight: true,
    trackVerticalLight: true
  };

  state = {
    routerScroll: React.createRef<Scroll>()
  };

  render() {
    return (
      <Scroll
        ref={this.state.routerScroll}
        renderThumbVertical={(props) => (
          <div
            {...props}
            className={classnames('custom-scrollbar-vertical thumb', {
              light: this.props.thumbVerticalLight
            })}
          />
        )}
        renderTrackVertical={(props) => (
          <div
            {...props}
            className={classnames('custom-scrollbar-vertical track', {
              light: this.props.trackVerticalLight
            })}
          />
        )}
        autoHide
      >
        <Measure
          bounds
          onResize={(contentRect) => {
            this.state.routerScroll.current?.forceUpdate();
          }}
        >
          {({ measureRef }) => (
            <div ref={measureRef} className={this.props.className}>
              {this.props.children}
            </div>
          )}
        </Measure>
      </Scroll>
    );
  }
}

export default Scrollbars;
