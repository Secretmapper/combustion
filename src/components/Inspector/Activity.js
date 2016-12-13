import React from 'react';

import { percentString } from 'util/formatters';

import ActivityRow from './Row';



function Activity({ info }) {
  return (
    <div>
      <h2>Activity</h2>
      <ActivityRow label='Have' value={info.have} />
      <ActivityRow label='Availability' value={`${percentString((100.0 * info.available) / info.sizeWhenDone)}%`} />
      <ActivityRow label='Uploaded' value={info.upload} />
      <ActivityRow label='Downloaded' value={info.download} />
      <ActivityRow label='State' value={info.state} />
      <ActivityRow label='Running Time' value={info.runningTime} />
      <ActivityRow label='Remaining Time' value={info.remainingTime} />
      <ActivityRow label='Last Activity' value={info.lastActivity} />
      <ActivityRow label='Error' value={info.error} />
    </div>
  );
}

export default Activity;
