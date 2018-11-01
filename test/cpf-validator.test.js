const {
  assert
} = require('chai');

const {
  cpf_validator,
  cpf_validador_html_output
} = require('../src/cpf-validator');

const validCPF = '57330783838';
const invalidCPF = [
  '573.307.838-38',
  '00000000000',
  "11111111111",
  "22222222222",
  "33333333333",
  "44444444444",
  "55555555555",
  "66666666666",
  "77777777777",
  "88888888888",
  "99999999999",
  '57330783818',
  '57330783834',
  '573307838388',
  []
]

describe('Dado um CPF', () => {

  it('Deveria retornar label válido com CPF sem pontuação', () => {
    const expected = true
    const result = cpf_validator(validCPF);
    assert.equal(expected, result);
  });
  it('Deveria retornar label inválido com CPF com pontuação', () => {
    const expected = false
    const result = cpf_validator(invalidCPF[0]);
    assert.equal(expected, result);
  });

  invalidCPF.slice(1, 11).forEach(element => {
    it('Deveria retornar label inválido com CPF de números iguais nas 11 posições: ' + element, () => {
      const expected = false
      const result = cpf_validator(element);
      assert.equal(expected, result);
    });
  });
  it('Deveria retornar label inválido com CPF com 1º mod inválido', () => {
    const expected = false
    const result = cpf_validator(invalidCPF[11]);
    assert.equal(expected, result);
  });

  it('Deveria retornar label inválido com CPF com 2º mod inválido', () => {
    const expected = false
    const result = cpf_validator(invalidCPF[11]);
    assert.equal(expected, result);
  });

  it('Deveria retornar invalido com CPF não string', () => {
    const expected = false
    const result = cpf_validator(invalidCPF[12]);
    assert.equal(expected, result);
  });

  it('Deveria retornar invalido com CPF com tamanho <> 11', () => {
    const expected = false
    const result = cpf_validator(invalidCPF[13]);
    assert.equal(expected, result);
  });
});

describe('Dado um CPF, exibir msg no html', () => {
  it('Com um CPF valido expero a msg "CPF válido"', () => {
    const expected = `<label> CPF válido </label>`
    const result = cpf_validador_html_output(validCPF);
    assert.equal(expected, result);
  });

  it('Com um CPF inválido expero a msg "CPF inválido"', () => {
    const expected = `<label> CPF inválido </label>`
    const result = cpf_validador_html_output(invalidCPF[0]);
    assert.equal(expected, result);
  });
});