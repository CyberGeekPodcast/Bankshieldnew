export function CompliancePage() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Regulatory Compliance</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built to meet and exceed India's financial regulatory requirements
          </p>
        </div>

        {/* Compliance Flow */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Compliance Framework</h2>
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🏛️</span>
                </div>
                <div className="font-semibold">RBI Guidelines</div>
                <div className="text-sm text-gray-600">Reserve Bank of India</div>
              </div>
              <div className="text-2xl text-gray-400">→</div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">💳</span>
                </div>
                <div className="font-semibold">NPCI Standards</div>
                <div className="text-sm text-gray-600">National Payments Corporation</div>
              </div>
              <div className="text-2xl text-gray-400">→</div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🔒</span>
                </div>
                <div className="font-semibold">CERT-In</div>
                <div className="text-sm text-gray-600">Cyber Security</div>
              </div>
              <div className="text-2xl text-gray-400">→</div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">📋</span>
                </div>
                <div className="font-semibold">DPDP Act</div>
                <div className="text-sm text-gray-600">Data Protection</div>
              </div>
              <div className="text-2xl text-gray-400">→</div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-xl font-bold">B</span>
                </div>
                <div className="font-semibold">BankShield</div>
                <div className="text-sm text-gray-600">Unified Compliance</div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Compliance Areas */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Key Compliance Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  🏠
                </span>
                Data Localization
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• All data stored within Indian borders</li>
                <li>• Compliance with RBI data localization norms</li>
                <li>• Secure data centers with 99.9% uptime</li>
                <li>• Regular compliance audits and certifications</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  📝
                </span>
                Consent Management
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• DPDP Act 2023 compliant consent logs</li>
                <li>• Granular consent management system</li>
                <li>• User-friendly consent withdrawal process</li>
                <li>• Automated consent expiry handling</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  🔐
                </span>
                Encryption Standards
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• AES-256 encryption for data at rest</li>
                <li>• TLS 1.3 for data in transit</li>
                <li>• Hardware Security Module (HSM) integration</li>
                <li>• Regular key rotation and management</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                  📊
                </span>
                Audit Trail
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Comprehensive transaction logging</li>
                <li>• Immutable audit records</li>
                <li>• Real-time compliance monitoring</li>
                <li>• Automated regulatory reporting</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="text-center bg-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Detailed Compliance Documentation</h2>
          <p className="text-gray-600 mb-6">
            Download our comprehensive compliance summary covering all regulatory requirements and implementation details.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Download Compliance Summary PDF
          </button>
        </section>
      </div>
    </div>
  );
}
