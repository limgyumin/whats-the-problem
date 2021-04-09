import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UserModule } from '../user/user.module';
import { UploadController } from './upload.controller';

@Module({
  imports: [UserModule],
  exports: [UploadService],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
