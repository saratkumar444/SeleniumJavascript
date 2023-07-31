
function openWebsite() {
     let driver =  new Builder().forBrowser(Browser.CHROME).build();
     driver.get('https://www.hollandandbarrett.com/en-au');
     driver.manage().window().maximize();
    
     }
     
     // Wait to page load
     function wait(ms) {
       return new Promise(resolve => setTimeout(resolve, ms));
     }
     
     // Step 2: Click on the Rewards section
     async function clickRewardsSection() {
       const rewardsSection = document.getElementsByClassName('HeaderRflWidget-module_label__lz-Ba');
       rewardsSection.click();
       await wait(3000);
     }
            
     // Step 4: Register for an account, please update the details.
     function registerAccount() {
       const userFirstNameInput = document.getElementById('firstName');
       const userLastNameInput = document.getElementById('lastName');
       const emailInput = document.getElementById('email');
       const confirmEmailInput = document.getElementById('confirmEmail')
       const passwordInput = document.getElementById('password');
       const submit = document.getElementById('submit');
     
       // Fill in the registration form with the required details
       userFirstNameInput.value = 'your-Firstname';
       userLastNameInput.value = 'your-Lastrname';
       emailInput.value = 'your-email@example.com';
       confirmEmailInput.value = 'your-confirmemail@example.com';
       passwordInput.value = 'your-password';
       submit.click();
     }
     
     // Step 5: Verify whether the account has been created
     function verifyAccountCreation() {
       const verificationMessage = document.getElementById('account-verification-message');
       if (verificationMessage) {
         console.log('Account created successfully.');
       } else {
         console.log('Failed to create an account.');
       }
     }
     
     // Call the functions in sequence to perform the steps
     openWebsite()
       .then(clickRewardsSection)
       .then(clickCreateAccount)  
       .then(registerAccount)
       .then(wait(3000)) // Wait for a while to allow the account creation process to complete (adjust the time as needed)
       .then(verifyAccountCreation)
       .catch(error => console.error('An error occurred:', error));