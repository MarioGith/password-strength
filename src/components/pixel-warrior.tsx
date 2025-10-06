'use client';

import { useMemo } from 'react';
import type { PasswordStrength } from '@/lib/password-utils';

interface PixelWarriorProps {
  strength: PasswordStrength;
  level: number;
  size?: number;
}

export function PixelWarrior({ strength, level, size = 128 }: PixelWarriorProps) {
  const gender = useMemo(() => Math.random() > 0.5 ? 'male' : 'female', []);

  // Pixel size for the grid - much larger grid for high detail
  const pixelSize = size / 32;

  const getColors = () => {
    const skinTones = ['#FDBCB4', '#F1A7A0', '#E89D8F', '#D4877F'];
    const skinTone = skinTones[Math.floor(Math.random() * skinTones.length)];

    // Progressive clothing color based on level
    const clothingColors = ['#8B4513', '#654321', '#4A6FA5', '#4169E1', '#1E3A8A', '#312E81'];
    const clothingColor = clothingColors[Math.min(level - 1, 5)];

    // Calculate shadow/highlight colors
    const skinShadow = '#C89B8D';
    const skinHighlight = '#FFEEE8';
    const clothingShadow = '#5A4A3A';
    const clothingHighlight = '#8B7B6B';

    return {
      skin: skinTone,
      skinShadow,
      skinHighlight,
      hair: gender === 'female' ? '#8B4513' : '#654321',
      hairShadow: gender === 'female' ? '#654321' : '#4A3621',
      hairHighlight: gender === 'female' ? '#A0522D' : '#8B6F47',
      clothing: clothingColor,
      clothingShadow,
      clothingHighlight,
      armor: '#C0C0C0',
      armorShadow: '#808080',
      armorHighlight: '#E8E8E8',
      shield: '#B87333',
      shieldShadow: '#8B5A2B',
      shieldDecor: '#FFD700',
      armorDetail: '#A9A9A9',
      legendary: '#9370DB',
      gold: '#FFD700',
      goldShadow: '#DAA520',
      cape: '#8B0000',
      capeShadow: '#5C0000',
      ultimate: '#FFD700',
      swordBlade: '#D3D3D3',
      swordBladeShine: '#FFFFFF',
      brown: '#654321',
      darkBrown: '#3E2723',
      black: '#000000',
      white: '#FFFFFF',
      red: '#DC143C',
    };
  };

  const colors = useMemo(getColors, [gender, level]);

  // Draw pixel art based on level
  const renderWarrior = () => {
    const pixels: JSX.Element[] = [];

    // Helper function to draw a pixel
    const pixel = (x: number, y: number, color: string, key: string) => (
      <rect
        key={key}
        x={x * pixelSize}
        y={y * pixelSize}
        width={pixelSize}
        height={pixelSize}
        fill={color}
      />
    );

    // Level 6: Ultimate - Add cape background (draw first so it's behind)
    if (level >= 6) {
      // Cape
      pixels.push(pixel(4, 4, colors.cape, 'cape-1'));
      pixels.push(pixel(5, 4, colors.cape, 'cape-2'));
      pixels.push(pixel(10, 4, colors.cape, 'cape-3'));
      pixels.push(pixel(11, 4, colors.cape, 'cape-4'));
      pixels.push(pixel(4, 5, colors.cape, 'cape-5'));
      pixels.push(pixel(5, 5, colors.cape, 'cape-6'));
      pixels.push(pixel(10, 5, colors.cape, 'cape-7'));
      pixels.push(pixel(11, 5, colors.cape, 'cape-8'));
      pixels.push(pixel(4, 6, colors.cape, 'cape-9'));
      pixels.push(pixel(5, 6, colors.cape, 'cape-10'));
      pixels.push(pixel(10, 6, colors.cape, 'cape-11'));
      pixels.push(pixel(11, 6, colors.cape, 'cape-12'));
      pixels.push(pixel(5, 7, colors.cape, 'cape-13'));
      pixels.push(pixel(10, 7, colors.cape, 'cape-14'));
      pixels.push(pixel(5, 8, colors.cape, 'cape-15'));
      pixels.push(pixel(10, 8, colors.cape, 'cape-16'));
    }

    // Base character - always present
    // Head outline
    pixels.push(pixel(6, 1, colors.skin, 'head-outline-1'));
    pixels.push(pixel(7, 1, colors.skin, 'head-outline-2'));
    pixels.push(pixel(8, 1, colors.skin, 'head-outline-3'));
    pixels.push(pixel(9, 1, colors.skin, 'head-outline-4'));

    pixels.push(pixel(5, 2, colors.skin, 'head-outline-5'));
    pixels.push(pixel(6, 2, colors.skin, 'head-1'));
    pixels.push(pixel(7, 2, colors.skin, 'head-2'));
    pixels.push(pixel(8, 2, colors.skin, 'head-3'));
    pixels.push(pixel(9, 2, colors.skin, 'head-4'));
    pixels.push(pixel(10, 2, colors.skin, 'head-outline-6'));

    pixels.push(pixel(5, 3, colors.skin, 'head-outline-7'));
    pixels.push(pixel(6, 3, colors.skin, 'head-5'));
    pixels.push(pixel(7, 3, colors.skin, 'head-6'));
    pixels.push(pixel(8, 3, colors.skin, 'head-7'));
    pixels.push(pixel(9, 3, colors.skin, 'head-8'));
    pixels.push(pixel(10, 3, colors.skin, 'head-outline-8'));

    // Hair - more detailed
    pixels.push(pixel(5, 1, colors.hair, 'hair-1'));
    pixels.push(pixel(6, 1, colors.hair, 'hair-2'));
    pixels.push(pixel(7, 1, colors.hair, 'hair-3'));
    pixels.push(pixel(8, 1, colors.hair, 'hair-4'));
    pixels.push(pixel(9, 1, colors.hair, 'hair-5'));
    pixels.push(pixel(10, 1, colors.hair, 'hair-6'));

    pixels.push(pixel(5, 0, colors.hair, 'hair-7'));
    pixels.push(pixel(6, 0, colors.hair, 'hair-8'));
    pixels.push(pixel(9, 0, colors.hair, 'hair-9'));
    pixels.push(pixel(10, 0, colors.hair, 'hair-10'));

    if (gender === 'female') {
      pixels.push(pixel(4, 1, colors.hair, 'hair-fem-1'));
      pixels.push(pixel(11, 1, colors.hair, 'hair-fem-2'));
      pixels.push(pixel(4, 2, colors.hair, 'hair-fem-3'));
      pixels.push(pixel(11, 2, colors.hair, 'hair-fem-4'));
      pixels.push(pixel(7, 0, colors.hair, 'hair-fem-5'));
      pixels.push(pixel(8, 0, colors.hair, 'hair-fem-6'));
    }

    // Eyes - more detailed
    pixels.push(pixel(6, 2, '#000000', 'eye-1'));
    pixels.push(pixel(9, 2, '#000000', 'eye-2'));
    pixels.push(pixel(6, 3, '#FFFFFF', 'eye-white-1'));
    pixels.push(pixel(9, 3, '#FFFFFF', 'eye-white-2'));

    // Nose
    pixels.push(pixel(7, 3, colors.skin, 'nose-1'));
    pixels.push(pixel(8, 3, colors.skin, 'nose-2'));

    // Mouth - smile
    pixels.push(pixel(7, 4, '#8B4513', 'mouth-1'));
    pixels.push(pixel(8, 4, '#8B4513', 'mouth-2'));

    // Neck
    pixels.push(pixel(7, 4, colors.skin, 'neck-1'));
    pixels.push(pixel(8, 4, colors.skin, 'neck-2'));
    pixels.push(pixel(7, 5, colors.skin, 'neck-3'));
    pixels.push(pixel(8, 5, colors.skin, 'neck-4'));

    // Body - more detailed
    pixels.push(pixel(6, 5, colors.clothing, 'body-1'));
    pixels.push(pixel(7, 5, colors.clothing, 'body-2'));
    pixels.push(pixel(8, 5, colors.clothing, 'body-3'));
    pixels.push(pixel(9, 5, colors.clothing, 'body-4'));

    pixels.push(pixel(5, 6, colors.clothing, 'body-5'));
    pixels.push(pixel(6, 6, colors.clothing, 'body-6'));
    pixels.push(pixel(7, 6, colors.clothing, 'body-7'));
    pixels.push(pixel(8, 6, colors.clothing, 'body-8'));
    pixels.push(pixel(9, 6, colors.clothing, 'body-9'));
    pixels.push(pixel(10, 6, colors.clothing, 'body-10'));

    pixels.push(pixel(6, 7, colors.clothing, 'body-11'));
    pixels.push(pixel(7, 7, colors.clothing, 'body-12'));
    pixels.push(pixel(8, 7, colors.clothing, 'body-13'));
    pixels.push(pixel(9, 7, colors.clothing, 'body-14'));

    pixels.push(pixel(6, 8, colors.clothing, 'body-15'));
    pixels.push(pixel(7, 8, colors.clothing, 'body-16'));
    pixels.push(pixel(8, 8, colors.clothing, 'body-17'));
    pixels.push(pixel(9, 8, colors.clothing, 'body-18'));

    // Belt
    if (level >= 2) {
      pixels.push(pixel(6, 8, '#654321', 'belt-1'));
      pixels.push(pixel(7, 8, '#654321', 'belt-2'));
      pixels.push(pixel(8, 8, '#654321', 'belt-3'));
      pixels.push(pixel(9, 8, '#654321', 'belt-4'));
      pixels.push(pixel(7, 8, colors.gold, 'belt-buckle'));
    }

    // Arms - more detailed
    pixels.push(pixel(5, 5, colors.skin, 'arm-left-1'));
    pixels.push(pixel(10, 5, colors.skin, 'arm-right-1'));
    pixels.push(pixel(4, 6, colors.skin, 'arm-left-2'));
    pixels.push(pixel(11, 6, colors.skin, 'arm-right-2'));
    pixels.push(pixel(4, 7, colors.skin, 'arm-left-3'));
    pixels.push(pixel(11, 7, colors.skin, 'arm-right-3'));
    pixels.push(pixel(4, 8, colors.skin, 'hand-left'));
    pixels.push(pixel(11, 8, colors.skin, 'hand-right'));

    // Legs - more detailed
    pixels.push(pixel(6, 9, colors.clothing, 'leg-left-1'));
    pixels.push(pixel(9, 9, colors.clothing, 'leg-right-1'));
    pixels.push(pixel(6, 10, colors.clothing, 'leg-left-2'));
    pixels.push(pixel(9, 10, colors.clothing, 'leg-right-2'));
    pixels.push(pixel(6, 11, colors.clothing, 'leg-left-3'));
    pixels.push(pixel(9, 11, colors.clothing, 'leg-right-3'));

    // Boots
    pixels.push(pixel(5, 12, '#2C1810', 'boot-left-1'));
    pixels.push(pixel(6, 12, '#2C1810', 'boot-left-2'));
    pixels.push(pixel(9, 12, '#2C1810', 'boot-right-1'));
    pixels.push(pixel(10, 12, '#2C1810', 'boot-right-2'));

    // Level 2: Add simple wooden stick
    if (level >= 2) {
      pixels.push(pixel(12, 6, colors.shield, 'stick-1'));
      pixels.push(pixel(12, 7, colors.shield, 'stick-2'));
      pixels.push(pixel(12, 8, colors.shield, 'stick-3'));
      pixels.push(pixel(12, 9, colors.shield, 'stick-4'));
    }

    // Level 3: Add shield - more detailed
    if (level >= 3) {
      pixels.push(pixel(2, 6, colors.shield, 'shield-1'));
      pixels.push(pixel(3, 6, colors.shield, 'shield-2'));
      pixels.push(pixel(2, 7, colors.shield, 'shield-3'));
      pixels.push(pixel(3, 7, colors.shield, 'shield-4'));
      pixels.push(pixel(2, 8, colors.shield, 'shield-5'));
      pixels.push(pixel(3, 8, colors.shield, 'shield-6'));
      pixels.push(pixel(2, 9, colors.shield, 'shield-7'));
      pixels.push(pixel(3, 9, colors.shield, 'shield-8'));
      pixels.push(pixel(3, 10, colors.shield, 'shield-9'));

      // Shield rim
      pixels.push(pixel(2, 5, colors.armorDetail, 'shield-rim-1'));
      pixels.push(pixel(3, 5, colors.armorDetail, 'shield-rim-2'));
    }

    // Level 4: Add armor shoulders and shield decoration
    if (level >= 4) {
      // Shield decoration
      pixels.push(pixel(3, 7, colors.shieldDecor, 'shield-decor-1'));
      pixels.push(pixel(3, 8, colors.shieldDecor, 'shield-decor-2'));

      // Shoulder pads
      pixels.push(pixel(5, 5, colors.armorDetail, 'shoulder-left-1'));
      pixels.push(pixel(6, 5, colors.armorDetail, 'shoulder-left-2'));
      pixels.push(pixel(9, 5, colors.armorDetail, 'shoulder-right-1'));
      pixels.push(pixel(10, 5, colors.armorDetail, 'shoulder-right-2'));

      // Chest armor detail
      pixels.push(pixel(7, 6, colors.armorDetail, 'chest-armor-1'));
      pixels.push(pixel(8, 6, colors.armorDetail, 'chest-armor-2'));
    }

    // Level 5: Add helmet and metal sword
    if (level >= 5) {
      // Helmet - more detailed
      pixels.push(pixel(5, 1, colors.armor, 'helmet-1'));
      pixels.push(pixel(6, 1, colors.armor, 'helmet-2'));
      pixels.push(pixel(7, 1, colors.armor, 'helmet-3'));
      pixels.push(pixel(8, 1, colors.armor, 'helmet-4'));
      pixels.push(pixel(9, 1, colors.armor, 'helmet-5'));
      pixels.push(pixel(10, 1, colors.armor, 'helmet-6'));

      pixels.push(pixel(5, 2, colors.armor, 'helmet-7'));
      pixels.push(pixel(10, 2, colors.armor, 'helmet-8'));

      // Helmet visor opening
      pixels.push(pixel(6, 2, colors.skin, 'visor-1'));
      pixels.push(pixel(7, 2, colors.skin, 'visor-2'));
      pixels.push(pixel(8, 2, colors.skin, 'visor-3'));
      pixels.push(pixel(9, 2, colors.skin, 'visor-4'));

      // Helmet detail
      pixels.push(pixel(7, 0, colors.armorDetail, 'helmet-detail-1'));
      pixels.push(pixel(8, 0, colors.armorDetail, 'helmet-detail-2'));

      // Armor plating - more detailed
      pixels.push(pixel(6, 5, colors.armor, 'armor-chest-1'));
      pixels.push(pixel(9, 5, colors.armor, 'armor-chest-2'));
      pixels.push(pixel(6, 6, colors.armor, 'armor-torso-1'));
      pixels.push(pixel(7, 6, colors.armorDetail, 'armor-torso-2'));
      pixels.push(pixel(8, 6, colors.armorDetail, 'armor-torso-3'));
      pixels.push(pixel(9, 6, colors.armor, 'armor-torso-4'));

      // Arm guards
      pixels.push(pixel(5, 6, colors.armor, 'arm-guard-left'));
      pixels.push(pixel(10, 6, colors.armor, 'arm-guard-right'));

      // Metal sword - more detailed
      pixels.push(pixel(12, 4, colors.gold, 'sword-pommel'));
      pixels.push(pixel(12, 5, colors.armorDetail, 'sword-handle-1'));
      pixels.push(pixel(12, 6, colors.armorDetail, 'sword-handle-2'));
      pixels.push(pixel(11, 7, colors.armor, 'sword-guard-1'));
      pixels.push(pixel(12, 7, colors.armor, 'sword-guard-2'));
      pixels.push(pixel(13, 7, colors.armor, 'sword-guard-3'));
      pixels.push(pixel(12, 8, colors.armorDetail, 'sword-blade-1'));
      pixels.push(pixel(12, 9, colors.armorDetail, 'sword-blade-2'));
      pixels.push(pixel(12, 10, colors.armorDetail, 'sword-blade-3'));
      pixels.push(pixel(12, 11, colors.armorDetail, 'sword-blade-4'));

      // Sword shine
      pixels.push(pixel(12, 9, '#FFFFFF', 'sword-shine'));
    }

    // Level 6: Ultimate - Add crown and legendary effects
    if (level >= 6) {
      // Crown - more detailed
      pixels.push(pixel(6, 0, colors.gold, 'crown-1'));
      pixels.push(pixel(7, 0, colors.gold, 'crown-2'));
      pixels.push(pixel(8, 0, colors.gold, 'crown-3'));
      pixels.push(pixel(9, 0, colors.gold, 'crown-4'));

      pixels.push(pixel(5, 0, colors.gold, 'crown-5'));
      pixels.push(pixel(10, 0, colors.gold, 'crown-6'));

      // Crown jewels
      pixels.push(pixel(6, 0, colors.ultimate, 'jewel-1'));
      pixels.push(pixel(8, 0, colors.ultimate, 'jewel-2'));
      pixels.push(pixel(10, 0, colors.ultimate, 'jewel-3'));

      // Ultimate glow aura
      pixels.push(pixel(4, 1, colors.ultimate, 'glow-1'));
      pixels.push(pixel(11, 1, colors.ultimate, 'glow-2'));
      pixels.push(pixel(4, 4, colors.ultimate, 'glow-3'));
      pixels.push(pixel(11, 4, colors.ultimate, 'glow-4'));
      pixels.push(pixel(5, 9, colors.ultimate, 'glow-5'));
      pixels.push(pixel(10, 9, colors.ultimate, 'glow-6'));
      pixels.push(pixel(3, 6, colors.ultimate, 'glow-7'));
      pixels.push(pixel(13, 8, colors.ultimate, 'glow-8'));

      // Extra sparkles
      pixels.push(pixel(3, 2, colors.gold, 'sparkle-1'));
      pixels.push(pixel(12, 2, colors.gold, 'sparkle-2'));
      pixels.push(pixel(4, 10, colors.gold, 'sparkle-3'));
      pixels.push(pixel(11, 10, colors.gold, 'sparkle-4'));

      // Legendary particles
      pixels.push(pixel(2, 4, colors.ultimate, 'particle-1'));
      pixels.push(pixel(13, 5, colors.ultimate, 'particle-2'));
      pixels.push(pixel(3, 11, colors.ultimate, 'particle-3'));
      pixels.push(pixel(12, 11, colors.ultimate, 'particle-4'));
    }

    return pixels;
  };

  const levelNames = ['Peasant', 'Novice', 'Warrior', 'Knight', 'Champion', 'ULTIMATE'];
  const levelText = levelNames[level - 1] || 'Unknown';

  const levelColors = [
    'text-gray-500',
    'text-red-500',
    'text-orange-500',
    'text-yellow-500',
    'text-blue-500',
    'text-purple-500'
  ];
  const levelColor = levelColors[level - 1] || 'text-gray-500';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <svg
          width={size}
          height={size}
          className="pixelated"
          style={{ imageRendering: 'pixelated' }}
        >
          <rect width={size} height={size} fill="transparent" />
          {renderWarrior()}
        </svg>
      </div>
      <div className={`text-lg font-bold ${levelColor}`}>
        Level {level}: {levelText}
      </div>
    </div>
  );
}
