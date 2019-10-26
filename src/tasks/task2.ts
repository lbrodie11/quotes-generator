import { HttpService, Logger } from '@nestjs/common';
import { tweet } from '../services/twitter.api.service';

const http = new HttpService();
const logger = Logger;

async function task2(){
  logger.log('Kanye Quotes cron schedule started');
  try {
    const kanyeQuote = await http
      .get('https://api.kanye.rest')
      .toPromise()
      .then(res => res.data);
    logger.log('Preparing tweet from Kanye');
    const status = `
  💭${kanyeQuote.quote}
  ✍🏼'Kanye West'

  🏷️#KanyeWest
  `;
    logger.log('Posting tweet for a lastest quote');
    logger.log(status);
    await tweet(status);
  } catch (err) {
    logger.error(err);
  }
}
task2();
