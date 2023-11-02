import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";


export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async () => {
    if (atm) {
      const balanceInWei = await atm.getBalance();
      const balanceInEth = ethers.utils.formatEther(balanceInWei);
      setBalance(balanceInEth);
    }
  };

  const deposit = async (amount) => {
    if (atm) {
      // Convert the deposit amount in Ether to Wei
      const amountInWei = ethers.utils.parseEther(amount.toString());
      let tx = await atm.deposit(amountInWei);
      await tx.wait();
      getBalance();
    }
  };

  const handleCustomDeposit = () => {
    const customAmount = prompt("Enter the amount to deposit:");
    if (customAmount !== null && customAmount !== "") {
      const parsedAmount = ethers.utils.parseEther(customAmount);
      deposit(parsedAmount);
    }
  };
  

  const withdraw = async (amount) => {
    if (atm) {
      // Convert the withdrawal amount in Ether to Wei
      const amountInWei = ethers.utils.parseEther(amount.toString()); // Convert to string

      // Call the contract's withdraw function with the amount in Wei
      let tx = await atm.withdraw(amountInWei);
      await tx.wait();
      getBalance();
    }
  };

  const handleCustomWithdraw = () => {
    const customAmount = prompt("Enter the amount to withdraw:");
    if (customAmount !== null && customAmount !== "") {
      const parsedAmount = parseFloat(customAmount);
      if (!isNaN(parsedAmount)) {
        withdraw(parsedAmount);
      } else {
        alert("Invalid input. Please enter a valid number.");
      }
    }
  };

     const logout = () => {
       if (ethWallet && ethWallet.selectedAddress) {
         ethWallet
           .request({
             method: "wallet_requestPermissions",
             params: [{ eth_accounts: {} }],
           })
           .then(() => {
             setAccount(undefined);
             setATM(undefined);
             setBalance(undefined);
           });
       }
     };
  
  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <p> <button className="connect-button" onClick={connectAccount}>Please connect your Metamask wallet</button></p>
      );}

    if (balance == undefined) {
      getBalance();
    }
    return (
      <main className="container">
  <p className="account-balance">Your Account: {account}</p>
  <p className="account-balance">Your Balance: {balance}</p>
  <div className="section-container">
    <div className="action-card">
      <h2>Deposit ETH</h2>
      <button onClick={() => deposit(1)}>1 ETH</button>
      <button onClick={() => deposit(2)}>2 ETH</button>
      <button onClick={() => deposit(3)}>3 ETH</button>
      <button onClick={() => deposit(4)}>4 ETH</button>
      <button onClick={() => deposit(5)}>5 ETH</button>
      <p><button onClick={handleCustomDeposit}>Enter Amount to Deposit</button> </p>
      <h2>Withdraw Ether</h2>
      <button onClick={() => withdraw(1)}>1 ETH</button>
      <button onClick={() => withdraw(2)}>2 ETH</button>
      <button onClick={() => withdraw(3)}>3 ETH</button>
      <button onClick={() => withdraw(4)}>4 ETH</button>
      <button onClick={() => withdraw(5)}>5 ETH</button>
      <p> <button onClick={handleCustomWithdraw}>Enter Amount to Withdraw</button> </p>
    </div>
    <button className="add-account-button" onClick={logout}>Click here to add an account</button>
  </div>
  <style jsx>
    {`
      .container {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .section-container {
        background-color: #7393B3;
        width: 45%;
        margin: 10px;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
      }
      .action-card {
        background-color: white;
        padding: 20px;
        border-radius: 5px;
      }
      h2 {
        font-size: 24px;
        color: #ff5e88;
      }
      button {
        background-color: #ff5e88;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        margin: 5px;
        cursor: pointer;
      }
      .account-balance {
        font-size: 20px; 
        margin-bottom: 10px;
        font-weight: bold; 
        color: #7393B3;
      }
      .add-account-button {
        background-color: #ff5e88;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        margin: 10px;
        cursor: pointer;
      }
    `}
  </style>
</main>
    );
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
  <header className="header">
    <h1 className="header-title">Welcome to Ethereum ATM!</h1>
  </header>
  {initUser()}
  <style jsx>
    {`
      .container {
        text-align: center;
      }

      .header {
        background: linear-gradient(135deg, #ff5e88, #ff9b7d);
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
      }

      .header-title {
        font-size: 36px;
        color: white;
        text-transform: uppercase;
        letter-spacing: 2px;
      }
      connect-button {
        background-color: #ff5e88;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        margin: 10px;
        cursor: pointer;
      }
    `}
  </style>
</main>

  );
}