// hooks/useReportData.jsx
import { useState, useEffect } from 'react';
import { fetchReports } from '../services/ReportsService.js';

export const useReportData = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReports = async () => {
      try {
        const data = await fetchReports();
        setReports(data);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      } finally {
        setLoading(false);
      }
    };
    getReports();
  }, []);

  return { reports, loading };
};