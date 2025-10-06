export type PasswordStrength = 'very-weak' | 'weak' | 'fair' | 'good' | 'strong' | 'ultimate';

export interface PasswordAnalysis {
  strength: PasswordStrength;
  score: number; // 0-100
  level: number; // 1-6
  length: number;
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumbers: boolean;
  hasSymbols: boolean;
  feedback: string[];
  isCommonPassword: boolean;
  easterEgg?: string;
}

// Common passwords for easter egg detection
const COMMON_PASSWORDS = [
  'password', 'password123', '123456', '12345678', 'qwerty', 'abc123',
  'monkey', '1234567', 'letmein', 'trustno1', 'dragon', 'baseball',
  'iloveyou', 'master', 'sunshine', 'ashley', 'bailey', 'passw0rd',
  'shadow', '123123', '654321', 'superman', 'qazwsx', 'michael',
  'football', 'welcome', 'jesus', 'ninja', 'mustang', 'password1'
];

const EASTER_EGG_MESSAGES: Record<string, string> = {
  'password': '🚨 Really? "password"? Even a level 1 warrior knows better!',
  'password123': '🤦 Adding "123" doesn\'t make it secure!',
  '123456': '🎯 Hackers LOVE this one! Please, try harder!',
  'qwerty': '⌨️ Just because it\'s on your keyboard doesn\'t make it safe!',
  'iloveyou': '💔 We love you too, but this password won\'t!',
  'letmein': '🚪 Oh we\'ll let you in... and so will hackers!',
  'dragon': '🐉 Dragons are cool, but this password is not!',
  'monkey': '🐵 Even monkeys can crack this one!',
  'ninja': '🥷 A real ninja would never use this!',
  'welcome': '👋 Welcome to getting hacked!',
};

export function analyzePassword(password: string): PasswordAnalysis {
  const length = password.length;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  // Check for common passwords (case-insensitive)
  const lowerPassword = password.toLowerCase();
  const isCommonPassword = COMMON_PASSWORDS.includes(lowerPassword);
  const easterEgg = EASTER_EGG_MESSAGES[lowerPassword];

  // Calculate score
  let score = 0;
  const feedback: string[] = [];

  // Immediate penalty for common passwords
  if (isCommonPassword) {
    score = 0;
    feedback.push('This is a commonly used password! Change it immediately!');
    return {
      strength: 'very-weak',
      score: 0,
      level: 1,
      length,
      hasLowercase,
      hasUppercase,
      hasNumbers,
      hasSymbols,
      feedback,
      isCommonPassword: true,
      easterEgg,
    };
  }

  // Length scoring (more granular)
  if (length >= 8) score += 15;
  if (length >= 10) score += 10;
  if (length >= 12) score += 10;
  if (length >= 14) score += 10;
  if (length >= 16) score += 5;
  if (length >= 20) score += 10;

  if (length < 8) {
    feedback.push('Use at least 8 characters');
  } else if (length < 12) {
    feedback.push('Consider using 12+ characters for better security');
  }

  // Character variety scoring
  if (hasLowercase) score += 10;
  else feedback.push('Add lowercase letters');

  if (hasUppercase) score += 10;
  else feedback.push('Add uppercase letters');

  if (hasNumbers) score += 10;
  else feedback.push('Add numbers');

  if (hasSymbols) score += 15;
  else feedback.push('Add special characters');

  // Bonus for having all types
  const varietyCount = [hasLowercase, hasUppercase, hasNumbers, hasSymbols].filter(Boolean).length;
  if (varietyCount === 4) score += 15;

  // Check for common patterns
  if (/(.)\1{2,}/.test(password)) {
    score -= 15;
    feedback.push('Avoid repeated characters');
  }

  if (/^[0-9]+$/.test(password)) {
    score -= 25;
    feedback.push('Don\'t use only numbers');
  }

  if (/^[a-zA-Z]+$/.test(password)) {
    score -= 15;
  }

  // Check for sequential patterns
  if (/123|234|345|456|567|678|789|890|abc|bcd|cde|def/i.test(password)) {
    score -= 10;
    feedback.push('Avoid sequential patterns');
  }

  // Bonus for extra long passwords
  if (length >= 24) {
    score += 5;
  }

  // Ensure score is between 0-100
  score = Math.max(0, Math.min(100, score));

  // Determine strength and level (6 levels)
  let strength: PasswordStrength;
  let level: number;

  // Ultimate level requires exceptional password: score > 95, length >= 16, and all character types
  const isUltimate = score > 95 && length >= 16 && varietyCount === 4;

  if (isUltimate) {
    strength = 'ultimate';
    level = 6;
  } else if (score <= 20) {
    strength = 'very-weak';
    level = 1;
  } else if (score <= 40) {
    strength = 'weak';
    level = 2;
  } else if (score <= 60) {
    strength = 'fair';
    level = 3;
  } else if (score <= 75) {
    strength = 'good';
    level = 4;
  } else {
    strength = 'strong';
    level = 5;
  }

  // Add positive feedback for high scores
  if (isUltimate) {
    feedback.unshift('🏆 Ultimate password strength achieved! You are legendary!');
  } else if (score >= 90) {
    feedback.unshift('Almost ultimate! Try making it 16+ characters with all types');
  } else if (score >= 75) {
    feedback.unshift('Excellent password!');
  } else if (score >= 60) {
    feedback.unshift('Good password, but could be stronger');
  }

  return {
    strength,
    score,
    level,
    length,
    hasLowercase,
    hasUppercase,
    hasNumbers,
    hasSymbols,
    feedback: feedback.length > 0 ? feedback : ['Great password!'],
    isCommonPassword: false,
  };
}

// Password generator functions
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export function generateRandomPassword(length: number = 16): string {
  const chars = lowercase + uppercase + numbers + symbols;
  let password = '';

  // Ensure at least one of each type
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Fill the rest
  for (let i = password.length; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  // Shuffle
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

export function generateAlphanumericPassword(length: number = 16): string {
  const chars = lowercase + uppercase + numbers;
  let password = '';

  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];

  for (let i = password.length; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  return password.split('').sort(() => Math.random() - 0.5).join('');
}

export function generatePIN(length: number = 6): string {
  let pin = '';
  for (let i = 0; i < length; i++) {
    pin += Math.floor(Math.random() * 10);
  }
  return pin;
}

const words = [
  'correct', 'horse', 'battery', 'staple', 'dragon', 'wizard', 'knight', 'castle',
  'forest', 'mountain', 'river', 'ocean', 'thunder', 'lightning', 'phoenix', 'eagle',
  'tiger', 'lion', 'sword', 'shield', 'armor', 'helmet', 'crown', 'magic',
  'crystal', 'diamond', 'gold', 'silver', 'bronze', 'iron', 'steel', 'stone'
];

export function generatePassphrase(wordCount: number = 4, separator: string = '-'): string {
  const selectedWords: string[] = [];

  for (let i = 0; i < wordCount; i++) {
    const word = words[Math.floor(Math.random() * words.length)];
    selectedWords.push(word.charAt(0).toUpperCase() + word.slice(1));
  }

  return selectedWords.join(separator) + Math.floor(Math.random() * 100);
}
