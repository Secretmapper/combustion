export function compareById(ta, tb) {
  return ta.id - tb.id;
}

export function compareByName(ta, tb) {
  return ta.publicName.localeCompare(tb.publicName) || compareById(ta, tb);
}

export function compareByQueue(ta, tb) {
  return ta.queuePosition - tb.queuePosition;
}

export function compareByAge(ta, tb) {
  var a = ta.addedDate;
  var b = tb.addedDate;

  return (b - a) || compareByQueue(ta, tb);
}

export function compareByState(ta, tb) {
  var a = ta.status;
  var b = tb.status;

  return (b - a) || compareByQueue(ta, tb);
}

export function compareByActivity(ta, tb) {
  var a = ta.activity;
  var b = tb.activity;

  return (b - a) || compareByState(ta, tb);
}

export function compareByRatio(ta, tb) {
  var a = ta.uploadRatio;
  var b = tb.uploadRatio;

  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }

  return compareByState(ta, tb);
}

export function compareByProgress(ta, tb) {
  var a = ta.percentDone;
  var b = tb.percentDone;

  return (a - b) || compareByRatio(ta, tb);
}

export function compareBySize(ta, tb) {
  var a = ta.totalSize;
  var b = tb.totalSize;

  return (a - b) || compareByName(ta, tb);
}
