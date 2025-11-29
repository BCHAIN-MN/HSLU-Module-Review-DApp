module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,          // 👈 match your Ganache CLI RPC port
      network_id: "*",  // 👈 match your Ganache CLI chain id
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.8.24",  // your Solidity version
      settings: { optimizer: { enabled: true, runs: 200 } },
    },
  },
};
