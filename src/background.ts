import { PhotoMetadata } from './content_script/extractor';
import {
  receiveMessage,
  sendMessageRequest,
} from './commication/message-utils';
import { BackgroundState } from './background/background-state';

const state: BackgroundState = {
  photoMetadata: [],
  isExtractionStarted: false,
  tabId: undefined,
};

receiveMessage((message, sender, sendResponse) => {
  switch (message.type) {
    case 'extraction_start':
      handleExtractionStart();
      break;
    case 'extraction_stop':
      handleExtractionEnd();
      break;
    case 'is_extraction_started':
      sendResponse(state.isExtractionStarted);
      return;
    case 'photo_metadata_batch_extracted':
      state.photoMetadata.push(...message.result.metadata);
      console.log(state.photoMetadata);
      break;
  }

  sendResponse();
});

function handleExtractionStart(): void {
  chrome.tabs.create({ url: 'https://nk.pl' }, tab => {
    state.isExtractionStarted = true;
    state.tabId = tab.id;
    sendMessageRequest({ type: 'extraction_started' });
    setTimeout(() => {
      const port = chrome.tabs.connect(tab.id!,  {name: 'nk-extractor-background-connection'})
      port.postMessage("Hello from background")
    }, 1000)
  });

}

function handleExtractionEnd(): void {
  chrome.tabs.remove(state.tabId!);
  state.isExtractionStarted = false;
  state.tabId = undefined;
  sendMessageRequest({ type: 'extraction_stopped' });
}
