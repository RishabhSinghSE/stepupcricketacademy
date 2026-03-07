import Image from "next/image"
import {
  CircleCheckBig,
  Crosshair,
  Dumbbell,
  ShowerHead,
  Clapperboard,
  Swords,
  Trophy,
  Warehouse,
} from "lucide-react"

const facilities = [
  { label: "Astro Turf Ground", icon: Warehouse },
  { label: "Net Practice Area", icon: Crosshair },
  { label: "Yoga & Fitness", icon: Dumbbell },
  { label: "Clean Bathrooms", icon: ShowerHead },
  { label: "Certified Coach", icon: CircleCheckBig },
  { label: "Video Analysis", icon: Clapperboard },
  { label: "Weekly Matches", icon: Swords },
  { label: "Tournament Prep", icon: Trophy },
]

export function FacilitiesSection() {
  return (
    <section id="facilities" className="bg-white px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0b6623]">What We Offer</p>
          <h2 className="mt-2 text-balance text-3xl font-extrabold text-gray-900 sm:text-4xl">
            World-Class Facilities
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-pretty text-sm leading-relaxed text-gray-500">
            Everything a young cricketer needs to develop into a competitive player, all under one roof.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          {facilities.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/50 px-4 py-6 text-center transition hover:border-[#0b6623]/20 hover:bg-[#f0fdf4] hover:shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0b6623]/10 text-[#0b6623] transition group-hover:bg-[#0b6623] group-hover:text-white">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <span className="text-xs font-semibold text-gray-700 sm:text-sm">{item.label}</span>
              </div>
            )
          })}
        </div>

        {/* Facility Image */}
        <div className="relative mt-12 h-56 w-full overflow-hidden rounded-2xl sm:h-72 lg:h-96">
          <Image
            src="/images/cricket-facility.jpg"
            alt="StepUp Cricket Academy training facility"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
            <p className="text-xs font-bold uppercase tracking-widest text-white/80">Our Ground</p>
            <p className="mt-1 text-lg font-bold text-white sm:text-xl">Gohri, Phaphamau, Prayagraj</p>
          </div>
        </div>
      </div>
    </section>
  )
}
