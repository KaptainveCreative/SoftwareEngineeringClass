// Variable to store the generated password
let password = '';
let passwordList = [];

function generatePassword() {
  password = ''
  const passwordLength = document.getElementById('passwordLength').value;
  const includeNumbers = document.getElementById('includeNumbers').checked;
  const includeLowercase = document.getElementById('includeLowercase').checked;
  const includeUppercase = document.getElementById('includeUppercase').checked;
  const includeSpecial = document.getElementById('includeSpecial').checked;

  // Define character sets
  const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberCharacters = '0123456789';
  const specialCharacters = '!@#$%^&*()-_=+';

  // Create an array to store the selected character sets
  const selectedCharacterSets = [];

  if (includeLowercase) {
    selectedCharacterSets.push(lowercaseCharacters);
  }

  if (includeUppercase) {
    selectedCharacterSets.push(uppercaseCharacters);
  }

  if (includeNumbers) {
    selectedCharacterSets.push(numberCharacters);
  }

  if (includeSpecial) {
    selectedCharacterSets.push(specialCharacters);
  }

  // Ensure at least one character set is selected
  if (selectedCharacterSets.length === 0) {
    alert('Please select at least one character set.');
    return;
  }

  // Generate the password
  const allCharacters = selectedCharacterSets.join('');
  const length = parseInt(passwordLength, 10);

  if (isNaN(length) || length <= 0) {
    alert('Please enter a valid length');
    return;
  }

  // Ensure at least one character from each selected set is included

  for (const charSet of selectedCharacterSets) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    password += charSet.charAt(randomIndex);
  }

  // Generate the remaining characters
  for (let i = password.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters.charAt(randomIndex);
  }

  // Shuffle the password to randomize the order
  password = shuffleString(password);

  // Add password to list
  passwordList.push(password);

  // Display the password list in the HTML
  displayPasswordList();

  document.getElementById('generatedPassword').innerText = 'Password Generated ' ;

    // Return the generated password
    return password;
  
}

// Function to shuffle a string
function shuffleString(str) {
  const arr = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

// copy feature added back

document.getElementById('copyButton').addEventListener('click', copyFeature);

function copyFeature() {
    const generatedPasswordElement = document.getElementById('generatedPassword');
    const passwordText = generatedPasswordElement.innerText.replace('Generated Password: ', '');
    console.log(passwordText); // Log the passwordText to the console

    navigator.clipboard.writeText(passwordText)
      .then(() => alert('Password copied to clipboard!'))
      .catch(err => console.error('Unable to copy to clipboard', err));
  }

//show/hide password
function showPassword() {
  let generatedPassword = document.getElementById("generatedPassword");

  if (generatedPassword.getAttribute("data-shown") === "true") {
    generatedPassword.innerHTML = "Generated Password: ********";
    generatedPassword.setAttribute("data-shown", "false");
  } else {
    // Use the stored password
    generatedPassword.innerHTML = 'Generated Password: ' + password;
    generatedPassword.setAttribute("data-shown", "true");
  }
}

// Function to display the passwordList
function displayPasswordList() {
  const passwordHistory = document.getElementById('passwordList');
  passwordHistory.innerHTML = ''; // Clear the previous list

  for (let i = passwordList.length - 1; i >= 0; i--) {
    const generatedPassword = passwordList[i];
    const listItem = document.createElement('li');
    listItem.textContent = generatedPassword;
    passwordHistory.appendChild(listItem);
  }
}

//Function to toggle password history
function togglePasswordHistory() {
  const passwordHistory = document.getElementById('passwordHistory');
  const currentDisplay = passwordHistory.style.display;
  passwordHistory.style.display = currentDisplay === 'none' ? 'block' : 'none';
}