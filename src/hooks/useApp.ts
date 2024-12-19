import { useEffect, useState, useCallback } from "react";
import { documentsApi } from "../services/api/documents";
import { useAutosave } from "./useAutosave";
import { Document } from "../types/document";

export const useApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [timeSinceLastSave, setTimeSinceLastSave] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>(
    {}
  );
  const { isSaving, lastSaveTime, hasChanges } = useAutosave(documents);

  const loadDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await documentsApi.getAll();
      const processedData = data.map(addCacheBustingToThumbnail);
      setDocuments(processedData);
      setLoadingImages(createInitialLoadingState(processedData));
      setError(null);
    } catch (err) {
      console.error("Detailed load error:", err);
      setError("Failed to load documents");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateDocuments = useCallback(async (newDocuments: Document[]) => {
    try {
      setDocuments(newDocuments);
      await documentsApi.updateAll(newDocuments);
    } catch (err) {
      console.error("Failed to update document positions:", err);
      loadDocuments();
    }
  }, [loadDocuments]);

  const addCacheBustingToThumbnail = (doc: Document): Document => ({
    ...doc,
    thumbnail: `${doc.thumbnail}?delay=${Date.now()}`,
  });

  const createInitialLoadingState = (
    docs: Document[]
  ): Record<string, boolean> =>
    docs.reduce(
      (acc, doc) => ({
        ...acc,
        [doc.type]: true,
      }),
      {}
    );

  const handleImageLoad = useCallback((docType: string) => {
    setLoadingImages((prev) => ({
      ...prev,
      [docType]: false,
    }));
  }, []);

  const handleCardClick = useCallback((document: Document) => {
    setSelectedDoc(document);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (!lastSaveTime) return;

    setTimeSinceLastSave(
      Math.floor((new Date().getTime() - lastSaveTime.getTime()) / 1000)
    );

    const interval = setInterval(() => {
      setTimeSinceLastSave(
        Math.floor((new Date().getTime() - lastSaveTime.getTime()) / 1000)
      );
    }, 60000);

    return () => clearInterval(interval);
  }, [lastSaveTime]);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  return {
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
    isLoading: loading,
    isError: error,
  };
};
