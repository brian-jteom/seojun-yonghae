export const challenges = [
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
    title: '화학 공식 마스터',
    description: '3가지 물질의 화학식을 모두 외우고 실험하기',
    condition: (experiments) => new Set(experiments.map(exp => exp.substance)).size >= 3,
    icon: '⚛️',
    difficulty: '초급'
  },
  {
    id: 5,
    title: '포화용액 마스터',
    description: '포화용액을 5번 이상 만들기',
    condition: (experiments) => experiments.filter(exp => exp.result.isSaturated).length >= 5,
    icon: '💎',
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
    id: 8,
    title: '연구원의 끈기',
    description: '총 15번 이상 실험 수행하기',
    condition: (experiments) => experiments.length >= 15,
    icon: '🔬',
    difficulty: '중급'
  },
  {
    id: 9,
    title: '속도왕',
    description: '3분 이내에 실험 5번 연속 완료하기',
    condition: (experiments) => {
      if (experiments.length < 5) return false;
      const recent5 = experiments.slice(0, 5);
      const timestamps = recent5.map(exp => new Date(exp.timestamp).getTime());
      const timeDiff = timestamps[0] - timestamps[4];
      return timeDiff <= 3 * 60 * 1000;
    },
    icon: '⚡',
    difficulty: '중급'
  },
  {
    id: 10,
    title: '절약 실험가',
    description: '물 50mL 이하로 포화용액 만들기',
    condition: (experiments) => experiments.some(exp => exp.waterVolume <= 50 && exp.result.isSaturated),
    icon: '💧',
    difficulty: '중급'
  },
  {
    id: 11,
    title: '농도 계산 고수',
    description: '농도 10% 이상인 용액 3개 이상 만들기',
    condition: (experiments) => experiments.filter(exp => parseFloat(exp.result.concentration) >= 10).length >= 3,
    icon: '📐',
    difficulty: '고급'
  },
  {
    id: 12,
    title: '극한 실험가',
    description: '50g 이상의 용질로 실험하기',
    condition: (experiments) => experiments.some(exp => exp.amount >= 50),
    icon: '⚡',
    difficulty: '고급'
  },
  {
    id: 13,
    title: '대용량 실험가',
    description: '500mL 이상의 용매로 실험하기',
    condition: (experiments) => experiments.some(exp => exp.waterVolume >= 500),
    icon: '🌊',
    difficulty: '고급'
  },
  {
    id: 14,
    title: '농도 마법사',
    description: '농도 20% 이상인 초고농도 용액 만들기',
    condition: (experiments) => experiments.some(exp => parseFloat(exp.result.concentration) >= 20),
    icon: '🪄',
    difficulty: '고급'
  },
  {
    id: 15,
    title: '대량 생산자',
    description: '한 번에 100g 이상의 용질로 실험하기',
    condition: (experiments) => experiments.some(exp => exp.amount >= 100),
    icon: '⚖️',
    difficulty: '고급'
  },
  {
    id: 16,
    title: '온도 마스터',
    description: '같은 물질로 온도 차이 80°C 이상 실험하기',
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
    id: 17,
    title: '실험 데이터 수집가',
    description: '10가지 이상의 서로 다른 실험 조건 시도하기',
    condition: (experiments) => {
      const uniqueConditions = new Set();
      experiments.forEach(exp => {
        uniqueConditions.add(`${exp.substance}-${exp.temperature}-${exp.amount}-${exp.waterVolume}`);
      });
      return uniqueConditions.size >= 10;
    },
    icon: '📊',
    difficulty: '고급'
  },
  {
    id: 18,
    title: '용해도 예측가',
    description: '이론값과 실제값이 정확히 일치하는 실험 3번 달성',
    condition: (experiments) => {
      const perfectMatches = experiments.filter(exp => {
        const theoreticalMax = (exp.result.theoreticalSolubility * exp.waterVolume) / 100;
        return Math.abs(theoreticalMax - parseFloat(exp.result.maxSoluble)) < 0.1;
      });
      return perfectMatches.length >= 3;
    },
    icon: '🔮',
    difficulty: '고급'
  },
  {
    id: 19,
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
  {
    id: 20,
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
  },
  {
    id: 21,
    title: '용해도 박사',
    description: '총 30번 이상 실험하고 모든 중급 도전과제 완료',
    condition: (experiments) => {
      const midLevelChallenges = challenges.filter(c => c.difficulty === '중급');
      const completedMidLevel = midLevelChallenges.filter(c => c.condition(experiments)).length;
      return experiments.length >= 30 && completedMidLevel === midLevelChallenges.length;
    },
    icon: '👨‍🔬',
    difficulty: '전설'
  }
];