import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask must be installed.");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized Web3 account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized Web3 account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
          {/*
        * If there is no currentAccount render this button
        */}
          {!currentAccount && (
            <button className="waveButton" onClick={connectWallet}>
              Please Connect Web3 Wallet
            </button>
          )}
          
          <br />

          💪🏻🧠🦅 Welcome to Justin's Web3 Guestbook! 🦅🧠💪🏻
        </div>

        <div className="bio">
          Hello, Connect your Metamask wallet and sign my guestbook!
        </div>
        <br />
        {/* <button className="waveButton" onClick={wave}>
          Sign the guestbook.
        </button> */}
        <select>
          <option defaultValue="invisible">👀Be invisible whenever you want</option>
          <option value="strength">💪🏻Superhuman Strength</option>
          <option value="animal">🐶Talk to animals</option>
          <option value="minds">🧠Read minds</option>
          <option value="fly">🦅Be able to fly</option>
        </select>
        <br />
        <button type="submit" onClick={null}>If you could have one of these superpowers, which one would you choose?</button>
      </div>
    </div>
  );
}
export default App;