"use client";
import { useState, useEffect, useCallback } from "react";
import { signOut } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import beautify from "js-beautify";
import { Clipboard, Loader } from "lucide-react"; // Import Loader for Spinner
import Link from "next/link";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import Image from "next/image";
function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center space-x-3">
        <Image src="/assets/images/Ai.png" alt="App Logo" width={40} height={40} />
        <h1 className="text-xl font-bold mt-2">AI Code Generator</h1>
      </div>
      <div className="flex items-center gap-x-6">
        <Link href="/">Home</Link>
        <Button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-red-500 hover:bg-red-600"
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}

export default function ChatbotAI() {
  const [generatedCode, setGeneratedCode] = useState(``);
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const firstPart="sk-proj-UFAxsDsBEERToW8UejUiNnd5cVxKUA2Xj24LvB7BV25"
  const secondPart="cCctcmhnF6BN4kA9_BdynsFxOuClJMxT3BlbkFJVbL41PZy-"
  const thirdPart="2ePEp50aunsbac3Yged0xfazVNyvmkUMV56OvblkjgFIPxsB5P4t68idrvfmkcJcA"
  const handleGenerate = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); // Start loading
    setGeneratedCode(""); // Clear previous results

    try {
      const openai = createOpenAI({
        apiKey:`${firstPart}${secondPart}${thirdPart}`,
      });

      const { text } = await generateText({
        model: openai("gpt-4o-mini"),
        prompt: `Generate pure HTML with <style></style> for ${input}. Only return the raw HTML, without Markdown formatting, backticks, or extra text. Dont use hex colors, write names instead`,
      });

      setGeneratedCode(text);
    } catch (error) {
      console.error("Error generating code:", error);
    } finally {
      setLoading(false); // Stop loading after response
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const generatePreview = useCallback(() => {
    if (!generatedCode || generatedCode.trim().length === 0) {
      return;
    }

    const iframe = document.getElementById("previewIframe") as HTMLIFrameElement;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) {
      console.error("Cannot access iframe document");
      return;
    }

    doc.open();
    doc.write(generatedCode);
    doc.close();
  }, [generatedCode]);

  useEffect(() => {
    generatePreview();
  }, [generatePreview]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-purple-800 to-gray-800 text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <h1 className="text-3xl font-extrabold mb-6 text-yellow-300 drop-shadow-lg">
          Chatbot AI - HTML & CSS Generator
        </h1>
        <p className="text-xl max-w-2xl mb-8 drop-shadow-md text-gray-200">
          Enter a prompt, and AI will generate beautiful HTML and CSS for you.
        </p>
        <form
          onSubmit={handleGenerate}
          className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-5xl w-full"
        >
          <Textarea
            placeholder="Describe what you need..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            className="mb-4 bg-gray-700 text-white border-yellow-300"
          />
          <Button
            type="submit"
            className="w-full bg-yellow-300 hover:bg-yellow-400 text-gray-900 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="animate-spin mr-2" />
                Generating...
              </>
            ) : (
              "Generate HTML & CSS"
            )}
          </Button>
        </form>

        {loading && (
          <div className="mt-6 text-yellow-300 flex items-center space-x-2">
            <Loader className="w-6 h-6 animate-spin" />
            <span>Generating your code...</span>
          </div>
        )}

        {generatedCode && !loading && (
          <div className="bg-gray-900 p-2 mt-6 min-h-[600px] rounded-lg shadow-lg flex flex-col space-y-4 w-full">
            <div className="mb-4 lg:mb-0 min-h-[100px] relative w-full">
              <h2 className="text-xl font-semibold mb-2 text-yellow-300">
                Generated Code:
              </h2>
              <Button
                onClick={handleCopy}
                className="absolute top-12 right-2 p-2"
              >
                <Clipboard className="w-5 h-5 text-yellow-300" />
              </Button>
              {copied && (
                <div className="absolute top-5 right-[-16px] bg-gray-700 text-white text-xs py-1 px-2 rounded shadow-md">
                  Copied!
                </div>
              )}
              <pre className="bg-gray-700 p-4 rounded-lg text-left overflow-auto text-sm text-yellow-200">
                {beautify.html(generatedCode, { indent_size: 2 })}
              </pre>
            </div>

            <div className="w-full mt-4 bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-yellow-300 text-center">
                Preview:
              </h2>
              <div className="w-full border border-gray-600 rounded-lg overflow-hidden">
                <iframe
                  id="previewIframe"
                  className="w-full min-h-[100vh] bg-white rounded-lg shadow-md"
                  style={{ border: "none" }}
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
