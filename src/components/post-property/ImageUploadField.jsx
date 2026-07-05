import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { ImagePlus, Loader2, Trash2, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createPropertyImageUploadItem } from '@/lib/post-property/media/createUploadItems';
import { formatFileSize } from './uploadUtils';
import {
  formBadgeAccentClass,
  formDropzoneActiveClass,
  formDropzoneBaseClass,
  formDropzoneIdleClass,
  formDropzoneRejectClass,
  formFieldTitleClass,
  formHintClass,
  formPreviewCardClass,
} from './formStyles';

const DEFAULT_MAX_IMAGES = 20;

const compressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

async function compressImage(file) {
  try {
    return await imageCompression(file, compressionOptions);
  } catch {
    return file;
  }
}

export default function ImageUploadField({
  label = 'Property Images',
  hideTitle = false,
  description = 'Drag and drop images here, or click to browse',
  value = [],
  onChange,
  maxImages = DEFAULT_MAX_IMAGES,
  className,
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const valueRef = useRef(value);
  valueRef.current = value;

  useEffect(() => {
    return () => {
      valueRef.current.forEach((item) => {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, []);

  const remainingSlots = Math.max(0, maxImages - value.length);
  const isFull = remainingSlots === 0;

  const processFiles = useCallback(
    async (acceptedFiles) => {
      if (!acceptedFiles.length || !onChange) return;

      const filesToAdd = acceptedFiles.slice(0, remainingSlots);
      if (!filesToAdd.length) return;

      setIsProcessing(true);
      try {
        const compressed = await Promise.all(filesToAdd.map((file) => compressImage(file)));
        const newItems = compressed.map((file) => createPropertyImageUploadItem(file));
        onChange([...value, ...newItems]);
      } finally {
        setIsProcessing(false);
      }
    },
    [onChange, remainingSlots, value],
  );

  const handleRemove = useCallback(
    (id) => {
      if (!onChange) return;
      const removed = value.find((item) => item.id === id);
      if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl);
      onChange(value.filter((item) => item.id !== id));
    },
    [onChange, value],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/gif': ['.gif'],
    },
    multiple: true,
    disabled: isFull || isProcessing,
    maxFiles: remainingSlots,
    onDrop: (acceptedFiles) => {
      void processFiles(acceptedFiles);
    },
  });

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        {hideTitle ? (
          <span className={formBadgeAccentClass}>
            {value.length} / {maxImages} selected
          </span>
        ) : (
          <>
            <div>
              <h4 className={formFieldTitleClass}>{label}</h4>
              <p className={formHintClass}>JPEG, PNG, WebP, GIF — up to {maxImages} images</p>
            </div>
            <span className={formBadgeAccentClass}>
              {value.length} / {maxImages} selected
            </span>
          </>
        )}
      </div>

      <div
        {...getRootProps()}
        className={cn(
          formDropzoneBaseClass,
          isDragActive && !isDragReject && formDropzoneActiveClass,
          isDragReject && formDropzoneRejectClass,
          isFull && 'cursor-not-allowed opacity-60',
          !isDragActive && !isFull && formDropzoneIdleClass,
        )}
        aria-label={label}
      >
        <input {...getInputProps()} aria-label={`${label} file input`} />
        <div className="pointer-events-none flex flex-col items-center justify-center gap-3 text-center">
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-full',
              isDragActive ? 'bg-accent text-white' : 'bg-primary/10 text-primary',
            )}
          >
            {isProcessing ? (
              <Loader2 className="size-5 animate-spin" aria-hidden />
            ) : isFull ? (
              <ImagePlus className="size-5" aria-hidden />
            ) : (
              <Upload className="size-5" aria-hidden />
            )}
          </div>
          <div>
            <p className="m-0 text-sm font-semibold text-primary">
              {isProcessing
                ? 'Compressing images...'
                : isFull
                  ? 'Maximum images reached'
                  : isDragActive
                    ? 'Drop images here'
                    : description}
            </p>
            {!isFull && !isProcessing && (
              <p className={formHintClass}>
                {remainingSlots} slot{remainingSlots === 1 ? '' : 's'} remaining
              </p>
            )}
          </div>
        </div>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {value.map((item) => (
            <article key={item.id} className={cn(formPreviewCardClass, 'relative')}>
              <div className="aspect-[4/3] overflow-hidden bg-surface">
                <img
                  src={item.previewUrl}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="space-y-1 p-2.5">
                <p
                  className="m-0 truncate text-[11px] font-semibold text-primary"
                  title={item.name}
                >
                  {item.name}
                </p>
                <p className="m-0 text-[10px] text-gray-500">{formatFileSize(item.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(item.id)}
                className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full border-0 bg-white/95 text-red-600 shadow-md transition-colors hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={`Remove ${item.name}`}
              >
                <Trash2 className="size-4" aria-hidden />
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
