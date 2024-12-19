import { memo, useMemo } from 'react';
import { ClipLoader } from "react-spinners";
import { formatTimeSinceLastSave } from "../../../utils";

interface SaveStatusProps { 
    isSaving: boolean;
    hasChanges: boolean;
    lastSaveTime: Date | null;
    timeSinceLastSave: number;
}

export const SaveStatus = memo(({ isSaving, hasChanges, lastSaveTime, timeSinceLastSave }: SaveStatusProps) => {
  const content = useMemo(() => {
    if (isSaving) {
      return (
        <div className="flex items-center gap-2 bg-white p-2 rounded-md shadow-md">
          <ClipLoader size={16} color="#4B5563" />
          <span>Saving changes...</span>
        </div>
      );
    }

    if (hasChanges) {
      return (
        <div className="bg-yellow-100 text-yellow-800 p-2 rounded-md shadow-md">
          Unsaved changes
        </div>
      );
    }

    if (lastSaveTime) {
      return (
        <div className="bg-green-100 text-green-800 p-2 rounded-md shadow-md">
          {formatTimeSinceLastSave(timeSinceLastSave)}
        </div>
      );
    }

    return null;
  }, [isSaving, hasChanges, lastSaveTime, timeSinceLastSave]);

  return (
    <div className="flex justify-end mb-8">
      {content}
    </div>
  );
});