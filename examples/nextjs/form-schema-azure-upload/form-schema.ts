import { govBuilder } from '@button-inc/form-schema';
import schema from 'schemas/schema';
import uiSchema from 'schemas/uiSchema';
import { ReadStream } from 'fs';
import { uploadOptions, getBlobName, blobServiceClient } from 'azure-storage';

const options = {
  getRoute: '/',
  postRoute: '/api',
  handleReadStream: async (filename: string, fileStream: ReadStream) => {
    const blobName = getBlobName(filename);
    const containerClient = blobServiceClient.getContainerClient('testcontainer');
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    try {
      await blockBlobClient.uploadStream(fileStream, uploadOptions.bufferSize, uploadOptions.maxBuffers, {
        blobHTTPHeaders: { blobContentType: 'text/plain' },
      });
    } catch (err) {
      console.error(err);
    }
  },
  onFileLoad: (filename: string) => {
    console.log(`${filename} has been uploaded`);
  },
};

export const { postMiddleware, getHandler, fileMiddleware, Forms } = govBuilder(schema, uiSchema, options);
