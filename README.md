# WKOIN Seller
Bot to dinamically change the sell price on hive engine for WKOIN based on uniswap price.

## Description
### What is WKOIN?
WKOIN is a wrapped token for KOIN (see https://koinos.io) created and controlled on Hive-Engine by @harpagon. See the [introduction post](https://peakd.com/koinos/@harpagon/introducing-wkoin-koin-erc-20-on-hive-engine) for more details.

### Motivation
Hive-Engine gives the possibility to place buy/sell orders in the market. However, it is not possible to set a price that dinamically changes based on the price in external exchanges.

### Bot seller
This bot checks the price of Hive and Koin periodically (each 10 minutes) on coinmarketcap and uniswap respectively. And it updates the sell order on Hive Engine. The bot also uses a factor price to define how much above the current price it wants to sell in order to get a profit.

## Preparation
The bot uses coinmarketcap to get the current price of Hive and an API KEY is required to use this service. Go to https://coinmarketcap.com/api/ to request a free api key.

## Installation
Create a `.env` file taking a copy of `.env.example` and set the corresponding variables.

- ACCOUNT: hive account.
- ACTIVE_KEY: active key.
- QUANTITY: Amount of Wkoin placed in the sell order. When a sell order is filled a new sell order is created with the same quantity.
- PRICE_FACTOR: Multiplication factor to set the price above (or below) the current price on uniswap.

Install dependencies
```sh
$ npm run install
```

Start the bot
```sh
$ npm run start
```

## License
MIT License