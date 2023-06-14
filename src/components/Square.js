import React from 'react';
import './Square.css';

export default class Sqaure extends React.Component {
  render() {
    return (
      <button className='square'
        onClick={() => {console.log("click")}}
      >
        {this.props.value}
      </button>
    );
  }
}