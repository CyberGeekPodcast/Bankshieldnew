export function SolutionsPage() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Built for NBFC Risk & Compliance Teams</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Streamline your lending operations with AI-powered document processing and compliance automation
          </p>
        </div>

        <div className="space-y-16">
          {/* Core Workflow */}
          <section>
            <div className="bg-blue-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">🔄</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">How BankShield Works</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Transform your manual compliance process into an automated, audit-ready workflow
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">📤</span>
                    <h3 className="font-semibold">1. Upload Documents</h3>
                  </div>
                  <p className="text-gray-600">Upload loan applications, KYC documents, property papers, and income proofs in any format</p>
                </div>
                <div className="bg-white p-6 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">🤖</span>
                    <h3 className="font-semibold">2. AI Processing</h3>
                  </div>
                  <p className="text-gray-600">AI extracts key data points and maps them to RBI/NBFC compliance requirements automatically</p>
                </div>
                <div className="bg-white p-6 rounded-lg border-l-4 border-purple-500">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">📋</span>
                    <h3 className="font-semibold">3. Audit Package</h3>
                  </div>
                  <p className="text-gray-600">Get compliance reports, risk assessments, and audit-ready evidence with approval workflows</p>
                </div>
              </div>
            </div>
          </section>

          {/* Key Benefits */}
          <section>
            <div className="bg-green-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Key Benefits for Risk Teams</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <span className="text-green-600 mr-2">⏱️</span>
                    Faster Processing
                  </h3>
                  <p className="text-gray-600">Reduce document review time from hours to minutes with automated data extraction and validation</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <span className="text-blue-600 mr-2">🎯</span>
                    Better Accuracy
                  </h3>
                  <p className="text-gray-600">Eliminate manual errors with AI-powered cross-verification against policy requirements</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <span className="text-purple-600 mr-2">🛡️</span>
                    Audit Readiness
                  </h3>
                  <p className="text-gray-600">Maintain complete audit trails with immutable logs and compliance evidence packages</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <span className="text-orange-600 mr-2">📈</span>
                    Scalable Operations
                  </h3>
                  <p className="text-gray-600">Handle increasing loan volumes without proportional increase in compliance staff</p>
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section>
            <div className="bg-purple-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">💼</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Primary Use Cases</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Personal Loan Processing</h3>
                  <p className="text-gray-600">Automate KYC verification, income assessment, and credit policy compliance for personal loans</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Home Loan Documentation</h3>
                  <p className="text-gray-600">Process property papers, legal documents, and valuation reports with regulatory compliance checks</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Business Loan Assessment</h3>
                  <p className="text-gray-600">Analyze financial statements, GST returns, and business documents against NBFC lending norms</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Regulatory Reporting</h3>
                  <p className="text-gray-600">Generate automated compliance reports for RBI submissions and internal audit requirements</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
