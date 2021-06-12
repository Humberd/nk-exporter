import { content_script_init } from './content_script/init';

function isInIframe(): boolean {
  return window.location !== window.parent.location;
}

if (isInIframe()) {
  content_script_init();
}
