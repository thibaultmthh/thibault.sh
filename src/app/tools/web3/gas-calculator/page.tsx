"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { ethers } from "ethers";

export default function GasCalculator() {
  const [gasLimit, setGasLimit] = useState("21000"); // Default gas limit for ETH transfer
  const [gasPrice, setGasPrice] = useState("");
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    inWei: string;
    inGwei: string;
    inEth: string;
    inUsd: string;
  } | null>(null);

  // Fetch current gas price and ETH price
  const fetchPrices = async () => {
    setIsLoading(true);
    try {
      const provider = new ethers.JsonRpcProvider("https://eth.public-rpc.com");
      const feeData = await provider.getFeeData();
      const gasPriceWei = feeData.gasPrice;
      if (gasPriceWei) {
        setGasPrice(ethers.formatUnits(gasPriceWei, "gwei"));
      }

      // Fetch ETH price from CoinGecko
      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
      const data = await response.json();
      setEthPrice(data.ethereum.usd);
    } catch (error) {
      console.error("Error fetching prices:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const calculateGas = () => {
    try {
      const gasPriceWei = ethers.parseUnits(gasPrice, "gwei");
      const totalWei = gasPriceWei * BigInt(gasLimit);

      const inEth = ethers.formatEther(totalWei);
      const inUsd = ethPrice ? (parseFloat(inEth) * ethPrice).toFixed(2) : "0";

      setResults({
        inWei: totalWei.toString(),
        inGwei: ethers.formatUnits(totalWei, "gwei"),
        inEth,
        inUsd,
      });
    } catch (error) {
      console.error("Error calculating gas:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateGas();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Gas Calculator</h1>

      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <form onSubmit={handleSubmit}>
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
              </div>

              <div>
                <Label htmlFor="gas-price">Gas Price (Gwei)</Label>
                <div className="flex gap-2">
                  <Input
                    id="gas-price"
                    type="number"
                    value={gasPrice}
                    onChange={(e) => setGasPrice(e.target.value)}
                    placeholder="Enter gas price in Gwei"
                    className="font-mono"
                  />
                  <Button type="button" variant="outline" onClick={fetchPrices} disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Calculate
              </Button>
            </div>
          </form>

          {results && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <Label className="mb-2 block">Results</Label>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex justify-between">
                    <span>Wei:</span>
                    <span>{results.inWei}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gwei:</span>
                    <span>{results.inGwei}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ETH:</span>
                    <span>{results.inEth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>USD:</span>
                    <span>${results.inUsd}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6 mt-6">
          <h2 className="font-semibold mb-3">About Gas Calculation</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Gas is the fee required to execute transactions on Ethereum</li>
            <li>Gas Limit is the maximum amount of gas you&apos;re willing to use</li>
            <li>Gas Price is the amount you&apos;re willing to pay per unit of gas</li>
            <li>Total Fee = Gas Limit × Gas Price</li>
            <li>21,000 gas is the standard limit for ETH transfers</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
