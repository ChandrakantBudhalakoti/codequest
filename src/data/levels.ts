export interface LevelQuiz {
  question: string;
  options: string[];
  answer: number;
}

export interface LevelPuzzle {
  blocks: string[];
  correctOrder: number[];
}

export interface Level {
  id: number;
  topic: string;
  learn: string;
  quiz: LevelQuiz;
  puzzle: LevelPuzzle;
  xpReward: number;
}

export const levels: Level[] = [
  {
    id: 1,
    topic: "Variables",
    learn: "Variables store values. In JavaScript, you can create a variable using 'let' or 'const'. Variables let you save data and use it later in your code.",
    quiz: {
      question: "Which is a valid variable declaration?",
      options: ["let score = 10", "10 = score", "score -> 10", "variable score 10"],
      answer: 0,
    },
    puzzle: {
      blocks: ["let score = 10;", "console.log(score);"],
      correctOrder: [0, 1],
    },
    xpReward: 10,
  },
  {
    id: 2,
    topic: "Strings",
    learn: "Strings are text values. In JavaScript, you wrap text in quotes (single or double). You can combine strings using the + operator.",
    quiz: {
      question: "How do you create a string in JavaScript?",
      options: ["string hello", "hello", '"hello"', "text: hello"],
      answer: 2,
    },
    puzzle: {
      blocks: ['let name = "CodeQuest";', 'console.log("Hello " + name);'],
      correctOrder: [0, 1],
    },
    xpReward: 15,
  },
  {
    id: 3,
    topic: "Numbers",
    learn: "Numbers in JavaScript don't need quotes. You can add, subtract, multiply, and divide numbers to perform calculations.",
    quiz: {
      question: "What is the result of 5 + 3 in JavaScript?",
      options: ["53", "8", "5 + 3", "undefined"],
      answer: 1,
    },
    puzzle: {
      blocks: ["let a = 5;", "let b = 3;", "let sum = a + b;", "console.log(sum);"],
      correctOrder: [0, 1, 2, 3],
    },
    xpReward: 20,
  },
  {
    id: 4,
    topic: "Conditionals",
    learn: "Conditionals let your code make decisions. The 'if' statement runs code only when a condition is true. Use comparison operators like >, <, ===.",
    quiz: {
      question: "Which operator checks if two values are equal?",
      options: ["=", "==", "===", "equals"],
      answer: 2,
    },
    puzzle: {
      blocks: ["let age = 16;", "if (age >= 18) {", "  console.log('Adult');", "} else {", "  console.log('Minor');", "}"],
      correctOrder: [0, 1, 2, 3, 4, 5],
    },
    xpReward: 25,
  },
  {
    id: 5,
    topic: "Functions",
    learn: "Functions are reusable blocks of code. You define them with 'function' and call them by name. Functions can take parameters and return values.",
    quiz: {
      question: "How do you call a function named greet?",
      options: ["call greet()", "greet()", "function greet()", "run greet"],
      answer: 1,
    },
    puzzle: {
      blocks: ["function sayHello() {", '  console.log("Hello!");', "}", "sayHello();"],
      correctOrder: [0, 1, 2, 3],
    },
    xpReward: 30,
  },
];
