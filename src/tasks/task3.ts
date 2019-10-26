import { HttpService, Logger } from '@nestjs/common';
import { tweet } from '../services/twitter.api.service';

const http = new HttpService();
const logger = Logger;

async function task3(){
  logger.log('Quote Garden cron schedule started');
  try {
    const quoteGardenQuote = await http
      .get('https://quote-garden.herokuapp.com/quotes/random')
      .toPromise()
      .then(res => res.data);
    logger.log('Preparing tweet from Quote Garden');
    const status = `
  💭${quoteGardenQuote.quoteText}
  ✍🏼${quoteGardenQuote.quoteAuthor}

  🏷️#${quoteGardenQuote.quoteAuthor.replace(/[ ,.]/g, "")}
  `;
    this.logger.log('Posting tweet for a lastest quote');
    this.logger.log(status);
    await tweet(status);
  } catch (err) {
    logger.error(err);
  }
}
task3();