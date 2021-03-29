import { isBrowser, isMobile } from 'react-device-detect';
import WebButton from './Button.web.js';
import nativeButton from './Button.native.js';

if (isBrowser) {
  export { WebButton as default } from './Button.web.js';
}

if (isMobile) {
  export { nativeButton as default } from './Button.native.js';
}
