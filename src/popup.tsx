import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  receiveMessage,
  sendMessageRequest,
} from './commication/message-utils';

const Popup = () => {
  const [isExtracting, setIsExtracting] = useState(false);

  useEffect(() => {
    return receiveMessage((message, sender, sendResponse) => {
      switch (message.type) {
        case 'extraction_started':
          setIsExtracting(true);
          break;
        case 'extraction_stopped':
          setIsExtracting(false);
          break;
      }

      sendResponse();
    });
  }, []);

  useEffect(() => {
    sendMessageRequest({ type: 'is_extraction_started' }, response => {
      setIsExtracting(!!response)
    });
  }, []);

  const changeBackground = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            color: '#555555',
          },
          (msg) => {
            console.log('result message:', msg);
          }
        );
      }
    });
  };

  const startExtraction = () => {
    sendMessageRequest({
      type: 'extraction_start',
    });
  };

  const stopExtraction = () => {
    sendMessageRequest({
      type: 'extraction_stop',
    });
  };

  return (
    <>
      {!isExtracting && (
        <button onClick={startExtraction}>Rozpocznij export</button>
      )}
      {isExtracting && <button onClick={stopExtraction}>Zakończ</button>}
    </>
  );
};
ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root')
);
