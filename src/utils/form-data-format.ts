import Dinero from 'dinero.js';

export function formatMoney(value: string) {
  let val = '';

  if (!value) {
    val = '0';
  }

  val = value.trim().replace('R$', '').replaceAll('.', '').replaceAll(',', '');

  const treatedValue = Dinero({ amount: parseFloat(val), currency: 'BRL' })
    .setLocale('pt-BR')
    .toFormat();

  return treatedValue;
};
