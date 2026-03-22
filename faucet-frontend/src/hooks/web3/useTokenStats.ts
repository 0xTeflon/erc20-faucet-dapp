import { useReadContracts } from "wagmi";
import { formatUnits } from "viem";
import { ABI, CONTRACT_ADDRESS } from "../../abi/FaucetToken";

export function useTokenStats(userAddress?: `0x${string}`) {
  const contract = { address: CONTRACT_ADDRESS, abi: ABI };
  const zero = "0x0000000000000000000000000000000000000000" as `0x${string}`;

  const { data, isLoading } = useReadContracts({
    contracts: [
      { ...contract, functionName: "name" },
      { ...contract, functionName: "symbol" },
      { ...contract, functionName: "totalSupply" },
      { ...contract, functionName: "MAX_SUPPLY" },
      { ...contract, functionName: "FAUCET_AMOUNT" },
      { ...contract, functionName: "balanceOf", args: [userAddress ?? zero] },
    ],
  });

  const fmt = (val: unknown) => (val ? formatUnits(val as bigint, 18) : "0");

  return {
    isLoading,
    name: (data?.[0]?.result as string) ?? "—",
    symbol: (data?.[1]?.result as string) ?? "—",
    totalSupply: fmt(data?.[2]?.result),
    maxSupply: fmt(data?.[3]?.result),
    faucetAmt: fmt(data?.[4]?.result),
    balance: fmt(data?.[5]?.result),
  };
}
