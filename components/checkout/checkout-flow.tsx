"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShippingForm } from "./shipping-form"
import { PaymentForm } from "./payment-form"
import { OrderSummary } from "./order-summary"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lock,
  ShoppingBag,
  Truck,
  CreditCard,
  CircleCheckBig,
  Home,
} from "lucide-react"
import Link from "next/link"

const STEPS = [
  { id: 0, label: "Cart", icon: ShoppingBag },
  { id: 1, label: "Shipping", icon: Truck },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Confirm", icon: CircleCheckBig },
]

export function CheckoutFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleNext = () => {
    if (currentStep === 2) {
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setCurrentStep(3)
      }, 2000)
    } else if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground transition hover:bg-secondary/80"
              aria-label="Back to Home"
            >
              <Home className="h-4 w-4" />
            </Link>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-foreground">STEPUP ACADEMY</span>
          </div>

          {/* Step Indicator */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Checkout steps">
            {STEPS.map((step, idx) => {
              const Icon = step.icon
              const isActive = idx === currentStep
              const isComplete = idx < currentStep
              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => idx < currentStep && setCurrentStep(idx)}
                    disabled={idx >= currentStep}
                    className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : isComplete
                        ? "bg-secondary text-foreground cursor-pointer hover:bg-secondary/80"
                        : "text-muted-foreground cursor-default"
                    }`}
                  >
                    {isComplete ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Icon className="h-3.5 w-3.5" />
                    )}
                    {step.label}
                  </button>
                  {idx < STEPS.length - 1 && (
                    <div className={`mx-1 h-px w-8 ${idx < currentStep ? "bg-accent" : "bg-border"}`} />
                  )}
                </div>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            <span className="text-xs">Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Mobile Step Indicator */}
      <div className="md:hidden border-b border-border bg-card px-4 py-3">
        <div className="flex items-center justify-between">
          {STEPS.map((step, idx) => {
            const isActive = idx === currentStep
            const isComplete = idx < currentStep
            return (
              <div key={step.id} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : isComplete
                      ? "bg-accent/20 text-accent"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {isComplete ? <Check className="h-3.5 w-3.5" /> : idx + 1}
                </div>
                <span className={`text-[10px] ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-1 w-full rounded-full bg-secondary">
          <div
            className="h-1 rounded-full bg-accent transition-all duration-500"
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
        {currentStep === 3 ? (
          <SuccessScreen />
        ) : (
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
            {/* Left - Forms */}
            <div className="lg:col-span-3">
              <div className="flex flex-col gap-8">
                {currentStep === 0 && (
                  <div className="rounded-xl border border-border bg-card p-6">
                    <OrderSummary />
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="rounded-xl border border-border bg-card p-6">
                    <ShippingForm />
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="rounded-xl border border-border bg-card p-6">
                    <PaymentForm />
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="text-muted-foreground hover:text-foreground hover:bg-secondary"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={isProcessing}
                    className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 font-medium"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground border-t-transparent" />
                        Processing...
                      </div>
                    ) : currentStep === 2 ? (
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Pay Now
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Right - Summary Sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="rounded-xl border border-border bg-card p-6">
                  <OrderSummary />
                </div>

                {/* Trust Badges */}
                <div className="mt-4 flex items-center justify-center gap-6 py-4">
                  {["Free Shipping", "Easy Returns", "24/7 Support"].map((badge) => (
                    <div key={badge} className="flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-accent" />
                      <span className="text-[11px] text-muted-foreground">{badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <p className="text-xs text-muted-foreground">StepUp Cricket Academy. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a key={link} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

function SuccessScreen() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 text-accent">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Check className="h-7 w-7" />
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-foreground">Payment Successful</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground leading-relaxed">
        Your order has been confirmed and will be shipped within 2-3 business days. A confirmation email has been sent.
      </p>

      <div className="mt-8 w-full max-w-md rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Order Number</span>
            <span className="font-mono font-medium text-foreground">#MRD-2026-4847</span>
          </div>
          <Separator className="bg-border" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Estimated Delivery</span>
            <span className="font-medium text-foreground">Mar 3-5, 2026</span>
          </div>
          <Separator className="bg-border" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Payment Method</span>
            <span className="font-medium text-foreground">Visa ending 4242</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
          Track Order
        </Button>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
