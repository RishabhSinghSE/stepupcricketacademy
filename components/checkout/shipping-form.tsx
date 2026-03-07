"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MapPin } from "lucide-react"

export function ShippingForm() {
  const [sameAsBilling, setSameAsBilling] = useState(true)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <MapPin className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">Shipping Information</h3>
          <p className="text-xs text-muted-foreground">Where should we deliver your order?</p>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="firstName" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">First Name</Label>
            <Input id="firstName" placeholder="Jane" className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lastName" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Last Name</Label>
            <Input id="lastName" placeholder="Doe" className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</Label>
          <Input id="email" type="email" placeholder="jane@example.com" className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50" />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="address" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Street Address</Label>
          <Input id="address" placeholder="123 Innovation Drive" className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50" />
        </div>

        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-3 flex flex-col gap-1.5">
            <Label htmlFor="city" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">City</Label>
            <Input id="city" placeholder="San Francisco" className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50" />
          </div>
          <div className="col-span-1 flex flex-col gap-1.5">
            <Label htmlFor="state" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">State</Label>
            <Select>
              <SelectTrigger id="state" className="w-full bg-secondary/50 border-border text-foreground">
                <SelectValue placeholder="CA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CA">CA</SelectItem>
                <SelectItem value="NY">NY</SelectItem>
                <SelectItem value="TX">TX</SelectItem>
                <SelectItem value="WA">WA</SelectItem>
                <SelectItem value="FL">FL</SelectItem>
                <SelectItem value="IL">IL</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2 flex flex-col gap-1.5">
            <Label htmlFor="zip" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">ZIP</Label>
            <Input id="zip" placeholder="94102" className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50 font-mono" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Phone (Optional)</Label>
          <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50" />
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer group">
          <div
            role="checkbox"
            aria-checked={sameAsBilling}
            tabIndex={0}
            onClick={() => setSameAsBilling(!sameAsBilling)}
            onKeyDown={(e) => e.key === " " && setSameAsBilling(!sameAsBilling)}
            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
              sameAsBilling
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-secondary/50"
            }`}
          >
            {sameAsBilling && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="text-accent-foreground">
                <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            Billing address same as shipping
          </span>
        </label>
      </div>
    </div>
  )
}
