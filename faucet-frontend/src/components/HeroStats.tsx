import { motion } from "framer-motion";
import { Coins, BarChart3, Wallet2, Tag, Hash, Droplets } from "lucide-react";
import { useAccount } from "wagmi";
import { useTokenStats } from "../hooks/web3/useTokenStats";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const HeroStats = () => {
  const { address } = useAccount();
  const {
    name,
    symbol,
    totalSupply,
    maxSupply,
    faucetAmt,
    balance,
    isLoading,
  } = useTokenStats(address);

  const stats = [
    { label: "Token Name", value: name, suffix: "", icon: Tag },
    { label: "Symbol", value: symbol, suffix: "", icon: Hash },
    {
      label: "Total Supply",
      value: Number(totalSupply).toLocaleString(),
      suffix: symbol,
      icon: Coins,
    },
    {
      label: "Max Supply",
      value: Number(maxSupply).toLocaleString(),
      suffix: symbol,
      icon: BarChart3,
    },
    {
      label: "Your Balance",
      value: Number(balance).toFixed(2),
      suffix: symbol,
      icon: Wallet2,
    },
    {
      label: "Faucet Amount",
      value: Number(faucetAmt).toLocaleString(),
      suffix: `${symbol}/claim`,
      icon: Droplets,
    },
  ];

  return (
    <section className="pt-28 pb-12 px-4 md:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1] text-balance mb-3">
            ERC20 Faucet <span className="glow-text">Token</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-lg">
            Claim free testnet tokens, transfer to peers, and explore on-chain
            interactions.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={item}
              className="glass-card-hover p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="stat-value text-foreground">
                  {isLoading ? "..." : stat.value}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  {stat.suffix}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default HeroStats;
