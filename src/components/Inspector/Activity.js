import React from 'react';

import ActivityRow from './Row';

function Activity({ info }) {
  return (
    <div>
      <h3>Activity</h3>
      <ActivityRow label='Have' value={info.have} />
      <ActivityRow label='Availability' value={info.available} />
      <ActivityRow label='Downloaded' value={info.download} />
      <ActivityRow label='Uploaded' value={info.upload} />
      <ActivityRow label='State' value={info.state} />
      <ActivityRow label='Running Time' value={info.runningTime} />
      <ActivityRow label='Remaining Time' value={info.remainingTime} />
      <ActivityRow label='Last Activity' value={info.lastActivity} />
      <ActivityRow label='Error' value={info.error} />
    </div>
  );
}

export default Activity;
