import { ExtractorResult, PhotoMetadata } from './extractor';

export class GalleryExtractor {
  testView(url: URL): boolean {
    return url.pathname.endsWith('galeria');
  }

  extract(url: URL): ExtractorResult {
    const totalPhotosCount = Number(document.querySelector('.gallery > .title')?.textContent?.trim()?.replace('Galeria (', '')?.replace(')', ''));
    if (isNaN(totalPhotosCount)) {
      throw Error('Cannot extract total photos count');
    }

    const metadata: PhotoMetadata[] = [];
    const elements = document.querySelectorAll('.photo.box-general');
    for (let element of elements) {
      metadata.push({
        author: element.querySelector('.photo__content__author__name')?.textContent?.trim() ?? '',
        date: element.querySelector('.photo__content__time > time')?.getAttribute('datetime') ?? '',
        description: element.querySelector('.photo__content > p')?.textContent?.trim() ?? '',
        url: element.querySelector<HTMLElement>('.lazy > img')?.dataset['fullsize'] ?? '',
      });
    }

    const currentPage = Number(url.searchParams.get('p') ?? 1);
    const maxPhotosPerPage = 50;
    const hasNextPage = (totalPhotosCount - currentPage * maxPhotosPerPage) > 0;
    if (hasNextPage) {
      url.searchParams.set('p', String(currentPage + 1));
      return {
        metadata,
        nextUrlRequest: url.toString(),
      };
    }

    return {metadata};
  }
}
