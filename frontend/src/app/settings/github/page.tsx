import { Button } from "@/components/ui";

// Mock data - replace with actual data fetching
const mockRepositories = [
  {
    id: "1",
    name: "my-project",
    owner: "johndoe",
    description: "Main project repository",
    lastSync: "2024-03-20 15:30",
    isConnected: true,
  },
  {
    id: "2",
    name: "side-project",
    owner: "johndoe",
    description: "Personal side project",
    lastSync: "2024-03-19 10:15",
    isConnected: false,
  },
];

export default function GitHubSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">GitHub Settings</h1>
        </div>
      </div>

      {/* Settings Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Authentication Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Authentication</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">GitHub Connection</p>
                  <p className="text-sm text-gray-500">
                    Connect your GitHub account to generate reports
                  </p>
                </div>
                <Button variant="primary">Connect GitHub</Button>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500">
                  Connected as: <span className="font-medium">johndoe</span>
                </p>
              </div>
            </div>
          </div>

          {/* Repository Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Connected Repositories</h2>
              <Button variant="secondary">Add Repository</Button>
            </div>

            <div className="space-y-4">
              {mockRepositories.map((repo) => (
                <div
                  key={repo.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{repo.name}</h3>
                      <p className="text-sm text-gray-500">
                        {repo.description}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Last synced: {repo.lastSync}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          repo.isConnected
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {repo.isConnected ? "Connected" : "Not Connected"}
                      </span>
                      <Button
                        variant={repo.isConnected ? "secondary" : "primary"}
                        size="sm"
                      >
                        {repo.isConnected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Report Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Report Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Report Period
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Last 7 days</option>
                  <option>Last 14 days</option>
                  <option>Last 30 days</option>
                  <option>Custom range</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Format
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked />
                    Include commit messages
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked />
                    Include code statistics
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked />
                    Include AI analysis
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button variant="primary">Save Settings</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
