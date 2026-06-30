"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  Eye,
  ArrowRight,
  AlertCircle,
  Wallet,
  Loader2,
  CheckCircle2,
  ExternalLink,
  X
} from "lucide-react";
import { TokenFormData, TokenFormErrors } from "@/types/token";
import styles from "./css/Form.module.css";
import Button from "./Button";
import { discoverWallets, connectWallet, DetectedWallet } from "@/lib/wallet";
import { switchNetwork, NETWORKS, DEFAULT_NETWORK } from "@/lib/networks";
import { deployToken } from "@/lib/createToken";
import Link from "next/link";

const NETWORK = DEFAULT_NETWORK;

const INITIAL_FORM: TokenFormData = {
  tokenName: "",
  symbol: "",
  decimals: "18",
  totalSupply: "",
  mintable: false,
  burnable: false,
  pausable: false,
  ownable: true,
  network: NETWORK,
};

type DeployStatus = "idle" | "submitted" | "confirming" | "done" | "error";

function validate(data: TokenFormData): TokenFormErrors {
  const errors: TokenFormErrors = {};

  if (!data.tokenName.trim()) {
    errors.tokenName = "Token name is required.";
  } else if (data.tokenName.trim().length < 2) {
    errors.tokenName = "Token name must be at least 2 characters.";
  }

  if (!data.symbol.trim()) {
    errors.symbol = "Token symbol is required.";
  } else if (!/^[A-Za-z0-9]{2,10}$/.test(data.symbol.trim())) {
    errors.symbol = "Symbol must be 2-10 letters or numbers.";
  }

  const decimalsNumber = Number(data.decimals);
  if (data.decimals.trim() === "" || Number.isNaN(decimalsNumber)) {
    errors.decimals = "Decimals is required.";
  } else if (decimalsNumber < 0 || decimalsNumber > 18) {
    errors.decimals = "Decimals must be between 0 and 18.";
  }

  const supplyNumber = Number(data.totalSupply);
  if (data.totalSupply.trim() === "" || Number.isNaN(supplyNumber)) {
    errors.totalSupply = "Total supply is required.";
  } else if (supplyNumber <= 0) {
    errors.totalSupply = "Total supply must be greater than 0.";
  }

  return errors;
}

function shortenAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function TokenForm() {
  const [formData, setFormData] = useState<TokenFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<TokenFormErrors>({});
  const [showPreview, setShowPreview] = useState(false);

  const [wallets, setWallets] = useState<DetectedWallet[]>([]);
  const [showWalletPicker, setShowWalletPicker] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [signer, setSigner] = useState<any>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [connectedWalletName, setConnectedWalletName] = useState<string | null>(null);

  const [deployStatus, setDeployStatus] = useState<DeployStatus>("idle");
  const [deployError, setDeployError] = useState<string | null>(null);
  const [deployedAddress, setDeployedAddress] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  useEffect(() => {
    discoverWallets().then(setWallets);
  }, []);

  function updateField<K extends keyof TokenFormData>(key: K, value: TokenFormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handlePreview() {
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setShowPreview(Object.keys(validationErrors).length === 0);
  }

  async function handleConnectClick() {
    setDeployError(null);
    const found = await discoverWallets();
    setWallets(found);

    if (found.length === 0) {
      setDeployError("No wallet extension detected. Please install MetaMask, OKX Wallet, or another EVM wallet.");
      return;
    }

    if (found.length === 1 && found[0]) {
      await handleSelectWallet(found[0]);
    } else {
      setShowWalletPicker(true);
    }
  }

  async function handleSelectWallet(wallet: DetectedWallet) {
    if (!wallet) return;
    setConnecting(true);
    setDeployError(null);
    try {
      const { signer, address } = await connectWallet(wallet.provider);
      setSigner(signer);
      setAddress(address);
      setConnectedWalletName(wallet.info.name);
      setShowWalletPicker(false);

      await switchNetwork(NETWORK);
    } catch (err: any) {
      setDeployError(err?.message ?? "Failed to connect wallet.");
    } finally {
      setConnecting(false);
    }
  }

  function handleDisconnect() {
    setSigner(null);
    setAddress(null);
    setConnectedWalletName(null);
    setDeployStatus("idle");
    setDeployedAddress(null);
    setTxHash(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setShowPreview(false);
      return;
    }
    setShowPreview(true);

    if (!signer || !address) {
      setDeployError("Please connect your wallet before deploying.");
      return;
    }

    setDeployError(null);
    setDeployedAddress(null);
    setTxHash(null);

    try {
      setDeployStatus("submitted");
      await switchNetwork(NETWORK);

      const config = NETWORKS[NETWORK];

      const { tokenAddress, txHash } = await deployToken(
        signer,
        config.factoryAddress,
        {
          name: formData.tokenName,
          symbol: formData.symbol,
          decimals: Number(formData.decimals),
          totalSupply: formData.totalSupply,
          mintable: formData.mintable,
        },
        config.confirmations,
        (status, hash) => {
          if (status === "submitted") setTxHash(hash ?? null);
          if (status === "submitted" || status === "confirming") setDeployStatus("confirming");
        }
      );

      setDeployedAddress(tokenAddress);
      setTxHash(txHash);
      setDeployStatus("done");
    } catch (err: any) {
      console.error(err);
      setDeployError(err?.shortMessage ?? err?.message ?? "Deployment failed. Please try again.");
      setDeployStatus("error");
    }
  }

  const explorerBase = NETWORKS[NETWORK].blockExplorerUrls[0];
  const isDeploying = deployStatus === "submitted" || deployStatus === "confirming";

  return (
    <div>
      <div className={styles.field}>
        {!address ? (
          <Button
            type="button"
            variant="secondary"
            icon={<Wallet size={16} />}
            onClick={handleConnectClick}
          >
            {connecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        ) : (
          <div
            className={styles.checkboxItem}
            style={{ justifyContent: "space-between", cursor: "default" }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <CheckCircle2
                size={16}
                style={{ marginRight: 6, color: "var(--color-accent)" }}
              />
              {connectedWalletName} · {shortenAddress(address)} ·{" "}
              {NETWORKS[NETWORK].chainName}
            </span>
            <button
              type="button"
              onClick={handleDisconnect}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-text-muted)",
                cursor: "pointer",
                fontSize: "0.8rem",
              }}
            >
              Disconnect
            </button>
          </div>
        )}

        {showWalletPicker && (
          <div className={styles.previewBox} style={{ marginTop: "0.6rem" }}>
            <div
              className={styles.previewTitle}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p>Select a wallet</p>
              <button
                type="button"
                onClick={() => setShowWalletPicker(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-text-muted)",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                }}
              >
                <X size={20} />
              </button>
            </div>
            {wallets.map((w) => (
              <button
                key={w.info.uuid}
                type="button"
                onClick={() => handleSelectWallet(w)}
                className={styles.checkboxItem}
                style={{
                  width: "100%",
                  marginBottom: "0.4rem",
                  justifyContent: "flex-start",
                }}
              >
                {w.info.icon && (
                  <img
                    src={w.info.icon}
                    alt={w.info.name}
                    width={20}
                    height={20}
                    style={{ borderRadius: 4, marginRight: 8 }}
                  />
                )}
                {w.info.name}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setShowWalletPicker(false)}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-text-muted)",
                cursor: "pointer",
                fontSize: "0.8rem",
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
        {(deployStatus === "submitted" || deployStatus === "confirming") && (
          <div className={styles.statusBanner}>
            <Loader2
              size={16}
              className={styles.spin}
              style={{ marginRight: 6 }}
            />
            <span>
              Waiting for {NETWORKS[NETWORK].confirmations} block
              confirmation(s)
              {txHash && (
                <>
                  {" "}
                  ·{" "}
                  <Link
                    href={`${explorerBase}/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "inherit", textDecoration: "underline" }}
                  >
                    View transaction
                  </Link>
                </>
              )}
            </span>
          </div>
        )}

        {/* {deployStatus === "done" && deployedAddress && (
          <div className={`${styles.statusBanner} ${styles.statusSuccess}`}>
            <CheckCircle2 size={16} style={{ marginRight: 6 }} />
            <span>
              Token deployed at {shortenAddress(deployedAddress)}.{" "}
              <Link
                href={`${explorerBase}/address/${deployedAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "inherit",
                  textDecoration: "underline",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  marginLeft: 4,
                }}
              >
                View on Explorer <ExternalLink size={12} />
              </Link>
            </span>
          </div>
        )} */}

        {deployStatus === "done" && deployedAddress && (
          <div className={`${styles.statusBanner} ${styles.statusSuccess}`}>
            <CheckCircle2 size={16} style={{ marginRight: 6 }} />
            <span>
              Token deployed at {shortenAddress(deployedAddress)}.{" "}
              {/* <Link
                href={`${explorerBase}/address/${deployedAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "inherit",
                  textDecoration: "underline",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  marginLeft: 4,
                }}
              >
                View on Explorer <ExternalLink size={12} />
              </Link> */}
              {txHash && (
                <>
                  {" "}
                  ·{" "}
                  <Link
                    href={`${explorerBase}/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "inherit",
                      textDecoration: "underline",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    Tx: {shortenAddress(txHash)} <ExternalLink size={12} />
                  </Link>
                </>
              )}
            </span>
          </div>
        )}

        {deployError && (
          <div className={`${styles.statusBanner} ${styles.statusError}`}>
            <AlertCircle size={16} style={{ marginRight: 6 }} />
            {deployError}
          </div>
        )}

        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="tokenName">
              Token Name<span className={styles.required}>*</span>
            </label>
            <input
              id="tokenName"
              type="text"
              placeholder="e.g. Nebula Finance"
              className={`${styles.input} ${
                errors.tokenName ? styles.inputError : ""
              }`}
              value={formData.tokenName}
              onChange={(e) => updateField("tokenName", e.target.value)}
            />
            {errors.tokenName && (
              <span className={styles.errorMessage}>
                <AlertCircle size={12} style={{ marginRight: 4 }} />
                {errors.tokenName}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="symbol">
              Symbol<span className={styles.required}>*</span>
            </label>
            <input
              id="symbol"
              type="text"
              placeholder="e.g. NBL"
              className={`${styles.input} ${
                errors.symbol ? styles.inputError : ""
              }`}
              value={formData.symbol}
              onChange={(e) =>
                updateField("symbol", e.target.value.toUpperCase())
              }
            />
            {errors.symbol && (
              <span className={styles.errorMessage}>{errors.symbol}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="decimals">
              Decimals<span className={styles.required}>*</span>
            </label>
            <input
              id="decimals"
              type="number"
              placeholder="18"
              className={`${styles.input} ${
                errors.decimals ? styles.inputError : ""
              }`}
              value={formData.decimals}
              onChange={(e) => updateField("decimals", e.target.value)}
            />
            {errors.decimals && (
              <span className={styles.errorMessage}>{errors.decimals}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="totalSupply">
              Total Supply<span className={styles.required}>*</span>
            </label>
            <input
              id="totalSupply"
              type="number"
              placeholder="e.g. 1000000"
              className={`${styles.input} ${
                errors.totalSupply ? styles.inputError : ""
              }`}
              value={formData.totalSupply}
              onChange={(e) => updateField("totalSupply", e.target.value)}
            />
            {errors.totalSupply && (
              <span className={styles.errorMessage}>{errors.totalSupply}</span>
            )}
          </div>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Token Features</span>
        </div>
        <div className={styles.checkboxGrid}>
          <label className={styles.checkboxItem}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={formData.mintable}
              onChange={(e) => updateField("mintable", e.target.checked)}
            />
            Mintable
          </label>
          <label className={styles.checkboxItem}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={formData.burnable}
              onChange={(e) => updateField("burnable", e.target.checked)}
            />
            Burnable
          </label>
          <label className={styles.checkboxItem}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={formData.pausable}
              onChange={(e) => updateField("pausable", e.target.checked)}
            />
            Pausable
          </label>
          <label className={styles.checkboxItem}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={formData.ownable}
              onChange={(e) => updateField("ownable", e.target.checked)}
            />
            Ownable
          </label>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Network</span>
          <div className={styles.checkboxItem} style={{ cursor: "default" }}>
            {NETWORKS[NETWORK].chainName} (testnet)
          </div>
        </div>

        {showPreview && (
          <div className={styles.previewBox}>
            <div className={styles.previewTitle}>Request Preview</div>
            <div className={styles.previewRow}>
              <span className={styles.previewLabel}>Token Name</span>
              <span>{formData.tokenName}</span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.previewLabel}>Symbol</span>
              <span>{formData.symbol}</span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.previewLabel}>Decimals</span>
              <span>{formData.decimals}</span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.previewLabel}>Total Supply</span>
              <span>{formData.totalSupply}</span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.previewLabel}>Features</span>
              <span>
                {[
                  formData.mintable && "Mintable",
                  formData.burnable && "Burnable",
                  formData.pausable && "Pausable",
                  formData.ownable && "Ownable",
                ]
                  .filter(Boolean)
                  .join(", ") || "None"}
              </span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.previewLabel}>Network</span>
              <span>{NETWORKS[NETWORK].chainName}</span>
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            icon={<Eye size={16} />}
            onClick={handlePreview}
          >
            Preview
          </Button>
          <Button
            type="submit"
            icon={
              isDeploying ? (
                <Loader2 size={16} className={styles.spin} />
              ) : (
                <ArrowRight size={16} />
              )
            }
            disabled={isDeploying}
          >
            {isDeploying ? "Deploying..." : "Deploy Token"}
          </Button>
        </div>
      </form>
    </div>
  );
}