export type NetworkOption = 
"baseSepolia" 
// | "baseMainnet"
;

export const NETWORKS: Record<
  NetworkOption,
  {
    chainId: string;
    chainName: string;
    rpcUrls: string[];
    nativeCurrency: { name: string; symbol: string; decimals: number };
    blockExplorerUrls: string[];
    factoryAddress: string;
    confirmations: number;
  }
> = {
  baseSepolia: {
    chainId: "0x14a34", // 84532 in hex
    chainName: "Base Sepolia",
    rpcUrls: ["https://sepolia.base.org"],
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    blockExplorerUrls: ["https://sepolia.basescan.org"],
    factoryAddress: "0xa9c9eb1fe8f4a4182a0702bfed6bfebcebb8aeff",
    confirmations: 3,
  },
  // baseMainnet: {
  //   chainId: "0x2105", // 8453
  //   chainName: "Base",
  //   rpcUrls: ["https://mainnet.base.org"],
  //   nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  //   blockExplorerUrls: ["https://basescan.org"],
  //   factoryAddress: "0xYOUR_MAINNET_FACTORY",
  //   confirmations: 3,
  // },
};

export async function switchNetwork(network: NetworkOption) {
  const config = NETWORKS[network];
  if (!window.ethereum) throw new Error("No wallet found");

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: config.chainId }],
    });
  } catch (err: any) {
    if (err.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: config.chainId,
            chainName: config.chainName,
            rpcUrls: config.rpcUrls,
            nativeCurrency: config.nativeCurrency,
            blockExplorerUrls: config.blockExplorerUrls,
          },
        ],
      });
    } else {
      throw err;
    }
  }
}


export const DEFAULT_NETWORK: keyof typeof NETWORKS = "baseSepolia";