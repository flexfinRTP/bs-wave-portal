import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import abi from "./utils/WavePortal.json";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [message, setMessage] = useState("");
  const [voteData, setVoteData] = useState();
  const [totalVotes, setTotalVotes] = useState(0); //stores the calculated total of all votes submitted.
  const [voted, setVoted] = useState(false); //used to check if the user has already voted.

  const [allWaves, setAllWaves] = useState([]); //prop to store all waves
  const [allVotes, setAllVotes] = useState([]); //prop to store all votes

  const contractAddress = "0xF6CCA52009B9681f133C643E0e8152EE57793517"; //holds the contract address after being deployed.
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

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Install MetaMask!");
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

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total guestbook signs...", count.toNumber());

        // const waveTxn = await wavePortalContract.wave(wave.message); //call wave
        // const waveTxn = await wavePortalContract.wave();
        // console.log("Mining...", waveTxn.hash);

        let waveTxn = await wavePortalContract.wave(message || "Signed.", { gasLimit: 300000 });//call wave { gasLimit: 300000 }

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

  const vote = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalVotes();
        console.log("Retrieved total votes from poll...", count.toNumber());

        const voteTxn = await wavePortalContract.vote(voteData || "Vote Fail."); //call vote
        // const voteTxn = await votePortalContract.vote();
        // console.log("Mining...", voteTxn.hash);

        await voteTxn.wait();
        console.log("Mined -- ", voteTxn.hash);

        count = await wavePortalContract.getTotalVotes();
        console.log("Retrieved total votes from poll...", count.toNumber());
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
        const waves = await wavePortalContract.getAllWaves(); //Call the getAllVotes method from your Smart Contract

        let wavesCleaned = [];
        waves.forEach(wave => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message
          });
        });

        setAllWaves(wavesCleaned); //store in react state
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getAllVotes = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const votes = await wavePortalContract.getAllVotes(); //Call the getAllVotes method from your Smart Contract

        let votesCleaned = [];
        votes.forEach(vote => {
          votesCleaned.push({
            address: vote.voter,
            timestamp: new Date(vote.timestamp * 1000),
            voteData: vote.voteData
          });
        });

        setAllVotes(votesCleaned); //store in react state
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
          <br />
          <br />
          {!currentAccount && (
            <button className="waveButton" onClick={connectWallet}>
              Connect Metamask Wallet
            </button>
          )}
          <p>Don't have metamask? Get the official wallet from <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank">here</a></p>

          <br />
          <br />

          🦅🦅🦅 Welcome to Justin's

          <br />Web3 Guestbook! 🦅🦅🦅
        </div>

        <div className="bio">
          Welcome, Connect your Metamask wallet and sign my guestbook and vote in the poll!
        </div>

        <select>
          <option defaultValue="invisible" onChange={e => setVoteData(e.target.value)}>👀Be invisible whenever you want</option>
          <option value="strength" onChange={e => setVoteData(e.target.value)}>💪🏻Superhuman Strength</option>
          <option value="animal" onChange={e => setVoteData(e.target.value)}>🐶Talk to animals</option>
          <option value="minds" onChange={e => setVoteData(e.target.value)}>🧠Read minds</option>
          <option value="fly" onChange={e => setVoteData(e.target.value)}>🦅Be able to fly</option>
        </select>
        <button className="waveButton" type="submit" onChange={e => setVoteData(e.target.value)} onClick={vote}>If you could have one of these superpowers, which one would you choose?</button>
        <br />
        <button className="waveButton" type="submit" onClick={getAllVotes}>Get the votes.</button>

        {allVotes.map((vote, index) => {
          return (
            <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>Address: {vote.address}</div>
              <div>Time: {vote.timestamp.toString()}</div>
              <div>Vote Data: {vote.voteData}</div>
            </div>)
        })}

        <br />
        <br />
        <p>Sign a message below and press Sign.</p><p>Your message is stored in the blockchain forever!</p>
        {/* Text area to sign msg form, need to add msg store to contract and FE funcs, need onsumbit func to submit msg to exsisting getallwaves func(?) */}
        <textarea onChange={e => setMessage(e.target.value)}></textarea>
        <button className="button" onClick={wave}> Sign </button>

        <br />
        <button className="waveButton" type="submit" onClick={getAllWaves}>Display Guestbook Signatures</button>

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