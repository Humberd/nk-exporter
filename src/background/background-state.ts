import { PhotoMetadata } from '../content_script/extractor';

export interface BackgroundState {
  photoMetadata: PhotoMetadata[],
  isExtractionStarted: boolean,
  tabId?: number
}
