import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, Droplets, ExternalLink } from "lucide-react";

const transactions = [
  {
    type: "claim" as const,
    hash: "0x8f3a...b21c",
    amount: "+100.00",
    time: "2 min ago",
    status: "confirmed",
  },
  {
    type: "send" as const,
    hash: "0x2e7d...91af",
    amount: "-250.00",
    to: "0x4b2F...c83D",
    time: "14 min ago",
    status: "confirmed",
  },
  {
    type: "receive" as const,
    hash: "0xc41b...f05e",
    amount: "+500.00",
    from: "0x9a1E...7b3C",
    time: "1 hr ago",
    status: "confirmed",
  },
  {
    type: "claim" as const,
    hash: "0x1d9e...a42b",
    amount: "+100.00",
    time: "2 hrs ago",
    status: "confirmed",
  },
  {
    type: "send" as const,
    hash: "0x6f2c...d87a",
    amount: "-75.00",
    to: "0x3c8A...e12F",
    time: "5 hrs ago",
    status: "confirmed",
  },
];

const typeConfig = {
  claim: { icon: Droplets, label: "Faucet Claim", color: "text-primary" },
  send: { icon: ArrowUpRight, label: "Sent", color: "text-destructive" },
  receive: { icon: ArrowDownLeft, label: "Received", color: "text-emerald-400" },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const RecentTransactions = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-6 md:p-8"
      id="transactions"
    >
      <h2 className="section-title mb-6">Recent Transactions</h2>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-1">
        {transactions.map((tx, i) => {
          const config = typeConfig[tx.type];
          const Icon = config.icon;
          return (
            <motion.div
              key={i}
              variants={item}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/40 transition-colors duration-200 group cursor-pointer"
            >
              <div className={`w-9 h-9 rounded-lg bg-secondary flex items-center justify-center ${config.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{config.label}</span>
                  <span className="text-xs font-mono text-muted-foreground">{tx.hash}</span>
                </div>
                <span className="text-xs text-muted-foreground">{tx.time}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-mono text-sm font-medium tabular-nums ${
                  tx.amount.startsWith("+") ? "text-emerald-400" : "text-destructive"
                }`}>
                  {tx.amount} FCT
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/0 group-hover:text-muted-foreground transition-colors duration-200" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
};

export default RecentTransactions;
