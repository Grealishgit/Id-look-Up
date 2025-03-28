// utils.js

export const getRemainingTimeUntil5PM = () => {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(17, 0, 0, 0); // 5 PM today

    const difference = endOfDay - now;

    if (difference <= 0) {
        return "The day has ended.";
    }

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
};
