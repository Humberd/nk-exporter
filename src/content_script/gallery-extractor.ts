import { PhotoMetadata } from './extractor';

export class GalleryExtractor {
  testView(pathname: string): boolean {
    return pathname.endsWith("galeria")
  }

  extract(): PhotoMetadata[] {
    const metadata: PhotoMetadata[] = [];
    const elements = document.querySelectorAll('.photo.box-general');
    for (let element of elements) {
      metadata.push({
        author: element.querySelector(".photo__content__author__name")?.textContent?.trim() ?? "",
        date: element.querySelector(".photo__content__time > time")?.getAttribute("datetime") ?? "",
        description: element.querySelector(".photo__content > p")?.textContent?.trim() ?? "",
        url: element.querySelector<HTMLElement>(".lazy > img")?.dataset['fullsize'] ?? ""
      })
    }

    return metadata
  }
}
