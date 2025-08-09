import React from 'react';

const ChallengesTab = ({ challenges }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">🎯 도전과제</h2>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">전체 진행률</h3>
          <span className="text-2xl font-bold text-blue-600">
            {challenges.filter(c => c.completed).length}/{challenges.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1000"
            style={{ width: `${(challenges.filter(c => c.completed).length / challenges.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>진행률: {Math.round((challenges.filter(c => c.completed).length / challenges.length) * 100)}%</span>
          <span>완료된 과제: {challenges.filter(c => c.completed).length}개</span>
        </div>
      </div>

      {['초급', '중급', '고급', '전설'].map(difficulty => {
        const difficultyColors = {
          '초급': { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', badge: 'bg-green-100' },
          '중급': { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', badge: 'bg-yellow-100' },
          '고급': { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', badge: 'bg-orange-100' },
          '전설': { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', badge: 'bg-purple-100' }
        };
        
        const difficultyChallenges = challenges.filter(c => c.difficulty === difficulty);
        const completedCount = difficultyChallenges.filter(c => c.completed).length;
        
        return (
          <div key={difficulty} className={`${difficultyColors[difficulty].bg} ${difficultyColors[difficulty].border} border rounded-lg p-6`}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <h3 className={`text-xl font-bold ${difficultyColors[difficulty].text}`}>
                  {difficulty} 단계
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[difficulty].badge} ${difficultyColors[difficulty].text}`}>
                  {completedCount}/{difficultyChallenges.length}
                </span>
              </div>
              <div className="text-right">
                <div className={`text-sm ${difficultyColors[difficulty].text}`}>
                  {Math.round((completedCount / difficultyChallenges.length) * 100)}% 완료
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {difficultyChallenges.map(challenge => (
                <div
                  key={challenge.id}
                  className={`p-4 rounded-lg border transition-all ${
                    challenge.completed
                      ? 'bg-white border-green-300 shadow-md achievement-glow'
                      : 'bg-white border-gray-200 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`text-2xl ${challenge.completed ? 'grayscale-0' : 'grayscale opacity-50'}`}>
                      {challenge.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold mb-1 ${
                        challenge.completed ? 'text-green-800' : 'text-gray-700'
                      }`}>
                        {challenge.title}
                      </h4>
                      <p className={`text-sm mb-2 ${
                        challenge.completed ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {challenge.description}
                      </p>
                      {challenge.completed && (
                        <div className="flex items-center gap-1 text-green-600 font-medium text-sm">
                          <span>✅</span>
                          <span>완료!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* 특별 보상 안내 */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-800 mb-3">🏆 단계별 특별 보상</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg border-l-4 border-green-400">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🥉</span>
              <strong className="text-green-700">초급 완주 보상</strong>
            </div>
            <p className="text-gray-600">실험 기초 마스터 인증서</p>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-400">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🥈</span>
              <strong className="text-yellow-700">중급 완주 보상</strong>
            </div>
            <p className="text-gray-600">용해도 연구원 인증서</p>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-4 border-orange-400">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🥇</span>
              <strong className="text-orange-700">고급 완주 보상</strong>
            </div>
            <p className="text-gray-600">화학 실험 전문가 인증서</p>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-4 border-purple-400">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">👑</span>
              <strong className="text-purple-700">전설 완주 보상</strong>
            </div>
            <p className="text-gray-600">용해도 박사 명예 학위</p>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>팁:</strong> 각 도전과제를 완료하면 인증서를 받을 수 있어요! 
            저장해서 선생님께 보여드리세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChallengesTab;