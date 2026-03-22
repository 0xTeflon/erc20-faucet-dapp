import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { useTransfer } from "../hooks/web3/useTransfer";

const TransferCard = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const { transfer, isPending } = useTransfer();

  const handleTransfer = () => {
    if (!recipient || !amount) return;
    transfer(recipient, amount);
    setRecipient("");
    setAmount("");
  };

  const isValid = recipient.length > 5 && Number(amount) > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
      className="glass-card p-6 md:p-8"
      id="transfer"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center glow-border">
          <ArrowUpRight className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="section-title">Transfer</h2>
          <p className="text-xs text-muted-foreground">
            Send FCT to another wallet
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
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="w-full bg-transparent px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 outline-none border-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">
            Amount
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
          onClick={handleTransfer}
          disabled={!isValid || isPending}
          className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{
            background: isValid
              ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.7))"
              : "hsl(var(--secondary))",
            color: isValid
              ? "hsl(var(--primary-foreground))"
              : "hsl(var(--muted-foreground))",
            boxShadow: isValid ? "0 0 24px hsl(var(--glow) / 0.2)" : "none",
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
              <Send className="w-4 h-4" />
              Send Tokens
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};
export default TransferCard;
