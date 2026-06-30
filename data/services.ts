import { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: "erc20-token-creation",
    title: "ERC20 Token Creation",
    description:
      "Launch a fully custom ERC20 token with secure deployment, flexible supply controls, and optional ownership management — no coding required.",
    icon: "Coins",
    features: [
      { id: "name", label: "Custom Token Name" },
      { id: "symbol", label: "Token Symbol" },
      { id: "decimals", label: "Decimals" },
      { id: "supply", label: "Total Supply" },
      { id: "mintable", label: "Mintable" },
      { id: "burnable", label: "Burnable" },
      { id: "pausable", label: "Pausable" },
      { id: "ownership", label: "Ownership Transfer" },
    ],
  },
  // {
  //   id: "smart-contract-audit",
  //   title: "Smart Contract Audit",
  //   description:
  //     "Comprehensive line-by-line review of your contract logic to catch vulnerabilities before they catch you.",
  //   icon: "ShieldCheck",
  //   features: [
  //     { id: "static", label: "Static Analysis" },
  //     { id: "manual", label: "Manual Code Review" },
  //     { id: "gas", label: "Gas Optimization" },
  //     { id: "report", label: "Detailed Report" },
  //   ],
  // },
  // {
  //   id: "liquidity-setup",
  //   title: "Liquidity Pool Setup",
  //   description:
  //     "Get your token trading from day one with a properly configured liquidity pool on your chosen DEX.",
  //   icon: "Waves",
  //   features: [
  //     { id: "dex", label: "DEX Pair Creation" },
  //     { id: "lock", label: "Liquidity Locking" },
  //     { id: "ratio", label: "Pool Ratio Guidance" },
  //     { id: "monitoring", label: "Launch Monitoring" },
  //   ],
  // },
  // {
  //   id: "verification",
  //   title: "Contract Verification",
  //   description:
  //     "Make your token transparent and trustworthy with full source code verification on the relevant block explorer.",
  //   icon: "BadgeCheck",
  //   features: [
  //     { id: "etherscan", label: "Explorer Verification" },
  //     { id: "abi", label: "ABI Publishing" },
  //     { id: "source", label: "Source Code Upload" },
  //     { id: "badge", label: "Verified Badge" },
  //   ],
  // },
];
