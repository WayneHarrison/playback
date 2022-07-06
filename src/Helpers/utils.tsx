export function SecondsToHoursMinutesSeconts(seconds: number) {
  // Hours, minutes and seconds
  var hrs = ~~(seconds / 3600);
  var mins = ~~((seconds % 3600) / 60);
  var secs = ~~seconds % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}
