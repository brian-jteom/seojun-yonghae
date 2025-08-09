import React from 'react';

const AchievementAlert = ({ 
  challenge, 
  getRewardForChallenge, 
  setCertificateData, 
  setShowCertificate, 
  setAchievementAlert 
}) => {
  if (!challenge) return null;

  const difficultyColors = {
    '초급': {
      bg: 'from-green-500 to-emerald-600',
      border: 'border-green-400',
      glow: 'shadow-green-500/30'
    },
    '중급': {
      bg: 'from-yellow-500 to-amber-600',
      border: 'border-yellow-400', 
      glow: 'shadow-yellow-500/30'
    },
    '고급': {
      bg: 'from-orange-500 to-red-600',
      border: 'border-orange-400',
      glow: 'shadow-orange-500/30'
    },
    '전설': {
      bg: 'from-purple-500 to-pink-600',
      border: 'border-purple-400',
      glow: 'shadow-purple-500/30'
    }
  };

  const colors = difficultyColors[challenge.difficulty];

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-500">
      <div className={`
        bg-gradient-to-r ${colors.bg} text-white 
        px-6 py-4 rounded-2xl shadow-2xl ${colors.glow}
        border-2 ${colors.border} max-w-md min-w-[320px]
        transform transition-all duration-500 ease-out
      `}>
        <div className="flex items-start gap-4">
          <div className="text-3xl animate-bounce flex-shrink-0">
            {challenge.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold opacity-90">🎉 도전과제 달성!</span>
              <span className={`
                px-2 py-0.5 rounded-full text-xs font-bold
                ${challenge.difficulty === '초급' ? 'bg-green-800 bg-opacity-40' :
                  challenge.difficulty === '중급' ? 'bg-yellow-800 bg-opacity-40' :
                  challenge.difficulty === '고급' ? 'bg-orange-800 bg-opacity-40' : 'bg-purple-800 bg-opacity-40'}
              `}>
                {challenge.difficulty}
              </span>
            </div>
            <h3 className="font-bold text-lg leading-tight mb-1">{challenge.title}</h3>
            <p className="text-sm opacity-90 leading-relaxed">{challenge.description}</p>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-white border-opacity-30">
          <div className="flex items-center justify-between">
            <span className="text-xs opacity-80">🎁 도전과제 탭에서 인증서 확인</span>
            <button
              onClick={() => setAchievementAlert(null)}
              className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full transition-all"
            >
              확인 ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementAlert;