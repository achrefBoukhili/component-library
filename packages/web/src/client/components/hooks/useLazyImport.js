import React, { useState, useEffect } from 'react';

const useLazyImport = (importComponent) => {
  const [isLoading, setIsLoading] = useState(false);
  const [Module, setModule] = useState(() => <></>);
  useEffect(() => {
    const fetchComponent = async () => {
      setIsLoading(true);
      const { default: component } = await importComponent();
      if (component) {
        setIsLoading(false);
        setModule(Component);
      }
    };
    fetchComponent();
  }, []);
  return isLoading ? (<div>Loading ...</div>) : <Module />;
};

export default useLazyImport;
