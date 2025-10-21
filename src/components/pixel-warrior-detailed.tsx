"use client";

import { JSX, useMemo, useRef } from "react";
import type { PasswordStrength } from "@/lib/password-utils";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface PixelWarriorProps {
  strength: PasswordStrength;
  level: number;
  size?: number;
  seed?: number;
}

export function PixelWarrior({ level, size = 320, seed = 0 }: PixelWarriorProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  // Use seed to determine gender deterministically
  const gender = useMemo(() => (seed % 2 === 0 ? "male" : "female"), [seed]);

  // Much larger grid for extreme detail (48x48)
  const gridSize = 48;
  const pixelSize = size / gridSize;

  const getColors = () => {
    const skinTones = ["#FDBCB4", "#F1A7A0", "#E89D8F", "#D4877F"];
    // Use seed to determine skin tone deterministically
    const skinTone = skinTones[seed % skinTones.length];

    const clothingColors = [
      "#8B4513",
      "#654321",
      "#4A6FA5",
      "#4169E1",
      "#1E3A8A",
      "#312E81",
    ];
    const clothingColor = clothingColors[Math.min(level - 1, 5)];

    return {
      // Skin tones
      skin: skinTone,
      skinShadow: "#C89B8D",
      skinHighlight: "#FFEEE8",
      skinDark: "#B88A7D",

      // Hair
      hair: gender === "female" ? "#8B4513" : "#654321",
      hairShadow: gender === "female" ? "#654321" : "#4A3621",
      hairHighlight: gender === "female" ? "#A0522D" : "#8B6F47",

      // Clothing
      clothing: clothingColor,
      clothingShadow: "#5A4A3A",
      clothingHighlight: "#8B7B6B",
      clothingDark: "#3E2723",

      // Armor
      armor: "#C0C0C0",
      armorShadow: "#808080",
      armorHighlight: "#E8E8E8",
      armorDark: "#606060",

      // Metals
      gold: "#FFD700",
      goldShadow: "#DAA520",
      goldHighlight: "#FFED85",
      silver: "#D3D3D3",
      silverShadow: "#A9A9A9",
      silverHighlight: "#FFFFFF",

      // Shield
      shield: "#B87333",
      shieldShadow: "#8B5A2B",
      shieldHighlight: "#CD853F",
      shieldDecor: "#FFD700",

      // Cape
      cape: "#8B0000",
      capeShadow: "#5C0000",
      capeHighlight: "#DC143C",

      // Effects
      ultimate: "#FFD700",
      glow: "#FFA500",

      // Basic colors
      black: "#000000",
      white: "#FFFFFF",
      brown: "#654321",
      darkBrown: "#3E2723",
      red: "#DC143C",
      blue: "#4169E1",
      green: "#228B22",
    };
  };

  const colors = useMemo(getColors, [seed, level]);

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

  const renderDetailedWarrior = () => {
    const pixels: JSX.Element[] = [];

    // Center the warrior in the 48x48 grid
    // After analyzing the actual pixel positions:
    // Shield starts at x=7, sword ends at x=34, particles extend to ~x=40
    // Crown starts at y=3, boots end at y=30
    const offsetX = 2; // Shift right to center horizontally
    const offsetY = 9; // Shift down to center vertically

    const p = (x: number, y: number, color: string, key: string) =>
      pixel(x + offsetX, y + offsetY, color, key);

    // Background glow for ultimate - subtle and smaller
    if (level >= 6) {
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const dist = Math.sqrt(
            Math.pow(i - gridSize / 2, 2) + Math.pow(j - gridSize / 2, 2)
          );
          // Smaller radius and thinner ring
          if (dist > 15 && dist < 17) {
            pixels.push(p(i, j, colors.ultimate + "12", `bg-glow-${i}-${j}`));
          }
        }
      }
    }

    // Cape (Level 6) - draw first so it's behind
    if (level >= 6) {
      const capePixels = [
        [17, 12],
        [18, 12],
        [19, 12],
        [20, 12],
        [21, 12],
        [22, 12],
        [23, 12],
        [24, 12],
        [25, 12],
        [26, 12],
        [27, 12],
        [28, 12],
        [16, 13],
        [17, 13],
        [18, 13],
        [19, 13],
        [20, 13],
        [21, 13],
        [22, 13],
        [23, 13],
        [24, 13],
        [25, 13],
        [26, 13],
        [27, 13],
        [28, 13],
        [29, 13],
        [16, 14],
        [17, 14],
        [18, 14],
        [28, 14],
        [29, 14],
        [17, 15],
        [18, 15],
        [28, 15],
        [29, 15],
        [17, 16],
        [18, 16],
        [28, 16],
        [29, 16],
        [18, 17],
        [19, 17],
        [27, 17],
        [28, 17],
        [18, 18],
        [19, 18],
        [27, 18],
        [28, 18],
        [19, 19],
        [20, 19],
        [26, 19],
        [27, 19],
        [19, 20],
        [20, 20],
        [26, 20],
        [27, 20],
        [20, 21],
        [21, 21],
        [25, 21],
        [26, 21],
        [20, 22],
        [21, 22],
        [25, 22],
        [26, 22],
        [21, 23],
        [22, 23],
        [24, 23],
        [25, 23],
      ];
      capePixels.forEach(([x, y], i) => {
        const isShadow = x < 22 || (y > 16 && x < 23);
        pixels.push(
          p(x, y, isShadow ? colors.capeShadow : colors.cape, `cape-${i}`)
        );
      });
    }

    // Hair base
    const hairPixels = [
      [19, 6],
      [20, 6],
      [21, 6],
      [22, 6],
      [23, 6],
      [24, 6],
      [25, 6],
      [26, 6],
      [27, 6],
      [18, 7],
      [19, 7],
      [20, 7],
      [21, 7],
      [22, 7],
      [23, 7],
      [24, 7],
      [25, 7],
      [26, 7],
      [27, 7],
      [28, 7],
      [18, 8],
      [19, 8],
      [20, 8],
      [27, 8],
      [28, 8],
      [18, 9],
      [19, 9],
      [28, 9],
      [29, 9],
    ];
    hairPixels.forEach(([x, y], i) => {
      const isHighlight = y === 6 && (x === 22 || x === 24);
      const isShadow = y >= 8 || x === 18 || x === 28;
      pixels.push(
        p(
          x,
          y,
          isHighlight
            ? colors.hairHighlight
            : isShadow
            ? colors.hairShadow
            : colors.hair,
          `hair-${i}`
        )
      );
    });

    // Female hair extensions
    if (gender === "female") {
      const femHairPixels = [
        [17, 8],
        [17, 9],
        [17, 10],
        [17, 11],
        [17, 12],
        [29, 8],
        [29, 9],
        [29, 10],
        [29, 11],
        [29, 12],
        [18, 10],
        [18, 11],
        [18, 12],
        [28, 10],
        [28, 11],
        [28, 12],
      ];
      femHairPixels.forEach(([x, y], i) => {
        pixels.push(
          p(x, y, y > 10 ? colors.hairShadow : colors.hair, `hair-fem-${i}`)
        );
      });
    }

    // Head outline & skin
    const headPixels = [
      [20, 8],
      [21, 8],
      [22, 8],
      [23, 8],
      [24, 8],
      [25, 8],
      [26, 8],
      [19, 9],
      [20, 9],
      [21, 9],
      [22, 9],
      [23, 9],
      [24, 9],
      [25, 9],
      [26, 9],
      [27, 9],
      [19, 10],
      [20, 10],
      [21, 10],
      [22, 10],
      [23, 10],
      [24, 10],
      [25, 10],
      [26, 10],
      [27, 10],
      [19, 11],
      [20, 11],
      [21, 11],
      [22, 11],
      [23, 11],
      [24, 11],
      [25, 11],
      [26, 11],
      [27, 11],
      [20, 12],
      [21, 12],
      [22, 12],
      [23, 12],
      [24, 12],
      [25, 12],
      [26, 12],
    ];
    headPixels.forEach(([x, y], i) => {
      const isShadow = x === 19 || x === 27 || y === 12;
      const isHighlight = (x === 21 || x === 25) && y === 9;
      pixels.push(
        p(
          x,
          y,
          isHighlight
            ? colors.skinHighlight
            : isShadow
            ? colors.skinShadow
            : colors.skin,
          `head-${i}`
        )
      );
    });

    // Eyes - detailed
    [
      [20, 9],
      [21, 9],
      [24, 9],
      [25, 9],
    ].forEach(([x, y], i) => {
      pixels.push(p(x, y, colors.white, `eye-white-${i}`));
    });
    [
      [21, 10],
      [25, 10],
    ].forEach(([x, y], i) => {
      pixels.push(p(x, y, colors.black, `eye-pupil-${i}`));
    });
    [
      [21, 11],
      [25, 11],
    ].forEach(([x, y], i) => {
      pixels.push(p(x, y, colors.black, `eye-lash-${i}`));
    });

    // Eyebrows
    [
      [20, 8],
      [21, 8],
      [24, 8],
      [25, 8],
    ].forEach(([x, y], i) => {
      pixels.push(p(x, y, colors.hairShadow, `eyebrow-${i}`));
    });

    // Nose
    [
      [22, 10],
      [23, 10],
      [24, 10],
    ].forEach(([x, y], i) => {
      pixels.push(p(x, y, colors.skinShadow, `nose-${i}`));
    });

    // Mouth - smile
    [
      [21, 11],
      [22, 11],
      [23, 11],
      [24, 11],
      [25, 11],
    ].forEach(([x, y], i) => {
      pixels.push(p(x, y, colors.skinDark, `mouth-${i}`));
    });
    [
      [22, 12],
      [23, 12],
      [24, 12],
    ].forEach(([x, y], i) => {
      pixels.push(p(x, y, colors.red, `mouth-inner-${i}`));
    });

    // Neck
    [
      [21, 13],
      [22, 13],
      [23, 13],
      [24, 13],
      [25, 13],
    ].forEach(([x, y], i) => {
      pixels.push(
        p(x, y, i < 2 || i > 2 ? colors.skinShadow : colors.skin, `neck-${i}`)
      );
    });

    // === HELMET (Level 5+) ===
    if (level >= 5) {
      const helmetPixels = [
        [19, 6],
        [20, 6],
        [21, 6],
        [22, 6],
        [23, 6],
        [24, 6],
        [25, 6],
        [26, 6],
        [27, 6],
        [18, 7],
        [19, 7],
        [20, 7],
        [21, 7],
        [22, 7],
        [23, 7],
        [24, 7],
        [25, 7],
        [26, 7],
        [27, 7],
        [28, 7],
        [18, 8],
        [19, 8],
        [28, 8],
        [29, 8],
        [18, 9],
        [29, 9],
      ];
      helmetPixels.forEach(([x, y], i) => {
        const isHighlight = y === 6 && (x === 21 || x === 23 || x === 25);
        const isShadow = x === 18 || x === 28 || x === 29 || y >= 8;
        pixels.push(
          p(
            x,
            y,
            isHighlight
              ? colors.armorHighlight
              : isShadow
              ? colors.armorShadow
              : colors.armor,
            `helmet-${i}`
          )
        );
      });

      // Helmet plume
      [
        [22, 5],
        [23, 5],
        [24, 5],
      ].forEach(([x, y], i) => {
        pixels.push(p(x, y, colors.red, `plume-${i}`));
      });
      [
        [22, 4],
        [23, 4],
        [24, 4],
      ].forEach(([x, y], i) => {
        pixels.push(p(x, y, colors.red, `plume-top-${i}`));
      });

      // Visor
      [
        [20, 9],
        [21, 9],
        [22, 9],
        [23, 9],
        [24, 9],
        [25, 9],
        [26, 9],
      ].forEach(([x, y], i) => {
        pixels.push(p(x, y, colors.armorDark, `visor-${i}`));
      });
    }

    // === CROWN (Level 6) ===
    if (level >= 6) {
      const crownPixels = [
        [19, 5],
        [20, 5],
        [21, 5],
        [22, 5],
        [23, 5],
        [24, 5],
        [25, 5],
        [26, 5],
        [27, 5],
        [19, 4],
        [21, 4],
        [23, 4],
        [25, 4],
        [27, 4],
        [19, 3],
        [21, 3],
        [23, 3],
        [25, 3],
        [27, 3],
      ];
      crownPixels.forEach(([x, y], i) => {
        const isJewel = y === 3;
        const isHighlight = y === 4 && x % 2 === 1;
        pixels.push(
          p(
            x,
            y,
            isJewel
              ? colors.ultimate
              : isHighlight
              ? colors.goldHighlight
              : colors.gold,
            `crown-${i}`
          )
        );
      });
    }

    // === BODY ===
    // Torso
    const bodyPixels = [
      [20, 14],
      [21, 14],
      [22, 14],
      [23, 14],
      [24, 14],
      [25, 14],
      [26, 14],
      [19, 15],
      [20, 15],
      [21, 15],
      [22, 15],
      [23, 15],
      [24, 15],
      [25, 15],
      [26, 15],
      [27, 15],
      [18, 16],
      [19, 16],
      [20, 16],
      [21, 16],
      [22, 16],
      [23, 16],
      [24, 16],
      [25, 16],
      [26, 16],
      [27, 16],
      [28, 16],
      [18, 17],
      [19, 17],
      [20, 17],
      [21, 17],
      [22, 17],
      [23, 17],
      [24, 17],
      [25, 17],
      [26, 17],
      [27, 17],
      [28, 17],
      [19, 18],
      [20, 18],
      [21, 18],
      [22, 18],
      [23, 18],
      [24, 18],
      [25, 18],
      [26, 18],
      [27, 18],
      [19, 19],
      [20, 19],
      [21, 19],
      [22, 19],
      [23, 19],
      [24, 19],
      [25, 19],
      [26, 19],
      [27, 19],
      [20, 20],
      [21, 20],
      [22, 20],
      [23, 20],
      [24, 20],
      [25, 20],
      [26, 20],
      [20, 21],
      [21, 21],
      [22, 21],
      [23, 21],
      [24, 21],
      [25, 21],
      [26, 21],
    ];
    bodyPixels.forEach(([x, y], i) => {
      const isShadow = x <= 19 || x >= 27 || y >= 20;
      const isHighlight = x === 23 && y === 15;
      pixels.push(
        p(
          x,
          y,
          isHighlight
            ? colors.clothingHighlight
            : isShadow
            ? colors.clothingShadow
            : colors.clothing,
          `body-${i}`
        )
      );
    });

    // Belt (Level 2+)
    if (level >= 2) {
      [
        [19, 20],
        [20, 20],
        [21, 20],
        [22, 20],
        [23, 20],
        [24, 20],
        [25, 20],
        [26, 20],
        [27, 20],
      ].forEach(([x, y], i) => {
        pixels.push(p(x, y, colors.darkBrown, `belt-${i}`));
      });
      [
        [22, 20],
        [23, 20],
        [24, 20],
      ].forEach(([x, y], i) => {
        pixels.push(
          p(x, y, i === 1 ? colors.gold : colors.goldShadow, `buckle-${i}`)
        );
      });
    }

    // Chest armor (Level 4+)
    if (level >= 4) {
      const chestArmorPixels = [
        [20, 15],
        [21, 15],
        [25, 15],
        [26, 15],
        [20, 16],
        [21, 16],
        [25, 16],
        [26, 16],
        [21, 17],
        [22, 17],
        [24, 17],
        [25, 17],
        [22, 18],
        [23, 18],
        [24, 18],
      ];
      chestArmorPixels.forEach(([x, y], i) => {
        const isHighlight = y === 15;
        pixels.push(
          p(
            x,
            y,
            isHighlight ? colors.armorHighlight : colors.armor,
            `chest-armor-${i}`
          )
        );
      });
    }

    // Full plate armor (Level 5+)
    if (level >= 5) {
      const platePixels = [
        [19, 15],
        [20, 15],
        [21, 15],
        [22, 15],
        [23, 15],
        [24, 15],
        [25, 15],
        [26, 15],
        [27, 15],
        [19, 16],
        [20, 16],
        [21, 16],
        [22, 16],
        [23, 16],
        [24, 16],
        [25, 16],
        [26, 16],
        [27, 16],
        [20, 17],
        [21, 17],
        [22, 17],
        [23, 17],
        [24, 17],
        [25, 17],
        [26, 17],
        [21, 18],
        [22, 18],
        [23, 18],
        [24, 18],
        [25, 18],
      ];
      platePixels.forEach(([x, y], i) => {
        const isHighlight = x === 22 || x === 24;
        const isShadow = x === 19 || x === 27;
        pixels.push(
          p(
            x,
            y,
            isHighlight
              ? colors.armorHighlight
              : isShadow
              ? colors.armorShadow
              : colors.armor,
            `plate-${i}`
          )
        );
      });

      // Armor details
      [
        [21, 16],
        [25, 16],
        [22, 17],
        [24, 17],
        [23, 18],
      ].forEach(([x, y], i) => {
        pixels.push(p(x, y, colors.armorDark, `armor-detail-${i}`));
      });
    }

    // === ARMS ===
    // Left arm
    const leftArmPixels = [
      [17, 15],
      [18, 15],
      [16, 16],
      [17, 16],
      [15, 17],
      [16, 17],
      [14, 18],
      [15, 18],
      [13, 19],
      [14, 19],
      [13, 20],
      [14, 20],
      [13, 21],
      [14, 21],
    ];
    leftArmPixels.forEach(([x, y], i) => {
      const isShadow = x <= 14;
      pixels.push(
        p(x, y, isShadow ? colors.skinShadow : colors.skin, `arm-left-${i}`)
      );
    });

    // Right arm
    const rightArmPixels = [
      [28, 15],
      [29, 15],
      [29, 16],
      [30, 16],
      [30, 17],
      [31, 17],
      [31, 18],
      [32, 18],
      [32, 19],
      [33, 19],
      [32, 20],
      [33, 20],
      [32, 21],
      [33, 21],
    ];
    rightArmPixels.forEach(([x, y], i) => {
      const isShadow = x >= 32;
      pixels.push(
        p(x, y, isShadow ? colors.skinShadow : colors.skin, `arm-right-${i}`)
      );
    });

    // Shoulder armor (Level 4+)
    if (level >= 4) {
      [
        [17, 14],
        [18, 14],
        [19, 14],
      ].forEach(([x, y], i) => {
        pixels.push(
          p(
            x,
            y,
            i === 1 ? colors.armorHighlight : colors.armor,
            `shoulder-left-${i}`
          )
        );
      });
      [
        [27, 14],
        [28, 14],
        [29, 14],
      ].forEach(([x, y], i) => {
        pixels.push(
          p(
            x,
            y,
            i === 1 ? colors.armorHighlight : colors.armor,
            `shoulder-right-${i}`
          )
        );
      });
    }

    // Gauntlets (Level 5+)
    if (level >= 5) {
      [
        [13, 20],
        [14, 20],
        [13, 21],
        [14, 21],
      ].forEach(([x, y], i) => {
        pixels.push(
          p(
            x,
            y,
            i % 2 === 0 ? colors.armor : colors.armorShadow,
            `gauntlet-left-${i}`
          )
        );
      });
      [
        [32, 20],
        [33, 20],
        [32, 21],
        [33, 21],
      ].forEach(([x, y], i) => {
        pixels.push(
          p(
            x,
            y,
            i % 2 === 0 ? colors.armor : colors.armorShadow,
            `gauntlet-right-${i}`
          )
        );
      });
    }

    // === SHIELD (Level 3+) ===
    if (level >= 3) {
      const shieldPixels = [
        [8, 17],
        [9, 17],
        [10, 17],
        [11, 17],
        [7, 18],
        [8, 18],
        [9, 18],
        [10, 18],
        [11, 18],
        [12, 18],
        [7, 19],
        [8, 19],
        [9, 19],
        [10, 19],
        [11, 19],
        [12, 19],
        [7, 20],
        [8, 20],
        [9, 20],
        [10, 20],
        [11, 20],
        [12, 20],
        [7, 21],
        [8, 21],
        [9, 21],
        [10, 21],
        [11, 21],
        [12, 21],
        [8, 22],
        [9, 22],
        [10, 22],
        [11, 22],
        [12, 22],
        [8, 23],
        [9, 23],
        [10, 23],
        [11, 23],
        [9, 24],
        [10, 24],
        [11, 24],
        [9, 25],
        [10, 25],
      ];
      shieldPixels.forEach(([x, y], i) => {
        const isHighlight = x === 9 || x === 10;
        const isShadow = x >= 11 || y >= 23;
        pixels.push(
          p(
            x,
            y,
            isHighlight
              ? colors.shieldHighlight
              : isShadow
              ? colors.shieldShadow
              : colors.shield,
            `shield-${i}`
          )
        );
      });

      // Shield rim
      [
        [8, 17],
        [9, 17],
        [10, 17],
        [11, 17],
      ].forEach(([x, y], i) => {
        pixels.push(p(x, y, colors.armorShadow, `shield-rim-top-${i}`));
      });

      // Shield emblem (Level 4+)
      if (level >= 4) {
        [
          [9, 20],
          [10, 20],
        ].forEach(([x, y], i) => {
          pixels.push(p(x, y, colors.gold, `emblem-${i}`));
        });
        [
          [9, 21],
          [10, 21],
        ].forEach(([x, y], i) => {
          pixels.push(p(x, y, colors.goldShadow, `emblem-shadow-${i}`));
        });
      }
    }

    // === WEAPON ===
    // Wooden stick (Level 2)
    if (level === 2) {
      [
        [34, 18],
        [34, 19],
        [34, 20],
        [34, 21],
        [34, 22],
        [34, 23],
        [34, 24],
      ].forEach(([x, y], i) => {
        pixels.push(
          p(x, y, i % 2 === 0 ? colors.brown : colors.darkBrown, `stick-${i}`)
        );
      });
    }

    // Metal sword (Level 3-4)
    if (level >= 3 && level < 5) {
      // Handle
      [
        [34, 19],
        [34, 20],
        [34, 21],
      ].forEach(([x, y], i) => {
        pixels.push(p(x, y, colors.darkBrown, `sword-handle-${i}`));
      });
      // Guard
      [
        [33, 21],
        [34, 21],
        [35, 21],
      ].forEach(([x, y], i) => {
        pixels.push(p(x, y, colors.armor, `sword-guard-${i}`));
      });
      // Blade
      [
        [34, 22],
        [34, 23],
        [34, 24],
        [34, 25],
        [34, 26],
      ].forEach(([x, y], i) => {
        pixels.push(
          p(
            x,
            y,
            i === 1 ? colors.silverHighlight : colors.silver,
            `sword-blade-${i}`
          )
        );
      });
    }

    // Legendary sword (Level 5+)
    if (level >= 5) {
      // Pommel
      [[34, 18]].forEach(([x, y], i) => {
        pixels.push(p(x, y, colors.gold, `pommel-${i}`));
      });
      // Handle
      [
        [34, 19],
        [34, 20],
        [34, 21],
      ].forEach(([x, y], i) => {
        pixels.push(
          p(x, y, i === 1 ? colors.darkBrown : colors.brown, `handle-${i}`)
        );
      });
      // Guard
      [
        [33, 21],
        [34, 21],
        [35, 21],
        [36, 21],
      ].forEach(([x, y], i) => {
        pixels.push(
          p(
            x,
            y,
            i === 1 || i === 2 ? colors.goldHighlight : colors.gold,
            `guard-${i}`
          )
        );
      });
      // Blade
      [
        [34, 22],
        [34, 23],
        [34, 24],
        [34, 25],
        [34, 26],
        [34, 27],
        [34, 28],
      ].forEach(([x, y], i) => {
        pixels.push(
          p(
            x,
            y,
            i === 2 || i === 4 ? colors.silverHighlight : colors.silver,
            `blade-${i}`
          )
        );
      });
      [[34, 29]].forEach(([x, y], i) => {
        pixels.push(p(x, y, colors.silverShadow, `blade-tip-${i}`));
      });
    }

    // === LEGS ===
    const legPixels = [
      [21, 22],
      [22, 22],
      [24, 22],
      [25, 22],
      [21, 23],
      [22, 23],
      [24, 23],
      [25, 23],
      [21, 24],
      [22, 24],
      [24, 24],
      [25, 24],
      [21, 25],
      [22, 25],
      [24, 25],
      [25, 25],
      [21, 26],
      [22, 26],
      [24, 26],
      [25, 26],
      [21, 27],
      [22, 27],
      [24, 27],
      [25, 27],
    ];
    legPixels.forEach(([x, y], i) => {
      const isShadow = x === 25 || y >= 26;
      pixels.push(
        p(x, y, isShadow ? colors.clothingShadow : colors.clothing, `leg-${i}`)
      );
    });

    // Boots
    const bootPixels = [
      [20, 28],
      [21, 28],
      [22, 28],
      [24, 28],
      [25, 28],
      [26, 28],
      [20, 29],
      [21, 29],
      [22, 29],
      [24, 29],
      [25, 29],
      [26, 29],
      [20, 30],
      [21, 30],
      [22, 30],
      [23, 30],
      [24, 30],
      [25, 30],
      [26, 30],
    ];
    bootPixels.forEach(([x, y], i) => {
      pixels.push(
        p(x, y, i % 3 === 0 ? colors.darkBrown : colors.brown, `boot-${i}`)
      );
    });

    // === ULTIMATE EFFECTS (Level 6) ===
    if (level >= 6) {
      // Aura particles
      const particles = [
        [12, 10],
        [35, 10],
        [10, 14],
        [36, 14],
        [13, 24],
        [34, 24],
        [15, 28],
        [32, 28],
        [11, 6],
        [35, 6],
        [8, 12],
        [38, 12],
        [6, 20],
        [40, 20],
        [10, 30],
        [36, 30],
      ];
      particles.forEach(([x, y], i) => {
        pixels.push(
          p(x, y, i % 2 === 0 ? colors.gold : colors.glow, `particle-${i}`)
        );
      });

      // Sparkles
      const sparkles = [
        [14, 8],
        [33, 8],
        [12, 16],
        [35, 16],
        [16, 25],
        [31, 25],
      ];
      sparkles.forEach(([x, y], i) => {
        pixels.push(p(x, y, colors.goldHighlight, `sparkle-${i}`));
      });
    }

    return pixels;
  };

  const handleExport = () => {
    if (!svgRef.current) return;

    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    // Export at 3x resolution for high quality
    canvas.width = size * 3;
    canvas.height = size * 3;

    img.onload = () => {
      if (ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `password-warrior-level-${level}-${levelText.toLowerCase()}.png`;
            a.click();
            URL.revokeObjectURL(url);
          }
        });
      }
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(svgData);
  };

  const levelNames = [
    "Peasant",
    "Novice",
    "Warrior",
    "Knight",
    "Champion",
    "ULTIMATE",
  ];
  const levelText = levelNames[level - 1] || "Unknown";

  const levelColors = [
    "text-neutral-500",
    "text-neutral-600",
    "text-neutral-700",
    "text-neutral-800",
    "text-neutral-900",
    "text-black",
  ];
  const levelColor = levelColors[level - 1] || "text-neutral-500";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg
          ref={svgRef}
          width={size}
          height={size}
          className="pixelated"
          style={{ imageRendering: "pixelated" }}
        >
          <rect width={size} height={size} fill="transparent" />
          {renderDetailedWarrior()}
        </svg>
      </div>
      <div className={`text-lg font-bold ${levelColor}`}>
        Level {level}: {levelText}
      </div>
      <Button
        onClick={handleExport}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        Export Warrior
      </Button>
    </div>
  );
}
