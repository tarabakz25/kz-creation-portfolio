import React, { useState, useEffect } from 'react';
import ScreenMigration from './ScreenMigration';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const [showMigration, setShowMigration] = useState(false);

  useEffect(() => {
    // ページ読み込み時にsessionStorageをチェック
    const shouldShowMigration = sessionStorage.getItem('showMigration') === 'true';
    if (shouldShowMigration) {
      setShowMigration(true);
    }
  }, []);

  const handleFadeOutComplete = () => {
    setShowMigration(false);
  };

  return (
    <>
      {children}
      {showMigration && (
        <ScreenMigration 
          skipFadeIn={true}
          onFadeOutComplete={handleFadeOutComplete}
        />
      )}
    </>
  );
};

export default PageWrapper;

