import { content_script_init } from './content_script/init';
import { sendMessageRequest } from './commication/message-utils';

if (isInIframe()) {
  // sendMessageRequest({ type: 'is_extraction_started' }, (isStarted) => {
  //   if (!isStarted) {
  //     console.log('Extraction has not been started');
  //
  //     return;
  //   }
  //
  //   content_script_init();
  // });

  const port = chrome.runtime.connect({name: 'nk-extractor-background-connection'});
  port.onMessage.addListener(message => {
    console.log(message);
  })
}

function isInIframe(): boolean {
  return window.location !== window.parent.location;
}
