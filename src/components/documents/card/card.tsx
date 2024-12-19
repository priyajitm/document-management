import { Document } from "../../../types/document";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandle } from "./dragHandle";
import { Spinner } from "../../common/spinner/spinner";
import { memo } from 'react';

interface CardProps {
    document: Document
    loadingImages: { [key: string]: boolean }
    handleImageLoad: (docType: string) => void
    handleClick: () => void
}

export const Card = memo(({ document, loadingImages, handleImageLoad, handleClick }: CardProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: document.type });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
          }}
            {...attributes}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative group"
        >
            <div 
                {...listeners}
                className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
            >
                <div className="absolute top-2 right-2 pointer-events-auto">
                    <DragHandle />
                </div>
            </div>

            <div className="relative w-full pt-[56.25%] z-10">
                {loadingImages[document.type] && (
                  <Spinner />
                )}
                <img 
                    src={document.thumbnail} 
                    alt={document.title} 
                    className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
                    onLoad={() => handleImageLoad(document.type)}
                    style={{ opacity: loadingImages[document.type] ? 0 : 1 }}
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{document.title}</h3>
            </div>
        </div>
    )
})