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

        // Navigate to 'Vitamins & Supplements' category and add 2 Vitamin C products to the basket
        await driver.findElement(By.linkText('Vitamins & Supplements')).click();
        const vitaminCProducts = await driver.findElements(By.css('[data-test-id="addToBasketButton"]'));
        for (let i = 0; i < 2; i++) {
            await vitaminCProducts[i].click();
            await driver.sleep(1000); // Wait for the product to be added
        }

        // Navigate to 'Vegan' category and add 3 Vegan Chocolate products to the basket
        await driver.findElement(By.linkText('Vegan')).click();
        const veganChocolateProducts = await driver.findElements(By.css('[data-test-id="addToBasketButton"]'));
        for (let i = 0; i < 3; i++) {
            await veganChocolateProducts[i].click();
            await driver.sleep(1000); // Wait for the product to be added
        }

        // Verify all products are added to the basket
        const basketIcon = await driver.findElement(By.className('Header__basketIcon'));
        await basketIcon.click();

        const basketItems = await driver.findElements(By.css('[data-test-id="basketItem"]'));
        console.log('Number of items in the basket:', basketItems.length);
        if (basketItems.length === 5) {
            console.log('All products are added to the basket.');
        } else {
            console.log('Something went wrong. All products are not added to the basket.');
        }

        // Verify subtotal and total of the basket
        const itemsSubtotal = await driver.findElement(By.className('BasketTotalSub__value')).getText();
        const itemsTotal = await driver.findElement(By.className('BasketTotal__value')).getText();

        console.log('Subtotal of the items:', itemsSubtotal);
        console.log('Total of the basket:', itemsTotal);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await driver.quit();
    }
}

hollandAndBarrettTest();
