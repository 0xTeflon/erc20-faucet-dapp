import { motion } from "framer-motion";
import { Droplets, Clock, CheckCircle2 } from "lucide-react";
import { useAccount } from "wagmi";
import { useFaucet } from "../hooks/web3/useFaucet";

const FaucetCard = () => {
  const { address, isConnected } = useAccount();
  const { request, countdown, isOnCooldown, isPending } = useFaucet(address);

  const canClaim = isConnected && !isOnCooldown && !isPending;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-6 md:p-8"
      id="faucet"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center glow-border">
          <Droplets className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="section-title">Token Faucet</h2>
          <p className="text-xs text-muted-foreground">
            Claim 100 FCT every 24 hours
          </p>
        </div>
      </div>

      <div className="glass-card p-4 mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Amount per claim</p>
          <p className="font-mono text-xl font-semibold text-foreground tabular-nums">
            100.00 <span className="text-sm text-muted-foreground">FCT</span>
          </p>
        </div>
        {isOnCooldown && countdown && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Retry in</p>
              <span className="font-mono text-sm tabular-nums text-primary">
                {countdown}
              </span>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={request}
        disabled={!canClaim}
        className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{
          background: canClaim
            ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.7))"
            : "hsl(var(--secondary))",
          color: canClaim
            ? "hsl(var(--primary-foreground))"
            : "hsl(var(--muted-foreground))",
          boxShadow: canClaim ? "0 0 24px hsl(var(--glow) / 0.2)" : "none",
        }}
      >
        {!isConnected ? (
          "Connect Wallet First"
        ) : isPending ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          />
        ) : isOnCooldown ? (
          <>
            <Clock className="w-4 h-4" />
            Cooldown Active
          </>
        ) : (
          <>
            <CheckCircle2 className="w-4 h-4" />
            Claim Tokens
          </>
        )}
      </button>
    </motion.div>
  );
};
export default FaucetCard;
