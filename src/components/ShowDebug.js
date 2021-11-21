import React from 'react';

export default ({ children }) => {
  const isDevelopment = () => process.env.NODE_ENV === 'development';

  if (!isDevelopment()) return <></>;
  return (
    <div style={{ backgroundColor: 'gold' }}>
      <pre>{children}</pre>
    </div>
  );
};
