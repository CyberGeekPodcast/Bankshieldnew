export function PricingPage() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple B2B Pricing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start with our Design Partner Program or scale with per-analyst pricing for NBFC teams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Design Partner Plan */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Limited Seats Available
              </span>
            </div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Design Partner Program</h2>
              <div className="text-4xl font-bold text-blue-600 mb-2">₹5,000</div>
              <div className="text-gray-600">per analyst/month</div>
              <div className="text-sm text-blue-600 font-medium mt-2">3-month commitment</div>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs">✓</span>
                </span>
                <span>Full BankShield Copilot access</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs">✓</span>
                </span>
                <span>Weekly feedback sessions</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs">✓</span>
                </span>
                <span>Custom policy mapping</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs">✓</span>
                </span>
                <span>Priority support & training</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs">✓</span>
                </span>
                <span>Influence product roadmap</span>
              </li>
            </ul>
            
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Apply for Design Partner Program
            </button>
          </div>

          {/* Standard Plan */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Standard Plan</h2>
              <div className="text-4xl font-bold text-gray-900 mb-2">₹15,000</div>
              <div className="text-gray-600">per analyst/month</div>
              <div className="text-sm text-gray-500 mt-2">Available Q2 2024</div>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <span className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs">✓</span>
                </span>
                <span>Full BankShield Copilot access</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs">✓</span>
                </span>
                <span>Standard support</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs">✓</span>
                </span>
                <span>Pre-built policy templates</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs">✓</span>
                </span>
                <span>API access</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-xs">✓</span>
                </span>
                <span>Monthly usage reports</span>
              </li>
            </ul>
            
            <button className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed">
              Coming Soon
            </button>
          </div>
        </div>

        {/* Enterprise Section */}
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Enterprise (10+ Analysts)</h2>
            <p className="text-gray-600 mb-6">
              Custom pricing for larger NBFC teams with volume discounts, dedicated support, and custom integrations.
            </p>
            <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Contact for Enterprise Pricing
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">What's included in the Design Partner Program?</h3>
              <p className="text-gray-600">Full access to BankShield Copilot, weekly feedback sessions, custom policy mapping for your organization, and direct influence on our product roadmap.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">How many cases can I process per month?</h3>
              <p className="text-gray-600">Design Partners get unlimited case processing during the pilot period. Standard plan will include tiered usage limits.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">What about data security and compliance?</h3>
              <p className="text-gray-600">All data is processed within India, encrypted at rest and in transit, with full audit trails. We're designed to align with RBI and DPDP Act requirements.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Do you support integrations?</h3>
              <p className="text-gray-600">Yes, we provide APIs for integration with existing loan management systems and can build custom connectors for enterprise clients.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
