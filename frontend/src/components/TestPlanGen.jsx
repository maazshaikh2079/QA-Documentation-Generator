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
          src="test_plan.jpg"
          alt="image description"
        />

        {/* Title & Subtitle */}
        <div>
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
          AI-Powered  {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-pink-400">
            Test Plan Generator
            </span>
          </h1>

          <p className="text-lg text-gray-600 mt-4 max-w-2xl text-justify">
          Generate structured and comprehensive test plans instantly by simply providing your app description. This AI ensures thorough test coverage, saving time for QA teams and developers while enhancing software quality and efficiency.
          </p>
        </div>
      </div>

      {/* Input Form */}
      <form className="w-full max-w-3xl mt-6" onSubmit={async (e) => {
    e.preventDefault();
    const response = await fetch("https://qa-docs-gen.onrender.com/generate-test-plan", {
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
      {/* <div className="w-full bg-gray-50 rounded-lg p-4 border border-gray-300 text-left">
        <div className="whitespace-pre-wrap break-words prose max-w-none text-gray-800 overflow-x-auto w-full text-justify">
          <ReactMarkdown remarkPlugins={[remarkGfm]}
     >
            {markdownData}
          </ReactMarkdown>
        </div>
      </div> */}

<div className="w-full bg-white rounded-lg p-4 border border-gray-300 text-left space-y-4">
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-gray-900 mb-2" {...props} />,
      h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold text-gray-800 mb-2" {...props} />,
      h3: ({ node, ...props }) => <h3 className="text-xl font-semibold text-gray-700 mb-2" {...props} />,
      p: ({ node, ...props }) => <p className="text-gray-800 leading-relaxed" {...props} />,
      ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-1" {...props} />,
      ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-1" {...props} />,
      li: ({ node, ...props }) => <li className="ml-4" {...props} />,
      code: ({ node, inline, className, children, ...props }) =>
        inline ? (
          <code className="bg-gray-200 px-1 py-0.5 rounded text-sm text-pink-600" {...props}>
            {children}
          </code>
        ) : (
          <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
            <code {...props}>{children}</code>
          </pre>
        ),
      blockquote: ({ node, ...props }) => (
        <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-600" {...props} />
      ),
      table: ({ node, ...props }) => (
        <table className="table-auto w-full border-collapse border border-gray-300" {...props} />
      ),
      thead: ({ node, ...props }) => (
        <thead className="bg-gray-200 text-left" {...props} />
      ),
      th: ({ node, ...props }) => (
        <th className="border border-gray-300 px-4 py-2 font-semibold" {...props} />
      ),
      td: ({ node, ...props }) => (
        <td className="border border-gray-300 px-4 py-2" {...props} />
      ),
      hr: () => <hr className="my-4 border-gray-300" />
    }}
  >
    {markdownData}
  </ReactMarkdown>
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
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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
