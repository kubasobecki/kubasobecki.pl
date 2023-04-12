import React, { useEffect, useState } from "react";

export default function NoSsr({ children }: any): JSX.Element {
  const [isMounted, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return <>{isMounted ? children : null}</>;
}
