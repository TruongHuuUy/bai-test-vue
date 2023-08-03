export const dateFormated = (currentDate: Date): string => {
    return currentDate.getUTCFullYear() + "-" +
        ("0" + (currentDate.getUTCMonth() + 1)).slice(-2) + "-" +
        ("0" + currentDate.getUTCDate()).slice(-2) + " " +
        ("0" + (currentDate.getUTCHours() + 7)).slice(-2) + ":" +
        ("0" + currentDate.getUTCMinutes()).slice(-2) + ":" +
        ("0" + currentDate.getUTCSeconds()).slice(-2);
}