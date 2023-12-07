// Import the necessary functions and constants
const { generatePassword, copyFeature, showPassword } = require('./javascript'); 

// Mock the necessary DOM elements
document.body.innerHTML = `
  <input type="text" id="passwordNum" value="1">
  <input type="text" id="passwordLength" value="12">
  <input type="checkbox" id="includeNumbers" checked>
  <input type="checkbox" id="includeLowercase" checked>
  <input type="checkbox" id="includeUppercase" checked>
  <input type="checkbox" id="includeSpecial" checked>
  <div id="generatedPassword"></div>
  <div id="copied"></div>
`;

// Mock the clipboard API
navigator.clipboard = {
  writeText: jest.fn(() => Promise.resolve()),
};

// Mock the setTimeout function
jest.useFakeTimers();

// Test the generatePassword function
test('generatePassword generates a password', () => {
  const password = generatePassword();
  expect(password).toBeTruthy();
});

// Test the copyFeature function
test('copyFeature copies the password to clipboard and shows "Password Copied"', async () => {
  // Run the generatePassword function to populate the password
  generatePassword();

  // Mock the alert function
  const originalAlert = window.alert;
  window.alert = jest.fn();

  // Run the copyFeature function
  await copyFeature();

  // Expect the clipboard API to be called with the correct password
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.any(String));

  // Expect the "Password Copied" message to be displayed
  expect(document.getElementById('copied').textContent).toBe('Password Copied');

  // Advance timers to trigger the timeout
  jest.runAllTimers();

  // Expect the "Password Copied" message to be cleared after the timeout
  expect(document.getElementById('copied').textContent).toBe('');

  // Restore the original alert function
  window.alert = originalAlert;
});

// Test the showPassword function
test('showPassword displays passwords or asterisks based on the checkbox state', () => {
  // Mock the checkbox state
  document.getElementById('showPasswordCheckbox').checked = true;

  // Run the showPassword function
  showPassword();

  // Expect the generated passwords to be displayed
  expect(document.getElementById('generatedPassword').innerHTML).toContain('Generated Passwords');

  // Mock the checkbox state
  document.getElementById('showPasswordCheckbox').checked = false;

  // Run the showPassword function
  showPassword();

  // Expect asterisks to be displayed
  expect(document.getElementById('generatedPassword').innerHTML).toContain('Generated Password: ********');
});
