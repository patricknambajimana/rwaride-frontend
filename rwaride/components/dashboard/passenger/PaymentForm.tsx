import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentForm({
  selectedTrip,
  cardNumber,
  setCardNumber,
  cardExpiry,
  setCardExpiry,
  cardCVV,
  setCardCVV,
  onBack,
  onPay,
  loading,
}: {
  selectedTrip: any;
  cardNumber: string;
  setCardNumber: (v: string) => void;
  cardExpiry: string;
  setCardExpiry: (v: string) => void;
  cardCVV: string;
  setCardCVV: (v: string) => void;
  onBack: () => void;
  onPay: (e: React.FormEvent) => void;
  loading: boolean;
}) {
  return (
    <form onSubmit={onPay} className="space-y-4">
      <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
        <div className="flex justify-between items-center">
          <span>Total Amount</span>
          <span className="text-2xl font-bold text-green-600">
            {selectedTrip.price_per_seat} RWF
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            className="pl-10"
            maxLength={19}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input
            id="expiry"
            value={cardExpiry}
            onChange={(e) => setCardExpiry(e.target.value)}
            placeholder="MM/YY"
            maxLength={5}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            type="password"
            value={cardCVV}
            onChange={(e) => setCardCVV(e.target.value)}
            placeholder="123"
            maxLength={3}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? "Processing..." : `Pay ${selectedTrip.price_per_seat} RWF`}
      </Button>
      <p className="text-xs text-gray-500 text-center">
        Your payment information is secure and encrypted
      </p>
      <Button variant="ghost" onClick={onBack} className="w-full">
        Back
      </Button>
    </form>
  );
}
