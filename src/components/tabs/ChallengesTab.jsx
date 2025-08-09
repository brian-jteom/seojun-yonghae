import React, { useState } from 'react';

const ChallengesTab = ({ challenges }) => {
  const [showStageReward, setShowStageReward] = useState(null);

  // 단계별 완료 여부 확인
  const getStageCompletion = (difficulty) => {
    const stageChallenges = challenges.filter(c => c.difficulty === difficulty);
    const completed = stageChallenges.filter(c => c.completed);
    return {
      total: stageChallenges.length,
      completed: completed.length,
      isCompleted: completed.length === stageChallenges.length
    };
  };

  // 단계별 인증서 정보
  const getStageReward = (difficulty) => {
    const rewards = {
      '초급': {
        title: '실험 기초 마스터 인증서',
        subtitle: '용해도 실험의 첫걸음을 완료했습니다',
        color: 'from-green-400 to-emerald-600',
        icon: '🥉',
        description: '기본적인 실험 과정을 이해하고 성공적으로 수행했습니다.'
      },
      '중급': {
        title: '용해도 연구원 인증서',
        subtitle: '체계적인 실험 설계와 분석 능력을 인정받았습니다',
        color: 'from-yellow-400 to-amber-600',
        icon: '🥈',
        description: '다양한 조건에서의 실험을 통해 용해도 원리를 깊이 이해했습니다.'
      },
      '고급': {
        title: '화학 실험 전문가 인증서',
        subtitle: '고도의 실험 기술과 분석력을 보여주었습니다',
        color: 'from-orange-400 to-red-600',
        icon: '🥇',
        description: '정밀한 실험 설계와 뛰어난 결과 분석 능력을 입증했습니다.'
      },
      '전설': {
        title: '용해도 박사 명예 학위',
        subtitle: '용해도 분야의 최고 전문가로 인정받았습니다',
        color: 'from-purple-400 to-pink-600',
        icon: '👑',
        description: '모든 도전을 완수하며 용해도 과학의 달인이 되었습니다.'
      }
    };
    
    return {
      ...rewards[difficulty],
      achievementDate: new Date().toLocaleDateString('ko-KR')
    };
  };

  // 인증서 모달
  const StageRewardModal = () => {
    if (!showStageReward) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowStageReward(null)}></div>
        
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in duration-300">
          <div className={`bg-gradient-to-r ${showStageReward.color} text-white p-8 text-center relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 text-6xl opacity-30">⚗️</div>
              <div className="absolute top-8 right-8 text-4xl opacity-30">🧪</div>
              <div className="absolute bottom-4 left-8 text-5xl opacity-30">🔬</div>
              <div className="absolute bottom-8 right-4 text-3xl opacity-30">⚛️</div>
            </div>
            
            <div className="relative z-10">
              <div className="text-6xl mb-4">{showStageReward.icon}</div>
              <h2 className="text-2xl font-bold mb-2">{showStageReward.title}</h2>
              <p className="text-lg opacity-90">{showStageReward.subtitle}</p>
            </div>
          </div>

          <div className="p-8">
            <div className="text-center mb-6">
              <div className="inline-block bg-gray-100 rounded-full px-4 py-2 mb-4">
                <span className="text-sm text-gray-600">수여 날짜: {showStageReward.achievementDate}</span>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">🎉 축하합니다! 🎉</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong className="text-gray-800">{showStageReward.title}</strong>를 수여합니다.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-800">{showStageReward.description}</p>
              </div>
            </div>

            <div className="border-t pt-6 flex justify-between items-end">
              <div className="text-sm text-gray-500">
                <div>용해도 실험실</div>
                <div>과학 교육 프로그램</div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowStageReward(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-xl transition-all"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  alert('인증서를 저장했습니다! 선생님께 보여드리세요.');
                  setShowStageReward(null);
                }}
                className={`flex-1 bg-gradient-to-r ${showStageReward.color} text-white font-bold py-3 px-4 rounded-xl transition-all hover:shadow-lg`}
              >
                📁 저장하기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <StageRewardModal />
      
      <h2 className="text-2xl font-semibold text-gray-800">🎯 도전과제</h2>
      
      {/* 전체 진행률 */}
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

      {/* 단계별 도전과제 */}
      {['초급', '중급', '고급', '전설'].map(difficulty => {
        const difficultyColors = {
          '초급': { 
            bg: 'bg-green-50', 
            border: 'border-green-200', 
            text: 'text-green-800', 
            badge: 'bg-green-100',
            button: 'from-green-400 to-emerald-600'
          },
          '중급': { 
            bg: 'bg-yellow-50', 
            border: 'border-yellow-200', 
            text: 'text-yellow-800', 
            badge: 'bg-yellow-100',
            button: 'from-yellow-400 to-amber-600'
          },
          '고급': { 
            bg: 'bg-orange-50', 
            border: 'border-orange-200', 
            text: 'text-orange-800', 
            badge: 'bg-orange-100',
            button: 'from-orange-400 to-red-600'
          },
          '전설': { 
            bg: 'bg-purple-50', 
            border: 'border-purple-200', 
            text: 'text-purple-800', 
            badge: 'bg-purple-100',
            button: 'from-purple-400 to-pink-600'
          }
        };
        
        const difficultyChallenges = challenges.filter(c => c.difficulty === difficulty);
        const stageCompletion = getStageCompletion(difficulty);
        const colors = difficultyColors[difficulty];
        
        return (
          <div key={difficulty} className={`${colors.bg} ${colors.border} border rounded-lg p-6`}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <h3 className={`text-xl font-bold ${colors.text}`}>
                  {difficulty} 단계
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.badge} ${colors.text}`}>
                  {stageCompletion.completed}/{stageCompletion.total}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className={`text-sm ${colors.text}`}>
                    {Math.round((stageCompletion.completed / stageCompletion.total) * 100)}% 완료
                  </div>
                </div>
                
                {/* 인증서 확인 버튼 */}
                {stageCompletion.isCompleted && (
                  <button
                    onClick={() => setShowStageReward(getStageReward(difficulty))}
                    className={`bg-gradient-to-r ${colors.button} text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all transform hover:-translate-y-0.5`}
                  >
                    🏆 인증서 확인
                  </button>
                )}
              </div>
            </div>
            
            {/* 진행률 바 */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className={`bg-gradient-to-r ${colors.button} h-2 rounded-full transition-all duration-1000`}
                style={{ width: `${(stageCompletion.completed / stageCompletion.total) * 100}%` }}
              ></div>
            </div>
            
            {/* 도전과제 목록 */}
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

      {/* 보상 시스템 안내 */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-800 mb-3">🏆 단계별 보상 시스템</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg border-l-4 border-green-400">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🥉</span>
              <strong className="text-green-700">초급 단계 완료</strong>
            </div>
            <p className="text-gray-600">실험 기초 마스터 인증서</p>
            <p className="text-xs text-gray-500 mt-1">4개 과제 모두 완료 시 발급</p>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-400">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🥈</span>
              <strong className="text-yellow-700">중급 단계 완료</strong>
            </div>
            <p className="text-gray-600">용해도 연구원 인증서</p>
            <p className="text-xs text-gray-500 mt-1">5개 과제 모두 완료 시 발급</p>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-4 border-orange-400">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🥇</span>
              <strong className="text-orange-700">고급 단계 완료</strong>
            </div>
            <p className="text-gray-600">화학 실험 전문가 인증서</p>
            <p className="text-xs text-gray-500 mt-1">5개 과제 모두 완료 시 발급</p>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-4 border-purple-400">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">👑</span>
              <strong className="text-purple-700">전설 단계 완료</strong>
            </div>
            <p className="text-gray-600">용해도 박사 명예 학위</p>
            <p className="text-xs text-gray-500 mt-1">2개 과제 모두 완료 시 발급</p>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>새로운 보상 시스템:</strong> 각 단계의 모든 도전과제를 완료하면 해당 단계의 인증서를 받을 수 있습니다! 
            체계적으로 단계를 밟아가며 용해도 전문가가 되어보세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChallengesTab;