import { extendObservable } from 'mobx';

class Tracker {
  static STATUS_INACTIVE = 0;
  static STATUS_WAITING = 1;
  static STATUS_QUEUED = 2;
  static STATUS_ACTIVE = 3;

  constructor(tracker) {
    // NOTE: tracker is already an observable!!!
    extendObservable(this, tracker);
  }
}

export default Tracker;
