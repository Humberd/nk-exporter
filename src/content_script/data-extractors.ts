export interface CurrentUserMetadata {
  profileId: string;
  profileUrl: string;
  fullName: string;
}

export function extractCurrentUserProfileMetadata(): CurrentUserMetadata {
  const elements = document.querySelectorAll('.topbar__item--user_simple > a');
  if (elements.length !== 1) {
    throw Error(`Expected link element to be 1, but were: ${elements.length}`);
  }

  const profileUrl = elements[0].getAttribute('href');
  if (!profileUrl) {
    throw Error('profileUrl is null');
  }

  return {
    profileUrl: profileUrl,
    profileId: profileUrl.split('/')[2],
    fullName: elements[0].textContent ?? '',
  };
}
