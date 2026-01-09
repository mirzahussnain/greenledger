import Navbar from "../components/Navbar";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  BarChart3,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-semibold mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Live for UK Enterprises & SMEs
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
            Net Zero Compliance 🌿 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
              On Autopilot.
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop manually typing data from utility bills. Our AI instantly
            extracts energy usage, calculates carbon footprints using UK Gov
            factors, and generates audit-ready reports.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                Start Tracking Free
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link
              href="https://github.com/mirzahussnain/greenledger"
              target="_blank"
            >
              <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-full font-bold transition-all shadow-sm hover:shadow-md">
                <Github className="w-5 h-5" />
                View on GitHub
              </button>
            </Link>
          </div>

          {/* Social Proof / Tech Stack */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-center">
            <p className="text-sm text-gray-400 font-medium mb-4">
              POWERED BY MODERN TECH STACK
            </p>
            <div className="flex gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
              <span className="font-bold text-xl text-gray-600">Next.js</span>
              <span className="font-bold text-xl text-gray-600">FastAPI</span>
              <span className="font-bold text-xl text-gray-600">
                PostgreSQL
              </span>
              <span className="font-bold text-xl text-gray-600">Clerk</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        id="features"
        className="py-24 bg-gray-50 border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything you need to reach Net Zero
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              From raw data extraction to actionable insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                AI Optical Recognition
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Upload photos of utility bills. Our Tesseract-powered vision
                pipeline handles noise, shadows, and upscaling to extract kWh
                usage with high precision.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Automated Compliance
              </h3>
              <p className="text-gray-500 leading-relaxed">
                We automatically map your energy data to CO2e (Carbon Dioxide
                Equivalent) using the latest DEFRA conversion factors (0.193
                kg/kWh), ensuring accurate reporting.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Secure Multi-Tenant SaaS
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Built with Clerk Authentication and Row-Level Security. Your
                data is isolated, encrypted, and accessible only to you across
                any device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="bg-green-100 p-1.5 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-700" />
                </div>
                <span className="font-bold text-xl text-gray-900">
                  GreenLedger
                </span>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed">
                Helping UK businesses automate their carbon reporting journey
                with AI-powered tools.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link
                    href="#features"
                    className="hover:text-green-600 transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="hover:text-green-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <span className="text-gray-300 cursor-not-allowed">
                    API (Coming Soon)
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link
                    href="https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting"
                    target="_blank"
                    className="hover:text-green-600 transition-colors"
                  >
                    UK Gov Factors
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-600 transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-600 transition-colors"
                  >
                    Guide
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-600 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-600 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2026 GreenLedger. Built for the UK Market.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
