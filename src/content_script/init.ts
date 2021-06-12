import {
  CurrentUserMetadata,
  extractCurrentUserProfileMetadata,
} from './data-extractors';
import { prefixStorageKeyName } from './storage';
import { GalleryExtractor } from './gallery-extractor';
import { ExtractorResult } from './extractor';
import { sendMessageRequest } from '../commication/message-utils';

export function content_script_init(): void {
  const currentUserProfile = initCurrentUserProfile();

  const extractors = [new GalleryExtractor()];

  const url = new URL(location.href);

  let extractorResult: ExtractorResult | undefined;

  for (let extractor of extractors) {
    if (extractor.testView(url)) {
      extractorResult = extractor.extract(url);
      break;
    }
  }

  if (!extractorResult) {
    console.log(`Not extractor found for url: ${url}`);
    return;
  }

  console.log(extractorResult);

  sendMessageRequest(
    {
      type: 'photo_metadata_batch_extracted',
      result: extractorResult,
    },
    () => {
      if (!extractorResult) {
        console.log(`Not extractor found for url: ${url}`);
        return;
      }

      if (extractorResult.nextUrlRequest) {
        location.href = extractorResult.nextUrlRequest;
      }
    }
  );
}

function initCurrentUserProfile(): CurrentUserMetadata {
  const currentUserProfileFromStorage = JSON.parse(
    localStorage.getItem(prefixStorageKeyName('currentUserProfile')) as string
  );
  if (currentUserProfileFromStorage) {
    console.log(
      'User already exists in storage: ',
      currentUserProfileFromStorage
    );
    return currentUserProfileFromStorage;
  }

  const newProfile = extractCurrentUserProfileMetadata();
  localStorage.setItem(
    prefixStorageKeyName('currentUserProfile'),
    JSON.stringify(newProfile)
  );
  return newProfile;
}
