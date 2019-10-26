import { HttpService, Logger } from '@nestjs/common';
import { tweet } from '../services/twitter.api.service';

const http = new HttpService();
const logger = Logger;

async function task1(){
  logger.log('Fav Quotes cron schedule started');
  try {
    const favQsQuote = await http
      .get('https://favqs.com/api/qotd')
      .toPromise()
      .then(res => res.data);
    logger.log('Preparing tweet from Fav Quotes');
    const status = `
  💭${favQsQuote.quote.body}
  ✍🏼${favQsQuote.quote.author}

  🏷️#${favQsQuote.quote.author.replace(/[ ,.]/g, "")}
  `;
    logger.log('Posting tweet for a lastest quote');
    logger.log(status);
    await tweet(status);
  } catch (err) {
    logger.error(err);
  }
}
task1();
