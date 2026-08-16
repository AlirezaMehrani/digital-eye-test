"use client";

import { useEffect, useMemo, useState } from "react";

type Eye = "right" | "left";
type Direction = "up" | "down" | "left" | "right";

const arrows: Record<Direction, string> = {
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
};

const directionList: Direction[] = ["up", "right", "down", "left"];

const levels = [
  { size: 120, label: "بسیار آسان" },
  { size: 96, label: "آسان" },
  { size: 76, label: "متوسط" },
  { size: 60, label: "متوسط" },
  { size: 48, label: "سخت" },
  { size: 38, label: "سخت" },
  { size: 30, label: "خیلی سخت" },
  { size: 24, label: "خیلی سخت" },
];

function randomDirection(): Direction {
  return directionList[Math.floor(Math.random() * directionList.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export default function Home() {
  const [step, setStep] = useState<"intro" | "calibration" | "test" | "result">("intro");
  const [calibrated, setCalibrated] = useState(false);
  const [eye, setEye] = useState<Eye>("right");
  const [level, setLevel] = useState(0);
  const [trial, setTrial] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [errors, setErrors] = useState(0);
  const [results, setResults] = useState<Record<Eye, number | null>>({ right: null, left: null });
  const [direction, setDirection] = useState<Direction>("up");
  const [calibrationWidth, setCalibrationWidth] = useState(85);
  const [startedAt, setStartedAt] = useState<number | null>(null);

  const currentSize = useMemo(() => levels[level]?.size ?? 24, [level]);

  useEffect(() => {
    if (step === "test") {
      setDirection(randomDirection());
      setStartedAt(Date.now());
    }
  }, [step, eye]);

  function startCalibration() {
    setStep("calibration");
  }

  function finishCalibration() {
    setCalibrated(true);
    setStep("test");
    setEye("right");
    setLevel(0);
    setTrial(0);
    setCorrect(0);
    setErrors(0);
  }

  function answer(answer: Direction) {
    const isCorrect = answer === direction;
    const nextTrial = trial + 1;

    if (isCorrect) setCorrect((v) => v + 1);
    else setErrors((v) => v + 1);

    // MVP staircase: two correct answers advance; one error retreats.
    if (isCorrect && nextTrial % 2 === 0 && level < levels.length - 1) {
      setLevel((v) => v + 1);
    } else if (!isCorrect && level > 0) {
      setLevel((v) => v - 1);
    }

    if (nextTrial >= 12) {
      const score = Math.max(0, Math.min(1, (correct + (isCorrect ? 1 : 0)) / nextTrial));
      setResults((r) => ({ ...r, [eye]: score }));
      if (eye === "right") {
        setEye("left");
        setLevel(0);
        setTrial(0);
        setCorrect(0);
        setErrors(0);
      } else {
        setStep("result");
      }
      return;
    }

    setTrial(nextTrial);
    setDirection(randomDirection());
  }

  function restart() {
    setStep("intro");
    setCalibrated(false);
    setResults({ right: null, left: null });
    setTrial(0);
    setLevel(0);
    setCorrect(0);
    setErrors(0);
  }

  const acuityLabel = (score: number | null) => {
    if (score === null) return "—";
    if (score >= 0.9) return "خوب";
    if (score >= 0.7) return "متوسط";
    return "نیازمند بررسی";
  };

  return (
    <main className="page">
      <header className="topbar">
        <div className="brand">
          <span className="brandMark">◉</span>
          <span>Digital Eye Test</span>
        </div>
        <span className="badge">MVP / غربالگری</span>
      </header>

      <section className="shell">
        {step === "intro" && (
          <div className="card hero">
            <div className="eyebrow">نسخه آزمایشی</div>
            <h1>تست بینایی آنلاین،<br />ساده و مرحله‌به‌مرحله</h1>
            <p>
              این نسخه اولیه برای سنجش حدت بینایی طراحی شده است. در این مرحله
              هنوز «نسخه قطعی عینک» صادر نمی‌شود.
            </p>
            <div className="infoGrid">
              <div><strong>۱</strong><span>کالیبراسیون صفحه</span></div>
              <div><strong>۲</strong><span>تست چشم راست</span></div>
              <div><strong>۳</strong><span>تست چشم چپ</span></div>
              <div><strong>۴</strong><span>نمایش نتیجه غربالگری</span></div>
            </div>
            <button className="primary" onClick={startCalibration}>شروع تست</button>
            <p className="notice">برای نتیجه بهتر، روشنایی صفحه را متوسط تنظیم کنید و در فاصله ثابت از نمایشگر بنشینید.</p>
          </div>
        )}

        {step === "calibration" && (
          <div className="card">
            <div className="progress"><span style={{ width: "25%" }} /></div>
            <div className="eyebrow">مرحله ۱ از ۴</div>
            <h2>کالیبراسیون صفحه</h2>
            <p>یک کارت بانکی را کنار کادر زیر بگذارید و عرض کادر را با عرض واقعی کارت هماهنگ کنید.</p>
            <div className="calibrationArea">
              <div className="bankCard" style={{ width: calibrationWidth }}>
                <span>STANDARD CARD</span>
                <small>85.60 mm</small>
              </div>
            </div>
            <input
              aria-label="تنظیم عرض کادر"
              type="range"
              min="55"
              max="115"
              value={calibrationWidth}
              onChange={(e) => setCalibrationWidth(Number(e.target.value))}
            />
            <div className="rangeHint">عرض نمایش داده‌شده: {calibrationWidth} واحد</div>
            <button className="primary" onClick={finishCalibration}>کالیبراسیون انجام شد</button>
          </div>
        )}

        {step === "test" && (
          <div className="card testCard">
            <div className="progress"><span style={{ width: eye === "right" ? "50%" : "75%" }} /></div>
            <div className="testHeader">
              <div>
                <div className="eyebrow">مرحله {eye === "right" ? "۲" : "۳"} از ۴</div>
                <h2>تست چشم {eye === "right" ? "راست" : "چپ"}</h2>
              </div>
              <div className="counter">{trial + 1} / 12</div>
            </div>
            <p className="instruction">جهت شکاف شکل زیر را انتخاب کنید.</p>

            <div className="optotype" style={{ fontSize: currentSize }}>{arrows[direction]}</div>

            <div className="answerGrid">
              {(directionList).map((d) => (
                <button key={d} className="directionBtn" onClick={() => answer(d)}>
                  {arrows[d]}
                </button>
              ))}
            </div>

            <div className="testMeta">
              <span>سطح فعلی: {levels[level].label}</span>
              <span>کالیبراسیون: {calibrated ? "انجام شد" : "—"}</span>
            </div>
          </div>
        )}

        {step === "result" && (
          <div className="card">
            <div className="eyebrow">نتیجه اولیه</div>
            <h2>غربالگری بینایی شما</h2>
            <p>این نتیجه برای تست MVP است و به‌هیچ‌وجه جایگزین معاینه و نسخه متخصص نیست.</p>

            <div className="results">
              <div className="resultRow">
                <span>چشم راست</span>
                <strong>{acuityLabel(results.right)}</strong>
              </div>
              <div className="resultRow">
                <span>چشم چپ</span>
                <strong>{acuityLabel(results.left)}</strong>
              </div>
            </div>

            <div className="warning">
              <strong>مرحله بعدی محصول:</strong>
              تخمین Sphere / Cylinder / Axis، محاسبه PD، امتیاز اطمینان و مسیر تأیید اپتومتریست.
            </div>

            <button className="secondary" onClick={restart}>اجرای دوباره تست</button>
          </div>
        )}
      </section>

      <footer>
        <span>Digital Eye Test MVP</span>
        <span>Screening only — not a medical diagnosis</span>
      </footer>
    </main>
  );
}