export const challenges = [
  // 초급 단계 (4개) - 기본 체험 위주
  {
    id: 1,
    title: '실험실 입문자',
    description: '첫 번째 실험을 성공적으로 완료하기',
    condition: (experiments) => experiments.length >= 1,
    icon: '🧪',
    difficulty: '초급'
  },
  {
    id: 2,
    title: '온도 탐험가',
    description: '4가지 온도 조건 모두 실험해보기',
    condition: (experiments) => new Set(experiments.map(exp => exp.temperature)).size >= 4,
    icon: '🌡️',
    difficulty: '초급'
  },
  {
    id: 3,
    title: '물질 수집가',
    description: '3가지 물질 모두 실험해보기',
    condition: (experiments) => new Set(experiments.map(exp => exp.substance)).size >= 3,
    icon: '⚗️',
    difficulty: '초급'
  },
  {
    id: 4,
    title: '포화용액 발견자',
    description: '포화용액을 3번 이상 만들어보기',
    condition: (experiments) => experiments.filter(exp => exp.result.isSaturated).length >= 3,
    icon: '💎',
    difficulty: '초급'
  },

  // 중급 단계 (5개) - 심화 탐구
  {
    id: 5,
    title: '실험 연구원',
    description: '총 15번 이상 실험 수행하기',
    condition: (experiments) => experiments.length >= 15,
    icon: '🔬',
    difficulty: '중급'
  },
  {
    id: 6,
    title: '정밀 실험가',
    description: '용해 효율 95% 이상 달성하기',
    condition: (experiments) => experiments.some(exp => parseFloat(exp.result.efficiency) >= 95),
    icon: '🎯',
    difficulty: '중급'
  },
  {
    id: 7,
    title: '포화용액 마스터',
    description: '포화용액을 10번 이상 만들기',
    condition: (experiments) => experiments.filter(exp => exp.result.isSaturated).length >= 10,
    icon: '💠',
    difficulty: '중급'
  },
  {
    id: 8,
    title: '온도 비교 전문가',
    description: '같은 물질로 4가지 온도에서 모두 실험하기',
    condition: (experiments) => {
      const substanceGroups = experiments.reduce((acc, exp) => {
        acc[exp.substance] = acc[exp.substance] || new Set();
        acc[exp.substance].add(exp.temperature);
        return acc;
      }, {});
      return Object.values(substanceGroups).some(temps => temps.size >= 4);
    },
    icon: '📊',
    difficulty: '중급'
  },
  {
    id: 9,
    title: '농도 계산 고수',
    description: '농도 15% 이상인 용액 5개 이상 만들기',
    condition: (experiments) => experiments.filter(exp => parseFloat(exp.result.concentration) >= 15).length >= 5,
    icon: '📐',
    difficulty: '중급'
  },

  // 고급 단계 (5개) - 전문 수준
  {
    id: 10,
    title: '대량 실험가',
    description: '50g 이상의 용질로 실험하기',
    condition: (experiments) => experiments.some(exp => exp.amount >= 50),
    icon: '⚖️',
    difficulty: '고급'
  },
  {
    id: 11,
    title: '고농도 마법사',
    description: '농도 25% 이상인 초고농도 용액 만들기',
    condition: (experiments) => experiments.some(exp => parseFloat(exp.result.concentration) >= 25),
    icon: '🪄',
    difficulty: '고급'
  },
  {
    id: 12,
    title: '온도 마스터',
    description: '같은 물질로 온도 차이 80°C 이상 실험하기 (찬물↔뜨거운물)',
    condition: (experiments) => {
      const substanceGroups = experiments.reduce((acc, exp) => {
        acc[exp.substance] = acc[exp.substance] || [];
        acc[exp.substance].push(exp.temperature);
        return acc;
      }, {});
      
      return Object.values(substanceGroups).some(temps => {
        const hasHot = temps.includes('hot');
        const hasCold = temps.includes('cold');
        return hasHot && hasCold;
      });
    },
    icon: '🌡️',
    difficulty: '고급'
  },
  {
    id: 13,
    title: '대용량 전문가',
    description: '500mL 이상의 용매로 실험하기',
    condition: (experiments) => experiments.some(exp => exp.waterVolume >= 500),
    icon: '🌊',
    difficulty: '고급'
  },
  {
    id: 14,
    title: '완벽주의자',
    description: '연속으로 5번 용해 효율 90% 이상 달성',
    condition: (experiments) => {
      if (experiments.length < 5) return false;
      const recent5 = experiments.slice(0, 5);
      return recent5.every(exp => parseFloat(exp.result.efficiency) >= 90);
    },
    icon: '💯',
    difficulty: '고급'
  },

  // 전설 단계 (2개) - 최고 달인
  {
    id: 15,
    title: '실험의 달인',
    description: '총 50번 이상 실험하고 고급 도전과제 모두 완료',
    condition: (experiments) => {
      if (experiments.length < 50) return false;
      // 고급 도전과제 확인 (id 10-14)
      const advancedChallenges = challenges.filter(c => c.difficulty === '고급' && c.id >= 10 && c.id <= 14);
      return advancedChallenges.every(challenge => challenge.condition(experiments));
    },
    icon: '👨‍🔬',
    difficulty: '전설'
  },
  {
    id: 16,
    title: '과학자의 꿈',
    description: '모든 물질로 모든 온도 조건 실험 완료 (12가지 조합)',
    condition: (experiments) => {
      const combinations = new Set();
      experiments.forEach(exp => {
        combinations.add(`${exp.substance}-${exp.temperature}`);
      });
      return combinations.size >= 12;
    },
    icon: '🏅',
    difficulty: '전설'
  }
];