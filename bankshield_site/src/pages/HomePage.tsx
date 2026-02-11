import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function HomePage() {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-3xl">B</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
              AI Compliance Copilot
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                for Lending Operations
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              <span className="font-semibold text-cyan-300">BankShield</span> reads loan documents, KYC files, and property papers. 
              Maps them to RBI/NBFC policy checklists. Produces audit-ready evidence with approval workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105">
                <span className="flex items-center justify-center space-x-2">
                  <span>Request Demo</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
              <button className="group border-2 border-cyan-400 text-cyan-300 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 backdrop-blur-sm">
                <span className="flex items-center justify-center space-x-2">
                  <span>Design Partner Program</span>
                  <span className="group-hover:translate-y-[-2px] transition-transform">↓</span>
                </span>
              </button>
            </div>
            <div className="flex justify-center space-x-8 text-sm text-blue-200">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span>RBI-Aligned</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>Audit-Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-xl">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">📄</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Document Intelligence</h3>
              <p className="text-gray-600 leading-relaxed">Extract and validate data from loan applications, KYC documents, and property papers using advanced OCR and NLP</p>
            </div>
            <div className="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 transition-all duration-300 hover:shadow-xl">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Policy Mapping</h3>
              <p className="text-gray-600 leading-relaxed">Automatically map extracted data to RBI guidelines, NBFC policies, and internal compliance checklists</p>
            </div>
            <div className="group text-center p-8 rounded-2xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-xl">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Audit Evidence</h3>
              <p className="text-gray-600 leading-relaxed">Generate immutable audit trails with approval workflows and compliance evidence packages</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pilot Results */}
      <section className="py-20 bg-gradient-to-r from-slate-100 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Early Pilot Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">150+</div>
              <div className="text-gray-600 font-medium">Sample Cases Processed</div>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mt-3"></div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">~60%</div>
              <div className="text-gray-600 font-medium">Target Review Time Reduction</div>
              <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mt-3"></div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">23</div>
              <div className="text-gray-600 font-medium">Compliance Gaps Found</div>
              <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mx-auto mt-3"></div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">3</div>
              <div className="text-gray-600 font-medium">Design Partners (Pilot)</div>
              <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mt-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Framework Alignment */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-center mb-12 text-gray-700">Aligned with Key Regulatory Frameworks</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            <div className="group text-center">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-20 rounded-2xl flex items-center justify-center group-hover:from-red-50 group-hover:to-red-100 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <span className="font-bold text-gray-700 text-lg group-hover:text-red-600">RBI Guidelines</span>
              </div>
            </div>
            <div className="group text-center">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-20 rounded-2xl flex items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <span className="font-bold text-gray-700 text-lg group-hover:text-blue-600">NBFC Norms</span>
              </div>
            </div>
            <div className="group text-center">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-20 rounded-2xl flex items-center justify-center group-hover:from-green-50 group-hover:to-green-100 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <span className="font-bold text-gray-700 text-lg group-hover:text-green-600">DPDP Act</span>
              </div>
            </div>
            <div className="group text-center">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-20 rounded-2xl flex items-center justify-center group-hover:from-purple-50 group-hover:to-purple-100 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <span className="font-bold text-gray-700 text-lg group-hover:text-purple-600">CERT-In</span>
              </div>
            </div>
            <div className="group text-center">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-20 rounded-2xl flex items-center justify-center group-hover:from-orange-50 group-hover:to-orange-100 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <span className="font-bold text-gray-700 text-lg group-hover:text-orange-600">KYC Standards</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
