"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Lock, ShieldCheck } from "lucide-react"

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ")
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4)
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`
  }
  return digits
}

function getCardType(number: string): string | null {
  const clean = number.replace(/\s/g, "")
  if (/^4/.test(clean)) return "visa"
  if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) return "mastercard"
  if (/^3[47]/.test(clean)) return "amex"
  if (/^6(?:011|5)/.test(clean)) return "discover"
  return null
}

function CardBrandIcon({ brand }: { brand: string | null }) {
  if (!brand) return <CreditCard className="h-5 w-5 text-muted-foreground" />

  const brandColors: Record<string, string> = {
    visa: "text-[#1a1f71]",
    mastercard: "text-[#eb001b]",
    amex: "text-[#006fcf]",
    discover: "text-[#ff6000]",
  }

  return (
    <div className={`flex items-center justify-center rounded bg-foreground/90 px-1.5 py-0.5`}>
      <span className={`text-[10px] font-bold font-mono uppercase ${brandColors[brand] || "text-muted-foreground"}`}>
        {brand}
      </span>
    </div>
  )
}

type PaymentMethodType = "card" | "apple" | "google"

export function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("card")
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [cardName, setCardName] = useState("")
  const [isFlipped, setIsFlipped] = useState(false)

  const cardType = getCardType(cardNumber)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <CreditCard className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">Payment Method</h3>
          <p className="text-xs text-muted-foreground">All transactions are encrypted and secure</p>
        </div>
      </div>

      {/* Payment Method Tabs */}
      <div className="grid grid-cols-3 gap-2">
        {([
          { id: "card" as const, label: "Card", icon: CreditCardTabIcon },
          { id: "apple" as const, label: "Apple Pay", icon: ApplePayIcon },
          { id: "google" as const, label: "Google Pay", icon: GooglePayIcon },
        ]).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setPaymentMethod(id)}
            className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 transition-all ${
              paymentMethod === id
                ? "border-accent bg-accent/10 text-foreground"
                : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
            }`}
          >
            <Icon active={paymentMethod === id} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>

      {paymentMethod === "card" && (
        <>
          {/* Interactive Card Preview */}
          <div className="perspective-[1000px]">
            <div
              className={`relative h-48 w-full transition-transform duration-700 [transform-style:preserve-3d] ${
                isFlipped ? "[transform:rotateY(180deg)]" : ""
              }`}
            >
              {/* Front */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-secondary via-card to-secondary border border-border p-6 [backface-visibility:hidden]">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      <div className="h-8 w-10 rounded-md bg-accent/20 border border-accent/30" />
                      <div className="h-8 w-6 rounded-full bg-muted-foreground/10" />
                    </div>
                    <CardBrandIcon brand={cardType} />
                  </div>
                  <div>
                    <p className="font-mono text-lg tracking-[0.25em] text-foreground">
                      {cardNumber || "0000 0000 0000 0000"}
                    </p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Card Holder</p>
                      <p className="text-sm font-medium text-foreground truncate max-w-[180px]">
                        {cardName || "YOUR NAME"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Expires</p>
                      <p className="text-sm font-mono font-medium text-foreground">
                        {expiry || "MM/YY"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-secondary via-card to-secondary border border-border [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className="mt-8 h-10 bg-muted-foreground/20" />
                <div className="flex flex-col items-end px-6 pt-6">
                  <div className="flex h-8 w-3/4 items-center justify-end rounded bg-muted px-4">
                    <p className="font-mono text-sm tracking-widest text-foreground">
                      {cvc || "***"}
                    </p>
                  </div>
                  <p className="mt-2 text-[10px] text-muted-foreground">Security Code</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card Form */}
          <div className="grid gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cardName" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Name on Card
              </Label>
              <Input
                id="cardName"
                placeholder="Jane Doe"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cardNumber" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Card Number
              </Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  onFocus={() => setIsFlipped(false)}
                  className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50 font-mono tracking-wider pr-14"
                  maxLength={19}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <CardBrandIcon brand={cardType} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="expiry" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Expiry Date
                </Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  onFocus={() => setIsFlipped(false)}
                  className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50 font-mono"
                  maxLength={5}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cvc" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  CVC
                </Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  onFocus={() => setIsFlipped(true)}
                  onBlur={() => setIsFlipped(false)}
                  className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50 font-mono"
                  maxLength={4}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {paymentMethod === "apple" && (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-secondary/30 py-10">
          <ApplePayIcon active size="lg" />
          <p className="text-sm text-muted-foreground">Click the button below to pay with Apple Pay</p>
          <button className="flex h-12 items-center justify-center gap-2 rounded-lg bg-foreground px-8 text-sm font-medium text-background transition-opacity hover:opacity-90">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Pay
          </button>
        </div>
      )}

      {paymentMethod === "google" && (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-secondary/30 py-10">
          <GooglePayIcon active size="lg" />
          <p className="text-sm text-muted-foreground">Click the button below to pay with Google Pay</p>
          <button className="flex h-12 items-center justify-center gap-2 rounded-lg bg-foreground px-8 text-sm font-medium text-background transition-opacity hover:opacity-90">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Pay
          </button>
        </div>
      )}

      {/* Security Badge */}
      <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/20 px-4 py-3">
        <ShieldCheck className="h-5 w-5 shrink-0 text-accent" />
        <div className="flex flex-col">
          <p className="text-xs font-medium text-foreground">256-bit SSL Encryption</p>
          <p className="text-[11px] text-muted-foreground">Your payment information is secure and encrypted</p>
        </div>
        <Lock className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
      </div>
    </div>
  )
}

// Tab Icons
function CreditCardTabIcon({ active }: { active: boolean }) {
  return (
    <CreditCard className={`h-5 w-5 ${active ? "text-accent" : "text-muted-foreground"}`} />
  )
}

function ApplePayIcon({ active, size }: { active: boolean; size?: string }) {
  const s = size === "lg" ? "h-8 w-8" : "h-5 w-5"
  return (
    <svg viewBox="0 0 24 24" className={`${s} ${active ? "text-foreground" : "text-muted-foreground"}`} fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  )
}

function GooglePayIcon({ active, size }: { active: boolean; size?: string }) {
  const s = size === "lg" ? "h-8 w-8" : "h-5 w-5"
  return (
    <svg viewBox="0 0 24 24" className={`${s}`} fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill={active ? "#4285F4" : "currentColor"} className={active ? "" : "text-muted-foreground"} />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill={active ? "#34A853" : "currentColor"} className={active ? "" : "text-muted-foreground"} />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill={active ? "#FBBC05" : "currentColor"} className={active ? "" : "text-muted-foreground"} />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill={active ? "#EA4335" : "currentColor"} className={active ? "" : "text-muted-foreground"} />
    </svg>
  )
}
