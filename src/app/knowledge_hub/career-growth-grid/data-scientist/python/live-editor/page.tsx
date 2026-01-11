"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface PyodideType {
  loadPyodide: () => Promise<any>;
  runPythonAsync: (code: string) => Promise<string>;
}

declare global {
  interface Window {
    pyodide: PyodideType;
  }
}

const CODE_EXAMPLES = [
  {
    name: "Hello World",
    code: 'print("Hello, Python World!")',
  },
  {
    name: "Variables & Strings",
    code: `name = "Alice"
age = 25
print(f"{name} is {age} years old")`,
  },
  {
    name: "Lists & Loops",
    code: `fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(f"I like {fruit}!")`,
  },
  {
    name: "Dictionary",
    code: `student = {
    "name": "John",
    "grade": "A",
    "courses": 3
}
print(f"Name: {student['name']}")
print(f"Grade: {student['grade']}")`,
  },
  {
    name: "Functions",
    code: `def calculate_average(numbers):
    return sum(numbers) / len(numbers)

scores = [85, 90, 88, 92]
avg = calculate_average(scores)
print(f"Average score: {avg:.2f}")`,
  },
  {
    name: "NumPy Arrays",
    code: `import numpy as np

# Create arrays
arr = np.array([1, 2, 3, 4, 5])
print(f"Array: {arr}")
print(f"Mean: {arr.mean()}")
print(f"Sum: {arr.sum()}")`,
  },
  {
    name: "List Comprehension",
    code: `# Square numbers from 1 to 10
squares = [x**2 for x in range(1, 11)]
print("Squares:", squares)

# Filter even numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [n for n in numbers if n % 2 == 0]
print("Even numbers:", evens)`,
  },
  {
    name: "Classes & Objects",
    code: `class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def bark(self):
        return f"{self.name} says: Woof!"

dog = Dog("Buddy", 3)
print(dog.bark())
print(f"{dog.name} is {dog.age} years old")`,
  },
];

export default function LivePythonEditor() {
  const [code, setCode] = useState('print("Hello, Python!")');
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const pyodideRef = useRef<any>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const initPyodide = async () => {
      try {
        // Load Pyodide
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
        script.async = true;
        script.onload = async () => {
          const pyodide = await window.pyodide.loadPyodide();
          pyodideRef.current = pyodide;
          setLoading(false);
          setOutput("✅ Python ready! Click 'Run Code' to execute.");
        };
        document.head.appendChild(script);
      } catch (err) {
        setError("Failed to load Python runtime");
        setLoading(false);
      }
    };

    initPyodide();
  }, []);

  const runCode = async () => {
    if (!pyodideRef.current) {
      setError("Python runtime not ready yet");
      return;
    }

    setRunning(true);
    setError("");
    setOutput("");

    try {
      // Redirect print output
      const pythonCode = `
import sys
from io import StringIO

# Capture output
old_stdout = sys.stdout
sys.stdout = StringIO()

try:
    exec("""${code.replace(/"/g, '\\"').replace(/\n/g, "\\n")}""")
    output = sys.stdout.getvalue()
    sys.stdout = old_stdout
    print(output)
except Exception as e:
    sys.stdout = old_stdout
    print(f"Error: {str(e)}")
`;

      const result = await pyodideRef.current.runPythonAsync(pythonCode);
      setOutput(result || "Code executed successfully!");
    } catch (err: any) {
      setError(err.message || "Error executing code");
      setOutput("");
    } finally {
      setRunning(false);
    }
  };

  const loadExample = (exampleCode: string) => {
    setCode(exampleCode);
    setOutput("");
    setError("");
  };

  const clearCode = () => {
    setCode("");
    setOutput("");
    setError("");
    editorRef.current?.focus();
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Navigation */}
      <nav className="mb-6">
        <Link
          href="/knowledge_hub/career-growth-grid/data-scientist/python"
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          ← Back to Python Learning
        </Link>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          💻 Live Python Editor
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Run Python code directly in your browser. Perfect for practicing and
          experimenting!
        </p>
      </div>

      {/* Status */}
      {loading && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg">
          <p className="text-blue-700 dark:text-blue-300">
            ⏳ Loading Python runtime... This may take a moment.
          </p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
          <p className="text-red-700 dark:text-red-300 font-mono text-sm">
            ❌ {error}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Editor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
            <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Code Editor
              </h2>
            </div>

            <textarea
              ref={editorRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your Python code here..."
              disabled={loading}
              className="w-full h-96 p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Editor Controls */}
            <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex gap-3">
              <button
                onClick={runCode}
                disabled={loading || running}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded transition-colors flex items-center gap-2"
              >
                {running ? "▶ Running..." : "▶ Run Code"}
              </button>
              <button
                onClick={clearCode}
                disabled={loading}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white font-semibold rounded transition-colors"
              >
                🗑 Clear
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
            <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Output
              </h2>
            </div>

            <div className="h-48 p-4 bg-gray-900 text-green-400 font-mono text-sm overflow-auto whitespace-pre-wrap break-words">
              {output || (
                <span className="text-gray-500">
                  {loading
                    ? "Loading Python..."
                    : "Output will appear here..."}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Quick Reference & Examples */}
        <div className="space-y-6">
          {/* Quick Tips */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              💡 Quick Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>✓ Press Run Code to execute</li>
              <li>✓ Use print() for output</li>
              <li>✓ Supports Python 3.x syntax</li>
              <li>✓ Can import common libraries</li>
              <li>✓ Each run starts fresh</li>
            </ul>
          </div>

          {/* Examples */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📚 Code Examples
            </h3>
            <div className="space-y-2">
              {CODE_EXAMPLES.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => loadExample(example.code)}
                  disabled={loading}
                  className="w-full text-left px-3 py-2 bg-indigo-50 dark:bg-indigo-900 hover:bg-indigo-100 dark:hover:bg-indigo-800 text-indigo-700 dark:text-indigo-300 rounded text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {example.name}
                </button>
              ))}
            </div>
          </div>

          {/* Supported Libraries */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              📦 Available Libraries
            </h3>
            <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <p>• numpy - Numerical computing</p>
              <p>• pandas - Data analysis</p>
              <p>• math - Mathematical functions</p>
              <p>• datetime - Date/time handling</p>
              <p>• json - JSON processing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          ℹ️ About This Editor
        </h3>
        <p className="text-blue-800 dark:text-blue-200 text-sm mb-3">
          This live Python editor runs Python in your browser using Pyodide, a
          Python distribution compiled to WebAssembly. It&apos;s perfect for learning
          and quick experimentation without setting up a local environment.
        </p>
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          <strong>Note:</strong> Each code execution runs in isolation. For
          advanced projects, consider setting up Python locally with pip.
        </p>
      </div>
    </main>
  );
}
