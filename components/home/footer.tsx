import Link from "next/link"
import { MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#062e12] px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center gap-2.5 sm:justify-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <span className="text-sm font-black text-white">S</span>
              </div>
              <span className="text-sm font-bold tracking-wide text-white">STEPUP ACADEMY</span>
            </div>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-white/50">
              Professional under-15 cricket coaching in Gohri, Phaphamau, Prayagraj.
            </p>
            <p className="mt-2 font-mono text-xs font-semibold text-green-300/80">stepupcricket.in</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center gap-3 sm:items-end">
            <a
              href="https://maps.app.goo.gl/iiufA7aNjASLAXq79"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-white/60 transition hover:text-white"
            >
              <MapPin className="h-3.5 w-3.5" />
              Gohri, Phaphamau, Prayagraj
            </a>
            <Link href="/checkout" className="inline-flex items-center gap-2 text-xs text-white/60 transition hover:text-white">
              <Phone className="h-3.5 w-3.5" />
              Pay Fees Online
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/30">
            &copy; 2026 StepUp Cricket Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
