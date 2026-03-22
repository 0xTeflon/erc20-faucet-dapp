import { motion } from "framer-motion";
import { Droplets } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-x-0 border-t-0"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center glow-border">
            <Droplets className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Faucet<span className="glow-text">Token</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a
            href="#faucet"
            className="hover:text-primary transition-colors duration-200"
          >
            Faucet
          </a>
          <a
            href="#transfer"
            className="hover:text-primary transition-colors duration-200"
          >
            Transfer
          </a>
          <a
            href="#transactions"
            className="hover:text-primary transition-colors duration-200"
          >
            Transactions
          </a>
        </div>

        <ConnectButton />
      </div>
    </motion.nav>
  );
};
export default Navbar;
