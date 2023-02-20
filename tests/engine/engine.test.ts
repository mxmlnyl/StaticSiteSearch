import Search from "../../src/index";
describe("SSS Engine", () => {
  describe("Import", () => {
    it("indexes properly", () => {
      console.log(
        Search.index<{ title: string; id: number }>([{ title: "test", id: 1 }])
      );
    });
  });
});
