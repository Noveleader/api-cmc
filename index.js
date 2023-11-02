const express = require('express');
const ethers = require('ethers');
const ABI = require('./abi.json');
const app = express();

const provider = new ethers.JsonRpcProvider('https://base-mainnet.g.alchemy.com/v2/RMXl7HMtWS89Cym6H7cyHlyhU14SOUwO');
let totalSupply = 1000000000;
const contract = new ethers.Contract("0x30b593f8c3ab37615359B4E0E6df2e06d55bB55d", ABI, provider);

const calculateCirculatingSupply = async () => {
    let currentBalance = await contract.balanceOf("0xFE6f18db4360BE0901a044e025120881eECE6aAe");
    currentBalance = Number(currentBalance) / 10 ** 18;
    return (totalSupply - currentBalance).toFixed(2);
}

app.get('/totalSupply', (req, res) => {
    try{
        res.send(totalSupply.toString());
    } catch (error) {
        res.status(500).send('Error fetching total supply');
    }
});

app.get('/circulatingSupply', async (req, res) => {
    try {
        const result = await calculateCirculatingSupply();
        res.send(result);
    } catch (error) {
        res.status(500).send('Error calculating circulating supply');
    }
});

const port = 3000;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));