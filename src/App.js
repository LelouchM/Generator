import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ListComp from './Component';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genString: '',
    };
  }

  componentDidMount() {
    window.onunload = () => localStorage.setItem('list', JSON.stringify(this.props.componentList.toJSON()));
  }

  render() {
    const components = this.props.componentList.map((item, i) => <ListComp pos={i} key={i} />);
    return (
      <div style={{ textAlign: 'center' }}>
        <button style={{ marginRight: 40, marginBottom: 40 }} onClick={() => this.props.add()}>
          Добавить компонент.
        </button>
        <button onClick={() => this.props.del()}>Удалить компонент.</button>
        <div style={{ display: 'flex', marginBottom: 50, flexWrap: 'wrap' }}>{ components }</div>
        <button
          onClick={() => {
            const str = [];
            this.props.componentList.forEach((item) => {
              if (item.size > 0) {
                str.push(
                  <span style={{ marginRight: 10, fontSize: 30 }}>
                    {item.get(Math.floor(Math.random() * (item.size - 0.5)))}
                  </span>);
              }
            });
            this.setState({ genString: str });
          }}
          style={{ marginBottom: 40 }}
        >
          Сгенерировать.
        </button>
        <div>{this.state.genString}</div>
      </div>
    );
  }
}

App.propTypes = {
  componentList: PropTypes.object.isRequired,
  del: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    componentList: state.reducer,
  }),
  dispatch => ({
    add: () => {
      dispatch({ type: 'ADD_COMPONENT' });
    },
    del: () => {
      dispatch({ type: 'DEL_COMPONENT' });
    },
  }),
)(App);
