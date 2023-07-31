const { Builder, By, Key, until } = require('selenium-webdriver');

async function hollandAndBarrettTest() {

 try {   
		let driver =  new Builder().forBrowser(Browser.CHROME).build();
		driver.get('https://www.hollandandbarrett.com/en-au');
		driver.manage().window().maximize();
   
        // Login with registered user
        const loginButton = await driver.findElement(By.className('username'));
        await loginButton.click();

        const passwordInput = await driver.findElement(By.id('password'));
        await passwordInput.sendKeys('your_password', Key.RETURN);
        
        await driver.wait(until.titleContains('Welcome'), 5000);

        // Navigate to 'Vitamins & Supplements' category
        await driver.findElement(By.linkText('Vitamins & Supplements')).click();

        // Add Vitamin C products to the basket
        const addToBasketButtons = await driver.findElements(By.css('[data-test-id="addToBasketButton"]'));
        for (const button of addToBasketButtons) {
            await button.click();
            await driver.sleep(1000); // Wait for the product to be added
        }

        // Verify both products are added to the basket
        const basketIcon = await driver.findElement(By.className('Header__basketIcon'));
        await basketIcon.click();

        const basketItems = await driver.findElements(By.css('[data-test-id="basketItem"]'));
        console.log('Number of items in the basket:', basketItems.length);
        if (basketItems.length >= 2) {
            console.log('Both products are added to the basket.');
        } else {
            console.log('Something went wrong. The products are not added to the basket.');
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await driver.quit();
    }
}

