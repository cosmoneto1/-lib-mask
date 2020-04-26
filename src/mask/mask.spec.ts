import { Mask, UnMask } from './mask';
const value = '12345678912';
const valueMask = '123.456.789-12';
const mask = '999.999.999-99';
const masks = ['999.999.999-99', '99.999.999/9999-99'];
const valueCnpj = '12345678000106';
const valueCnpjMask = '12.345.678/0001-06';

test('should return not mask', () => {
  expect(UnMask(valueMask)).toBe(value);
});

test('should return mask', () => {
  expect(Mask(value, mask)).toBe(valueMask);
});

test('should return mask cnpj', () => {
  expect(Mask(valueCnpj, masks)).toBe(valueCnpjMask);
});

test('should return mask cpf', () => {
  expect(Mask(value, masks)).toBe(valueMask);
});
