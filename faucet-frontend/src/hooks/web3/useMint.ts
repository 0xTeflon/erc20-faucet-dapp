import { useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import { ABI, CONTRACT_ADDRESS } from "../../abi/FaucetToken";
import { useToast } from "../use-toast";

export function useMint() {
  const { toast } = useToast();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess)
      toast({ title: "Success!", description: "Tokens minted successfully." });
  }, [isSuccess, toast]);

  const mint = (to: string, amount: string) => {
    writeContract(
      {
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "mint",
        args: [to as `0x${string}`, parseUnits(amount, 18)],
      },
      {
        onError: (e) =>
          toast({
            title: "Error",
            description: e.message.includes("owner")
              ? "Only owner can mint"
              : "Mint failed",
            variant: "destructive",
          }),
      },
    );
  };

  return { mint, isPending: isPending || isConfirming };
}
