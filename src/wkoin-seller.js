const { Client, PrivateKey } = require("@hiveio/dhive");
const { loadPrices } = require("./price");
const { log } = require("./utils");
require("dotenv").config();

const dhive = new Client("https://api.hive.blog");
const privKey = PrivateKey.fromString(process.env.ACTIVE_KEY);
let sellId = null;


function operationCreateNewSellOrder(quantity, price) {
  return [
    "custom_json",
    {
      required_auths: [process.env.ACCOUNT],
      required_posting_auths: [],
      id: "ssc-mainnet-hive",
      json: JSON.stringify({
        contractName: "market",
        contractAction:"sell",
        contractPayload: {
          symbol: "WKOIN",
          quantity: Number(quantity).toFixed(4),
          price: Number(price).toFixed(4),
        }
      }),
    }
  ];
}

function operationCancelLastSellOrder() {
  return [
    "custom_json",
    {
      required_auths: [process.env.ACCOUNT],
      required_posting_auths: [],
      id: "ssc-mainnet-hive",
      json: JSON.stringify({
        contractName: "market",
        contractAction: "cancel",
        contractPayload: {
          type: "sell",
          id: sellId
        }
      }),
    }
  ];
}

setInterval(async () => {
  const {koinPrice, hivePrice, error} = await loadPrices();
  if(error) return;

  const operations = [];

  // cancel previous order
  if(sellId) operations.push(operationCancelLastSellOrder());

  // create new sell order
  const price = process.env.PRICE_FACTOR * koinPrice / hivePrice;
  const quantity = process.env.QUANTITY;
  operations.push(operationCreateNewSellOrder(quantity, price));

  const response = await dhive.broadcast.sendOperations(operations, privKey);
  log("Sell order settled");

  if(sellId) sellId = response.id + "-1";
  else sellId = response.id;
}, 10 * 60 * 1000);

