/* eslint-disable no-void */
/* eslint-disable no-template-curly-in-string */
context = describe;

/** *******************************
********* PAIR PROGRAMMING *********
********************************* */

describe('`let` restricts the scope of the variable to the current block - ', () => {
  describe('`let` vs. `var`.', () => {
    it('`var` works as usual, it does not restricts scope', () => {
      if (true) {
        /* You should add your code in here */
        var varX = true;
      }
      expect(varX).toBe(true);
    });

    it('`let` restricts scope to inside the block', () => {
      /* var or const? letX = false */
      const letX = false;
      if (true) {
        const letX = true;
      }
      expect(letX).toBe(false);
    });

    it('`var` does not restricts scope to inside the block in `for` loops', () => {
      var counter = 100;
      for (var counter = 1; counter < 50; counter++) {}

      expect(counter).toBe(50);
    });

    it('`let` restricts scope to inside the block also in `for` loops', () => {
      const counter = 100;
      for (let counter = 1; counter < 50; counter++) {}

      expect(counter).toBe(100);
    });
  });
});

describe('`const` is like `let` plus read-only. ', () => {
  describe('scalar values are read-only', () => {
    it('number are read-only', () => {
      const constNum = 0;
      // constNum = 1;

      expect(constNum).toBe(0);
    });

    it('string are read-only', () => {
      const constString = 'I am a const';
      // constString = "Cant change you?";

      expect(constString).toBe('I am a const');
    });
  });

  const notChangeable = 23;

  it('const scope leaks too', () => {
    expect(notChangeable).toBe(23);
  });

  describe('complex types are NOT fully read-only', () => {
    it('arrays is not fully read-only', () => {
      const arr = [42, 23];
      arr[0] = 0;
      expect(arr[0]).toBe(0);
    });

    it('objects are not fully read-only', () => {
      const obj = { x: 1 };
      obj.x = 2;
      expect(obj.x).toBe(2);
    });
  });
});

describe('`string.includes()` finds string within another string. ', () => {
  describe('find a single character', () => {
    it('in a three char string', () => {
      const searchString = 'xyz sdfhygsdf';
      expect(searchString.includes('xyz')).toBe(true);
    });
    it('reports false if character was not found', () => {
      const expected = 'xyz';
      expect(expected.includes('abc')).toBe(false);
    });
  });

  describe('find a string', () => {
    it('that matches exactly', () => {
      const findSome = aux => aux.includes('xyz');
      expect(findSome('xyz')).toBe(true);
    });
  });

  describe('search for an empty string, is always true', () => {
    it('in an empty string', () => {
      const x = '';
      expect(x.includes('')).toBe(true);
    });
    it('in `abc`', () => {
      const x = 'abc';
      expect(x.includes('')).toBe(true);
    });
  });

  describe('takes a position from where to start searching', () => {
    xit('does not find `a` after position 1 in `abc`', () => {
      const aux = 'abc';
      expect(aux.includes('a', 1)).toBe(false);
    });
    xit('even the position gets coerced', () => {
      /* const findAtPosition = (pos) => 'xyz'.includes(?????); */
      // expect(findAtPosition('2')).toBe(true);
    });
    describe('invalid positions get converted to 0', () => {
      xit('e.g. `undefined`', () => {
        /* const findAtPosition = (pos) => 'xyz'.includes(?????); */
        // expect(findAtPosition(void 0)).toBe(true);
      });
      xit('negative numbers', () => {
        /* const findAtPosition = (pos) => 'xyz'.includes(????); */
        // expect(findAtPosition(-2)).toBe(true);
      });
      xit('NaN', () => {
        /* const findAtPosition = (pos) => 'xyz'.includes(?????); */
        // expect(findAtPosition(NaN)).toBe(true);
      });
    });
  });
});

describe('a template string, is wrapped in ` (backticks) instead of \' or ". ', () => {
  describe('by default, behaves like a normal string', () => {
    it('just surrounded by backticks', () => {
      const str = 'like a string';
      expect(str).toEqual('like a string');
    });
  });

  const x = 42;
  const y = 23;

  describe('can evaluate variables, which are wrapped in "${" and "}"', () => {
    it('e.g. a simple variable "${x}" just gets evaluated', () => {
      const evaluated = `x=${x}`;
      expect(evaluated).toBe(`x=${x}`);
    });

    it('multiple variables get evaluated too', () => {
      const evaluated = `${x}+${y}`;
      expect(evaluated).toBe(`${x}+${y}`);
    });
  });

  describe('can evaluate any expression, wrapped inside "${...}"', () => {
    it('all inside "${...}" gets evaluated', () => {
      const evaluated = Number(`${x + y}`);
      expect(evaluated).toBe(x + y);
    });

    it('inside "${...}" can also be a function call', () => {
      function getSchool() {
        return 'Ironhack';
      }
      const evaluated = getSchool();
      expect(`${getSchool()}`).toBe('Ironhack');
    });
  });
});

describe('The object literal allows for new shorthands. ', () => {
  const x = 1;
  const y = 2;

  describe('with variables', () => {
    it('the short version for `{y: y}` is {y}', () => {
      const short = { y };
      expect(short).toEqual({ y });
    });
    it('works with multiple variables too', () => {
      const short = { x, y };
      expect(short).toEqual({ x, y });
    });
  });

  describe('with methods', () => {
    const func = () => func;

    it('using the name only uses it as key', () => {
      const short = { func };
      expect(short).toEqual({ func });
    });

    xit('a different key must be given explicitly, just like before ES6', () => {
      const short = { func };
      expect(short).toEqual({ otherKey: func });
    });
  });
});

describe('destructuring arrays makes shorter code. ', () => {
  it('extract value from array, e.g. extract 0 into x like so `let [x] = [0];`', () => {
    const firstValue = [1];
    const [x] = firstValue;
    expect(x).toEqual(1);
  });

  it('swap two variables, in one operation', () => {
    let [x, y] = ['ax', 'why'];
    [x, y] = [y, x];
    expect([x, y]).toEqual(['why', 'ax']);
  });

  it('leading commas', () => {
    const all = ['ax', 'why', 'zet'];
    const [,, z] = all;
    expect(z).toEqual('zet');
  });

  it('extract from nested arrays', () => {
    const user = [['Some', 'One'], 23];
    const [[firstName, surname], age] = user;

    const expected = 'Some One = 23 years';
    expect(`${firstName} ${surname} = ${age} years`).toEqual(expected);
  });

  it('chained assignments', () => {
    let c; let d;
    const [a, b] = [c, d] = [1, 2];
    expect([a, b, c, d]).toEqual([1, 2, 1, 2]);
  });
});

describe('destructuring also works on strings. ', () => {
  it('destructure every character', () => {
    const [a, b, c] = 'abc';
    expect([a, b, c]).toEqual(['a', 'b', 'c']);
  });

  it('missing characters are undefined', () => {
    const [a, b, c] = 'ab';
    expect(c).toEqual(void 0);
  });
});

describe('destructuring objects. ', () => {
  it('is simple', () => {
    const { x } = { x: 1 };
    expect(x).toEqual(1);
  });

  describe('nested', () => {
    it('multiple objects', () => {
      const magic = { first: 23, second: 42 };
      const { first, second }  = magic;
      expect(second).toEqual(42);
    });
    it('object and array', () => {
      const { z:[, x] } = { z: [23, 42] };
      expect(x).toEqual(42);
    });
    it('array and object', () => {
      const [, [{ lang }]] = [null, [{ env: 'browser', lang: 'ES6' }]];
      expect(lang).toEqual('ES6');
    });
  });

  describe('interesting', () => {
    it('missing refs become undefined', () => {
      const { z } = { x: 1, y: 2 };
      expect(z).toEqual(void 0);
    });
  });
});

describe('destructuring can also have default values. ', () => {
  it('for an empty array', () => {
    const [a = 1] = [];
    expect(a).toEqual(1);
  });

  it('for a missing value', () => {
    const [a, b = 2, c] = [1,, 3];
    expect(b).toEqual(2);
  });

  it('in an object', () => {
    const [a, b = 2] = [{ a: 1 }];
    expect(b).toEqual(2);
  });

  it('if the value is undefined', () => {
    const { a, b = 2 } = { a: 1, b: void 0 };
    expect(b).toEqual(2);
  });

  it('also a string works with defaults', () => {
    const [a, b = 2] = '1';
    expect(a).toEqual('1');
    expect(b).toEqual(2);
  });
});

/** *******************************
********* DAILY EXERCISE *********
********************************* */

describe('arrow functions. ', () => {
  it('are shorter to write', () => {
    const func = () => {
      /* ........ */
    };
    // expect(func()).toBe('I am func');
  });

  it('a single expression, without curly braces returns too', () => {
    /* let func = () => .........; */
    // expect(func()).toBe('I return too');
  });

  it('one parameter can be written without parens', () => {
    /* let func = ........; */
    // expect(func(25)).toEqual(24)
  });

  it('many params require parens', () => {
    /* let func = ........; */
    // expect(func(23,42)).toEqual(23+42)
  });

  it('body needs parens to return an object', () => {
    const func = () => { 'an object'; };
    // expect(func()).toEqual({iAm: 'an object'});
  });

  class LexicallyBound {
    getFunction() {
      return () => new LexicallyBound() /* changes might go here */
      ;
    }

    getArgumentsFunction() {
      return function () { return arguments; }; /* or here */
    }
  }

  describe('arrow functions have lexical `this`, no dynamic `this`', () => {
    it('bound at definition time, use `=>` ', () => {
      const bound = new LexicallyBound();
      const fn = bound.getFunction();

      // expect(fn()).toBe(bound);
    });

    it('can NOT bind a different context', () => {
      const bound = new LexicallyBound();
      const fn = bound.getFunction();
      const anotherObj = {};
      const expected = anotherObj; // change this

      // expect(fn.call(anotherObj)).toBe(expected);
    });

    it('`arguments` doesnt work inside arrow functions', () => {
      const bound = new LexicallyBound();
      const fn = bound.getArgumentsFunction();

      // expect(fn(1, 2).length).toEqual(0);
    });
  });
});

describe('destructuring function parameters. ', () => {
  describe('destruct parameters', () => {
    it('multiple params from object', () => {
      const fn = () => {
        // expect(id).toEqual(42);
        // expect(name).toEqual('Wolfram');
      };
      const user = { name: 'Wolfram', id: 42 };
      fn(user);
    });

    it('multiple params from array/object', () => {
      const fn = ([]) => {
        // expect(name).toEqual('Alice');
      };
      const users = [{ name: 'nobody' }, { name: 'Alice', id: 42 }];
      fn(users);
    });
  });

  describe('default values', () => {
    it('for simple values', () => {
      const fn = (id, name) => {
        // expect(id).toEqual(23);
        // expect(name).toEqual('Bob');
      };
      fn(23);
    });

    it('for a missing array value', () => {
      const defaultUser = { id: 23, name: 'Joe' };
      const fn = ([user]) => {
        // expect(user).toEqual(defaultUser);
      };
      fn([]);
    });

    it('mix of parameter types', () => {
      const fn = (id, [arr], { obj }) => {
        // expect(id).toEqual(1);
        // expect(arr).toEqual(2);
        // expect(obj).toEqual(3);
      };
      fn(void 0, [], {});
    });
  });
});

describe('assign object property values to new variables while destructuring. ', () => {
  describe('for simple objects', () => {
    it('use a colon after the property name, like so `propertyName: newName`', () => {
      const { x } = { x: 1 };
      // expect(y).toEqual(1);
    });

    it('assign a new name and give it a default value using `= <default value>`', () => {
      const { x } = { y: 23 };
      // expect(y).toEqual(42);
    });
  });

  describe('for function parameter names', () => {
    it('do it the same way, with a colon behind it', () => {
      const fn = ({ x }) => {
        // expect(y).toEqual(1);
      };
      fn({ x: 1 });
    });

    it('giving it a default value is possible too, like above', () => {
      const fn = ({ x }) => {
        // expect(y).toEqual(3);
      };
      fn({});
    });
  });
});

describe('rest with destructuring', () => {
  it('rest parameter must be last', () => {
    const [all] = [1, 2, 3, 4];
    // expect(all).toEqual([1, 2, 3, 4]);
  });

  it('assign rest of an array to a variable', () => {
    const [all] = [1, 2, 3, 4];
    // expect(all).toEqual([2, 3, 4]);
  });
});

describe('spread with arrays. ', () => {
  it('extracts each array item', () => {
    const [] = [...[1, 2]];
    // expect(a).toEqual(1);
    // expect(b).toEqual(2);
  });

  it('in combination with rest', () => {
    const [a, b, ...rest] = [...[0, 1, 2, 3, 4, 5]];
    // expect(a).toEqual(1);
    // expect(b).toEqual(2);
    // expect(rest).toEqual([3, 4, 5]);
  });

  it('spreading into the rest', () => {
    const [...rest] = [...[, 1, 2, 3, 4, 5]];
    // expect(rest).toEqual([1, 2, 3, 4, 5]);
  });

  describe('used as function parameter', () => {
    it('prefix with `...` to spread as function params', () => {
      const magicNumbers = [];
      const fn = ([magicA, magicB]) => {
        // expect(magicNumbers[0]).toEqual(magicA);
        // expect(magicNumbers[1]).toEqual(magicB);
      };
      fn(magicNumbers);
    });
  });
});

describe('spread with strings', () => {
  it('simply spread each char of a string', () => {
    const [b, a] = ['ba'];
    // expect(a).toEqual('a');
    // expect(b).toEqual('b');
  });

  it('works anywhere inside an array (must not be last)', () => {
    const letters = ['a', 'bcd', 'e', 'f'];
    // expect(letters.length).toEqual(6);
  });
});


describe('class creation', () => {
  it('is as simple as `class XXX {}`', () => {
    const TestClass = {};

    // const instance = new TestClass();
    // expect(typeof instance).toBe('object');
  });

  it('class is block scoped', () => {
    class Inside {}
    { class Inside {} }
    // expect(typeof Inside).toBe('undefined');
  });

  it('special method is `constructor`', () => {
    class User {
      constructor(id) {

      }
    }

    const user = new User(42);
    // expect(user.id).toEqual(42);
  });

  it('defining a method is simple', () => {
    class User {

    }

    const notATester = new User();
    // expect(notATester.writesTests()).toBe(false);
  });

  it('multiple methods need no commas (opposed to object notation)', () => {
    class User {
      wroteATest() { this.everWroteATest = true; }

      isLazy()     {  }
    }

    const tester = new User();
    // expect(tester.isLazy()).toBe(true);
    tester.wroteATest();
    // expect(tester.isLazy()).toBe(false);
  });

  it('anonymous class', () => {
    const classType = typeof {};
    // expect(classType).toBe('function');
  });
});
