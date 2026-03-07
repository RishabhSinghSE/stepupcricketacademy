"use client"

interface NavBarProps {
  isAdmin: boolean
  onLogout: () => void
  onAdminToggle: () => void
  showAdmin: boolean
}

export function NavBar({ isAdmin, onLogout, onAdminToggle, showAdmin }: NavBarProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-8">
        <div className="flex items-center gap-4">
          <a
            href="#facilities"
            className="text-xs font-semibold text-gray-500 transition hover:text-[#0b6623]"
          >
            Facilities
          </a>
          <a
            href="#signup"
            className="text-xs font-semibold text-gray-500 transition hover:text-[#0b6623]"
          >
            Admission
          </a>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin ? (
            <button
              onClick={onLogout}
              className="rounded-lg bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={onAdminToggle}
              className="rounded-lg bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-200"
            >
              {showAdmin ? "Close" : "Admin"}
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
