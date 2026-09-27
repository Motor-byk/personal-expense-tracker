import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { currentWeekKey, weekStartFromKey } from "./week.js";

describe("currentWeekKey()", () => {
    it("returns the monday of the week when weeks start on monday", () => {
        // wed sept 16 2026, noon in LA
        const now = new Date("2026-09-16T19:00:00Z");
        assert.equal(currentWeekKey("America/Los_Angeles", 1, now), "2026-09-14");
    });

    it("returns the sunday of the week when weeks start on sunday", () => {
        const now = new Date("2026-09-16T19:00:00Z");
        assert.equal(currentWeekKey("America/Los_Angeles", 0, now), "2026-09-13");
    });

    it("treats the start day itself as the start of the week", () => {
        const now = new Date("2026-09-14T19:00:00Z");
        assert.equal(currentWeekKey("America/Los_Angeles", 1, now), "2026-09-14");
    });

    it("crosses month and year boundaries", () => {
        // fri jan 1 2027 -> monday dec 28 2026
        const now = new Date("2027-01-01T20:00:00Z");
        assert.equal(currentWeekKey("America/Los_Angeles", 1, now), "2026-12-28");
    });

    it("uses the user's local date, not the UTC date", () => {
        // 2026-09-14T03:00Z is still sunday sept 13 in LA, so the previous monday week
        const now = new Date("2026-09-14T03:00:00Z");
        assert.equal(currentWeekKey("America/Los_Angeles", 1, now), "2026-09-07");
        assert.equal(currentWeekKey("UTC", 1, now), "2026-09-14");
    });
});

describe("weekStartFromKey()", () => {
    it("returns UTC midnight of the key's date", () => {
        assert.equal(weekStartFromKey("2026-09-14").toISOString(), "2026-09-14T00:00:00.000Z");
    });
});
