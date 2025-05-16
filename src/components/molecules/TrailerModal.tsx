import React from "react";
import { X } from "lucide-react";
import Button from "../atoms/Button";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoKey: string;
  title: string;
}

const TrailerModal: React.FC<TrailerModalProps> = ({
  isOpen,
  onClose,
  videoKey,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div
      data-testid="test"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-Ge"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
        data-testid="modal-overlay"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] p-4">
        <div className="relative rounded-lg bg-black">
          <div className="flex items-center justify-between p-4">
            <h3 className="text-lg font-medium text-white">{title}</h3>
            <Button
              data-testid="close-button"
              variant="text"
              onClick={onClose}
              className="text-white hover:bg-white/10"
              aria-label="Close trailer"
            >
              <X size={16} />
            </Button>
          </div>

          <div data-testid="modal-content" className="relative aspect-video">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              title={`${title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
