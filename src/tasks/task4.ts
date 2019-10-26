import { HttpService, Logger } from '@nestjs/common';
import { tweet } from '../services/twitter.api.service';

const http = new HttpService();
const logger = Logger;

async function task4(){
  logger.log('They Said So cron schedule started');
  try {
    const theySaidSoQuote = await http
      .get('http://quotes.rest/qod.json')
      .toPromise()
      .then(res => res.data);
    logger.log('Preparing tweet from They Said So');
    const status = `
  💭${theySaidSoQuote.contents.quotes.quote}
  ✍🏼${theySaidSoQuote.contents.quotes.author}

  🏷️#${theySaidSoQuote.contents.quotes.author.replace(/[ ,.]/g, "")}
  `;
    logger.log('Posting tweet for a lastest quote');
    logger.log(status);
    await tweet(status);
  } catch (err) {
    logger.error(err);
  }
}
task4();