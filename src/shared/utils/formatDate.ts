export function formatDate(input: Date | string) {
    const date = input instanceof Date ? input : new Date(input);

    const pad = (n: number) => n.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months are zero-indexed
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatDateYYDDMM(input: Date | string) {
    const date = input instanceof Date ? input : new Date(input);

    const pad = (n: number) => n.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months are zero-indexed
    const day = pad(date.getDate());

    return `${year}-${day}-${month}`;
}