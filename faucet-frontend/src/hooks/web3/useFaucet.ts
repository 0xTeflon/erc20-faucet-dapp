import { useState, useEffect } from "react";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { ABI, CONTRACT_ADDRESS } from "../../abi/FaucetToken";
import { useToast } from "../use-toast";

export function useFaucet(userAddress?: `0x${string}`) {
  const [countdown, setCountdown] = useState("");
  const { toast } = useToast();
  const zero = "0x0000000000000000000000000000000000000000" as `0x${string}`;

  const { data: cooldown, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "getCooldownRemaining",
    args: [userAddress ?? zero],
  });

  useEffect(() => {
    if (!cooldown || cooldown === 0n) {
      setCountdown("");
      return;
    }

    let remaining = Number(cooldown);

    const interval = setInterval(() => {
      if (remaining <= 0) {
        clearInterval(interval);
        setCountdown("");
        refetch();
        return;
      }
      const h = Math.floor(remaining / 3600);
      const m = Math.floor((remaining % 3600) / 60);
      const s = remaining % 60;
      setCountdown(
        `${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`,
      );
      remaining--;
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown]);

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success!",
        description: "100 FCT claimed successfully.",
      });
      refetch();
    }
  }, [isSuccess]);

  const request = () => {
    writeContract(
      { address: CONTRACT_ADDRESS, abi: ABI, functionName: "requestToken" },
      {
        onError: (e) =>
          toast({
            title: "Error",
            description: e.message.includes("Cooldown")
              ? "Cooldown active!"
              : "Transaction failed",
            variant: "destructive",
          }),
      },
    );
  };

  return {
    countdown,
    isOnCooldown: !!cooldown && cooldown > 0n,
    isPending: isPending || isConfirming,
    request,
  };
}
