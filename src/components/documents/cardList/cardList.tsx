import {
  DndContext,
  closestCenter,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { Card } from "../card/card";
import { Document } from "../../../types/document";
import { useCallback } from 'react';

interface CardListProps {
  documents: Document[];
  updateDocuments: (documents: Document[]) => void;
  handleImageLoad: (docType: string) => void;
  handleCardClick: (document: Document) => void;
  loadingImages: Record<string, boolean>;
}

export const CardList = ({
  documents,
  updateDocuments,
  handleImageLoad,
  handleCardClick,
  loadingImages,
}: CardListProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = documents.findIndex((doc) => doc.type === active.id);
      const newIndex = documents.findIndex((doc) => doc.type === over.id);

      const newDocuments = arrayMove(documents, oldIndex, newIndex).map(
        (doc, index) => ({
          ...doc,
          position: index,
        })
      );

      updateDocuments(newDocuments);
    }
  }, [documents, updateDocuments]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={documents.map((doc) => doc.type)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <Card
              key={doc.type}
              document={doc}
              loadingImages={loadingImages}
              handleImageLoad={handleImageLoad}
              handleClick={() => handleCardClick(doc)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
