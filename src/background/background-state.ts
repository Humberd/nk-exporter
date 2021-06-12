import { PhotoMetadata } from '../content_script/extractor';

export interface BackgroundState {
  isExtractionStarted: boolean,
  photoMetadata: PhotoMetadata[],
  tabId?: number
}
