require("dotenv").load();
const puppeteer = require("puppeteer");

const getAgora = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-features=site-per-process"
    ]
  });

  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on("request", req => {
    if (req.resourceType() === "stylesheet" || req.resourceType() === "font") {
      req.abort();
    } else {
      req.continue();
    }
  });

  // page.on("console", msg => console.log("PAGE LOG:", msg.text()));

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(
    "https://login.bc.edu/nidp/idff/sso?id=30&sid=0&option=credential&sid=0&target=https%3A%2F%2Fservices.bc.edu%2Fcommoncore%2Fmyservices.do"
  );

  await page.waitForSelector("input#username");
  await page.type("input#username", process.env.USER);

  await page.waitForSelector("input#username");
  await page.type("input#password", process.env.PASS);

  await page.waitForSelector('button[type="submit"]', { visible: true });
  await page.click('button[type="submit"]');

  await page.waitFor(2000);
  await page.goto(
    "https://services.bc.edu/password/external/launcher/generic.do?id=OneCardFunds"
  );

  const data = await page.evaluate(() => {
    const tds = Array.from(
      document.querySelectorAll("table.current-balances tr td")
    );
    return tds.map(td => td.innerHTML);
  });

  browser.close();
  return await data;
};
// uncomment if running directly
// getAgora();

module.exports = getAgora;
