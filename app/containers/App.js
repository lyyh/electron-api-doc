// @flow
import * as React from 'react';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <main style={{height:'100%',overflow:'hidden'}}>
        {this.props.children}
      </main>
    );
  }
}
