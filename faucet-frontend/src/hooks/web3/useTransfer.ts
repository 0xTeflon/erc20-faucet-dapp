import { useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import { ABI, CONTRACT_ADDRESS } from "../../abi/FaucetToken";
import { useToast } from "../use-toast";

export function useTransfer() {
  const { toast } = useToast();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess)
      toast({ title: "Success!", description: "Transfer completed." });
  }, [isSuccess]);

  const transfer = (to: string, amount: string) => {
    writeContract(
      {
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "transfer",
        args: [to as `0x${string}`, parseUnits(amount, 18)],
      },
      {
        onError: () =>
          toast({
            title: "Error",
            description: "Transfer failed",
            variant: "destructive",
          }),
      },
    );
  };

  return { transfer, isPending: isPending || isConfirming };
}
