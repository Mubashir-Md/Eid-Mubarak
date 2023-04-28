const express = require('express')
const puppeteer = require('puppeteer');
const cors = require('cors')
const app = express();


app.use(express.static('public'));
app.use(cors());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/screenshot', async (req,res) => {

  const name = req.query.name;
  console.log({name})
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 720 });
  const website_url = `http://localhost:3000?name=${name}`;

  await page.goto(website_url);

  const html = await page.content();
  const updatedHtml = html.replace(/Your name/g, name);
  await page.setContent(updatedHtml);

  const selector = '#area'
  await page.waitForSelector(selector);
  const element = await page.$(selector); 

  const ss = await element.screenshot({ type: 'png' });

  await browser.close();

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Disposition', 'attachment: filename=screenshot.png')
  res.send(ss)

});



app.listen(3000, ()=>{
  console.log("Server is listening at port 3000")
});

