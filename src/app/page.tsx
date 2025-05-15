import Link from "next/link";


export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white dark:bg-gray-900 relative">
      <header className="absolute top-4 right-6">
        <Link href="/signin" className="text-sm font-medium text-gray-500 hover:text-gray-800 tracking-wide">
          SIGNIN
        </Link>
      </header>
      <main className="text-center">
        <h1 className="text-6xl font-light text-gray-700 tracking-wide">TITIP ITCI</h1>
        <p className="mt-2 text-xs text-gray-500 tracking-widest">
          TITIP ITCI MANAGEMENT SYSTEM
        </p>
      </main>
    </div>
  )
}
