import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  File,
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileText,
  Trash2,
  Upload,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createPropertyDocumentUploadItem } from '@/lib/post-property/media/createUploadItems';
import { formatFileSize, getFileExtension } from './uploadUtils';
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

const DEFAULT_MAX_DOCUMENTS = 10;

const ACCEPTED_DOCUMENTS = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'text/plain': ['.txt'],
  'application/zip': ['.zip'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
};

const ACCEPTED_EXTENSIONS = new Set([
  'pdf',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'txt',
  'zip',
  'jpg',
  'jpeg',
  'png',
]);

function getDocumentIcon(filename) {
  const ext = getFileExtension(filename);
  switch (ext) {
    case 'xls':
    case 'xlsx':
      return FileSpreadsheet;
    case 'zip':
      return FileArchive;
    case 'jpg':
    case 'jpeg':
    case 'png':
      return FileImage;
    case 'pdf':
    case 'doc':
    case 'docx':
    case 'txt':
      return FileText;
    default:
      return File;
  }
}

function getIconAccentClass(filename) {
  const ext = getFileExtension(filename);
  switch (ext) {
    case 'pdf':
      return 'bg-red-50 text-red-600';
    case 'doc':
    case 'docx':
      return 'bg-blue-50 text-blue-600';
    case 'xls':
    case 'xlsx':
      return 'bg-green-50 text-green-700';
    case 'zip':
      return 'bg-amber-50 text-amber-700';
    case 'jpg':
    case 'jpeg':
    case 'png':
      return 'bg-accent-light text-accent';
    case 'txt':
      return 'bg-gray-100 text-gray-600';
    default:
      return 'bg-primary/10 text-primary';
  }
}

export default function DocumentUploadField({
  label = 'Documents',
  hideTitle = false,
  description = 'Drag and drop documents here, or click to browse',
  value = [],
  onChange,
  maxDocuments = DEFAULT_MAX_DOCUMENTS,
  className,
}) {
  const processFiles = useCallback(
    (acceptedFiles) => {
      if (!acceptedFiles.length || !onChange) return;

      const validFiles = acceptedFiles.filter((file) =>
        ACCEPTED_EXTENSIONS.has(getFileExtension(file.name)),
      );

      const newItems = validFiles.map((file) => createPropertyDocumentUploadItem(file));

      if (newItems.length) onChange([...value, ...newItems]);
    },
    [onChange, value],
  );

  const handleRemove = useCallback(
    (id) => {
      if (!onChange) return;
      onChange(value.filter((item) => item.id !== id));
    },
    [onChange, value],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: ACCEPTED_DOCUMENTS,
    multiple: true,
    onDrop: processFiles,
  });

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        {hideTitle ? (
          <span className={formBadgeAccentClass}>
            {value.length} / {maxDocuments} selected
          </span>
        ) : (
          <>
            <div>
              <h4 className={formFieldTitleClass}>{label}</h4>
              <p className={formHintClass}>PDF, DOC, DOCX, XLS, XLSX, TXT, ZIP, JPG, PNG</p>
            </div>
            <span className={formBadgeAccentClass}>
              {value.length} / {maxDocuments} selected
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
          !isDragActive && formDropzoneIdleClass,
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
            <Upload className="size-5" aria-hidden />
          </div>
          <div>
            <p className="m-0 text-sm font-semibold text-primary">
              {isDragActive ? 'Drop files here' : description}
            </p>
            <p className={formHintClass}>Add multiple files without replacing existing ones</p>
          </div>
        </div>
      </div>

      {value.length > 0 && (
        <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
          {value.map((item) => {
            const Icon = getDocumentIcon(item.name);
            const iconClass = getIconAccentClass(item.name);

            return (
              <li
                key={item.id}
                className={cn(formPreviewCardClass, 'flex items-center gap-3 p-3')}
              >
                <div
                  className={cn(
                    'flex size-11 shrink-0 items-center justify-center rounded-lg',
                    iconClass,
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="m-0 truncate text-[13px] font-semibold text-primary"
                    title={item.name}
                  >
                    {item.name}
                  </p>
                  <p className="m-0 mt-0.5 text-[11px] text-gray-500">
                    {formatFileSize(item.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg border-0 bg-transparent text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="size-4" aria-hidden />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
