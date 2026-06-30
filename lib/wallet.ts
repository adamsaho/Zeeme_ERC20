import { ethers } from "ethers";

export interface DetectedWallet {
  info: { uuid: string; name: string; icon: string; rdns: string };
  provider: any;
}

export function discoverWallets(): Promise<DetectedWallet[]> {
  return new Promise((resolve) => {
    const wallets: DetectedWallet[] = [];

    function onAnnounce(event: any) {
      wallets.push(event.detail);
    }

    window.addEventListener("eip6963:announceProvider", onAnnounce);
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    setTimeout(() => {
      window.removeEventListener("eip6963:announceProvider", onAnnounce);
      resolve(wallets);
    }, 250);
  });
  
}

export async function connectWallet(provider: any) {
  const browserProvider = new ethers.BrowserProvider(provider);
  const accounts = await browserProvider.send("eth_requestAccounts", []);
  const signer = await browserProvider.getSigner();
  const chainId = (await browserProvider.getNetwork()).chainId;
  return { browserProvider, signer, address: accounts[0], chainId };
}
