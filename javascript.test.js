const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Load the HTML content
const htmlPath = path.resolve(__dirname, 'index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Create a DOM environment
const { window } = new JSDOM(htmlContent);
global.document = window.document;

// Load the JavaScript file
require('./javascript');

describe('Password Generator Tests', () => {
  beforeEach(() => {
    // Reset mock functions and variables before each test
    jest.resetAllMocks();
    password = ''; // Reset password variable
    passwordList = []; // Reset passwordList variable
  });

  test('generatePassword should generate a password and update the UI', () => {
    // Call the generatePassword function
    generatePassword();

    // Check if password is generated
    expect(password).toBeTruthy();

    // Check if displayPasswordList is called
    expect(displayPasswordList).toHaveBeenCalled();

    // Check if showPassword is called
    expect(showPassword).toHaveBeenCalled();
  });

  test('copyFeature should copy the password to the clipboard', async () => {
    // Mock the clipboard API
    global.navigator.clipboard = {
      writeText: jest.fn(() => Promise.resolve()),
    };

    // Mock the password for testing
    password = 'testPassword';

    // Call the copyFeature function
    await copyFeature();

    // Check if navigator.clipboard.writeText is called with the correct password
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('testPassword');

    // Check if console.log is called with the correct password
    expect(console.log).toHaveBeenCalledWith('testPassword');

    // Check if window.alert is called with the success message
    expect(window.alert).toHaveBeenCalledWith('Password copied to clipboard!');
  });
});
