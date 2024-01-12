function validateUserInput(userInput: any) {
  return (
    typeof userInput.username === 'string' &&
    typeof userInput.age === 'number' &&
    (Array.isArray(userInput.hobbies) || userInput.hobbies === undefined) &&
    (userInput.hobbies === undefined || userInput.hobbies.every((hobby: any) => typeof hobby === 'string'))
  );
}

export default validateUserInput;
