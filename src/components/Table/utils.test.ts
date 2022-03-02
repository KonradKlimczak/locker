import { getSortList, isSortableColumn } from "./utils";

describe("isSortableColumn", () => {
  it("should return if column is sortable", () => {
    expect(isSortableColumn()).toBe(false);
    expect(isSortableColumn("")).toBe(false);
    expect(isSortableColumn("xczxsad")).toBe(false);

    expect(isSortableColumn("name")).toBe(true);
    expect(isSortableColumn("position")).toBe(true);
    expect(isSortableColumn("roundsTotal")).toBe(true);
    expect(isSortableColumn("score")).toBe(true);
    expect(isSortableColumn("strokesTotal")).toBe(true);
  });
});

describe("getSortList", () => {
  it("should return new sort list", () => {
    expect(getSortList([])).toStrictEqual([]);
    expect(getSortList([], "")).toStrictEqual([]);
    expect(getSortList([], "cxcxz")).toStrictEqual([]);

    expect(getSortList([], "name")).toStrictEqual([{ column: "name", direction: "asc" }]);
    expect(getSortList([{ column: "name", direction: "asc" }], "name")).toStrictEqual([
      { column: "name", direction: "desc" },
    ]);
    expect(getSortList([{ column: "name", direction: "asc" }], "position")).toStrictEqual([
      { column: "name", direction: "asc" },
      { column: "position", direction: "asc" },
    ]);
  });
});
