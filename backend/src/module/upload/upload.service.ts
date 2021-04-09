import { Injectable } from '@nestjs/common';
import { generateURL } from 'src/lib/generate-url';

@Injectable()
export class UploadService {
  uploadFiles(files: File[]) {
    const generatedFiles: string[] = [];

    for (const file of files) {
      generatedFiles.push(generateURL(file));
    }

    return generatedFiles;
  }
}
