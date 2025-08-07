import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx'; // Import xlsx for Excel export

interface Application {
  _id: string;
  course: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date_applied: string;
}

const ITEMS_PER_PAGE = 12;

const ApplicationsList: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("https://admin.mediacrestcollege.com/applications/api/submit/");
        const data = await response.json();
        setApplications(data);
      } catch (err) {
        setError('Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const totalPages = Math.ceil(applications.length / ITEMS_PER_PAGE);
  const paginatedApps = applications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // ✅ Export to Excel function
  const downloadExcel = () => {
    const worksheetData = applications.map(app => ({
      "First Name": app.firstName,
      "Last Name": app.lastName,
      "Course": app.course,
      "Email": app.email,
      "Phone": app.phone,
      "Date Applied": formatDate(app.date_applied),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
    XLSX.writeFile(workbook, "applications.xlsx");
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-500 animate-pulse">Loading applications...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📋 Applications Table</h1>

      <div className="text-right mb-4">
        <button
          onClick={downloadExcel}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download as Excel
        </button>
      </div>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left border-b">First Name</th>
                  <th className="px-4 py-2 text-left border-b">Last Name</th>
                  <th className="px-4 py-2 text-left border-b">Course</th>
                  <th className="px-4 py-2 text-left border-b">Email</th>
                  <th className="px-4 py-2 text-left border-b">Phone</th>
                  <th className="px-4 py-2 text-left border-b">Date Applied</th>
                </tr>
              </thead>
              <tbody>
                {paginatedApps.map(app => (
                  <tr key={app._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{app.firstName}</td>
                    <td className="px-4 py-2 border-b">{app.lastName}</td>
                    <td className="px-4 py-2 border-b">{app.course}</td>
                    <td className="px-4 py-2 border-b">
                      <a href={`mailto:${app.email}`} className="text-blue-600 hover:underline">
                        {app.email}
                      </a>
                    </td>
                    <td className="px-4 py-2 border-b">{app.phone}</td>
                    <td className="px-4 py-2 border-b">{formatDate(app.date_applied)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-2 rounded ${
                  currentPage === i + 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicationsList;
