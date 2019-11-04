const {Builder, By, until} = require("selenium-webdriver");
const assert = require("chai").assert;

let loginEmail = "";
let loginPass = "";

test(loginEmail, loginPass);

async function test(loginEmail, loginPass) {
    console.log("step 1. According to test task.");
    let driver = new Builder().forBrowser("chrome").build();
    await driver.get("https://getnada.com/");
    await driver.manage().window().maximize();
    let getNadaUrl = await driver.getCurrentUrl();
    await assert.equal(getNadaUrl, "https://getnada.com/", "getnada.com open succefully");
    let email = await driver.findElement(By.xpath("//*[@class='address what_to_copy']")).getText();
    let emailName = (await email.match(/[A-Za-z0-9]{1,}/g))[0];
    let randomsImages = [];

    console.log("step 2. According to test task.");
    await driver.get("https://aws.random.cat/meow");
    let randomCat = await driver.findElement(By.tagName("pre")).getText();
    randomsImages.push((await randomCat.match(/\.*https:.*.\w/g))[0]);
    await assert.include(randomsImages[0], "http", "RandomCat link was requested");
    await driver.get("https://random.dog/woof.json");
    let randomDog = await driver.findElement(By.tagName("pre")).getText();
    randomsImages.push((await randomDog.match(/\.*https:.*.\w/g))[0]);
    await assert.include(randomsImages[1], "http", "RandomDog link was requested");
    await driver.get("https://randomfox.ca/floof/");
    let randomFox = await driver.findElement(By.tagName("pre")).getText();
    randomsImages.push((await randomFox.match(/\.*http:.*\.jpg\.*/g))[0]);
    await assert.include(randomsImages[2], "http", "RandomFox link was requested");
    let urlImages = randomsImages.join("\n");

    console.log("step 3. According to test task.");
    await driver.get("https://accounts.google.com/signin");
    await driver.findElement(By.xpath("//*[@class='whsOnd zHQkBf' and @type='email']")).sendKeys(loginEmail);
    await driver.findElement(By.xpath("//*[@class='RveJvd snByac']")).click();
    await driver.wait(until.urlIs('https://accounts.google.com/signin/v2/sl/pwd?flowName=GlifWebSignIn&flowEntry=ServiceLogin&cid=1&navigationDirection=forward'), 8000);
    await driver.sleep(2000);
    await driver.findElement(By.xpath("//*[@class='whsOnd zHQkBf' and @type='password']")).sendKeys(loginPass);
    await driver.findElement(By.xpath("//*[@class='RveJvd snByac']")).click();
    await driver.wait(until.elementLocated(By.xpath("//*[@class='KlDWw']")), 8000);
    await driver.sleep(2000);
    await driver.get("https://mail.google.com/");
    await driver.wait(until.elementLocated(By.xpath("//*[@class='T-I J-J5-Ji T-I-KE L3']")), 8000);
    await driver.findElement(By.xpath("//*[@class='T-I J-J5-Ji T-I-KE L3']")).click();
    await driver.wait(until.elementLocated(By.xpath("(//*[@class='vO'])[1]")), 8000);
    await driver.findElement(By.xpath("(//*[@class='vO'])[1]")).sendKeys(email);
    await driver.findElement(By.xpath("//*[@class='Am Al editable LW-avf tS-tW']")).sendKeys(urlImages);
    await driver.findElement(By.xpath("//*[@class='T-I J-J5-Ji aoO v7 T-I-atl L3']")).click();
    await driver.sleep(2000);
    await driver.findElement(By.xpath("//*[@class='TN bzz aHS-bnu']")).click();
    await driver.sleep(2000);
    let sentEmail = await driver.findElement(By.xpath(`//span[@name='${emailName}']`)).getText();
    await assert.equal(sentEmail, emailName, `Email was sent to ${email}.`);

    console.log("step 4. According to test task.");
    await driver.get("https://getnada.com/");
    await driver.sleep(15000);
    let boxElements = await driver.findElements(By.xpath("//*[@class='msg_item']"));
    for (let i = 0; i < boxElements.length; i++) {
        let correctEmailBox = await boxElements[i].getText();
        if (await correctEmailBox.includes(loginEmail)){
            await boxElements[i].click();
            break;
        }
    }
    await driver.sleep(2000);
    await driver.switchTo().frame(1);
    let linksInBox = await driver.findElement(By.xpath("//div[contains(@dir,'ltr')]")).getText();
    await assert.equal(linksInBox, urlImages,"Email was received (matches from step 3).");
    await driver.quit();
}