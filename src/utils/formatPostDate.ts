import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import 'dayjs/locale/en';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

dayjs.locale('ko');

export const formatPostDate = (createdAt: string): string => {
  const now = dayjs().tz('Asia/Seoul');
  const postTime = dayjs(createdAt).tz('Asia/Seoul');
  const diffInHours = now.diff(postTime, 'hour');

  if (diffInHours >= 24) {
    return postTime.locale('en').format('MMM D. YYYY.');
  } else {
    return postTime.fromNow();
  }
};
