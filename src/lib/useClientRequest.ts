import { useState, useEffect } from "react";

const useClientRequest = (url: string, method = "get", body = null) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Cleanup function if needed
    return () => {
      // Cleanup code here
    };
  }, []);

  return { loading, error, data };
};

export default useClientRequest;
