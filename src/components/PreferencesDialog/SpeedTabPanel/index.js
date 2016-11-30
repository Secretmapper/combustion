import React, { Component} from 'react';
import { inject, observer } from 'mobx-react';

@inject('view_store')
@observer
class SpeedTabPanel extends Component {
  render() {
    return (
      <div>
        <h3>Speed Limits</h3>
        <h3>Alternative Speed Limits</h3>
        <div class="prefs-section">
          <div class="title">Speed Limits</div>
          <div class="row"><div class="key"><input type="checkbox" id="speed-limit-up-enabled"/><label for="speed-limit-up-enabled">Upload (kB/s):</label></div>
                                                               <div class="value"><input type="number" min="0" id="speed-limit-up"/></div></div>
          <div class="row"><div class="key"><input type="checkbox" id="speed-limit-down-enabled"/><label for="speed-limit-down-enabled">Download (kB/s):</label></div>
                                                               <div class="value"><input type="number" min="0" id="speed-limit-down"/></div></div>
        </div>
        <div class="prefs-section">
          <div class="title"><div id="alternative-speed-limits-title">Alternative Speed Limits</div></div>
          <div class="row" id="alternative-speed-limits-desc">Override normal speed limits manually or at scheduled times</div>
          <div class="row"><div class="key">Upload (kB/s):</div>
                                                               <div class="value"><input type="number" min="0" id="alt-speed-up"/></div></div>
          <div class="row"><div class="key">Download (kB/s):</div>
                                                               <div class="value"><input type="number" min="0" id="alt-speed-down"/></div></div>
          <div class="checkbox-row"><input type="checkbox" id="alt-speed-time-enabled"/><label for="alt-speed-time-enabled">Scheduled Times</label></div>
          <div class="row"><div class="key">From:</div>
                           <div class="value"><select id="alt-speed-time-begin"></select></div></div>
          <div class="row"><div class="key">To:</div>
                           <div class="value"><select id="alt-speed-time-end"></select></div></div>
          <div class="row"><div class="key"><label for="alt-speed-time-day">On days:</label></div>
                           <div class="value"><select id="alt-speed-time-day">
                   <option value="127">Everyday</option>
                  <option value="62">Weekdays</option>
                  <option value="65">Weekends</option>
                  <option value="1">Sunday</option>
                  <option value="2">Monday</option>
                  <option value="4">Tuesday</option>
                  <option value="8">Wednesday</option>
                  <option value="16">Thursday</option>
                  <option value="32">Friday</option>
                  <option value="64">Saturday</option></select></div></div>
        </div>
      </div>
    );
  }
}

export default SpeedTabPanel;
