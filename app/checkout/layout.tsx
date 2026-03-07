import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout - Secure Payment | StepUp Cricket Academy",
  description: "Complete your fee payment securely.",
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
