
"use client";
import React, { useEffect, useState } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { replaceVariableCpp } from "../code_updation/Code_update_cpp";
import { replaceVariableJava } from "../code_updation/Code_update_java";
import { replaceVariablePython } from "../code_updation/Code_update_python";

const Playground = ({testCases, answers}) => {
  const [code, setCode] = useState("");
  const [solution, setSolution] = useState("Hello");
  const [language, setLanguage] = useState("");
  const [testResults, setTestResults] = useState([]);
  const boilerPlateCode = `
    #include<iostream>
    using namespace std;
    int main(){
      int a;
      int b;
      cout <<  "a + b = "<< (a + b) << endl;
      return 0;
    }
  `;

  // const testCases = [
  //   {a:{ type: 'int', value: 100 }, b:{ type: 'int', value: 99 }}, {a:{ type: 'int', value: 200 }, b:{ type: 'int', value: 1 }}
  // ];
  // const answers = [{ type: 'string', value: '199' }, { type: 'string', value: '201' }];
  
  const SubmitCode = async (updatedCode) => {
    console.log(updatedCode);
    console.log(updatedCode);
    const answer = await fetch("http://localhost:2000/api", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        code: updatedCode,
        language: language,
      }),
    });
    const response = await answer.json();
    console.log(response);
    setSolution(response.body);
    return response.body;
  };

  const handleSubmit = async () => {
    const results = await runTestCases(testCases, answers);
    setTestResults(results);
  };

  // const runTestCases = async (testCases, answers) => {
  //   for (let i = 0; i < testCases.length; i++) {
  //     let updatedCode = code;
  //     if (language === "cpp") {
  //       updatedCode = replaceVariableCpp(code, testCases[i]);
  //     }
  //     if (language === "java") {
  //       updatedCode = replaceVariableJava(code, testCases[i]);
  //     }
  //     if (language === "python") {
  //       updatedCode = replaceVariablePython(code, testCases[i]);
  //     }
  //     const result = await SubmitCode(updatedCode);
  //     console.log("result is ", result);
  //     const expectedResult = answers[i];
  //     console.log("expected result", expectedResult.value);
  //     if (result === expectedResult.value) {
  //       console.log(`Test case ${i + 1}: Success`);
  //     } else {
  //       console.log(`Test case ${i + 1}: Failed`);
  //     }
  //   }
  // };
  // let result = [];
  const runTestCases = async (testCases, answers) => {
    const results = [];
    console.log("Testcases in Playground", testCases)
    console.log("Answers in Playground", answers)

    for (let i = 0; i < testCases.length; i++) {
      let updatedCode = code;
      if (language === "cpp") {
        updatedCode = replaceVariableCpp(code, testCases[i]);
      }
      if (language === "java") {
        updatedCode = replaceVariableJava(code, testCases[i]);
      }
      if (language === "python") {
        updatedCode = replaceVariablePython(code, testCases[i]);
      }
      const result = await SubmitCode(updatedCode);
      console.log("result is ", result);
      const expectedResult = answers[i];
      console.log("expected result", expectedResult.value);
      const testCaseResult = result === expectedResult.value ? "Passed" : "Failed";
      results.push({ testCase: i + 1, result: testCaseResult });
    }
    // result = results;
    console.log(results)
    return results;
  };

  const renderTestResults = () => {
    return (
      <table className="table-auto">
        <thead>
          <tr>
          <th className="px-4 py-2">Test Case</th>
          <th className="px-4 py-2">Input</th>
          <th className="px-4 py-2">Expected Output</th>
          <th className="px-4 py-2">Result</th>
          </tr>
        </thead>
        <tbody>
        {testResults.map((item, index) => (
            <tr key={item.testCase}>
              <td className="border px-4 py-2 text-white">{item.testCase}</td>
              <td className="border px-4 py-2 text-white">
              {testCases[index].a.value}, {testCases[index].b.value}
            </td>
            <td className="border px-4 py-2 text-white">{answers[index].value}</td>
              <td className={`border px-4 py-2 ${item.result === 'Passed' ? 'text-green-500' : 'text-red-500'}`}>{item.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="flex flex-col bg-dark-layer-1 relative w-full min-h-screen box-content overflow-x-hidden">
      {/* <PreferenceNav /> */}
      <div className="w-full overflow-auto md:flex h-full bg-[#1e1e1e]">
        <div className="w-full h-[70%]">
          <ReactCodeMirror
            value={boilerPlateCode}
            onChange={(e) => {
              setCode(e);
            }}
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
          />
        </div>
        <div className="w-full px-5 overflow-y-auto overflow-x-hidden text-white">
          <div className="flex items-center text-white">
            Select Your Language
            <button
        className={`flex cursor-pointer items-center rounded focus:outline-none ${
          language === "python" ? 'bg-green-500 text-white' : 'bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2'
        } px-2 py-1.5 font-medium mx-2`}
        onClick={() => setLanguage("python")}
      >
        Python
      </button>
      <button
        className={`flex cursor-pointer items-center rounded focus:outline-none ${
          language === "cpp" ? 'bg-green-500 text-white' : 'bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2'
        } px-2 py-1.5 font-medium mx-2`}
        onClick={() => setLanguage("cpp")}
      >
        C++
      </button>
      <button
        className={`flex cursor-pointer items-center rounded focus:outline-none ${
          language === "java" ? 'bg-green-500 text-white' : 'bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2'
        } px-2 py-1.5 font-medium mx-2`}
        onClick={() => setLanguage("java")}
      >
        Java
      </button>
          </div>
          <div className="mt-4">
            <button
              className="px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-dark-green-s hover:bg-green-3 rounded-lg"
              onClick={handleSubmit}
            >
              Run
            </button>
          </div>
          <div className="mt-8">
          {!testResults.length > 0 && (
              <div className="mt-4">
                Testcases and results will be shown here. Please submit your code to see the test results.
              </div>
            )}
            {testResults.length > 0 && (
              <div className="mt-4">
                {renderTestResults()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
