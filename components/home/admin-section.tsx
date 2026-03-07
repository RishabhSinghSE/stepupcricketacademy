"use client"

import { useState, useEffect } from "react"

interface AdminSectionProps {
  showLogin: boolean
  isAdmin: boolean
  onLogin: () => void
}

interface Player {
  reg: string
  name: string
  age: string
  parent: string
  phone: string
  timing: string
  date: string
}

export function AdminSection({ showLogin, isAdmin, onLogin }: AdminSectionProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [players, setPlayers] = useState<Player[]>([])

  useEffect(() => {
    if (isAdmin) {
      try {
        const stored = JSON.parse(localStorage.getItem("players") || "[]")
        setPlayers(stored)
      } catch {
        setPlayers([])
      }
    }
  }, [isAdmin])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === "admin@stepup.com" && password === "admin123") {
      onLogin()
      setLoginError("")
    } else {
      setLoginError("Invalid email or password.")
    }
  }

  if (!showLogin && !isAdmin) return null

  const inputClasses =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0b6623] focus:bg-white focus:ring-2 focus:ring-[#0b6623]/10"

  return (
    <section id="admin" className="bg-white px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Admin Login */}
        {showLogin && !isAdmin && (
          <div className="mx-auto max-w-sm">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0b6623]">Restricted</p>
              <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">Admin Login</h2>
            </div>

            <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50/50 p-6 shadow-lg shadow-black/[0.03] sm:p-8">
              {loginError && (
                <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {loginError}
                </div>
              )}
              <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
                <input
                  type="email"
                  placeholder="Admin Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputClasses}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={inputClasses}
                />
                <button
                  type="submit"
                  className="mt-1 w-full rounded-xl bg-[#0b6623] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#094d1a]"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Admin Dashboard */}
        {isAdmin && (
          <div>
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0b6623]">Dashboard</p>
              <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">Registered Players</h2>
              <p className="mt-2 text-sm text-gray-500">
                {players.length} {players.length === 1 ? "player" : "players"} registered
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100 shadow-lg shadow-black/[0.03]">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#0b6623] text-white">
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Reg No</th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Name</th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Age</th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Parent</th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Phone</th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Timing</th>
                      <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {players.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                          No registrations yet.
                        </td>
                      </tr>
                    ) : (
                      players.map((p, i) => (
                        <tr key={i} className="border-t border-gray-100 transition hover:bg-gray-50">
                          <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-500">{p.reg}</td>
                          <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">{p.name}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-600">{p.age}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-600">{p.parent}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-600">{p.phone}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-gray-600">{p.timing}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-xs text-gray-400">{p.date}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
