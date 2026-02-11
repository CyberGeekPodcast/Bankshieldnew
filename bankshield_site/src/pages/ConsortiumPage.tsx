export function ConsortiumPage() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Research Roadmap</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Future research initiatives in financial fraud prevention - planned for after we establish our core compliance product
          </p>
        </div>

        {/* Research Vision */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Long-term Vision</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔬</span>
                </div>
                <h3 className="font-semibold mb-2">Collaborative Research</h3>
                <p className="text-gray-600">Joint research initiatives on emerging fraud patterns and prevention techniques</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-semibold mb-2">Anonymized Intelligence</h3>
                <p className="text-gray-600">Privacy-preserving threat intelligence sharing across participating institutions</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="font-semibold mb-2">Industry Standards</h3>
                <p className="text-gray-600">Development of industry-wide fraud prevention standards and best practices</p>
              </div>
            </div>
          </div>
        </section>

        {/* Research Areas */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Planned Research Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  🤖
                </span>
                AI Fraud Detection
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Federated learning for fraud detection</li>
                <li>• Behavioral analytics research</li>
                <li>• Cross-institutional pattern recognition</li>
                <li>• Privacy-preserving ML techniques</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  📱
                </span>
                Digital Identity
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Decentralized identity frameworks</li>
                <li>• Zero-knowledge proof applications</li>
                <li>• Biometric authentication research</li>
                <li>• Identity verification standards</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  🔐
                </span>
                Quantum Security
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Post-quantum cryptography</li>
                <li>• Quantum-resistant protocols</li>
                <li>• Future-proofing financial systems</li>
                <li>• Quantum threat assessment</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                  📋
                </span>
                Regulatory Technology
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Automated compliance monitoring</li>
                <li>• RegTech standardization</li>
                <li>• Cross-border compliance frameworks</li>
                <li>• Real-time regulatory reporting</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-gray-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Development Timeline</h2>
          <p className="text-gray-600 mb-6">
            These research initiatives are planned for development after we establish BankShield Compliance Copilot as our core product. 
            Expected timeline: Q4 2024 - Q1 2025.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Express Interest in Research
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Download Research Proposal
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
