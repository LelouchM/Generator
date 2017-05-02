import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ListComp = ({ pos, componentList, addString, delString }) => {
  const listMsg = componentList.get(pos).map((item, i) => (
    <li style={{ marginBottom: 10, cursor: 'pointer' }} key={i} onClick={() => delString(pos, i)}>{item}</li>
  ));
  let inp;

  return (
    <div
      style={{
        textAlign: 'center',
        width: '26%',
        marginRight: '4%',
        padding: '1%',
        border: '1px solid black',
        marginBottom: '40px',
        background: '#e7ebf0',
        fontSize: 18,
      }}
    >
      <ol style={{ height: 150, overflow: 'auto', textAlign: 'left' }}>{listMsg}</ol>
      <input type="text" ref={input => inp = input} style={{ display: 'block', marginBottom: '20px', width: '100%', boxSizing: 'border-box' }} />
      <button onClick={() => { if (inp.value) { addString(pos, inp.value); } }}>Добавить.</button>
    </div>
  );
};

ListComp.propTypes = {
  componentList: PropTypes.object.isRequired,
  pos: PropTypes.number.isRequired,
  delString: PropTypes.func.isRequired,
  addString: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    componentList: state.reducer,
  }),
  dispatch => ({
    addString: (num, text) => {
      dispatch({ type: 'ADD_STRING', payload: { num, text } });
    },
    delString: (num, strNum) => {
      dispatch({ type: 'DEL_STRING', payload: { num, strNum } });
    },
  }),
)(ListComp);
