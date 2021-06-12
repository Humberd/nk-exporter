import { content_script_init } from './content_script/init';

function isInIframe(): boolean {
  return window.location !== window.parent.location;
}

if (isInIframe()) {
  // chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  //   if (msg.color) {
  //     console.log("Receive color = " + msg.color);
  //     document.body.style.backgroundColor = msg.color;
  //     sendResponse("Change color to " + msg.color);
  //   } else {
  //     sendResponse("Color message is none.");
  //   }
  // });
  content_script_init();
} else {
  console.log("Not in iframe");
}
