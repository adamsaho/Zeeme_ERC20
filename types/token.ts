import { NetworkOption } from "@/lib/networks";

export type { NetworkOption };

export interface TokenFormData {
  tokenName: string;
  symbol: string;
  decimals: string;
  totalSupply: string;
  mintable: boolean;
  burnable: boolean;
  pausable: boolean;
  ownable: boolean;
  network: NetworkOption;
}

export interface TokenFormErrors {
  tokenName?: string;
  symbol?: string;
  decimals?: string;
  totalSupply?: string;
}