import { Dialog, DialogPanel } from "@headlessui/react"
import { Document } from "../../../types/document";


interface ImageViewerProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    selectedDoc: Document | null;
}

export const ImageViewer = ({ isOpen, setIsOpen, selectedDoc }: ImageViewerProps) => {
    return (
        <Dialog
        open={isOpen && !!selectedDoc}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-4xl rounded-lg border bg-white shadow-xl overflow-hidden">
            {selectedDoc && (
              <img
                src={selectedDoc.thumbnail}
                alt={selectedDoc.title}
                className="w-full h-auto"
              />
            )}
          </DialogPanel>
        </div>
      </Dialog>
    )
}