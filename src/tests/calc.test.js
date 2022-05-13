/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calculadora from '../calculadora';

it('Error con resultados mas largos a 9 caracteres ', async () => {
  render(<Calculadora />);
  const num1 = screen.getByText('1');
  const num2 = screen.getByText('0');
  const mult = screen.getByText('x');
  const igual = screen.getByText('=');

  expect(num1).toBeInTheDocument();
  expect(num2).toBeInTheDocument();
  expect(mult).toBeInTheDocument();
  expect(igual).toBeInTheDocument();
  // numero de longitud 7
  await userEvent.click(num1);
  for (let i = 0; i < 7; i++) {
    await userEvent.click(num2);
  }
  /// Se elije la multiplicacion
  await userEvent.click(mult);
  // Se multiplica por 100
  await userEvent.click(num1);
  await userEvent.click(num2);
  await userEvent.click(num2);
  // Se selecciona = 
  await userEvent.click(igual);
  // Al ser un numero mayor a 9 caracteres tira error
  expect(screen.getByText('ERROR')).toBeInTheDocument();
});

it('+/- funciona correctamente en la operacion', async () => {
  render(<Calculadora />);
  const seis = screen.getByText('6');
  const masmenos = screen.getByText('±');
  const mas = screen.getByText('+');
  const uno = screen.getByText('1');
  const igual = screen.getByText('=');

  expect(seis).toBeInTheDocument();
  expect(masmenos).toBeInTheDocument();
  expect(mas).toBeInTheDocument();
  expect(uno).toBeInTheDocument();
  expect(igual).toBeInTheDocument();
  // Se selecciona el numero 6
  await userEvent.click(seis);
  // Se usa el +/- para convertir en negativo
  await userEvent.click(masmenos);
  // Se selecciona la suma
  await userEvent.click(mas);
  // Se selecciona el numero 1
  await userEvent.click(uno);
  // Se selecciona = y se espera 5 como resultado
  await userEvent.click(igual);
  expect(screen.getByText('-5')).toBeInTheDocument();
});

it('Verificar el toFixed de la division a 4 decimales siguiendo la regla de los 9 numeros max', async () => {
  render(<Calculadora />);
  const cero = screen.getByText('0');
  const uno = screen.getByText('1');
  const punto = screen.getByText('.');
  const div = screen.getByText('÷');
  const igual = screen.getByText('=');

  expect(cero).toBeInTheDocument();
  expect(uno).toBeInTheDocument();
  expect(punto).toBeInTheDocument();
  expect(div).toBeInTheDocument();
  expect(igual).toBeInTheDocument();
  // Se selecciona el numero 10
  await userEvent.click(uno);
  await userEvent.click(cero);
  // Se selecciona la div
  await userEvent.click(div);
  // Se selecciona el numero 1.1
  await userEvent.click(uno);
  await userEvent.click(punto);
  await userEvent.click(uno);
  // Se selecciona = 
  await userEvent.click(igual);
  expect(screen.getByText('9.0909')).toBeInTheDocument();
});
