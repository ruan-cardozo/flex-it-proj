import { format, toZonedTime } from 'date-fns-tz';

export function parseDate(data: string) {
    // Cria uma data a partir da string e força para UTC
    const utcDate = new Date(data);
    const zonedDate = toZonedTime(utcDate, 'UTC');
    return format(zonedDate, 'dd/MM/yyyy', { timeZone: 'UTC' });
}