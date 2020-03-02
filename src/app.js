const puppeteer = require('puppeteer')

const scrape = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1')

  const texts = await page.evaluate(() => {
    const data = []
    const playerNames = document.getElementsByClassName('playerName')
    const next = document.getElementsByClassName('paginationBtn paginationNextContainer')

    while (next) {
      for (var playerName of playerNames) {
        data.push(playerName.textContent)
        page.click(next)
      }
    }

    return data
  })

  browser.close()
  return texts
}
scrape().then((value) => {
  console.log(value)
})
