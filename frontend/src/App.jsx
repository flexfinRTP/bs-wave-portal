import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import abi from "./utils/WavePortal.json";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  /*
 * All state property to store all waves
 */
  const [allWaves, setAllWaves] = useState([]);
  /**
 * Create a variable here that holds the contract address after you deploy!
 */
  const contractAddress = "0xA9dC0aA82E1435136E3C409B80458587aD308aA1";
  const contractABI = abi.abi;

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

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        const waveTxn = await wavePortalContract.wave("this is a message")

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total guestbook signs...", count.toNumber());

        /*
        * Execute the actual wave from your smart contract
        */
        const waveTxn = await wavePortalContract.wave("this is a message")
        // const waveTxn = await wavePortalContract.wave();
        // console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total guestbook signs...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        /*
         * Call the getAllWaves method from your Smart Contract
         */
        const waves = await wavePortalContract.getAllWaves();


        /*
         * We only need address, timestamp, and message in our UI so let's
         * pick those out
         */
        let wavesCleaned = [];
        waves.forEach(wave => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message
          });
        });

        /*
         * Store our data in React State
         */
        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
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

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>

        <div className="bio">
          Hello, Connect your Metamask wallet and sign my guestbook!
        </div>



        {/* <div className="bio">Total Waves: {getWaveCount()}</div> */}
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
        <button type="submit" onClick={}>If you could have one of these superpowers, which one would you choose?</button>

        {allWaves.map((wave, index) => {
          return (
            <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>)
        })}
      </div>
    </div>
  );
}
export default App;