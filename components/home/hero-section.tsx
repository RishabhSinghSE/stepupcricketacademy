"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, ChevronDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cricket-hero.jpg"
          alt="StepUp Cricket Academy training ground"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#0b3d15]/75 to-[#0b3d15]/95" />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
            <span className="text-base font-black text-white">S</span>
          </div>
          <span className="text-sm font-bold tracking-wide text-white/90">STEPUP ACADEMY</span>
        </div>
        <Link
          href="/checkout"
          className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-[#0b3d15] transition hover:bg-white/90"
        >
          Pay Fees
        </Link>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-5 pb-20 pt-16 text-center sm:pb-28 sm:pt-24 lg:pt-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
          <span className="text-xs font-medium tracking-wide text-white/90">Admissions Open 2026</span>
        </div>

        <h1 className="mt-6 text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          StepUp Cricket{" "}
          <span className="text-green-300">Academy</span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
          Under-15 professional cricket coaching in Gohri, Phaphamau, Prayagraj.
          Build technique, fitness, and match temperament.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="#signup"
            className="inline-flex items-center justify-center rounded-lg bg-white px-7 py-3 text-sm font-bold text-[#0b3d15] shadow-lg shadow-black/20 transition hover:bg-green-50"
          >
            Apply for Admission
          </a>
          <a
            href="https://maps.app.goo.gl/iiufA7aNjASLAXq79"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <MapPin className="h-4 w-4" />
            View Location
          </a>
        </div>

        {/* Domain Badge */}
        <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
          <span className="text-xs font-medium text-white/50">Visit us at</span>
          <span className="font-mono text-xs font-bold text-green-300">stepupcricket.in</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-5 w-5 text-white/40" />
      </div>
    </section>
  )
}
