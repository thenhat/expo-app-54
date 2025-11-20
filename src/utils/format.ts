const formatNumbers = (e: any, fixed?: number) => {
  let numberX: any;
  // if (e < 0) return numberX = 0;
  // if (!e) return 0;
  if (e && Number(e) !== 0) {
    numberX = e
      .toFixed(fixed ?? 2)
      .replace(/\.00$/, "")
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  } else {
    numberX = 0;
  }
  return numberX;
};

export const convertSecondToMinutes = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const formattedSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${formattedSeconds}`;
};

export function roundTimeQuarterHour(time: any) {
  var timeToReturn = new Date(time);

  timeToReturn.setMilliseconds(
    Math.ceil(timeToReturn.getMilliseconds() / 1000) * 1000
  );
  timeToReturn.setSeconds(Math.ceil(timeToReturn.getSeconds() / 60) * 60);
  timeToReturn.setMinutes(Math.ceil(timeToReturn.getMinutes() / 10) * 10);
  return timeToReturn;
}

export function formatDistance(n: number): string {
  if (!n) return "0M";
  return n < 1 ? `${Math.floor(n * 1000)} m` : `${Math.floor(n)}KM`;
}

export const maskName = (name: string, maskFullName = true): string => {
  const parts = name.split(" ");

  if (parts.length > 1) {
    // Trường hợp có họ và tên (Ví dụ: "Nguyễn Văn A")
    const firstPart = parts[0]; // Giữ nguyên họ
    const rest = parts.slice(1).join(" "); // Phần còn lại
    return firstPart + " " + "*".repeat(rest.length);
  } else {
    // Trường hợp chỉ có một từ (Ví dụ: "김재민")
    return name[0] + "*".repeat(name.length - 1);
  }
};

export default formatNumbers;
