import { Injectable } from '@nestjs/common';
import { generateURL } from 'src/lib/url';

@Injectable()
export class UploadService {
  uploadFiles(files: any[]) {
    const generatedFiles: string[] = [];

    for (const file of files) {
      generatedFiles.push(generateURL(file.filename));
    }

    return generatedFiles;
  }
}
