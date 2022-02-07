import * as React from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  const wave = () => {

  }

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
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
          <option selected value="invisible">👀Be invisible whenever you want</option>
          <option value="strength">💪🏻Superhuman Strength</option>
          <option value="animal">🐶Talk to animals</option>
          <option value="minds">🧠Read minds</option>
          <option value="fly">🦅Be able to fly</option>
        </select>
        <br />
        <button type="submit" onClick={wave}>If you could have one of these superpowers, which one would you choose?</button>
      </div>
    </div>
  );
}
