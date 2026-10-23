import { describe, it, expect } from "vitest";
import { TOTAL_ITEMS, filterMenu, findCategoryOf } from "@/lib/menu";

describe("menu", () => {
  it("has 97 items", () => expect(TOTAL_ITEMS).toBe(97));
  it("T-Rex Burger lives in burgers", () => expect(findCategoryOf("T-Rex Burger")).toBe("burgers"));
  it("search with no match is empty", () => expect(filterMenu("all", "zzzz")).toEqual([]));
});
