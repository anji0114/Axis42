import Link from "next/link";
import { Button } from "@/components/ui";

// Mock data - replace with actual data fetching
const mockReport = {
  id: "1",
  title: "Weekly Development Report",
  repository: "my-project",
  createdAt: "2024-03-20",
  status: "completed",
  summary: "Implemented user authentication and dashboard features",
  details: {
    commits: [
      {
        hash: "a1b2c3d",
        message: "Add user authentication",
        date: "2024-03-19",
        author: "John Doe",
      },
      {
        hash: "e4f5g6h",
        message: "Implement dashboard layout",
        date: "2024-03-18",
        author: "John Doe",
      },
    ],
    changes: {
      filesChanged: 15,
      insertions: 450,
      deletions: 120,
    },
    analysis: {
      mainFeatures: [
        "User authentication system",
        "Dashboard UI components",
        "API integration",
      ],
      improvements: [
        "Enhanced security measures",
        "Improved user experience",
        "Better error handling",
      ],
      nextSteps: [
        "Implement user profile management",
        "Add data visualization components",
        "Optimize API calls",
      ],
    },
  },
};

export default function ReportDetailPage({}: { params: { id: string } }) {
  // In a real app, fetch the report data using the ID from params
  const report = mockReport;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link
                href="/reports"
                className="text-gray-500 hover:text-gray-700"
              >
                ← Back to Reports
              </Link>
              <h1 className="text-2xl font-bold">{report.title}</h1>
            </div>
            <Button href="/generate" variant="primary">
              Generate New Report
            </Button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Repository</p>
                  <p className="font-medium">{report.repository}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="font-medium">{report.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {report.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Summary</p>
                  <p className="font-medium">{report.summary}</p>
                </div>
              </div>
            </div>

            {/* Commits */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Commits</h2>
              <div className="space-y-4">
                {report.details.commits.map((commit) => (
                  <div
                    key={commit.hash}
                    className="border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{commit.message}</p>
                        <p className="text-sm text-gray-500">
                          {commit.author} • {commit.date}
                        </p>
                      </div>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {commit.hash}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analysis */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Analysis</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Main Features</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {report.details.analysis.mainFeatures.map(
                      (feature, index) => (
                        <li key={index}>{feature}</li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Improvements</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {report.details.analysis.improvements.map(
                      (improvement, index) => (
                        <li key={index}>{improvement}</li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Next Steps</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {report.details.analysis.nextSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Changes Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Changes</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Files Changed</p>
                  <p className="text-2xl font-semibold">
                    {report.details.changes.filesChanged}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Insertions</p>
                  <p className="text-2xl font-semibold text-green-600">
                    +{report.details.changes.insertions}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Deletions</p>
                  <p className="text-2xl font-semibold text-red-600">
                    -{report.details.changes.deletions}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
