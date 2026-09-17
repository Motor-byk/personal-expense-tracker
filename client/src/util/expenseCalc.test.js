import { describe, it, expect } from 'vitest';
import { toStringCents } from "./expenseCalc";

describe("expenseCalc utils", () => {
    describe("toCents()", () => {
        it("should change number to correct decimal place", () => {
            expect(toStringCents(10000)).toBe("$100.00");
            expect(toStringCents(99)).toBe("$0.99");
            expect(toStringCents(-100)).toBe("$-1.00");
        });
        
        it("should throw error if not a positive int", () => {
            expect(() => {toStringCents(0.01)}).toThrow("Must be a positive int");
            expect(() => {toStringCents(null)}).toThrow("Must be a positive int");
            expect(() => {toStringCents()}).toThrow("Must be a positive int");
        })
    });
});

