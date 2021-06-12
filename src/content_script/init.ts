import {
  CurrentUserMetadata,
  extractCurrentUserProfileMetadata,
} from "./data-extractors";
import { prefixStorageKeyName } from "./storage";
import { GalleryExtractor } from './gallery-extractor';
import { PhotoMetadata } from './extractor';

export function content_script_init(): void {
  const currentUserProfile = initCurrentUserProfile();

  const extractors = [new GalleryExtractor()]

  const pathname = location.pathname

  const photoMetadata: PhotoMetadata[] = []

  for (let extractor of extractors) {
    if (extractor.testView(pathname)) {
      photoMetadata.push(...extractor.extract())
      break;
    }
  }

  console.log(photoMetadata);

}

function initCurrentUserProfile(): CurrentUserMetadata {
  const currentUserProfileFromStorage = JSON.parse(
    localStorage.getItem(prefixStorageKeyName("currentUserProfile")) as string
  );
  if (currentUserProfileFromStorage) {
    console.log(
      "User already exists in storage: ",
      currentUserProfileFromStorage
    );
    return currentUserProfileFromStorage;
  }

  const newProfile = extractCurrentUserProfileMetadata();
  localStorage.setItem(
    prefixStorageKeyName("currentUserProfile"),
    JSON.stringify(newProfile)
  );
  return newProfile;
}
