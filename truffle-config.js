require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    // Weiterhin für lokale Tests
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    // NEU: Polygon Amoy Testnet Konfiguration
    amoy: {
      provider: () => new HDWalletProvider(
        process.env.PRIVATE_KEY,
        process.env.POLYGON_RPC_URL
      ),
      network_id: 80002,       // Amoy Chain ID
      confirmations: 2,        // Wartet auf 2 Bestätigungen
      timeoutBlocks: 200,      // Timeout erhöht, falls das Netz langsam ist
      skipDryRun: true,         // Überspringt den Dry Run vor der Migration
      maxPriorityFeePerGas: 25000000000, // 35 Gwei (Minimum ist 25, wir nehmen 35 zur Sicherheit)
      maxFeePerGas: 60000000000,         // 60 Gwei (Maximaler Gesamtpreis)
      gas: 6000000,
      pollingInterval: 8000,     // Nur alle 8 Sekunden checken (statt Standard)
      deploymentPollingInterval: 8000,
      networkCheckTimeout: 1000000
    },
  },

  // Pfade wie in deiner ursprünglichen Datei
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',

  compilers: {
    solc: {
      version: "0.8.20",      // Deine Solidity Version
      settings: {
        optimizer: { enabled: true, runs: 200 },
        viaIR: false,
      },
    },
  },
};