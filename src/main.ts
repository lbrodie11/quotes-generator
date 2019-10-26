import { HttpService, Logger } from '@nestjs/common';
import { tweet } from './services/twitter.api.service';

const http = new HttpService();
const logger = Logger;

async function runQuoteGenerator() {
  setTimeout(async () => {
  try {
    const favQsQuote = await http
      .get('https://favqs.com/api/qotd')
      .toPromise()
      .then(res => res.data);
    logger.log('Preparing tweet from Fav Quotes');
    const status = `
  💭${favQsQuote.quote.body}
  ✍🏼${favQsQuote.quote.author}

  🏷️#${favQsQuote.quote.author.replace(/[ ,.]/g, '')}
  `;
    logger.log('Posting tweet for a lastest quote');
    logger.log(status);
    await tweet(status);
  } catch (err) {
    logger.error(err);
  }
}, 5500000);

  setTimeout(async () => {
    try {
      const kanyeQuote = await http
        .get('https://api.kanye.rest')
        .toPromise()
        .then(res => res.data);
      logger.log('Preparing tweet from Kanye');
      const status = `
    💭${kanyeQuote.quote}
    ✍🏼Kanye West

    🏷️#KanyeWest
    `;
      logger.log('Posting tweet for a lastest quote');
      logger.log(status);
      await tweet(status);
    } catch (err) {
      logger.error(err);
    }
  }, 6500000);

  setTimeout(async () => {
    try {
      const quoteGardenQuote = await http
        .get('https://quote-garden.herokuapp.com/quotes/random')
        .toPromise()
        .then(res => res.data);
      logger.log('Preparing tweet from Quote Garden');
      const { quoteText, quoteAuthor } = quoteGardenQuote;
      console.log(JSON.stringify(quoteText, null, 2));
      const status = `
    💭${quoteText}
    ✍🏼${quoteAuthor}

    🏷️#${quoteAuthor.replace(/[ ,.]/g, '')}
    `;
      logger.log('Posting tweet for a lastest quote');
      logger.log(status);
      await tweet(status);
    } catch (err) {
      logger.error(err);
    }
  }, 7500000);

  setTimeout(async () => {
    try {
      const theySaidSoQuote = await http
        .get('http://quotes.rest/qod.json')
        .toPromise()
        .then(res => res.data);
      logger.log('Preparing tweet from They Said So');
      console.log(JSON.stringify(theySaidSoQuote.contents.quotes[0].quote, null, 2));
      const status = `
    💭${theySaidSoQuote.contents.quotes[0].quote}
    ✍🏼${theySaidSoQuote.contents.quotes[0].author}

    🏷️#${theySaidSoQuote.contents.quotes[0].author.replace(/[ ,.]/g, '')}
    `;
      logger.log('Posting tweet for a lastest quote');
      logger.log(status);
      await tweet(status);
    } catch (err) {
      logger.error(err);
    }
  }, 8500000);
}

runQuoteGenerator();
