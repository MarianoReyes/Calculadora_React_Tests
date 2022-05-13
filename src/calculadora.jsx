import './app.css';
import React, { useState } from 'react';
import Boton from './boton';

/* eslint-disable react/function-component-definition */
const Calculadora = () => {
  const botones = ['AC', 'DEL', '±', '÷', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '.', '0', '%', '='];
  const [clicked, setClicked] = useState([]);
  const [operacion, setOperacion] = useState([false, '']);
  const [primer, setPrimer] = useState('');

  const changeText = (dato) => {
    let old = [...clicked];
    switch (dato) {
      case 'DEL':
        old.pop(dato);
        break;
      case 'AC':
        setPrimer('');
        old = [];
        break;
      default:
        if (clicked.length <= 9) {
          if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '±'].includes(dato)) {
            if (clicked.length !== 9) {
              if (operacion[0]) {
                old = [];
                setOperacion([false, operacion[1]]);
              }
              if (!old.includes('.') && dato === '.') {
                old.push(dato);
              } else {
                old.push(dato);
              }
              let uno = 0;
              switch (dato) {
                case '±':
                  uno = clicked.join('').includes('.') ? parseFloat(clicked.join(''))
                    : parseInt(clicked.join(''), 10);
                  old = ((uno * -1).toString());
                  break;
                default:
                  break;
              }
            }
          } else if (['x', '-', '+', '%', '=', '÷'].includes(dato)) {
            old = [];
            if (primer === '') {
              setPrimer(clicked.join(''));
            } else {
              const segundo = clicked.join('');
              let uno = 0;
              let dos = 0;
              let resultado = '';

              uno = primer.includes('.') ? parseFloat(primer) : parseInt(primer, 10);
              dos = segundo.includes('.') ? parseFloat(segundo) : parseInt(segundo, 10);
              switch (operacion[1]) {
                case 'x':

                  resultado = String(uno * dos);

                  if (resultado.length <= 9) {
                    old.push(uno * dos);
                    setPrimer((uno * dos).toString());
                  } else {
                    old.push('ERROR');
                    setPrimer('ERROR');
                  }
                  break;
                case '÷':

                  resultado = String(uno / dos);

                  if (resultado.length <= 9) {
                    old.push(uno / dos);
                    setPrimer((uno / dos).toString());
                  } else {
                    old.push('ERROR');
                    setPrimer('ERROR');
                  }
                  break;
                case '-':

                  resultado = String(uno - dos);

                  if (resultado.length <= 9) {
                    old.push(uno - dos);
                    setPrimer((uno - dos).toString());
                  } else {
                    old.push('ERROR');
                    setPrimer('ERROR');
                  }
                  break;
                case '+':

                  resultado = String(uno + dos);

                  if (resultado.length <= 9) {
                    old.push(uno + dos);
                    setPrimer((uno + dos).toString());
                  } else {
                    old.push('ERROR');
                    setPrimer('ERROR');
                  }
                  break;
                case '%':

                  resultado = String(uno % dos);

                  if (resultado.length <= 9) {
                    old.push(uno % dos);
                    setPrimer((uno % dos).toString());
                  } else {
                    old.push('ERROR');
                    setPrimer('ERROR');
                  }
                  break;
                default:
                  break;
              }
            }
            setOperacion([true, dato]);
          }
        }
    }
    setClicked([...old]);
  };

  return (
    <div className="container">
      <div className="pantalla">
        <h1>{clicked.join('')}</h1>
      </div>
      <div className="teclado">
        <div className="botones">
          {
            botones.map((boton) => (
              <Boton key={boton} boton={boton} changeText={changeText} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Calculadora;
