import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export const configDayJS = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(advancedFormat);
};
