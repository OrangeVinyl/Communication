import { generateComponents } from '@uploadthing/react';

// type
import type { OurFileRouter } from '@/app/api/uploadthing/core';

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>();
