import express from "express";
const router = express.Router();

// 🔥 MULTIPLE TESTS DATA
const tests = {
  1: {
    title: "Google SDE-1: Arrays & Strings",
    questions: [
      { question: "Time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], correctAnswer: 1 },
      { question: "Kadane algorithm used for?", options: ["Sorting", "Max subarray", "Graph", "Tree"], correctAnswer: 1 },
      { question: "Two pointer technique used in?", options: ["Arrays", "Graphs", "Trees", "DP"], correctAnswer: 0 },
      { question: "String reverse complexity?", options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"], correctAnswer: 0 },
      { question: "Prefix sum helps in?", options: ["Fast queries", "Sorting", "Graph", "Stack"], correctAnswer: 0 },
      { question: "Best DS for sliding window?", options: ["Queue", "Stack", "Tree", "Graph"], correctAnswer: 0 },
      { question: "Anagram check uses?", options: ["HashMap", "Graph", "Tree", "Stack"], correctAnswer: 0 },
      { question: "Longest substring problem uses?", options: ["Sliding window", "DFS", "BFS", "DP"], correctAnswer: 0 },
      { question: "Time complexity of merge sort?", options: ["O(n)", "O(n log n)", "O(log n)", "O(n^2)"], correctAnswer: 1 },
      { question: "Array index access?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], correctAnswer: 0 }
    ]
  },

  2: {
    title: "Amazon: System Design Basics",
    questions: [
      { question: "Load balancer ka use?", options: ["Traffic distribute", "Store data", "Encrypt", "None"], correctAnswer: 0 },
      { question: "CAP theorem me C ka matlab?", options: ["Consistency", "Cache", "Control", "Cluster"], correctAnswer: 0 },
      { question: "Horizontal scaling?", options: ["Add servers", "Upgrade server", "Delete server", "None"], correctAnswer: 0 },
      { question: "Cache use hota hai?", options: ["Speed increase", "Delete data", "Encrypt", "None"], correctAnswer: 0 },
      { question: "Database type?", options: ["SQL", "NoSQL", "Both", "None"], correctAnswer: 2 },
      { question: "CDN ka use?", options: ["Fast delivery", "Store DB", "Compile code", "None"], correctAnswer: 0 },
      { question: "Microservices ka benefit?", options: ["Scalability", "Slow system", "More bugs", "None"], correctAnswer: 0 },
      { question: "Queue use hota hai?", options: ["Async processing", "Sorting", "Graph", "Tree"], correctAnswer: 0 },
      { question: "Latency kya hai?", options: ["Delay", "Speed", "Memory", "CPU"], correctAnswer: 0 },
      { question: "API gateway kya karta hai?", options: ["Manage APIs", "Store data", "Compile", "None"], correctAnswer: 0 }
    ]
  },

  3: {
    title: "Google SDE-1: Trees & Graphs",
    questions: [
      { question: "DFS stands for?", options: ["Depth First Search", "Data File System", "Direct File Search", "None"], correctAnswer: 0 },
      { question: "BFS uses?", options: ["Queue", "Stack", "Tree", "Graph"], correctAnswer: 0 },
      { question: "Tree traversal types?", options: ["Inorder", "Preorder", "Postorder", "All"], correctAnswer: 3 },
      { question: "Binary tree max nodes at level L?", options: ["2^L", "L", "L^2", "None"], correctAnswer: 0 },
      { question: "Graph cycle detection uses?", options: ["DFS", "BFS", "DP", "Stack"], correctAnswer: 0 },
      { question: "Shortest path algorithm?", options: ["Dijkstra", "DFS", "Stack", "Queue"], correctAnswer: 0 },
      { question: "Adjacency list stores?", options: ["Edges", "Nodes", "Weights", "None"], correctAnswer: 0 },
      { question: "Topological sort works on?", options: ["DAG", "Tree", "Array", "Stack"], correctAnswer: 0 },
      { question: "Height of tree?", options: ["Max depth", "Nodes", "Edges", "None"], correctAnswer: 0 },
      { question: "Leaf node?", options: ["No child", "One child", "Two child", "None"], correctAnswer: 0 }
    ]
  },

  4: {
    title: "Microsoft: OOP Concepts",
    questions: [
      { question: "Encapsulation means?", options: ["Data hiding", "Inheritance", "Polymorphism", "None"], correctAnswer: 0 },
      { question: "Inheritance allows?", options: ["Reuse code", "Delete code", "Hide code", "None"], correctAnswer: 0 },
      { question: "Polymorphism means?", options: ["Many forms", "One form", "No form", "None"], correctAnswer: 0 },
      { question: "Abstraction means?", options: ["Hide details", "Show all", "Delete data", "None"], correctAnswer: 0 },
      { question: "Class is?", options: ["Blueprint", "Object", "Function", "None"], correctAnswer: 0 },
      { question: "Object is?", options: ["Instance", "Class", "Function", "None"], correctAnswer: 0 },
      { question: "Constructor is?", options: ["Init method", "Destroy method", "Loop", "None"], correctAnswer: 0 },
      { question: "Method overloading?", options: ["Same name diff params", "Same name same params", "None", "All"], correctAnswer: 0 },
      { question: "Method overriding?", options: ["Same method redefine", "Delete method", "None", "All"], correctAnswer: 0 },
      { question: "Access modifier?", options: ["public/private", "loop", "array", "none"], correctAnswer: 0 }
    ]
  }
};

// 🔥 GET TEST BY ID
router.get("/start/:id", (req, res) => {
  const id = req.params.id;
  res.json(tests[id] || tests[1]);
});

// 🔥 SUBMIT
router.post("/submit/:id", (req, res) => {
  const { answers } = req.body;
  const id = req.params.id;

  const test = tests[id] || tests[1];

  let score = 0;

  test.questions.forEach((q, i) => {
    if (q.correctAnswer === answers[i]) score++;
  });

  res.json({
    score,
    total: test.questions.length,
    percentage: (score / test.questions.length) * 100
  });
});

export default router;