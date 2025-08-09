import React, { useState, useEffect } from 'react';
import { Beaker, Thermometer, FlaskConical, Eye, BookOpen, Target, BarChart3, Droplets, Plus, Minus } from 'lucide-react';
import { substances, temperatures } from '../data/experimentData';
import { challenges as challengeData } from '../data/challenges';
import ExperimentTab from './tabs/ExperimentTab';
import ResultsTab from './tabs/ResultsTab';
import ChallengesTab from './tabs/ChallengesTab';
import KnowledgeTab from './tabs/KnowledgeTab';
import AchievementAlert from './modals/AchievementAlert';
import CertificateModal from './modals/CertificateModal';
import CelebrationOverlay from './modals/CelebrationOverlay';

const SolubilityLab = () => {
  const [activeTab, setActiveTab] = useState('experiment');
  const [currentExperiment, setCurrentExperiment] = useState({
    substance: 'NaCl',
    temperature: 'room',
    amount: 5,
    waterVolume: 100
  });
  
  const [experiments, setExperiments] = useState([]);
  const [isExperimenting, setIsExperimenting] = useState(false);
  const [experimentProgress, setExperimentProgress] = useState(0);
  const [lastResult, setLastResult] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationStep, setAnimationStep] = useState('');
  const [achievementAlert, setAchievementAlert] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState(new Set());
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationType, setCelebrationType] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateData, setCertificateData] = useState(null);

  // 실험 결과 계산
  const calculateResult = () => {
    const substance = substances[currentExperiment.substance];
    const solubility = substance.solubility[currentExperiment.temperature];
    
    const maxSoluble = (solubility * currentExperiment.waterVolume) / 100;
    const dissolved = Math.min(currentExperiment.amount, maxSoluble);
    const precipitate = Math.max(0, currentExperiment.amount - maxSoluble);
    const concentration = (dissolved / (currentExperiment.waterVolume + dissolved)) * 100;
    
    return {
      maxSoluble: maxSoluble.toFixed(2),
      dissolved: dissolved.toFixed(2),
      precipitate: precipitate.toFixed(2),
      concentration: concentration.toFixed(2),
      isSaturated: precipitate > 0,
      efficiency: ((dissolved / currentExperiment.amount) * 100).toFixed(1),
      theoreticalSolubility: solubility
    };
  };

  // 실험 애니메이션 실행
  const runExperiment = async () => {
    setIsExperimenting(true);
    setShowAnimation(true);
    setExperimentProgress(0);
    
    const steps = [
      { step: 'preparing', duration: 1000, progress: 20 },
      { step: 'adding_water', duration: 1500, progress: 40 },
      { step: 'adding_substance', duration: 1500, progress: 60 },
      { step: 'stirring', duration: 2000, progress: 80 },
      { step: 'observing', duration: 1000, progress: 100 }
    ];
    
    for (const { step, duration, progress } of steps) {
      setAnimationStep(step);
      setExperimentProgress(progress);
      await new Promise(resolve => setTimeout(resolve, duration));
    }
    
    const result = calculateResult();
    const newExperiment = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      ...currentExperiment,
      result
    };
    
    setExperiments([newExperiment, ...experiments]);
    setLastResult(result);
    setIsExperimenting(false);
    setShowAnimation(false);
    setActiveTab('results');
  };

  const getAnimationMessage = () => {
    const messages = {
      preparing: '🧪 실험 준비 중...',
      adding_water: `💧 ${temperatures[currentExperiment.temperature].name} ${currentExperiment.waterVolume}mL 추가`,
      adding_substance: `${substances[currentExperiment.substance].emoji} ${substances[currentExperiment.substance].name} ${currentExperiment.amount}g 추가`,
      stirring: '🥄 잘 저어주는 중...',
      observing: '👀 결과 관찰 중...'
    };
    return messages[animationStep] || '';
  };

  // 도전과제 확인
  const checkChallenges = () => {
    return challengeData.map(challenge => ({
      ...challenge,
      completed: challenge.condition(experiments)
    }));
  };

  const challenges = checkChallenges();

  // 새로 완료된 도전과제 체크
  useEffect(() => {
    const currentCompleted = new Set(challenges.filter(c => c.completed).map(c => c.id));
    const newlyCompleted = [...currentCompleted].filter(id => !completedChallenges.has(id));
    
    if (newlyCompleted.length > 0) {
      const latestChallenge = challenges.find(c => c.id === newlyCompleted[newlyCompleted.length - 1]);
      setAchievementAlert(latestChallenge);
      
      triggerSpecialEvent(latestChallenge);
      
      setTimeout(() => {
        setAchievementAlert(null);
      }, 5000);
    }
    
    setCompletedChallenges(currentCompleted);
  }, [challenges.map(c => c.completed).join(',')]);

  // 특별 이벤트 트리거
  const triggerSpecialEvent = (challenge) => {
    if (challenge.difficulty === '전설') {
      setCelebrationType('legendary');
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 6000);
    }
    else if (challenge.difficulty === '초급') {
      const allBeginnerCompleted = challenges.filter(c => c.difficulty === '초급').every(c => c.completed);
      if (allBeginnerCompleted) {
        setCelebrationType('beginner_complete');
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 4000);
      }
    }
    else if (challenge.id === 1) {
      setCelebrationType('first_experiment');
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  // 도전과제별 보상 정보
  const getRewardForChallenge = (challenge) => {
    const rewards = {
      '초급': {
        type: 'certificate',
        title: '실험 기초 마스터 인증서',
        subtitle: '용해도 실험의 첫걸음을 완료했습니다',
        color: 'from-green-400 to-emerald-600',
        icon: '🥉',
        description: '기본적인 실험 과정을 이해하고 성공적으로 수행했습니다.'
      },
      '중급': {
        type: 'certificate', 
        title: '용해도 연구원 인증서',
        subtitle: '체계적인 실험 설계와 분석 능력을 인정받았습니다',
        color: 'from-yellow-400 to-amber-600',
        icon: '🥈',
        description: '다양한 조건에서의 실험을 통해 용해도 원리를 깊이 이해했습니다.'
      },
      '고급': {
        type: 'certificate',
        title: '화학 실험 전문가 인증서', 
        subtitle: '고도의 실험 기술과 분석력을 보여주었습니다',
        color: 'from-orange-400 to-red-600',
        icon: '🥇',
        description: '정밀한 실험 설계와 뛰어난 결과 분석 능력을 입증했습니다.'
      },
      '전설': {
        type: 'certificate',
        title: '용해도 박사 명예 학위',
        subtitle: '용해도 분야의 최고 전문가로 인정받았습니다',
        color: 'from-purple-400 to-pink-600', 
        icon: '👑',
        description: '모든 도전을 완수하며 용해도 과학의 달인이 되었습니다.'
      }
    };

    return {
      ...rewards[challenge.difficulty],
      challengeTitle: challenge.title,
      achievementDate: new Date().toLocaleDateString('ko-KR')
    };
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <CelebrationOverlay 
        showCelebration={showCelebration}
        celebrationType={celebrationType}
        setShowCelebration={setShowCelebration}
      />
      
      <CertificateModal 
        showCertificate={showCertificate}
        certificateData={certificateData}
        setShowCertificate={setShowCertificate}
      />
      
      <AchievementAlert 
        challenge={achievementAlert}
        getRewardForChallenge={getRewardForChallenge}
        setCertificateData={setCertificateData}
        setShowCertificate={setShowCertificate}
        setAchievementAlert={setAchievementAlert}
      />
      
      {/* 헤더 */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 mb-4 lg:mb-0">
            <FlaskConical className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">용해도 실험실</h1>
              <p className="text-gray-600">중학교 1학년 과학 - 용해와 용액 탐구</p>
            </div>
          </div>
          
          <div className="text-right space-y-2">
            <div className="flex items-center gap-4 justify-end">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{experiments.length}</div>
                <div className="text-xs text-gray-500">실험 횟수</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {challenges.filter(c => c.completed).length}
                </div>
                <div className="text-xs text-gray-500">도전과제</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((challenges.filter(c => c.completed).length / challenges.length) * 100)}%
                </div>
                <div className="text-xs text-gray-500">진행률</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 justify-end">
              <div className="text-sm text-gray-600">레벨:</div>
              <div className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                {experiments.length < 5 ? '🧪 초보자' :
                 experiments.length < 15 ? '⚗️ 실험가' :
                 experiments.length < 30 ? '🔬 연구원' : '👨‍🔬 박사'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-white rounded-lg shadow-lg mb-6">
        <div className="flex flex-col sm:flex-row border-b">
          {[
            { id: 'experiment', label: '실험 수행', icon: Beaker },
            { id: 'results', label: '실험 결과', icon: BarChart3 },
            { id: 'challenges', label: '도전과제', icon: Target },
            { id: 'knowledge', label: '과학 지식', icon: BookOpen }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 px-6 text-center font-medium flex items-center justify-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-500 hover:text-blue-500 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'experiment' && (
            <ExperimentTab
              currentExperiment={currentExperiment}
              setCurrentExperiment={setCurrentExperiment}
              runExperiment={runExperiment}
              isExperimenting={isExperimenting}
              showAnimation={showAnimation}
              experimentProgress={experimentProgress}
              getAnimationMessage={getAnimationMessage}
              animationStep={animationStep}
            />
          )}

          {activeTab === 'results' && (
            <ResultsTab
              lastResult={lastResult}
              experiments={experiments}
            />
          )}

          {activeTab === 'challenges' && (
            <ChallengesTab
              challenges={challenges}
            />
          )}

          {activeTab === 'knowledge' && (
            <KnowledgeTab />
          )}
        </div>
      </div>
    </div>
  );
};

export default SolubilityLab;