import {
  CurrentUserMetadata,
  extractCurrentUserProfileMetadata,
} from "./data-extractors";
import { prefixStorageKeyName } from "./storage";

let currentUserProfile: CurrentUserMetadata;

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

export function content_script_init(): void {
  currentUserProfile = initCurrentUserProfile();
}
