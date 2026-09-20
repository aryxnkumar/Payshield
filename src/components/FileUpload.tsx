import { useState, useRef, type ReactNode } from 'react';
import { X, Upload, FileText, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  files: { name: string; type: string; size: string }[];
  onAdd: (file: { name: string; type: string; size: string }) => void;
  onRemove: (index: number) => void;
}

export function FileUpload({ files, onAdd, onRemove }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file: File) => {
    const sizeStr = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`;
    onAdd({ name: file.name, type: file.type || 'unknown', size: sizeStr });
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
        }}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all ${
          dragOver ? 'border-electric-500 bg-electric-50' : 'border-gray-300 hover:border-electric-400 hover:bg-gray-50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) handleFile(e.target.files[0]);
            e.target.value = '';
          }}
        />
        <Upload className="mx-auto h-10 w-10 text-gray-400" />
        <p className="mt-3 text-sm font-medium text-navy-700">Click to upload or drag and drop</p>
        <p className="mt-1 text-xs text-gray-400">PNG, JPG, PDF up to 10MB</p>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 animate-fade-in">
              <div className="flex items-center gap-3">
                {file.type.includes('image') ? (
                  <ImageIcon className="h-8 w-8 text-electric-500" />
                ) : (
                  <FileText className="h-8 w-8 text-electric-500" />
                )}
                <div>
                  <p className="text-sm font-medium text-navy-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size}</p>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onRemove(i); }}
                className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-scale-in">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-navy-900">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
