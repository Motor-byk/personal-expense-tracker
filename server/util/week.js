import Week from "../model/Week.js";
import User from "../model/User.js";

const WEEKDAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

// returns the "YYYY-MM-DD" key of the week containing `now`, in the user's timezone
export function currentWeekKey(timezone, weekStartsOn, now = new Date()) {
    const parts = Object.fromEntries(
        new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            year: "numeric",
            month: "numeric",
            day: "numeric",
            weekday: "short",
        }).formatToParts(now).map(p => [p.type, p.value])
    );

    const daysSinceStart = (WEEKDAYS[parts.weekday] - weekStartsOn + 7) % 7;
    const start = new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day) - daysSinceStart));
    return start.toISOString().slice(0, 10);
}

export function weekStartFromKey(key) {
    const [y, m, d] = key.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d));
}

export async function getOrCreateCurrentWeek(userId) {
    const user = await User.findById(userId);
    if (!user) {
        return null;
    }

    const weekKey = currentWeekKey(user.timezone, user.weekStartsOn);
    const filter = { userId, weekKey };
    try {
        return await Week.findOneAndUpdate(
            filter,
            { $setOnInsert: { weekStart: weekStartFromKey(weekKey), startingBalance: user.weeklyAllowance } },
            { upsert: true, returnDocument: "after" }
        );
    } catch (err) {
        // two requests raced to create the same week; the other one won
        if (err.code === 11000) {
            return await Week.findOne(filter);
        }
        throw err;
    }
}
