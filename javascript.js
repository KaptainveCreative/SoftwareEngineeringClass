function generatePassword() {
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
  let password = '';
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

  document.getElementById('generatedPassword').innerText = 'Generated Password: ' + password;
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
