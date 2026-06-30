import { FAQItem } from "@/types/faq";

export const faqs: FAQItem[] = [
  {
    id: "deployment-time",
    question: "How long does deployment take?",
    answer:
      "Most standard ERC20 tokens are deployed within 1 to 5 minutes after tx completed.",
  },
  {
    id: "supported-networks",
    question: "Which networks are supported?",
    answer:
      "We currently support Ethereum, BNB Chain, Polygon, Base, and Arbitrum. If you need a different network, reach out and we'll let you know if we can accommodate it.",
  },
  {
    id: "mint-later",
    question: "Can I mint more tokens later?",
    answer:
      "Yes, if you select the Mintable option during setup, the contract owner will retain the ability to mint additional tokens after deployment.",
  },
  {
    id: "contract-ownership",
    question: "Do I own the smart contract?",
    answer:
      "Absolutely. Once deployed, full ownership of the contract is transferred to your wallet address, giving you complete control over the token.",
  },
  {
    id: "before-ordering",
    question: "What information do I need before ordering?",
    answer:
      "You'll need your desired token name, symbol, decimals, total supply, the features you want enabled, and your preferred network. We'll guide you through the rest.",
  },
];
