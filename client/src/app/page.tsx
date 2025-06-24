import Link from "next/link";
import { Button } from "@/components/ui";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">VULCAN ENGINE</h1>
          <div className="space-x-4">
            <Link href="/reports" className="text-gray-600 hover:text-gray-900">
              Reports
            </Link>
            <Link
              href="/generate"
              className="text-gray-600 hover:text-gray-900"
            >
              Generate
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Transform Your GitHub Activity into Insightful Reports
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Automatically generate detailed reports from your GitHub commits
            using AI. Perfect for solo developers who want to track and document
            their progress.
          </p>
          <div className="flex justify-center gap-4">
            <Button href="/generate" size="lg" variant="primary">
              Get Started
            </Button>
            <Button href="/reports" size="lg" variant="secondary">
              View Reports
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">GitHub Integration</h3>
            <p className="text-gray-600">
              Seamlessly connect your GitHub repositories and track your
              development progress.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">AI-Powered Analysis</h3>
            <p className="text-gray-600">
              Let AI analyze your commits and generate meaningful insights and
              documentation.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Detailed Reports</h3>
            <p className="text-gray-600">
              Get comprehensive reports that help you understand and communicate
              your work.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
