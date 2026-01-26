// utils/datetime.helper.ts

/**
 * Rellena la hora si viene solo fecha o null
 * @param date Date | string | null
 * @param type "start" | "end"
 */
export function fullTimeHelper(
  date: Date | string | null,
  type: "start" | "end"
): Date | null {
  if (!date) return null;

  const d = new Date(date);

  // Si no tiene hora definida (00:00:00)
  if (
    d.getHours() === 0 &&
    d.getMinutes() === 0 &&
    d.getSeconds() === 0
  ) {
    if (type === "start") {
      // 00:00:00
      d.setHours(0, 0, 0, 0);
    } else {
      // 23:59:59
      d.setHours(23, 59, 59, 999);
    }
  }

  return d;
}
