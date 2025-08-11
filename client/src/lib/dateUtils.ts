/**
 * Date formatting utilities
 */

/**
 * Formats an ISO date string to YYYY/MM/DD format
 * @param dateString - ISO date string (e.g., "2025-08-02T00:23:03.707Z")
 * @returns Formatted date string (e.g., "2025/8/2")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return dateString; // Return original string if invalid date
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();

  return `${year}/${month}/${day}`;
}

/**
 * Formats an ISO date string to YYYY/MM/DD format with zero-padding
 * @param dateString - ISO date string (e.g., "2025-08-02T00:23:03.707Z")
 * @returns Formatted date string (e.g., "2025/08/02")
 */
export function formatDatePadded(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return dateString; // Return original string if invalid date
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}

/**
 * Formats an ISO date string to a relative time format
 * @param dateString - ISO date string
 * @returns Relative time string (e.g., "2 days ago", "3 hours ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  if (isNaN(date.getTime())) {
    return dateString;
  }

  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `${diffInDays}日前`;
  } else if (diffInHours > 0) {
    return `${diffInHours}時間前`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}分前`;
  } else {
    return "たった今";
  }
}

/**
 * Formats an ISO date string to a human-readable format
 * @param dateString - ISO date string
 * @returns Human-readable date string (e.g., "Aug 2, 2025")
 */
export function formatDateHuman(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
