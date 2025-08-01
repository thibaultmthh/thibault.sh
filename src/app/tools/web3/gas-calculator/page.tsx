"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useCallback } from "react";
import { Loader2, Info, AlertTriangle, DollarSign } from "lucide-react";
import { ethers } from "ethers";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDebounce } from "@thibault.sh/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import triggerGAEvent from "@/lib/triggerGAEvent";

const COMMON_GAS_LIMITS = [
  { name: "ETH Transfer", value: "21000", description: "Standard ETH transfer" },
  { name: "ERC20 Transfer", value: "65000", description: "Token transfer" },
  { name: "NFT Mint", value: "150000", description: "NFT minting operation" },
  { name: "Swap", value: "200000", description: "DEX token swap" },
];

const fetchGasPrice = async () => {
  const provider = new ethers.JsonRpcProvider("https://eth.public-rpc.com");
  const feeData = await provider.getFeeData();
  if (!feeData.gasPrice) throw new Error("Failed to fetch gas price");
  return ethers.formatUnits(feeData.gasPrice, "gwei");
};

const fetchEthPrice = async () => {
  const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
  const data = await response.json();
  return data.ethereum.usd;
};

export default function GasCalculator() {
  const [gasLimit, setGasLimit] = useState("21000");
  const [manualGasPrice, setManualGasPrice] = useState("");
  const [results, setResults] = useState<{
    inWei: string;
    inGwei: string;
    inEth: string;
    inUsd: string;
  } | null>(null);

  // Query for ETH price (no refetch)
  const { data: ethPrice } = useQuery({
    queryKey: ["ethPrice"],
    queryFn: fetchEthPrice,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  // Query for gas price (30s refetch)
  const {
    data: currentGasPrice,
    isLoading: isLoadingGasPrice,
    refetch: refetchGasPrice,
  } = useQuery({
    queryKey: ["gasPrice"],
    queryFn: fetchGasPrice,
    refetchInterval: 30000,
    refetchOnWindowFocus: false,
  });

  // Use manual input or current gas price
  const effectiveGasPrice = manualGasPrice || currentGasPrice;

  // Debounce inputs
  const debouncedGasLimit = useDebounce(gasLimit, 500);
  const debouncedGasPrice = useDebounce(effectiveGasPrice, 500);

  const calculateGas = useCallback(
    (currentGasPrice: string) => {
      try {
        const gasPriceWei = ethers.parseUnits(currentGasPrice, "gwei");
        const totalWei = gasPriceWei * BigInt(gasLimit);

        const inEth = ethers.formatEther(totalWei);
        const inUsd = ethPrice ? (parseFloat(inEth) * ethPrice).toFixed(2) : "0";
        triggerGAEvent("gas_calculator");

        setResults({
          inWei: totalWei.toString(),
          inGwei: ethers.formatUnits(totalWei, "gwei"),
          inEth,
          inUsd,
        });
      } catch (error) {
        console.error("Error calculating gas:", error);
      }
    },
    [ethPrice, gasLimit]
  );

  // Calculate gas whenever debounced values change
  useEffect(() => {
    if (debouncedGasPrice && debouncedGasLimit) {
      calculateGas(debouncedGasPrice);
    }
  }, [debouncedGasLimit, debouncedGasPrice, ethPrice, calculateGas]);

  return (
    <div className="container max-w-6xl py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Ethereum Gas Calculator</h1>
        <p className="text-muted-foreground">
          Calculate transaction fees for Ethereum operations. Estimate costs in real-time using current network gas
          prices.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="gas-limit">Gas Limit</Label>
                <Input
                  id="gas-limit"
                  type="number"
                  value={gasLimit}
                  onChange={(e) => setGasLimit(e.target.value)}
                  placeholder="21000"
                  className="font-mono"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {COMMON_GAS_LIMITS.map((limit) => (
                    <Button
                      key={limit.name}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setGasLimit(limit.value)}
                    >
                      {limit.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="gas-price">Gas Price (Gwei)</Label>
                <div className="flex gap-2">
                  <Input
                    id="gas-price"
                    type="number"
                    value={manualGasPrice || currentGasPrice || ""}
                    onChange={(e) => setManualGasPrice(e.target.value)}
                    placeholder="Enter gas price in Gwei"
                    className="font-mono"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setManualGasPrice(""); // Clear manual input
                      refetchGasPrice(); // Fetch new gas price
                    }}
                    disabled={isLoadingGasPrice}
                  >
                    {isLoadingGasPrice ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
                  </Button>
                </div>
                {currentGasPrice && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Current network gas price: {currentGasPrice} Gwei
                  </p>
                )}
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Gas prices auto-update every 30 seconds. Calculations update in real-time as you type.
                </AlertDescription>
              </Alert>
            </div>
          </Card>

          <Card className="p-6 mt-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Info className="h-5 w-5" />
                Understanding Gas Fees
              </h2>

              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Gas fees are payments made by users to compensate for the computing energy required to process and
                  validate transactions on the Ethereum network.
                </p>
                <div className="space-y-2">
                  <h3 className="font-medium">Key Components:</h3>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <strong>Gas Limit:</strong> Maximum amount of gas you&apos;re willing to use
                    </li>
                    <li>
                      <strong>Gas Price:</strong> Amount you&apos;re willing to pay per unit of gas (in Gwei)
                    </li>
                    <li>
                      <strong>Total Fee:</strong> Gas Limit x Gas Price
                    </li>
                  </ul>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Gas prices fluctuate based on network demand. Higher gas prices mean faster transaction
                    confirmation.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Live Fee Estimation</h2>
              {isLoadingGasPrice && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
            {results ? (
              <div className="space-y-6">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Network Fee</span>
                      <span className="font-mono text-lg">{results.inEth} ETH</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span className="text-sm">USD Equivalent</span>
                      <span className="font-mono flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {results.inUsd}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Detailed Breakdown</h3>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex justify-between p-2 bg-muted/50 rounded">
                      <span>Wei:</span>
                      <span>{results.inWei}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted/50 rounded">
                      <span>Gwei:</span>
                      <span>{results.inGwei}</span>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    This is an estimate. Actual transaction costs may vary based on network conditions.
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Enter gas parameters to see live fee estimates
              </div>
            )}
          </Card>

          <Card className="p-6 mt-6">
            <h2 className="text-lg font-semibold mb-3">Common Gas Costs</h2>
            <div className="space-y-3">
              {COMMON_GAS_LIMITS.map((operation) => (
                <div key={operation.name} className="p-3 rounded-lg border">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{operation.name}</span>
                    <span className="text-sm text-muted-foreground">{operation.value} gas</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{operation.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
