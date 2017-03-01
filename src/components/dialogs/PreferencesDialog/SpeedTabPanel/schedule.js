const generateTimes = () => {
  const times = {};

  for (let i = 0; i < 24 * 4; ++i) {
    let hour = parseInt(i / 4, 10);
    let mins = ((i % 4) * 15);
    let value = i * 15;
    let content = hour + ':' + (mins || '00');

    times[value] = content;
  }

  return times;
}

export const times = generateTimes();
export const days = {
  '127': 'Everyday',
  '62': 'Weekdays',
  '65': 'Weekends',
  '1': 'Sunday',
  '2': 'Monday',
  '4': 'Tuesday',
  '8': 'Wednesday',
  '16': 'Thursday',
  '32': 'Friday',
  '64': 'Saturday',
}

export default {
  days,
  times
}
