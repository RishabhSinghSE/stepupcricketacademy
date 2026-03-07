"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tag, Minus, Plus, X, Check } from "lucide-react"

const PRODUCTS = [
  {
    id: 1,
    name: "Monthly Training Fee",
    variant: "Under-15 / Morning Batch",
    price: 2500.00,
    quantity: 1,
    image: "/images/product-training.jpg",
  },
  {
    id: 2,
    name: "English Willow Cricket Bat",
    variant: "SH / Grade A",
    price: 4500.00,
    quantity: 1,
    image: "/images/product-bat.jpg",
  },
  {
    id: 3,
    name: "Complete Cricket Kit",
    variant: "Pads + Gloves + Helmet",
    price: 3200.00,
    quantity: 1,
    image: "/images/product-kit.jpg",
  },
]

export function OrderSummary() {
  const [items, setItems] = useState(PRODUCTS)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState(false)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.15 : 0
  const shipping = 0
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + shipping + tax

  const updateQuantity = (id: number, delta: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE15") {
      setPromoApplied(true)
      setPromoError(false)
    } else {
      setPromoError(true)
      setPromoApplied(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Order Summary</h2>
        <Badge variant="secondary" className="bg-secondary text-secondary-foreground font-mono text-xs">
          {items.reduce((sum, i) => sum + i.quantity, 0)} items
        </Badge>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group flex gap-4 rounded-lg border border-border bg-secondary/50 p-3 transition-colors hover:bg-secondary"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-foreground leading-tight">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.variant}</p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
                  aria-label={`Remove ${item.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="flex h-6 w-6 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-6 text-center text-xs font-mono text-foreground">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="flex h-6 w-6 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <p className="text-sm font-semibold font-mono text-foreground">
                  {'\u20B9'}{(item.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => {
                setPromoCode(e.target.value)
                setPromoError(false)
              }}
              className="pl-9 h-9 bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground font-mono text-xs uppercase tracking-wider"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={applyPromo}
            className="h-9 px-4 border-border text-foreground hover:bg-secondary hover:text-foreground"
          >
            Apply
          </Button>
        </div>
        {promoApplied && (
          <p className="flex items-center gap-1.5 text-xs text-success">
            <Check className="h-3 w-3" />
            <span>SAVE15 applied — 15% off</span>
          </p>
        )}
        {promoError && (
          <p className="text-xs text-destructive">Invalid promo code. Try SAVE15.</p>
        )}
      </div>

      <Separator className="bg-border" />

      {/* Totals */}
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span className="font-mono">{'\u20B9'}{subtotal.toLocaleString("en-IN")}</span>
        </div>
        {promoApplied && (
          <div className="flex justify-between text-success">
            <span>Discount (15%)</span>
            <span className="font-mono">-{'\u20B9'}{discount.toLocaleString("en-IN")}</span>
          </div>
        )}
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span className="font-mono text-success">Free</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Tax</span>
          <span className="font-mono">{'\u20B9'}{tax.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
        </div>
        <Separator className="my-1 bg-border" />
        <div className="flex justify-between text-base font-semibold text-foreground">
          <span>Total</span>
          <span className="font-mono">{'\u20B9'}{total.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
        </div>
      </div>
    </div>
  )
}
