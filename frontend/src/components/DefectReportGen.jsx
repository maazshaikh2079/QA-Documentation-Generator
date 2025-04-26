import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const TestCaseGen = () => {
    const [inputText, setInputText] = useState("");
    const [markdownData, setMarkdownData] = useState(
        "AI-generated content will appear here..."
      );
      const [copied, setCopied] = useState(false);

  return (
    <div>
  <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-transparent">
    <div className="container mx-auto max-w-6xl bg-white shadow-lg rounded-lg p-12 flex flex-col items-center text-center">
      {/* Title Section with Image */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center text-center sm:text-left space-y-6 sm:space-y-0 sm:space-x-8">
        {/* Image */}
        <img
          className="h-auto max-w-xs rounded-[5%]"
          src="defect_report.jpg"
          alt="image description"
        />

        {/* Title & Subtitle */}
        <div>
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
          AI-Powered  {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-pink-400">
            Defect Report Generator
            </span>
          </h1>

          <p className="text-lg text-gray-600 mt-4 max-w-2xl text-justify">
          Transform manually executed test cases into clear, actionable defect reports. This AI streamlines bug tracking, improves communication between teams, and accelerates the debugging process for faster software delivery.
          </p>
        </div>
      </div>

      {/* Input Form */}
      <form className="w-full max-w-3xl mt-6" onSubmit={async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/generate-defect-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userInput: inputText }),
    });
    const data = await response.text();
    setMarkdownData(data);
  }}>
      <textarea
        rows="4"
        className="w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white"
        placeholder="Enter a Text..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        required
      ></textarea>

        <button
          type="submit"
          className="cursor-pointer w-full mt-4 py-2.5 text-white bg-blue-600 rounded-lg"
        >
          Process
        </button>
      </form>
    </div>
  </section>

  {/* Output Box Section */}
  <div className="container mx-auto max-w-6xl bg-blue-100 shadow-lg rounded-lg p-6 flex flex-col items-center mt-[10px] mb-[10px] text-center">
    <div className="w-[100%] h-[100%] bg-gray-50 rounded-lg p-4">
      <div className="mb-2 flex justify-between items-center">
        <span className="bg-blue-100 text-blue-800 text-2xl font-semibold px-3 py-1 rounded-sm">
          Generated Content:
        </span>
      </div>

      {/* Render Markdown Output */}
      <div className="w-full bg-gray-50 rounded-lg p-4 border border-gray-300 text-left">
        <div className="whitespace-pre-wrap break-words prose max-w-none text-gray-800 overflow-x-auto w-full text-justify">
          <ReactMarkdown remarkPlugins={[remarkGfm]}   components={{
        table: ({ children }) => (
          <table className="w-full border-collapse">{children}</table>
        ),
        thead: ({ children }) => (
          <thead className="border-b-2 border-gray-400">{children}</thead>
        ),
        tr: ({ children }) => (
          <tr className="border-b border-gray-300">{children}</tr>
        ),
        th: ({ children }) => (
          <th className="text-left px-4 py-2 font-semibold">{children}</th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-2" style={{ paddingRight: "20px" }}>
            {children}
          </td>
        ),
      }}
     >
            {markdownData}
          </ReactMarkdown>
        </div>
      </div>

      {/* Copy Button */}
      <div className="flex justify-end mt-2">
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(markdownData);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="cursor-pointer text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  </div>
</div>

  )
}

export default TestCaseGen
