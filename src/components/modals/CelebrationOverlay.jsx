import React from 'react';

const CelebrationOverlay = ({ showCelebration, celebrationType, setShowCelebration }) => {
  if (!showCelebration) return null;

  const celebrations = {
    legendary: {
      title: '🏆 전설적인 성취! 🏆',
      subtitle: '용해도 박사님, 축하합니다!',
      background: 'from-purple-600 via-pink-600 to-purple-800',
      particles: '✨🎉🏆⭐💫🌟',
      message: '당신은 진정한 화학 실험의 달인입니다!'
    },
    beginner_complete: {
      title: '🎓 초급 과정 완료! 🎓',
      subtitle: '이제 중급 도전자입니다!',
      background: 'from-green-500 via-emerald-500 to-green-700',
      particles: '🌟💚🎯🧪✅🔬',
      message: '기본기를 완벽히 마스터했네요!'
    },
    first_experiment: {
      title: '🧪 첫 실험 성공! 🧪',
      subtitle: '과학자의 여정이 시작되었습니다!',
      background: 'from-blue-500 via-cyan-500 to-blue-700',
      particles: '🎉🧪💧⚗️🔬🌟',
      message: '훌륭한 시작입니다!'
    }
  };

  const current = celebrations[celebrationType];
  if (!current) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className={`relative bg-gradient-to-br ${current.background} text-white p-12 rounded-3xl shadow-2xl max-w-2xl mx-4 text-center animate-pulse`}>
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {current.particles.split('').map((particle, index) => (
            <div
              key={index}
              className="absolute text-2xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {particle}
            </div>
          ))}
        </div>
        
        <div className="relative z-10">
          <div className="text-5xl mb-4 animate-bounce">{current.particles[0]}</div>
          <h2 className="text-4xl font-bold mb-4">{current.title}</h2>
          <p className="text-xl mb-6">{current.subtitle}</p>
          <p className="text-lg opacity-90 mb-8">{current.message}</p>
          
          {celebrationType === 'legendary' && (
            <div className="bg-white bg-opacity-20 rounded-xl p-4 mb-6">
              <div className="text-sm opacity-90">🎁 특별 보상 획득!</div>
              <div className="text-lg font-bold">용해도 박사 인증서</div>
            </div>
          )}
          
          <button
            onClick={() => setShowCelebration(false)}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-3 px-8 rounded-full transition-all border-2 border-white border-opacity-50"
          >
            계속하기 →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CelebrationOverlay;