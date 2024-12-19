import { useEffect, useRef, useState } from 'react';
import { Document } from '../types/document';
import { documentsApi } from '../services/api/documents';

interface AutosaveState {
  isSaving: boolean;
  lastSaveTime: Date | null;
  hasChanges: boolean;
}

export const useAutosave = (documents: Document[]) => {
  const [state, setState] = useState<AutosaveState>({
    isSaving: false,
    lastSaveTime: null,
    hasChanges: false,
  });

  const previousDocuments = useRef<string>('');
  const saveTimeoutRef = useRef<number | null>(null);
  const AUTOSAVE_DELAY = 5000;

  const save = async () => {
    const currentDocuments = JSON.stringify(documents);
    if (currentDocuments === previousDocuments.current) {
      return;
    }

    setState(prev => ({ ...prev, isSaving: true }));
    
    try {
      await documentsApi.updateAll(documents);
      previousDocuments.current = currentDocuments;
      setState({
        isSaving: false,
        lastSaveTime: new Date(),
        hasChanges: false,
      });
    } catch (error) {
      console.error('Autosave failed:', error);
      setState(prev => ({ 
        ...prev, 
        isSaving: false,
        hasChanges: true 
      }));
    }
  };

  useEffect(() => {
    const currentDocuments = JSON.stringify(documents);
    if (currentDocuments !== previousDocuments.current) {
      setState(prev => ({ ...prev, hasChanges: true }));
      
      if (saveTimeoutRef.current) {
        window.clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = window.setTimeout(save, AUTOSAVE_DELAY);
    }

    return () => {
      if (saveTimeoutRef.current) {
        window.clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [documents]);

  return state;
};