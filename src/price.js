const axios = require("axios");
const { log } = require("./utils");

async function getKoinPrice() {
  const url = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2";
  const queryDai = {
    query:
      '{pair(id:"0xa478c2975ab1ea89e8196811f51a7b7ade33eb11"){token0Price}}',
    variables: null,
  };
  const queryKoin = {
    query:
      '{pair(id:"0x3e9b04c0a11fc801335b0c436a3ae3dea0dc2188"){token0Price}}',
    variables: null,
  };
  const results = await Promise.all([
    axios.post(url, queryDai),
    axios.post(url, queryKoin),
  ]);
  const ethDaiPrice = Number(results[0].data.data.pair.token0Price);
  const ethKoinPrice = Number(results[1].data.data.pair.token0Price);
  const koinDaiPrice = ethDaiPrice / ethKoinPrice;
  return koinDaiPrice;
};

async function getHivePrice() {
  const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=hive";
  const opts = {
    headers: {
      'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
    }
  };
  const response = await axios.get(url, opts);
  const hivePrice = response.data.data.HIVE.quote.USD.price;
  return hivePrice;
}

async function loadPrices() {
  try {
    const koinPrice = await getKoinPrice();
    log("Koin price: " + koinPrice);

    const hivePrice = await getHivePrice();
    log("Hive price: " + hivePrice);

    return {koinPrice, hivePrice, error: null};
  } catch(error) {
    log("Error loading prices:");
    if(error.response && error.response.data) {
      log(error.response.data);
    } else {
      log(error.message)
    }
    return {error};
  }
}

module.exports = { loadPrices, getKoinPrice, getHivePrice };