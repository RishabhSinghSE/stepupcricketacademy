"use client"

import { useState } from "react"

export function SignupForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const form = e.currentTarget
    const formData = new FormData(form)

    const reg = "SCA-" + Date.now().toString().slice(-6)
    const data = {
      reg,
      name: formData.get("playerName") as string,
      age: formData.get("age") as string,
      parent: formData.get("parentName") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      timing: formData.get("timing") as string,
      date: new Date().toLocaleString("en-IN"),
    }

    try {
      const existing = JSON.parse(localStorage.getItem("players") || "[]")
      existing.push(data)
      localStorage.setItem("players", JSON.stringify(existing))
    } catch {
      // silently handle
    }

    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setSubmitted(true)
    form.reset()
    setTimeout(() => setSubmitted(false), 5000)
  }

  const inputClasses =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0b6623] focus:bg-white focus:ring-2 focus:ring-[#0b6623]/10"

  return (
    <section id="signup" className="bg-[#f0fdf4] px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-xl">
        {/* Section Header */}
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0b6623]">Join Us</p>
          <h2 className="mt-2 text-balance text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Player Admission Form
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            Fill out the form below to register. We will confirm your admission shortly.
          </p>
        </div>

        {/* Form Card */}
        <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-black/[0.03] sm:p-8">
          {submitted && (
            <div className="mb-5 rounded-xl bg-[#0b6623]/10 px-4 py-3 text-sm font-medium text-[#0b6623]">
              Admission Successful! You will receive confirmation shortly.
            </div>
          )}

          {error && (
            <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <input name="playerName" placeholder="Player Name" required className={inputClasses} />
            <div className="grid grid-cols-2 gap-3.5">
              <input name="age" placeholder="Age" type="number" required min={5} max={18} className={inputClasses} />
              <select name="timing" required className={inputClasses} defaultValue="">
                <option value="" disabled>Select Timing</option>
                <option value="9 AM - 12 PM">9 AM - 12 PM</option>
                <option value="4 PM - 7 PM">4 PM - 7 PM</option>
                <option value="7 PM - 10 PM">7 PM - 10 PM</option>
                <option value="9 AM - 12 PM and 4 PM - 7 PM BOTH">Both Sessions</option>
              </select>
            </div>
            <input name="parentName" placeholder="Parent / Guardian Name" required className={inputClasses} />
            <input name="phone" placeholder="Phone Number" type="tel" required className={inputClasses} />
            <input name="address" placeholder="Full Address" required className={inputClasses} />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-xl bg-[#0b6623] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#094d1a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit Admission"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
