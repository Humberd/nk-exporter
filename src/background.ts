import { PhotoMetadata } from './content_script/extractor';
import {
  receiveMessage,
  sendMessageRequest,
} from './commication/message-utils';

const photoMetadata: PhotoMetadata[] = [];

receiveMessage((message, sender, sendResponse) => {
  switch (message.type) {
    case 'extraction_start':
      sendMessageRequest({ type: 'extraction_started' });
      break;
    case 'extraction_stop':
      sendMessageRequest({ type: 'extraction_stopped' });
      break;
    case 'photo_metadata_batch_extracted':
      photoMetadata.push(...message.result.metadata);
      console.log(photoMetadata);
      break;
  }

  sendResponse();
});
