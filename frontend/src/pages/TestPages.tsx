import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TestPage() {
  const { id } = useParams();

  const [test, setTest] = useState<any>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 min

  // 🔥 FETCH TEST
  useEffect(() => {
    fetch(`http://localhost:8000/api/mocktest/start/${id}`)
      .then(res => res.json())
      .then(data => {
        setTest(data);
        setAnswers(new Array(data.questions.length).fill(-1));
      });
  }, [id]);

  // 🔥 TIMER
  useEffect(() => {
    if (!test || result) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          submit(); // auto submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [test, result]);

  const handleSelect = (qIndex: number, optIndex: number) => {
    const newAns = [...answers];
    newAns[qIndex] = optIndex;
    setAnswers(newAns);
  };

  const submit = async () => {
    const res = await fetch(`http://localhost:8000/api/mocktest/submit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ answers })
    });

    const data = await res.json();

    // 🔥 SAVE SCORE (LOCAL)
    localStorage.setItem("lastScore", JSON.stringify(data));

    setResult(data);
  };

  const formatTime = (t: number) => {
    const min = Math.floor(t / 60);
    const sec = t % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  if (!test)
    return <h2 className="p-6 text-white">Loading...</h2>;

  // RESULT
  if (result) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="bg-gradient-to-br from-[#0f172a] to-[#020617] border border-green-500/20 rounded-xl p-8 text-center shadow-[0_0_30px_rgba(34,197,94,0.2)]">
          <h1 className="text-3xl font-bold text-green-400 mb-4">
            🎉 Test Completed
          </h1>
          <p className="text-xl text-white">
            {result.score}/{result.total}
          </p>
          <p className="text-green-300">{result.percentage}%</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] p-6 flex gap-6">

      {/* 🔥 LEFT - QUESTIONS */}
      <div className="flex-1 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-white font-bold">{test.title}</h1>

          {/* TIMER */}
          <div className="bg-black border border-green-500 px-4 py-2 rounded-lg text-green-400 font-bold">
            ⏱ {formatTime(timeLeft)}
          </div>
        </div>

        {/* QUESTIONS */}
        {test.questions.map((q: any, qIndex: number) => (
          <div
            key={qIndex}
            className="bg-gradient-to-br from-[#0f172a] to-[#020617] border border-green-500/20 rounded-xl p-5"
          >
            <h3 className="text-white mb-4">
              {qIndex + 1}. {q.question}
            </h3>

            {q.options.map((opt: string, i: number) => (
              <label
                key={i}
                className={`block p-3 mb-2 rounded-lg border cursor-pointer
                ${
                  answers[qIndex] === i
                    ? "bg-green-500/10 border-green-400"
                    : "border-gray-700 hover:border-green-400"
                }`}
              >
                <input
                  type="radio"
                  name={`q-${qIndex}`}
                  checked={answers[qIndex] === i}
                  onChange={() => handleSelect(qIndex, i)}
                  className="mr-2 accent-green-400"
                />
                <span className="text-white">{opt}</span>
              </label>
            ))}
          </div>
        ))}

        <button
          onClick={submit}
          className="bg-green-500 px-6 py-3 rounded-lg text-black font-bold"
        >
          Submit
        </button>
      </div>

      {/* 🔥 RIGHT - QUESTION PALETTE */}
      <div className="w-48 bg-[#0f172a] border border-green-500/20 rounded-xl p-4 h-fit sticky top-6">

        <h3 className="text-white mb-3">Questions</h3>

        <div className="grid grid-cols-5 gap-2">
          {answers.map((ans, i) => (
            <div
              key={i}
              className={`w-8 h-8 flex items-center justify-center rounded cursor-pointer text-sm
              ${
                ans !== -1
                  ? "bg-green-500 text-black"
                  : "bg-gray-700 text-white"
              }`}
              onClick={() => {
                document
                  .getElementsByName(`q-${i}`)[0]
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}