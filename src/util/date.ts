import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDate(date: Date | string | number, format = "M/D HH:mm"): string {
    return dayjs(date).tz("Asia/Tokyo").format(format);
}
