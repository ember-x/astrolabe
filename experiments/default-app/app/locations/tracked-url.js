import HistoryLocation from '@ember/routing/history-location';
import { TrackedURL } from 'ember-astrolabe';

 //## Location API
  //Each location implementation must provide the following methods:
  //* implementation: returns the string name used to reference the implementation.
  //* getURL: returns the current URL.
  //* setURL(path): sets the current URL.
  //* replaceURL(path): replace the current URL (optional).
  //* onUpdateURL(callback): triggers the callback when the URL changes.
  //* formatURL(url): formats `url` to be placed into `href` attribute.
  //* detect() (optional): instructs the location to do any feature detection
      //necessary. If the location needs to redirect to a different URL, it
      //can cancel routing by setting the `cancelRouterSetup` property on itself
      //to `false`.
  //Calling setURL or replaceURL will not trigger onUpdateURL callbacks.


export default class TrackedUrl extends HistoryLocation {
  implementation = 'tracked-url';
  constructor() {
    super(...arguments);
    //this._history = HistoryLocation.create(...arguments);
    this.tracked = new TrackedURL(window.location.href);
  }
}

