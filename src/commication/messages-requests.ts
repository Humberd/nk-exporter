import { ExtractorResult } from '../content_script/extractor';

export type MessageRequest =
  | ExtractionStart
  | ExtractionStarted
  | ExtractionStop
  | ExtractionStopped
  | PhotoMetadataBatchExtracted;

export interface ExtractionStart {
  type: 'extraction_start';
}

export interface ExtractionStarted {
  type: 'extraction_started';
}

export interface ExtractionStop {
  type: 'extraction_stop';
}

export interface ExtractionStopped {
  type: 'extraction_stopped';
}

export interface PhotoMetadataBatchExtracted {
  type: 'photo_metadata_batch_extracted';
  result: ExtractorResult;
}
