# Web3 Guestbook

Welcome to my Web3 guestbook, please sign the guestbook and leave a message.

How to run below...

## Install
-go to root/
npm install
-go to frontend/
npm install
npm start
-run FE env
cd frontend/ && npm start

## dev script
npx hardhat run scripts/run.js
## deploy to hardhat local blockchain env
npx hardhat run scripts/deploy.js --network localhost
## deploy to Rinkeby Ethereum Testnet env
npx hardhat run scripts/deploy.js --network rinkeby

## Reminder
After deploying contract(s) with code changes, update frontend with new contract address (App.jsx) and new ABI json file (/src/utils/).
Then connect and test FE functionality.

## Hardhat commands:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```