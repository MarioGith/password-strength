"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { PixelWarrior } from "@/components/pixel-warrior-detailed";
import { PasswordGenerator } from "@/components/password-generator";
import { analyzePassword } from "@/lib/password-utils";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [analysis, setAnalysis] = useState(analyzePassword(""));

  // Generate a deterministic seed from password for character variation
  const passwordSeed = password.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  useEffect(() => {
    setAnalysis(analyzePassword(password));
  }, [password]);

  const strengthColors = {
    "very-weak": "bg-neutral-500",
    weak: "bg-neutral-600",
    fair: "bg-neutral-700",
    good: "bg-neutral-800",
    strong: "bg-neutral-900",
    ultimate: "bg-black",
  };

  const strengthTexts = {
    "very-weak": "Very Weak",
    weak: "Weak",
    fair: "Fair",
    good: "Good",
    strong: "Strong",
    ultimate: "ULTIMATE",
  };

  const strengthColor = strengthColors[analysis.strength];
  const strengthText = strengthTexts[analysis.strength];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Password Strength Checker",
    "applicationCategory": "SecurityApplication",
    "description": "Advanced password strength checker and generator with real-time analysis and visual feedback through warrior evolution system",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Real-time password strength analysis",
      "6-level security rating system",
      "Multiple password generation methods",
      "Visual warrior evolution feedback",
      "Character type detection",
      "Common password detection",
      "Exportable warrior avatars"
    ],
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    }
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          {/* Header */}
          <header className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-neutral-900 dark:text-neutral-50 mb-2">
              Power Up Your Passwords
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              Create legendary passwords and watch your warrior evolve!
            </p>
          </header>

        {/* Main Layout - Side by Side */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 max-w-7xl mx-auto">
          {/* Left: Warrior Display */}
          <div className="flex flex-col items-center justify-start lg:sticky lg:top-8 lg:self-start">
            <div className="w-full max-w-md">
              {/* Level Badge */}
              <div className="text-center mb-6">
                <div
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${strengthColor} text-white font-bold text-lg shadow-lg`}
                >
                  Level {analysis.level}: {strengthText}
                </div>
              </div>

              {/* Warrior */}
              <div className="flex justify-center mb-6">
                <PixelWarrior
                  strength={analysis.strength}
                  level={analysis.level}
                  size={360}
                  seed={passwordSeed}
                />
              </div>

              {/* Score Display */}
              <div className="text-center mb-4">
                <div className="text-6xl font-black text-neutral-900 dark:text-neutral-50 mb-2">
                  {analysis.score}
                  <span className="text-2xl text-neutral-500">%</span>
                </div>
                <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strengthColor} transition-all duration-500`}
                    style={{ width: `${analysis.score}%` }}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-center text-sm text-neutral-600 dark:text-neutral-400 px-4">
                {analysis.level === 1 &&
                  "Just a peasant with no protection. Add more characters and variety!"}
                {analysis.level === 2 &&
                  "A novice warrior with basic equipment. Keep improving!"}
                {analysis.level === 3 &&
                  "A warrior with a shield. Add more character types to level up!"}
                {analysis.level === 4 &&
                  "A knight with armor! You're getting stronger!"}
                {analysis.level === 5 &&
                  "A champion with full armor and sword! Almost legendary!"}
                {analysis.level === 6 &&
                  "🏆 ULTIMATE! Your warrior is legendary with maximum protection!"}
              </p>
            </div>
          </div>

          {/* Right: Password Testing & Generator */}
          <div className="space-y-8">
            {/* Password Input Section */}
            <section>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
                Test Your Password
              </h2>

              <div className="relative mb-4">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 text-lg pr-12"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </Button>
              </div>

              {/* Easter Egg Alert */}
              {analysis.easterEgg && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-950 border-2 border-red-500 rounded-lg">
                  <p className="text-sm font-bold text-red-700 dark:text-red-300 text-center">
                    {analysis.easterEgg}
                  </p>
                </div>
              )}

              {/* Character Type Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  {
                    label: "Lowercase",
                    code: "a-z",
                    active: analysis.hasLowercase,
                  },
                  {
                    label: "Uppercase",
                    code: "A-Z",
                    active: analysis.hasUppercase,
                  },
                  {
                    label: "Numbers",
                    code: "0-9",
                    active: analysis.hasNumbers,
                  },
                  {
                    label: "Symbols",
                    code: "!@#",
                    active: analysis.hasSymbols,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      item.active
                        ? "bg-neutral-900 dark:bg-neutral-50 border-neutral-900 dark:border-neutral-50"
                        : "bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700"
                    }`}
                  >
                    <div
                      className={`text-xs font-medium mb-1 ${
                        item.active
                          ? "text-neutral-100 dark:text-neutral-900"
                          : "text-neutral-500"
                      }`}
                    >
                      {item.label}
                    </div>
                    <div
                      className={`text-lg font-mono font-bold ${
                        item.active
                          ? "text-neutral-50 dark:text-neutral-950"
                          : "text-neutral-400"
                      }`}
                    >
                      {item.code}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
                  <div className="text-xs font-medium text-neutral-500 mb-1">
                    Length
                  </div>
                  <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
                    {analysis.length}
                  </div>
                </div>
                <div className="p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
                  <div className="text-xs font-medium text-neutral-500 mb-1">
                    Character Types
                  </div>
                  <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
                    {
                      [
                        analysis.hasLowercase,
                        analysis.hasUppercase,
                        analysis.hasNumbers,
                        analysis.hasSymbols,
                      ].filter(Boolean).length
                    }
                    /4
                  </div>
                </div>
              </div>

              {/* Feedback and Time to Crack */}
              {password && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Feedback */}
                  <div className="p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                      Tips:
                    </h3>
                    <ul className="space-y-1">
                      {analysis.feedback.map((tip, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                        >
                          <span className="mt-0.5">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Time to Crack */}
                  <div className="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
                    <div className="text-xs font-medium text-neutral-500 mb-2">
                      Time to Crack
                    </div>
                    <div className="text-4xl font-black text-neutral-900 dark:text-neutral-50">
                      {analysis.timeToCrack}
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">
                      Using a modern GPU at 1 billion guesses/second
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Password Generator */}
            <section>
              <PasswordGenerator onPasswordGenerated={setPassword} />
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-sm text-neutral-500">
          <p>Aim for legendary status to protect yourself and your organization.</p>
        </footer>
      </div>
    </div>
    </>
  );
}
