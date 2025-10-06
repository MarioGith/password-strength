'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  generateRandomPassword,
  generateAlphanumericPassword,
  generatePIN,
  generatePassphrase,
} from '@/lib/password-utils';
import { Copy, Wand2 } from 'lucide-react';

interface PasswordGeneratorProps {
  onPasswordGenerated: (password: string) => void;
}

type GeneratorType = 'random' | 'alphanumeric' | 'passphrase' | 'pin';

export function PasswordGenerator({ onPasswordGenerated }: PasswordGeneratorProps) {
  const [generatorType, setGeneratorType] = useState<GeneratorType>('random');
  const [length, setLength] = useState(16);
  const [wordCount, setWordCount] = useState(4);
  const [pinLength, setPinLength] = useState(6);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    let password = '';

    switch (generatorType) {
      case 'random':
        password = generateRandomPassword(length);
        break;
      case 'alphanumeric':
        password = generateAlphanumericPassword(length);
        break;
      case 'passphrase':
        password = generatePassphrase(wordCount);
        break;
      case 'pin':
        password = generatePIN(pinLength);
        break;
    }

    setGeneratedPassword(password);
    onPasswordGenerated(password);
  };

  const handleCopy = async () => {
    if (generatedPassword) {
      await navigator.clipboard.writeText(generatedPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const descriptions = {
    random: 'Maximum security with all character types',
    alphanumeric: 'Letters and numbers only',
    passphrase: 'Easy-to-remember word combinations',
    pin: 'Numeric codes for simple auth',
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
        Password Generator
      </h2>

      {/* Generator Type Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {[
          { type: 'random', label: 'Random' },
          { type: 'alphanumeric', label: 'Alphanumeric' },
          { type: 'passphrase', label: 'Passphrase' },
          { type: 'pin', label: 'PIN' },
        ].map(({ type, label }) => (
          <button
            key={type}
            onClick={() => setGeneratorType(type as GeneratorType)}
            className={`p-3 rounded-lg font-semibold text-sm transition-all border-2 ${
              generatorType === type
                ? 'bg-neutral-900 dark:bg-neutral-50 border-neutral-900 dark:border-neutral-50 text-neutral-50 dark:text-neutral-950'
                : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
        {descriptions[generatorType]}
      </p>

      {/* Options */}
      <div className="mb-6">
        {(generatorType === 'random' || generatorType === 'alphanumeric') && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-neutral-900 dark:text-neutral-50 flex justify-between">
              <span>Length</span>
              <span className="text-neutral-500">{length} characters</span>
            </label>
            <Slider
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
              min={8}
              max={32}
              step={1}
              className="w-full"
            />
          </div>
        )}

        {generatorType === 'passphrase' && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-neutral-900 dark:text-neutral-50 flex justify-between">
              <span>Words</span>
              <span className="text-neutral-500">{wordCount} words</span>
            </label>
            <Slider
              value={[wordCount]}
              onValueChange={(value) => setWordCount(value[0])}
              min={3}
              max={6}
              step={1}
              className="w-full"
            />
          </div>
        )}

        {generatorType === 'pin' && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-neutral-900 dark:text-neutral-50 flex justify-between">
              <span>Digits</span>
              <span className="text-neutral-500">{pinLength} digits</span>
            </label>
            <Slider
              value={[pinLength]}
              onValueChange={(value) => setPinLength(value[0])}
              min={4}
              max={12}
              step={1}
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        className="w-full h-12 bg-neutral-900 dark:bg-neutral-50 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-neutral-50 dark:text-neutral-950 font-bold text-base mb-4"
      >
        <Wand2 className="mr-2 h-5 w-5" />
        Generate Password
      </Button>

      {/* Generated Password Display */}
      {generatedPassword && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg font-mono text-sm break-all text-neutral-900 dark:text-neutral-50">
              {generatedPassword}
            </div>
            <Button
              onClick={handleCopy}
              variant="outline"
              size="icon"
              className="shrink-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          {copied && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
              ✓ Copied to clipboard!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
