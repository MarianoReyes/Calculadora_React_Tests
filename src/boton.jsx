import './app.css';
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/function-component-definition
const Boton = ({ boton, changeText }) => {
  const BotonSingular = boton;

  return (
    <button type="button" className="boton" onClick={() => { changeText(BotonSingular); }}>
      {
        BotonSingular
      }
    </button>
  );
};

Boton.propTypes = {
  boton: PropTypes.string.isRequired,
  changeText: PropTypes.func.isRequired,
};

export default Boton;
