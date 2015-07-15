describe("SplytUtil", function(){
	describe("is_float()", function(){
		it("should know that strings are not floats", function(){
			expect(SplytUtil.is_float("not a float")).toBeFalsy();
		});

		it("should know that arrays are not floats", function(){
			expect(SplytUtil.is_float([])).toBeFalsy();
		});

		it("should know that objects are not floats", function(){
			expect(SplytUtil.is_float({})).toBeFalsy();
		});

		it("should know that integers are not floats", function(){
			expect(SplytUtil.is_float(5)).toBeFalsy();
		});

		it("should know that floats that javascript natively rounds are not floats", function(){
			expect(SplytUtil.is_float(5.0)).toBeFalsy();
		});

		it("should know that floats are floats", function(){
			expect(SplytUtil.is_float(5.1)).toBeTruthy();
		});
	});

	describe("gettype()", function(){
		it("should know that objects are objects", function(){
			expect(SplytUtil.gettype({})).toEqual("object");
		});

		it("should know that arrays are arrays", function(){
			expect(SplytUtil.gettype([])).toEqual("array");
		});

		it("should know that strings are strings", function(){
			expect(SplytUtil.gettype("hello i'm a string")).toEqual("string");
		});

		it("should know that strings that solely contain numbers are still strings", function(){
			expect(SplytUtil.gettype("5")).toEqual("string");
		});

		it("should know that integers are integers", function(){
			expect(SplytUtil.gettype(100)).toEqual("integer");
		});

		it("should know that floats are doubles...lol", function(){
			expect(SplytUtil.gettype(5.67)).toEqual("double");
		});

		it("should have some tests for 'null', 'number', 'date', 'resource', and 'regexp'", function(){

		});
	});

	describe("settype()", function(){
		it("should have some tests...", function(){

		});
	});
});