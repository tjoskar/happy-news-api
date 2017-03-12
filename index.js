const restify = require('restify');
const webpush = require('web-push');
const Chance = require('chance');
const chance = new Chance();

if (['HAPPY_NEWS_TOKEN', 'PUBLIC_KEY', 'PRIVATE_KEY', 'GCM_API_KEY'].some(key => !process.env[key])) {
  throw new Error('You must set all env keys!');
}

const vapidKeys = {
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
};

webpush.setGCMAPIKey(process.env.GCM_API_KEY);
webpush.setVapidDetails(
    'mailto:kontakta@oskarkarlsson.nu',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const news = [ { title: 'Farmer spends 16 years studying law by himself so he could sue a powerful chemical firm for \'polluting his land\' - and he wins the first round',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/SAWs-qesw6WQb1pETJdB3LAyfXKqPjRJoZVf6Nw6xQY.jpg?s=fe85c821f672f19e04aae7ef3c68c2d8' },
  { title: 'Killing hatred with kindness: Black man has convinced 200 racists to abandon the KKK by making friends with them despite their prejudiced views',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/HfF1p28roK92_q3tqI3tpvQC4PkZz_s17_6dyShFaVQ.jpg?s=5e0ea7d7ad515a8a3d1a0242acff1358' },
  { title: 'More young people are watching Planet Earth 2 than The X Factor',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/ZEZXDP3nitPxvi84RQbYnfPPVbZxJ4P7lh7S8-atiuk.jpg?s=31d939fc4afca72a2d2d8cbb73059d5e' },
  { title: 'Mall of America takes bold stand by closing on Thanksgiving this year For the first Time',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/0yZpRPLWuX-0IgNIAmN5k09-tu9eh_1U1FoB_rVWm58.jpg?s=3d6046472668c5e3c25b73f65311c4e3' },
  { title: 'boss of Airbnb says the company will offer free housing to anyone affected by Trump’s ban',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/WEF_9_z4_2NgJL0NtK7Y6IxDpGXNNn534_Cd74Li4dM.jpg?s=f8db10fd3ee9f409b42690dfa900a456' },
  { title: 'Pornhub launches sexual education subsite',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/Rg2jCLmKHQmr8BIcxX2z3uci1nD8imQIBuX6i-BXTR4.jpg?s=06247c4fb3d2cffe974d53c79898e0a7' },
  { title: 'Pittsburgher Starts Petition To Rename Airport After Mr. Rogers',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/AlKezpRjZ-pMa8GSsEg7OyHUPRzOBL-qR76e-nIe5KY.jpg?s=1b5a47226ffd829760db1ad94059c217' },
  { title: 'Jewish people give Muslims key to their synagogue after town\'s mosque burns down',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/q-wUMPxs8gu_CyU5k_YOgNpJfd2hUefXxyQtdIazPoY.jpg?s=9b7234bad897f32ed7de4dbbeac6509c' },
  { title: 'Cleveland fine-dining restaurant that hires ex-cons has given over 200 former criminals a second chance, and so far none have re-offended',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/ZSjVHFYO4XE_rkfclwM1HpE0GPdXHcZvIyMM7z4oXjU.jpg?s=5c31e30ccacf00985c82f7b43bf38388' },
  { title: 'Iranian infant allowed U.S. entry for vital heart surgery in NYC',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/z2lcjAz1PIVz0Vc2XlAuB5mS52cjXp1_7gobOHlyqBk.jpg?s=4c9e0f02adb76d142fd0666927e911e9' },
  { title: 'Remember the Ice Bucket Challenge in 2014? Its funds helped discover the gene linked to ALS',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/rP9x1OV1jmdqkBJEKFOU4dOiQ3w5w4c69hKqdYoe1-s.jpg?s=fdb8736b22b61183ca3963b71f9a6fee' },
  { title: 'India just banned all forms of disposable plastic in its capital',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/KgUh1lo8eAC_mT3cAudvtWh7tgNVo5BpHVZBKvJGkwU.jpg?s=e3031d818008a9172c9a26df059f83e6' },
  { title: '75 year old widower posted an ad looking for someone to fish with, and hundreds offered to drop a line with him.',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/4HCoDu6AWWtmmGOxaaeBocd_n3nsvpoMbDOt37WPX3g.jpg?s=8a428c4c4f1a2cb319c2743e865fb71c' },
  { title: 'Kraft Heinz to give all of their salaried employees the day after the Super Bowl off instead of buying multi-million-dollar game ad',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/yj_6pfE1Ap05NFmr4trjaSw8P84RTa1PDacPb67BviM.jpg?s=69bfa611452a620e4fdae9ec26c982b5' },
  { title: 'FBI rescues 82 children in nationwide sex trafficking sting',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/U0-Qw7VUlFMEQw6aEKXqKUMohZrUkNXRyyJq7_rn_h0.jpg?s=d35880fda7758118c69ff36defca62ee' },
  { title: 'Guy sacrifices Tesla to save unconscious driver, Elon Musk offers to cover repair costs',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/pTtM4E87slEPLbEYe7hI_cg6ToRpqkJnXQIvT3SN0Vk.jpg?s=ceee421bd3c50aaa60fe941591703fbd' },
  { title: 'WELCOME TO THE R/UPLIFTINGNEWS ELECTION MEGATHREAD!',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'http://lorempixel.com/640/480/cats' },
  { title: 'A small city in Iowa is devoting 1,000 acres of land to America\'s vanishing bees',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/XPux6hWqZwJP0FVRem_SHxSWbdcuE2KZpCRPH-xUlnk.jpg?s=d8682c6c86077e50dd72849ce93a569e' },
  { title: 'Snoop Dogg gives out 3000 turkeys to Families this thanksgiving.',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/M68DVp62zwS3AKmSncA74xysRxlRmVpvuNyY3MNZMp4.jpg?s=4267e9b1bcc21111952a0ace36b5225d' },
  { title: 'Epic Games chief pays $15M to protect 7,000 acres of North Carolina wilderness',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/DuF3ZIGB2H9VSXlz1K_D7sjlt5nrQcfyU6xkyG3q_wE.jpg?s=935e2dc002f3f60f59829267c6d4db20' },
  { title: 'A 13 year old child who had his bike violently stolen, ribs broken, and was left by the side of the road has had over £1000 raised by Redditors to replace the one he had saved over 8 months to buy.',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/dDEKS6k9wfer1UFInsKb521ZGNhFEwzfoc_WMB56gJ0.jpg?s=3ce66a5187d12b6cd12d0fb2a22fd645' },
  { title: 'Alaska Airlines today made history flying the first commercial flight using the world’s first renewable, alternative jet fuel made from forest residuals, the limbs and branches that remain after the harvesting of managed forests.',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/_VW3EKLY1bzlfY_t3TaohUcHFcMtTD1GEr3On85e98I.jpg?s=19d33ff3f1460a1014290b3ebd61bc08' },
  { title: 'China’s vow to shut down its ivory trade by the end of 2017 is a ‘game changer’ for elephants',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/nphn_kQRhHlxhi4P8aqP020tZ_SG2QKKGIKKI0PXSwU.jpg?s=95e1fbd2ec056a4eeefe5467baa296c0' },
  { title: 'Bill Gates thinks the 1% should foot the bill for renewable energy, and he\'s offering the first $2B.',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/C-J9CcegZpi4R4N4WFxcgySqPEdXPXI_DhyKXxUTr-U.jpg?s=3372f932251d795bc900ef46e597ee38' },
  { title: 'Global tiger population up by 22 per cent',
    text: 'Ad molestiae ipsum consectetur et eius.Quos doloremque quaerat impedit animi ipsam ducimus corporis reiciendis.Qui nesciunt et cupiditate praesentium.',
    image: 'https://i.redditmedia.com/TixIknKPu3TFpUo7-gPn4AJO2N2JyDeyqlYabix1Brg.jpg?s=fdc5e68411dcfb1876c9a721178054a0' } ];

const sleep = time => new Promise(resolve => setTimeout(resolve, time));
const randomSleep = () => sleep(Math.floor(Math.random() * 3000));
const registeredSubscribers = new Map(); // Will be forgotten

function newsDetail(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const singleNews = news[req.params.id];

  if (!singleNews) {
    return next(new restify.errors.ResourceNotFoundError());
  }

  randomSleep().then(() => {
    res.send(Object.assign({}, singleNews, { text: chance.paragraph({sentences: 10}) }));
    next();
  });
}

function allNews(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const currentMinute = (new Date()).getMinutes();
  const newNews = news.map((n, id) => Object.assign(n, { id }));
  const startIndex = currentMinute % newNews.length;
  let partNewsList = newNews.slice(startIndex, startIndex + 15);
  if (partNewsList.length < 15) {
    partNewsList = [...partNewsList, ...newNews.slice(0, 15 - partNewsList.length)];
  }

  randomSleep().then(() => {
    res.send(partNewsList.reverse());
    next();
  });
}

function notify(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const body = req.body;

  const isBodyOK = body && body.endpoint && body.keys && body.keys.p256dh && body.keys.auth;
  if (isBodyOK) {
    const subscription = {
      endpoint: body.endpoint,
      keys: body.keys
    };
    webpush.sendNotification(subscription, String(body.articleId))
      .then(() => {
        res.send({msg: 'OK'});
        next();
      })
      .catch(error => next(new Error(error)));
  } else {
    return next(new restify.errors.BadRequestError());
  }
}

function register(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const body = req.body;
  
  const isBodyOK = body && (['endpoint', 'auth', 'p256dh'].every(key => typeof body[key] === 'string'));
  if (isBodyOK) {
    registeredSubscribers.set(body.p256dh, {
      endpoint: body.endpoint,
      keys: {
        auth: body.auth,
        p256dh: body.p256dh
      }
    });
    res.send({msg: 'OK'});
    next();
  } else {
    return next(new restify.errors.BadRequestError());
  }
}

function sendNotifications(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const body = req.body;
  
  const isBodyOK = body && body.message;
  const isAuthenticated = body.token === process.env.HAPPY_NEWS_TOKEN;
  if (isBodyOK) {
    registeredSubscribers.forEach(subscription => {
      webpush.sendNotification(subscription, JSON.stringify(body.message));
    });
    res.send({msg: 'OK'});
    next();
  } else {
    return next(new restify.errors.BadRequestError());
  }
}

const server = restify.createServer();
server.use(restify.bodyParser());
server.get('/', allNews);
server.get('/:id', newsDetail);
server.post('/register', register);
server.post('/push', sendNotifications);
server.post('/notify', notify);

server.listen(3000, () => {
  console.log('%s listening at %s', server.name, server.url);
});
