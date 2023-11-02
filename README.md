# ETH + AVAX Function Frontend

## Introduction
This project is an Ethereum ATM application that allows users to connect their MetaMask wallet, check their account balance, deposit and withdraw Ether, and interact with a deployed smart contract. The project uses the Web3.js library for Ethereum integration and showcases how to interact with a smart contract on the Ethereum blockchain.

## Description
The Ethereum ATM application provides the following features:

**Connecting MetaMask Wallet**: Users can connect their MetaMask wallet to the application, allowing them to interact with the Ethereum blockchain.

**Account Information**: Once connected, users can view their Ethereum account address and balance.

**Deposit ETH**: Users can deposit Ether in predefined amounts (1 ETH, 2 ETH, 3 ETH, 4 ETH, or 5 ETH) or enter a custom amount to deposit.

**Withdraw ETH**: Users can withdraw Ether in predefined amounts (1 ETH, 2 ETH, 3 ETH, 4 ETH, or 5 ETH) or enter a custom amount to withdraw.

**Add Account**: Users can add additional Ethereum accounts to their MetaMask wallet, allowing for multiple account management.

**Logout**: Users can disconnect their MetaMask wallet and clear their account information.


## Getting Started
### Running the Program
To run this Ethereum ATM application, follow the steps below:

1. Inside the project directory, install the required dependencies by running the following command:
```npm install```

2. Open two additional terminals within your development environment, such as Visual Studio Code or your preferred code editor.

3. In the second terminal, start a local Ethereum development node using Hardhat by running the following command:
```npx hardhat node```

5. In the third terminal, deploy the smart contract to the local network by executing the deployment script:
```npx hardhat run --network localhost scripts/deploy.js```

6. Back in the first terminal, start the front-end application by running:
```npm run dev```

8. The Ethereum ATM application should now be running on your localhost, typically accessible at http://localhost:3000/.

7. Open your web browser and visit the application to interact with it. Connect your MetaMask wallet, view account information, deposit and withdraw Ether, and add accounts as needed.

### Authors
Maria Evangelicalyn Ong

### License
This project is licensed under the MIT License. See the LICENSE.md file for details.
