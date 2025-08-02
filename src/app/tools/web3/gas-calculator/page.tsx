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
  // List of public RPC endpoints that don't require API keys
  const rpcEndpoints = [
    "https://cloudflare-eth.com",
    "https://rpc.ankr.com/eth",
    "https://ethereum.publicnode.com",
    "https://eth.drpc.org",
  ];

  // Try each endpoint until one works
  for (const endpoint of rpcEndpoints) {
    try {
      const provider = new ethers.JsonRpcProvider(endpoint);
      const feeData = await provider.getFeeData();
      if (feeData.gasPrice) {
        return parseFloat(ethers.formatUnits(feeData.gasPrice, "gwei")).toFixed(5);
      }
    } catch (error) {
      console.warn(`Failed to fetch gas price from ${endpoint}:`, error);
      continue; // Try next endpoint
    }
  }

  // If all RPC endpoints fail, try alternative gas price API
  try {
    const response = await fetch("https://api.etherscan.io/api?module=gastracker&action=gasoracle");
    const data = await response.json();
    if (data.status === "1" && data.result?.ProposeGasPrice) {
      return parseFloat(data.result.ProposeGasPrice).toFixed(5);
    }
  } catch (error) {
    console.warn("Failed to fetch gas price from Etherscan API:", error);
  }

  throw new Error("Failed to fetch gas price from all available sources");
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

        const inEth = parseFloat(ethers.formatEther(totalWei)).toFixed(10);
        const inUsd = ethPrice ? (parseFloat(inEth) * ethPrice).toFixed(2) : "0";
        triggerGAEvent("gas_calculator");

        setResults({
          inWei: totalWei.toString(),
          inGwei: parseFloat(ethers.formatUnits(totalWei, "gwei")).toFixed(5),
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Ethereum Gas Calculator</h1>
        <p className="text-muted-foreground">
          Calculate transaction fees for Ethereum operations. Estimate costs in real-time using current network gas
          prices.
        </p>
      </div>

      {/* Current Market Data */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Current Gas Price</p>
              <div className="flex items-center gap-2">
                {isLoadingGasPrice ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <p className="text-2xl font-bold">{currentGasPrice || "—"}</p>
                )}
                <span className="text-sm text-muted-foreground">Gwei</span>
              </div>
            </div>
            <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">ETH Price</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">${ethPrice ? ethPrice.toLocaleString() : "—"}</p>
                <span className="text-sm text-muted-foreground">USD</span>
              </div>
            </div>
            <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Simple Transfer Cost</p>
              <div className="flex items-center gap-2">
                {currentGasPrice && ethPrice ? (
                  <p className="text-2xl font-bold">
                    ${((21000 * parseFloat(currentGasPrice) * ethPrice) / 1000000000).toFixed(2)}
                  </p>
                ) : (
                  <p className="text-2xl font-bold">—</p>
                )}
                <span className="text-sm text-muted-foreground">USD</span>
              </div>
            </div>
            <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Info className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>
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
                <div className="flex items-center justify-between mt-1">
                  {currentGasPrice && <p className="text-sm text-muted-foreground">Network: {currentGasPrice} Gwei</p>}
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-muted-foreground">Live data</span>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Gas prices auto-refresh every 30 seconds. Calculations update in real-time as you type.
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
              <h2 className="text-lg font-semibold">Transaction Cost</h2>
              {isLoadingGasPrice && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
            {results ? (
              <div className="space-y-6">
                {/* Main Result - Prominent Display */}
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg border">
                  <div className="text-center space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Estimated Transaction Fee</p>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold font-mono">{results.inEth} ETH</p>
                      <p className="text-xl font-semibold text-muted-foreground flex items-center justify-center gap-1">
                        <DollarSign className="h-5 w-5" />
                        {results.inUsd} USD
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Breakdown</h3>
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                      <span className="text-sm">Gas Limit:</span>
                      <span className="font-mono font-medium">{gasLimit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                      <span className="text-sm">Gas Price:</span>
                      <span className="font-mono font-medium">{effectiveGasPrice || "—"} Gwei</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                      <span className="text-sm">Total (Wei):</span>
                      <span className="font-mono font-medium text-xs">{results.inWei}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                      <span className="text-sm">Total (Gwei):</span>
                      <span className="font-mono font-medium">{results.inGwei}</span>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    This is an estimate based on current network conditions. Actual costs may vary.
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <DollarSign className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Enter gas parameters to see cost estimates</p>
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
