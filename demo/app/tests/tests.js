var Dynatrace = require("nativescript-dynatrace").Dynatrace;
var dynatrace = new Dynatrace();

describe("greet function", function() {
    it("exists", function() {
        expect(dynatrace.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(dynatrace.greet()).toEqual("Hello, NS");
    });
});