import { ethers, Signer } from "ethers";

export const FACTORY_ABI = [
  "function createToken(string name, string symbol, uint8 decimals, uint256 initialSupply, bool mintable) external returns (address)",
  "event TokenCreated(address indexed creator, address tokenAddress)",
];

export async function deployToken(
  signer: Signer,
  factoryAddress: string,
  params: {
    name: string;
    symbol: string;
    decimals: number;
    totalSupply: string;
    mintable: boolean;
  },
  confirmations: number = 1,
  onStatus?: (
    status: "submitted" | "confirming" | "confirmed",
    txHash?: string
  ) => void
) {
  const factory = new ethers.Contract(factoryAddress, FACTORY_ABI, signer);

  const tx = await factory.getFunction("createToken")(
    params.name,
    params.symbol,
    params.decimals,
    BigInt(params.totalSupply),
    params.mintable
  );

  onStatus?.("submitted", tx.hash);
  onStatus?.("confirming", tx.hash);

  // wait for `confirmations` block confirmations, not just 1
  const receipt = await tx.wait(confirmations);

  onStatus?.("confirmed", tx.hash);

  const event = receipt.logs
    .map((log: any) => {
      try {
        return factory.interface.parseLog(log);
      } catch {
        return null;
      }
    })
    .find((parsed: any) => parsed?.name === "TokenCreated");

  return {
    txHash: receipt.hash,
    tokenAddress: event?.args?.tokenAddress as string,
    confirmations: receipt.confirmations,
  };
}
