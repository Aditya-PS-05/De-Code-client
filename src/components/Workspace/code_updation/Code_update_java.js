
export const replaceVariableJava = (code, variables) => {
  let updatedCode = code;
  Object.keys(variables).forEach((variable) => {

    const { type, value } = variables[variable];
      let replacement;

      if (Array.isArray(value)) {
          replacement = `${type} ${variable} = {${value.join(', ')}};`;
      } else {
          replacement = `${type} ${variable} = ${value};`;
      }

      const regex = new RegExp(`\\b${type}\\s+${variable}\\s*;`, 'g');
      updatedCode = updatedCode.replace(regex, replacement);
  });
  console.log(updatedCode)
  return updatedCode;
};