import Moment from "moment";
import moment from "moment-timezone";
import "moment/locale/ko";

const days = ["일", "월", "화", "수", "목", "금", "토"];

var currentDate = new Date();

export function convertDate(targetDate: string): Date {
  const koreaTime = new Date(targetDate).toLocaleString("en-US", {
    timeZone: "Asia/Tokyo",
  });

  return new Date(koreaTime);
}

export function getMorningAndAfternoonString(hour: number): string {
  const morningStr = "오전";
  const afternoonStr = "오후";

  if (hour < 12) {
    return `${morningStr} ${fillZero(hour)}`;
  }
  if (hour === 12) {
    hour += 12;
  }
  return `${afternoonStr} ${fillZero(hour - 12)}`;
}

export function fillZero(targetNumber: number): string {
  if (targetNumber < 10) {
    return `0${targetNumber}`;
  }
  return `${targetNumber}`;
}

export function getKoreanDateString(at: string) {
  const atDate = convertDate(at);

  const atDateStr = `${fillZero(atDate.getFullYear())}년 ${fillZero(
    atDate.getMonth() + 1
  )}월 ${fillZero(atDate.getDate())}일 (${days[atDate.getDay()]})`;

  const noon = getMorningAndAfternoonString(atDate.getHours());
  const time = `${noon}:${fillZero(atDate.getMinutes())}`;

  return `${atDateStr} ${time}`;
}

export function calculateStringOfDateRange(
  startAt: string,
  endAt: string
): string {
  const startAtDate = convertDate(startAt);
  const endAtDate = convertDate(endAt);

  const startDateStr = `${fillZero(startAtDate.getFullYear())}년 ${fillZero(
    startAtDate.getMonth() + 1
  )}월 ${fillZero(startAtDate.getDate())}일 (${days[startAtDate.getDay()]})`;
  const startHour = getMorningAndAfternoonString(startAtDate.getHours());
  const endHour = getMorningAndAfternoonString(endAtDate.getHours());

  const startTimeStr = `${startHour}:${fillZero(startAtDate.getMinutes())}`;
  const endTimeStr = `${endHour}:${fillZero(endAtDate.getMinutes())}`;
  const isSameDate =
    startAtDate.getFullYear() === endAtDate.getFullYear() &&
    startAtDate.getMonth() === endAtDate.getMonth() &&
    startAtDate.getDate() === endAtDate.getDate();

  if (isSameDate) {
    return `${startDateStr}\n${startTimeStr} - ${endTimeStr}`;
  }

  const endDateStr = `${fillZero(endAtDate.getMonth() + 1)}월 ${fillZero(
    endAtDate.getDate()
  )}일 (${days[endAtDate.getDay()]})`;

  return `${startDateStr} ${startTimeStr}\n- ${endDateStr} ${endTimeStr}`;
}

export function convertToDay(date: any) {
  const newDate = new Date(date);
  const dayNumber = newDate.getDay();
  const nowH = moment(newDate).format("HH:mm");

  // const currentDay = new Date().getDay();

  if (
    moment(newDate).format("YYYY-MM-DD") ===
    moment(new Date()).format("YYYY-MM-DD")
  ) {
    return "오늘" + " " + nowH;
  } else {
    return `${moment(newDate).format("YYYY-MM-DD")} (${days[dayNumber]}) ${nowH}`;
  }
}

export function roundTimeQuarterHour(time: any) {
  var timeToReturn = new Date(time);

  timeToReturn.setMilliseconds(
    Math.ceil(timeToReturn.getMilliseconds() / 1000) * 1000
  );
  timeToReturn.setSeconds(Math.ceil(timeToReturn.getSeconds() / 60) * 60);
  timeToReturn.setMinutes(Math.ceil(timeToReturn.getMinutes() / 10) * 10);
  return timeToReturn;
}

export const formatDate = (startTime: string, endTime: string): string => {
  const start = moment(startTime);
  const end = moment(endTime);

  const dayOfWeek = days[start.day()];
  const formattedDate = `${start.format("YYYY-MM-DD")} (${dayOfWeek})`;
  const formattedTime = `${start.format("HH:mm")} – ${end.format("HH:mm")}`;

  return `${formattedDate}\t${formattedTime}`;
};

export const formatDate2 = (dateString: string): string => {
  const date = moment(dateString);
  const dayOfWeek = days[date.day()];
  return `${date.format("YYYY-MM-DD")} (${dayOfWeek}) ${date.format("HH:mm")}`;
};
