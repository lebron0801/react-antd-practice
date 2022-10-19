import React from 'react';
import { BrowserRouter, Switch, Route, Link, useRouteMatch, useParams, NavLink, Redirect } from 'react-router-dom';

function Home(props: any) {
  return <h2>Home</h2>;
}

function About(props: any) {
  return <h2>About</h2>;
}

function Topic() {
  const { topicId }: any = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}

function Topics(props: any) {
  const match = useRouteMatch();
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

type StateType = {
  routes: any[];
};

type PropsType = {
  list?: Array<any>;
};

class FrameLayout extends React.Component<PropsType, StateType> {
  constructor(props: any) {
    super(props);

    this.state = {
      routes: [
        {
          url: '/',
          name: 'Home'
        },
        {
          url: '/about',
          name: 'About'
        },
        {
          url: '/topics',
          name: 'Topics'
        },
        {
          url: '/lebron',
          name: '自定义页面'
        }
      ]
    };
  }

  render() {
    return (
      <BrowserRouter>
        <ul>
          {this.state.routes.map((item: any) => {
            return (
              <li key={item.name}>
                <NavLink exact activeClassName="selected" to={item.url}>
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <Switch>
          <Route path={'/about'}>
            <About />
          </Route>
          <Redirect from="/lebron" to="/about" />
          <Route path={'/topics'} component={Topics}></Route>
          <Route path={'/'}>
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default FrameLayout;
