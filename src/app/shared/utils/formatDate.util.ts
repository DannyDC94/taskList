export function getDateTime() {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/Guayaquil",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };
    return now.toLocaleString("es-EC", options);
}

export function formatTimestamp(timestamp: { _seconds: number; _nanoseconds: number }): string {
    // eslint-disable-next-line no-underscore-dangle
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}