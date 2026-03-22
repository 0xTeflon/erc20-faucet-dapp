import Navbar from "@/components/Navbar";
import HeroStats from "@/components/HeroStats";
import FaucetCard from "@/components/FaucetCard";
import MintCard from "@/components/MintCard";
import TransferCard from "@/components/TransferCard";
import RecentTransactions from "@/components/RecentTransactions";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full animate-pulse-glow opacity-30"
          style={{ background: "radial-gradient(circle, hsl(var(--glow) / 0.15), transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 -right-48 w-[500px] h-[500px] rounded-full animate-pulse-glow opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(var(--glow-secondary) / 0.1), transparent 70%)",
            animationDelay: "1.5s",
          }}
        />
        <div
          className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full animate-pulse-glow opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(var(--glow) / 0.1), transparent 70%)",
            animationDelay: "3s",
          }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <HeroStats />

        <div className="container mx-auto px-4 md:px-8 pb-20 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FaucetCard />
            <MintCard />
            <TransferCard />
          </div>

          <RecentTransactions />
        </div>
      </div>
    </div>
  );
};

export default Index;
