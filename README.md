#### 1) What is the difference between var, let, and const?
## Ans: 
In JavaScript var, let and const are keywords used to declare variables, but they differ in scope, hoisting behavior, redeclaration, reassignment and initialization. These differences were introduced with ES6 ,where let and const were added to address limitations of var. Understanding them help prevent bugs and write more predictable code in modern JavaScript. Var is generally avoided in favor of let and const for better scoping and clarity. Var is function Scoped but let and const are blocked scoped. Var hoisted to the top of the scope and initialized with undefine. And let and const are hoisted but temporal dead zone until the declaration line, throw a reference error.  Var allowed redeclaration in the same scope. But let and const not allow redeclaration. It’s thrown syntax error. Var and let allow reassignment but const don’t allow reassignment.

#### 2) What is the difference between map(), forEach(), and filter()? 
## Ans: 
map(), forEach(), and filter() are common methods that iterate over array element and accept callback functions. map() create a new array with modifying the original. forEach() just a loops. It doesn’t return a new array with the result. Filter() create a smaller or  equal-length array.

#### 3) What are arrow functions in ES6?
## Ans: 
ES6 arrow function is sorter and cleaner way to write functions in JavaScript.  Arrow functions provide a shorter syntax compared to regular functions, especially for simple on line functions. No building of this unlike regular functions , arrow functions don’t have their own this context. They inherit this from the surrounding (lexical) scope. arrow functions can’t be used as constructors and will throw an error when used with the new keyword. arrow functions don’t have their own arguments object. Use rest parameters (…args) if need to access all arguments.

#### 4) How does destructuring assignment work in ES6?
## Ans:
In ES6, destructuring assignment is a syntax that allows you to unpack values from arrays or properties from objects into separate variables in a concise way. Array destructuring: Unpacks values based on their position (index). Object destructuring unpacks values based on property names (keys). It also supports features like default values, renaming variables, skipping unwanted values, and nested destructuring.

#### 5) Explain template literals in ES6. How are they different from string concatenation?
## Ans: 
An ES6 template literal is a string that’s constructed, not with quotes, but with backticks (`). They make adding in variable/expressions into a string with ${} easier, and allows multi-line strings without needing I guess the primary difference to string concatenation, is that with concatenation, you must remember to use the + operator, and also manually add new lines to keep the code clean enough to read. Template literals afford a cleaner, more readable syntax and make working with dynamic strings far easier.
