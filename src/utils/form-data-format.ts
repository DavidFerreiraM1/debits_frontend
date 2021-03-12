import Dinero from 'dinero.js';

export function formatMoney(value: number) {
  console.log('pure value', value);
  if (!value) {
    return 0;
  }

  const result = Dinero({ amount: value, currency: 'BRL' }).toFormat()
  
  console.log('RESULT', result);
  return parseFloat(result.replace('R$',''));
};
