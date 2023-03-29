import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import config from '../config/configuration';

@Injectable()
export class S3UploaderService {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      region: config().s3.region,
      accessKeyId: config().s3.accessKeyId,
      secretAccessKey: config().s3.secretAccessKey,
    });
  }

  async uploadFile(file: any, key: string): Promise<string> {
    const uploadParams = {
      Bucket: config().s3.s3BucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    try {
      const s3Response = await this.s3.upload(uploadParams).promise();
      return s3Response.Location;
    } catch (error) {
      throw new Error(`Error uploading file to S3: ${error.message}`);
    }
  }
}
