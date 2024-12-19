
import { SaveStatus } from "./components/common";
import { Spinner } from "./components/common/spinner/spinner";
import { CardList, ImageViewer } from "./components/documents";
import { useApp } from "./hooks/useApp";

const App = () => {
  const {
    documents,
    loadingImages,
    isSaving,
    lastSaveTime,
    hasChanges,
    timeSinceLastSave,
    updateDocuments,
    handleImageLoad,
    handleCardClick,
    isOpen,
    setIsOpen,
    selectedDoc,
    isLoading,
    isError,
  } = useApp();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {isError}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <SaveStatus
          isSaving={isSaving}
          hasChanges={hasChanges}
          lastSaveTime={lastSaveTime}
          timeSinceLastSave={timeSinceLastSave}
        />
        <CardList
          documents={documents}
          updateDocuments={updateDocuments}
          handleImageLoad={handleImageLoad}
          handleCardClick={handleCardClick}
          loadingImages={loadingImages}
        />
        <ImageViewer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedDoc={selectedDoc}
        />
      </div>
    </div>
  );
};

export default App;
