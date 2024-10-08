import { useEffect, useState } from "react";

const NoSSRComponent = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return children;
};

export default NoSSRComponent;
