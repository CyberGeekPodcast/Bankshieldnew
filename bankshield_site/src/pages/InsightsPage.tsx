import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function InsightsPage() {
  const featuredPosts = useQuery(api.blog.getFeaturedPosts) || [];

  const samplePosts = [
    {
      title: "Understanding RBI's DPDP Act 2023",
      excerpt: "A comprehensive guide to India's new data protection regulations and their impact on fintech companies.",
      author: "Siddharth Adke",
      publishedAt: Date.now() - 86400000,
      tags: ["Regulation", "DPDP", "Compliance"]
    },
    {
      title: "How AI Detects Fraud in Real Time",
      excerpt: "Deep dive into machine learning algorithms that power modern fraud detection systems in Indian banking.",
      author: "BankShield Team",
      publishedAt: Date.now() - 172800000,
      tags: ["AI", "Fraud Detection", "Technology"]
    },
    {
      title: "India's UPI Security: The Next Frontier",
      excerpt: "Exploring the security challenges and opportunities in India's rapidly growing UPI ecosystem.",
      author: "Security Research Team",
      publishedAt: Date.now() - 259200000,
      tags: ["UPI", "Security", "Payments"]
    }
  ];

  const postsToShow = featuredPosts.length > 0 ? featuredPosts : samplePosts;

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Insights & Research</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about the latest trends, regulations, and innovations in Indian fintech security
          </p>
        </div>

        {/* Featured Articles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsToShow.map((post, index) => (
              <article key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100"></div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(post.tags || []).map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Research Topics */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Research Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">🔍 Fraud Detection Research</h3>
              <p className="text-gray-600 mb-4">
                Advanced research in behavioral analytics, pattern recognition, and machine learning for financial fraud prevention.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Behavioral biometrics analysis</li>
                <li>• Graph neural networks for transaction analysis</li>
                <li>• Federated learning for privacy-preserving detection</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">📊 Regulatory Technology</h3>
              <p className="text-gray-600 mb-4">
                Exploring how technology can streamline compliance and regulatory reporting in the Indian financial sector.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Automated compliance monitoring</li>
                <li>• RegTech solutions for Indian banks</li>
                <li>• DPDP Act implementation strategies</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">🌐 Digital Identity</h3>
              <p className="text-gray-600 mb-4">
                Research into secure, privacy-preserving digital identity solutions for India's digital economy.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Decentralized identity frameworks</li>
                <li>• Zero-knowledge proof implementations</li>
                <li>• Aadhaar-compatible privacy solutions</li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">🚀 Emerging Threats</h3>
              <p className="text-gray-600 mb-4">
                Identifying and analyzing new cybersecurity threats in India's rapidly evolving fintech landscape.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• AI-powered social engineering attacks</li>
                <li>• Quantum computing threat assessment</li>
                <li>• Mobile banking security challenges</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-gray-900 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-6">
            Subscribe to our newsletter for the latest insights on fintech security and regulatory updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
