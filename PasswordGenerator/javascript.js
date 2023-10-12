function generatePassword() {
    // Get the password length as an input
    const passwordLength = document.getElementById('passwordLength').value;


    // error handling for the input
    const length = parseInt(passwordLength, 10);
    if(isNaN(length) || length <=0){
        alert('Please enter a valid length')
        return
}
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+';
    let password = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
  
  // Display the generated password
  document.getElementById('generatedPassword').innerText = 'Generated Password: ' + password;  

}
document.getElementById('copyButton').addEventListener('click', copyFeature);

function copyFeature() {
    const generatedPasswordElement = document.getElementById('generatedPassword');
    const passwordText = generatedPasswordElement.innerText.replace('Generated Password: ', '');
    console.log(passwordText); // Log the passwordText to the console

    navigator.clipboard.writeText(passwordText)
      .then(() => alert('Password copied to clipboard!'))
      .catch(err => console.error('Unable to copy to clipboard', err));
  }
