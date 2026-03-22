import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles } from "lucide-react";
import { useMint } from "../hooks/web3/useMint";

const MintCard = () => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const { mint, isPending } = useMint();

  const handleMint = () => {
    if (!to || !amount) return;
    mint(to, amount);
    setTo("");
    setAmount("");
  };

  const isValid = to.length > 5 && Number(amount) > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      className="glass-card p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl bg-glow-secondary/10 flex items-center justify-center"
          style={{ boxShadow: "0 0 15px hsl(var(--glow-secondary) / 0.15)" }}
        >
          <Shield className="w-5 h-5 text-glow-secondary" />
        </div>
        <div>
          <h2 className="section-title">Mint Tokens</h2>
          <p className="text-xs text-muted-foreground">
            Admin only — mint new supply
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">
            Recipient Address
          </label>
          <div className="glass-card overflow-hidden">
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="0x..."
              className="w-full bg-transparent px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 outline-none border-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">
            Amount to Mint
          </label>
          <div className="glass-card flex items-center overflow-hidden">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-transparent px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 outline-none border-none"
            />
            <span className="pr-4 text-xs text-muted-foreground font-mono">
              FCT
            </span>
          </div>
        </div>

        <button
          onClick={handleMint}
          disabled={!isValid || isPending}
          className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{
            background: isValid
              ? "linear-gradient(135deg, hsl(var(--glow-secondary)), hsl(var(--glow-secondary) / 0.6))"
              : "hsl(var(--secondary))",
            color: isValid ? "hsl(0 0% 100%)" : "hsl(var(--muted-foreground))",
            boxShadow: isValid
              ? "0 0 24px hsl(var(--glow-secondary) / 0.2)"
              : "none",
          }}
        >
          {isPending ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            />
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Mint Tokens
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};
export default MintCard;
