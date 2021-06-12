import { MessageRequest } from './messages-requests';
import MessageSender = chrome.runtime.MessageSender;

export function sendMessageRequest(
  message: MessageRequest,
  responseCallback?: (response: any) => void
) {
  chrome.runtime.sendMessage(message, responseCallback);
}

export function receiveMessage(
  callback: (
    message: MessageRequest,
    sender: MessageSender,
    sendResponse: (response?: any) => void
  ) => void
): () => void {
  chrome.runtime.onMessage.addListener(callback);

  return () => {
    chrome.runtime.onMessage.removeListener(callback);
  };
}
