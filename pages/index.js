import { useState, useEffect } from "react";
import { ethers } from "ethers";
import simpleContractABI from "../artifacts/contracts/Assessment.sol/SimpleContract.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [counter, setCounter] = useState(undefined);
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");

  // Replace this with your actual deployed contract address
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contractABI = simpleContractABI.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      setAccount(accounts[0]);
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // Initialize contract
    getContract();
  };

  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const simpleContract = new ethers.Contract(contractAddress, contractABI, signer);

    setContract(simpleContract);
  };

  const fetchCounter = async () => {
    if (contract) {
      try {
        const counterValue = await contract.getCounter();
        setCounter(counterValue.toString());
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    }
  };

  const fetchMessage = async () => {
    if (contract) {
      try {
        const messageValue = await contract.getMessage();
        setMessage(messageValue);
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    }
  };

  const incrementCounter = async () => {
    if (contract) {
      try {
        const tx = await contract.incrementCounter();
        await tx.wait();
        fetchCounter();
      } catch (error) {
        console.error("Error incrementing counter:", error);
      }
    }
  };

  const decrementCounter = async () => {
    if (contract) {
      try {
        const tx = await contract.decrementCounter();
        await tx.wait();
        fetchCounter();
      } catch (error) {
        console.error("Error decrementing counter:", error);
      }
    }
  };

  const resetCounter = async () => {
    if (contract) {
      try {
        const tx = await contract.resetCounter();
        await tx.wait();
        fetchCounter();
      } catch (error) {
        console.error("Error resetting counter:", error);
      }
    }
  };

  const updateMessage = async () => {
    if (contract) {
      try {
        const tx = await contract.setMessage(newMessage);
        await tx.wait();
        fetchMessage();
      } catch (error) {
        console.error("Error updating message:", error);
      }
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    if (contract) {
      fetchCounter();
      fetchMessage();
    }
  }, [contract]);

  return (
    <main className="container">
      <header><h1>Simple Contract Interaction</h1></header>
      {account ? (
        <div>
          <p>Your Account: {account}</p>
          <p>Counter: {counter !== undefined ? counter : "Loading..."}</p>
          <p>Message: {message}</p>
          
          <button onClick={incrementCounter}>Increment Counter</button>
          <button onClick={decrementCounter}>Decrement Counter</button>
          <button onClick={resetCounter}>Reset Counter</button>

          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enter new message"
          />
          <button onClick={updateMessage}>Update Message</button>
        </div>
      ) : (
        <button onClick={connectAccount}>Connect MetaMask</button>
      )}
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </main>
  );
}
