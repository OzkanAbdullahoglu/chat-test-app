/* eslint-disable linebreak-style */
export const timeConverter = (timeStamp) => {
  if (!timeConverter.cache) {
    timeConverter.cache = {};
  }

  if (!timeConverter.cache[timeStamp]) {
    const timeStampMs = timeStamp * 1000;
    const dateObj = new Date(timeStampMs);
    const dayOfMonth = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate();
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const curMonth = months[dateObj.getMonth()];
    const curYear = dateObj.getFullYear();
    const curMinute = dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : dateObj.getMinutes();
    const curHour = (dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : dateObj.getHours());

    timeConverter.cache[timeStamp] = {
      date: `${curMonth} ${dayOfMonth},${curYear}`,
      time: `${curHour}:${curMinute}`,
    };
    return timeConverter.cache[timeStamp];
  }
  return timeConverter.cache[timeStamp];
};
