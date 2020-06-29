import React from 'react';

import './Spinner.css';

// Thanks to https://github.com/tobiasahlin/SpinKit
const Spinner = () => {
  return (
    <div className="sk-folding-cube">
      <div className="sk-cube1 sk-cube" />
      <div className="sk-cube2 sk-cube" />
      <div className="sk-cube4 sk-cube" />
      <div className="sk-cube3 sk-cube" />
    </div>
  );
};

export default Spinner;
