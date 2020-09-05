var chai = require("chai");
var expect = chai.expect;

const { testingDependency } = require("./app");
describe("testingDependency", function() {
  it("checking with empty array [] and dependency []", function() {
    expect(testingDependency([], [])).to.deep.equal([]);
  });

  it("checking with task [a,b] and dependency [ ] result [a, b]", function() {
    expect(testingDependency(["a", "b"], [])).to.deep.equal(["a", "b"]);
  });

  it("checking with task [a,b] and dependency ['a=>b'] result [b, a]", function() {
    expect(testingDependency(["a", "b"], ["a=>b"])).to.deep.equal(["b", "a"]);
  });

  it("checking with task [a,b,c,d] and dependency ['a=>b'] result [b, a, d, c]", function() {
    expect(
      testingDependency(["a", "b", "c", "d"], ["a=>b", "c=>d"])
    ).to.deep.equal(["b", "a", "d", "c"]);
  });

  it("checking with task [a,b,c] and dependency ['a => b','b => c'] result [c, b, a]", function() {
    expect(
      testingDependency(["a", "b", "c", "d"], ["a=>b", "b=>c"])
    ).to.deep.equal(["c", "b", "a"]);
  });

  it("checking with task [a,b,c,d] and dependency ['a => b','b => c','c => a'] result Error - this is a cyclic dependency", function() {
    expect(
      testingDependency(["a", "b", "c"], ["a=>b", "b=>c", "c=>a"])
    ).to.deep.equal(["Error - this is a cyclic dependency"]);
  });
});
