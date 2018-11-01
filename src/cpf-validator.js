const FIRST_VERIFY_DIGIT = 9
const SECOND_VERIFY_DIGIT = 10

const getVerifyDigit = num => {
  const result = (num * 10) % 11;
  return [10, 11].indexOf(result) >= 0 ? 0 : result;
};

const sumValuesUntilIndex = (array, last) => {
  return array
    .slice(0, last)
    .map((value, index) => value * (last + 1 - index))
    .reduce((acc, next) => acc + next);
}

const buildRepetiveNumberArray = Array.from({
  length: 10
}, (v, k) => k.toString().repeat(11))

const invalidLength = cpf => cpf.length != 11;
const invalidNumbers = cpf => buildRepetiveNumberArray.indexOf(cpf) >= 0

function cpf_validator(strCPF) {

  if (invalidLength(strCPF) || invalidNumbers(strCPF)) return false;

  const cpfAsNumArray = Array.from(strCPF).map(Number);

  const firstVeirfyDigit = sumValuesUntilIndex(cpfAsNumArray, FIRST_VERIFY_DIGIT)
  const secondVeirfyDigit = sumValuesUntilIndex(cpfAsNumArray, SECOND_VERIFY_DIGIT)

  return getVerifyDigit(firstVeirfyDigit) == cpfAsNumArray[FIRST_VERIFY_DIGIT] &&
    getVerifyDigit(secondVeirfyDigit) == cpfAsNumArray[SECOND_VERIFY_DIGIT]
}

const cpf_validador_html_output = cpf => {
  return cpf_validator(cpf) ? `<label> CPF válido </label>` : `<label> CPF inválido </label>`;
}

module.exports = {
  cpf_validator,
  cpf_validador_html_output
}