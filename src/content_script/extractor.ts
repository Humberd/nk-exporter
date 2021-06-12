export interface PhotoMetadata {
  url: string;
  description: string;
  author: string;
  date: string;
}

export interface ExtractorResult {
  metadata: PhotoMetadata[];
  nextUrlRequest?: string;
}
