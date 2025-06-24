"use client";
import { Button } from "@/components/ui";
import { useState } from "react";

// Mock data - replace with actual data fetching
const mockRepositories = [
  {
    id: "1",
    name: "my-project",
    owner: "johndoe",
    description: "Main project repository",
    lastCommit: "2024-03-20 15:30",
  },
  {
    id: "2",
    name: "side-project",
    owner: "johndoe",
    description: "Personal side project",
    lastCommit: "2024-03-19 10:15",
  },
];

export default function GenerateReportPage() {
  // Form state
  const [selectedRepo, setSelectedRepo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportTitle, setReportTitle] = useState("");
  const [analysisFocus, setAnalysisFocus] = useState("General overview");
  const [reportOptions, setReportOptions] = useState({
    includeCommits: true,
    includeStats: true,
    includeAnalysis: true,
    includeFileChanges: true,
  });

  // Handle quick select period
  const handleQuickSelect = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);

    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
  };

  // Handle report options change
  const handleOptionChange = (option: keyof typeof reportOptions) => {
    setReportOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">Generate Report</h1>
        </div>
      </div>

      {/* Generate Report Form */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            {/* Repository Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Repository
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={selectedRepo}
                onChange={(e) => setSelectedRepo(e.target.value)}
              >
                <option value="">Choose a repository</option>
                {mockRepositories.map((repo) => (
                  <option key={repo.id} value={repo.id}>
                    {repo.name} - {repo.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Period
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Quick Select Period */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Select
              </label>
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleQuickSelect(7)}
                >
                  Last 7 days
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleQuickSelect(14)}
                >
                  Last 14 days
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleQuickSelect(30)}
                >
                  Last 30 days
                </Button>
              </div>
            </div>

            {/* Report Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Options
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={reportOptions.includeCommits}
                    onChange={() => handleOptionChange("includeCommits")}
                  />
                  Include commit messages
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={reportOptions.includeStats}
                    onChange={() => handleOptionChange("includeStats")}
                  />
                  Include code statistics
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={reportOptions.includeAnalysis}
                    onChange={() => handleOptionChange("includeAnalysis")}
                  />
                  Include AI analysis
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={reportOptions.includeFileChanges}
                    onChange={() => handleOptionChange("includeFileChanges")}
                  />
                  Include file changes
                </label>
              </div>
            </div>

            {/* AI Analysis Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AI Analysis Focus
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={analysisFocus}
                onChange={(e) => setAnalysisFocus(e.target.value)}
              >
                <option>General overview</option>
                <option>Code quality analysis</option>
                <option>Feature implementation review</option>
                <option>Performance improvements</option>
                <option>Security review</option>
              </select>
            </div>

            {/* Report Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Title
              </label>
              <input
                type="text"
                placeholder="Enter a title for your report"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
              />
            </div>

            {/* Generate Button */}
            <div className="pt-4">
              <Button variant="primary" fullWidth>
                Generate Report
              </Button>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              The report generation process may take a few minutes depending on
              the repository size and selected options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
