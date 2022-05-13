import './app.css';
import React, { useState } from 'react';
import Boton from './boton';

/* eslint-disable react/function-component-definition */
const Calculadora = () => {
  // en orden de la calculadora para evitar complicaciones
  const botones = ['AC', 'DEL', '±', '÷', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '.', '0', '%', '='];
  const [presionado, setPresionado] = useState([]);
  const [operacion, setOperacion] = useState([false, '']);
  const [mostrado, setMostrado] = useState('');

  const changeText = (dato) => {
    let anterior = [...presionado];
    switch (dato) {
      // borrar un numero
      case 'DEL':
        anterior.pop(dato);
        break;
      // borrar toda la operacion
      case 'AC':
        setMostrado('');
        anterior = [];
        break;
      default:
        if (presionado.length <= 9) {
          if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '±'].includes(dato)) {
            if (presionado.length !== 9) {
              if (operacion[0]) {
                anterior = [];
                setOperacion([false, operacion[1]]);
              }
              if (!anterior.includes('.') && dato === '.') {
                anterior.push(dato);
              } else {
                anterior.push(dato);
              }
              let primero = 0;
              switch (dato) {
                case '±':
                  primero = presionado.join('').includes('.') ? parseFloat(presionado.join(''))
                    : parseInt(presionado.join(''), 10);
                  anterior = ((primero * -1).toString());
                  break;
                default:
                  break;
              }
            }
          } else if (['x', '-', '+', '%', '=', '÷'].includes(dato)) {
            anterior = [];
            if (mostrado === '') {
              setMostrado(presionado.join(''));
            } else {
              const mostrado2 = presionado.join('');
              let primero = 0;
              let segundo = 0;
              let resultado = 0;
              let resultadoText = '';
              let resultadodiv;
              // verificacion si los numeros llevan decimal o no
              primero = mostrado.includes('.') ? parseFloat(mostrado) : parseInt(mostrado, 10);
              segundo = mostrado2.includes('.') ? parseFloat(mostrado2) : parseInt(mostrado2, 10);
              switch (operacion[1]) {
                // suma
                case '+':
                  resultado = (primero + segundo);
                  resultadoText = String(resultado);

                  if (resultadoText.length <= 9) {
                    anterior.push(resultado);
                    setMostrado(resultadoText);
                  } else {
                    anterior.push('ERROR > 9');
                    setMostrado('ERROR > 9');
                  }
                  break;
                // resta
                case '-':
                  resultado = (primero - segundo);
                  resultadoText = String(resultado);

                  if (resultadoText.length <= 9) {
                    anterior.push(resultado);
                    setMostrado(resultadoText);
                  } else {
                    anterior.push('ERROR > 9');
                    setMostrado('ERROR > 9');
                  }
                  break;
                // multiplicacion
                case 'x':
                  resultado = (primero * segundo);
                  resultadoText = String(primero * segundo);

                  if (resultadoText.length <= 9) {
                    anterior.push(resultado);
                    setMostrado(resultadoText);
                  } else {
                    anterior.push('ERROR > 9');
                    setMostrado('ERROR > 9');
                  }
                  break;
                // division funcional con decimales limitados
                case '÷':
                  resultadodiv = parseFloat(primero / segundo).toFixed(4);
                  resultadoText = String(resultadodiv);

                  if (resultadoText.length <= 9) {
                    anterior.push(resultadodiv);
                    setMostrado(resultadoText);
                  } else {
                    anterior.push('ERROR > 9');
                    setMostrado('ERROR > 9');
                  }
                  break;
                // mod
                case '%':
                  resultado = (primero % segundo);
                  resultadoText = String(resultado);

                  if (resultadoText.length <= 9) {
                    anterior.push(resultado);
                    setMostrado(resultadoText);
                  } else {
                    anterior.push('ERROR > 9');
                    setMostrado('ERROR > 9');
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
    setPresionado([...anterior]);
  };

  return (
    <div className="container">
      <div className="pantalla">
        <h1>{presionado.join('')}</h1>
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
