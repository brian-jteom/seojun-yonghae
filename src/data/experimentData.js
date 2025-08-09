// 중1 수준의 물질 데이터 (실제 과학 데이터 기반)
export const substances = {
  NaCl: {
    name: '염화나트륨 (소금)',
    formula: 'NaCl',
    emoji: '🧂',
    color: '#6B7280',
    solubility: {
      cold: 35.7,
      room: 36.0,
      warm: 37.0,
      hot: 39.8
    },
    description: '식탁용 소금의 주성분으로, 온도가 변해도 용해도가 크게 변하지 않습니다.',
    characteristics: '이온결합 화합물, 결정성 고체'
  },
  KNO3: {
    name: '질산칼륨',
    formula: 'KNO₃',
    emoji: '💎',
    color: '#8B5CF6',
    solubility: {
      cold: 13.3,
      room: 31.6,
      warm: 85.5,
      hot: 246
    },
    description: '온도가 높아질수록 용해도가 급격히 증가하는 대표적인 물질입니다.',
    characteristics: '이온결합 화합물, 비료 성분'
  },
  'C12H22O11': {
    name: '설탕 (수크로스)',
    formula: 'C₁₂H₂₂O₁₁',
    emoji: '🍬',
    color: '#F59E0B',
    solubility: {
      cold: 179,
      room: 203,
      warm: 260,
      hot: 487
    },
    description: '분자결합 화합물로, 온도가 높아지면 용해도가 크게 증가합니다.',
    characteristics: '분자결합 화합물, 유기화합물'
  }
};

export const temperatures = {
  cold: { 
    name: '찬물', 
    value: '0°C', 
    emoji: '🧊', 
    color: '#3B82F6',
    bgColor: 'from-blue-100 to-blue-200',
    description: '얼음물 정도의 온도'
  },
  room: { 
    name: '실온', 
    value: '20°C', 
    emoji: '🌡️', 
    color: '#10B981',
    bgColor: 'from-green-100 to-green-200',
    description: '교실 온도와 비슷'
  },
  warm: { 
    name: '따뜻한 물', 
    value: '50°C', 
    emoji: '♨️', 
    color: '#F59E0B',
    bgColor: 'from-yellow-100 to-orange-200',
    description: '목욕물 정도의 온도'
  },
  hot: { 
    name: '뜨거운 물', 
    value: '100°C', 
    emoji: '🔥', 
    color: '#EF4444',
    bgColor: 'from-red-100 to-red-200',
    description: '끓는 물의 온도'
  }
};