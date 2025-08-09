import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { substances, temperatures } from '../../data/experimentData';

const ExperimentTab = ({
  currentExperiment,
  setCurrentExperiment,
  runExperiment,
  isExperimenting,
  showAnimation,
  experimentProgress,
  getAnimationMessage,
  animationStep
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">🧪 실험 설계 및 수행</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* 물질 선택 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">1. 용질 선택</h3>
            <div className="space-y-3">
              {Object.entries(substances).map(([key, substance]) => (
                <button
                  key={key}
                  onClick={() => setCurrentExperiment({...currentExperiment, substance: key})}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                    currentExperiment.substance === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{substance.emoji}</span>
                    <div>
                      <div className="font-semibold">{substance.name}</div>
                      <div className="text-sm text-gray-600">화학식: {substance.formula}</div>
                      <div className="text-xs text-gray-500">{substance.characteristics}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 온도 선택 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">2. 용매 온도 선택</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(temperatures).map(([key, temp]) => (
                <button
                  key={key}
                  onClick={() => setCurrentExperiment({...currentExperiment, temperature: key})}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    currentExperiment.temperature === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{temp.emoji}</div>
                    <div className="font-medium">{temp.name}</div>
                    <div className="text-sm text-gray-600">{temp.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{temp.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 양 조절 - 직접 입력 시스템 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">3. 용질의 양</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentExperiment({
                      ...currentExperiment, 
                      amount: Math.max(0.1, currentExperiment.amount - 1)
                    })}
                    className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={currentExperiment.amount}
                    onChange={(e) => {
                      const value = Math.max(0.1, Math.min(200, parseFloat(e.target.value) || 0.1));
                      setCurrentExperiment({...currentExperiment, amount: value});
                    }}
                    className="flex-1 text-center text-2xl font-bold text-blue-600 border-2 border-blue-200 rounded-lg py-3 focus:border-blue-500 focus:outline-none shadow-sm"
                    min="0.1"
                    max="200"
                    step="0.1"
                    placeholder="0.0"
                  />
                  <button
                    onClick={() => setCurrentExperiment({
                      ...currentExperiment, 
                      amount: Math.min(200, currentExperiment.amount + 1)
                    })}
                    className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center text-sm text-gray-600">그램 (g) | 범위: 0.1 ~ 200g</div>
                
                {/* 프리셋 버튼 */}
                <div className="grid grid-cols-5 gap-1">
                  {[1, 5, 10, 25, 50].map(preset => (
                    <button
                      key={preset}
                      onClick={() => setCurrentExperiment({...currentExperiment, amount: preset})}
                      className={`py-2 px-2 text-xs rounded transition-colors ${
                        currentExperiment.amount === preset 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {preset}g
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">4. 용매의 부피</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentExperiment({
                      ...currentExperiment, 
                      waterVolume: Math.max(10, currentExperiment.waterVolume - 25)
                    })}
                    className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={currentExperiment.waterVolume}
                    onChange={(e) => {
                      const value = Math.max(10, Math.min(1000, parseInt(e.target.value) || 10));
                      setCurrentExperiment({...currentExperiment, waterVolume: value});
                    }}
                    className="flex-1 text-center text-2xl font-bold text-blue-600 border-2 border-blue-200 rounded-lg py-3 focus:border-blue-500 focus:outline-none shadow-sm"
                    min="10"
                    max="1000"
                    step="5"
                    placeholder="0"
                  />
                  <button
                    onClick={() => setCurrentExperiment({
                      ...currentExperiment, 
                      waterVolume: Math.min(1000, currentExperiment.waterVolume + 25)
                    })}
                    className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center text-sm text-gray-600">밀리리터 (mL) | 범위: 10 ~ 1000mL</div>
                
                {/* 프리셋 버튼 */}
                <div className="grid grid-cols-5 gap-1">
                  {[50, 100, 200, 250, 500].map(preset => (
                    <button
                      key={preset}
                      onClick={() => setCurrentExperiment({...currentExperiment, waterVolume: preset})}
                      className={`py-2 px-2 text-xs rounded transition-colors ${
                        currentExperiment.waterVolume === preset 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {preset}mL
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 예상 결과 */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">💡 실험 전 예상해보기</h3>
            <p className="text-sm text-yellow-700">
              <strong>{substances[currentExperiment.substance].name}</strong> {currentExperiment.amount}g을<br/>
              <strong>{temperatures[currentExperiment.temperature].name}</strong> {currentExperiment.waterVolume}mL에 넣으면<br/>
              어떤 결과가 나올까요?
            </p>
            <div className="mt-2 text-xs text-yellow-600">
              이론 용해도: {substances[currentExperiment.substance].solubility[currentExperiment.temperature]}g/100mL
            </div>
          </div>

          <button
            onClick={runExperiment}
            disabled={isExperimenting}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isExperimenting ? '🧪 실험 진행 중...' : '🚀 실험 시작하기'}
          </button>
        </div>

        {/* 실험 과정 시각화 */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700">5. 실험 과정 관찰</h3>
          
          {(isExperimenting || showAnimation) && (
            <div className="bg-white border-2 border-blue-200 rounded-lg p-6 shadow-lg">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">🧪</div>
                <div className="text-lg font-semibold">{getAnimationMessage()}</div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1000 progress-bar"
                  style={{ width: `${experimentProgress}%` }}
                ></div>
              </div>
              
              <div className="text-center text-sm text-gray-600">
                진행률: {experimentProgress}%
              </div>
            </div>
          )}

          <div className={`bg-gradient-to-br ${temperatures[currentExperiment.temperature].bgColor} rounded-lg p-6 border-2 shadow-lg`}>
            <div className="text-center">
              <div className="text-4xl mb-4">
                {isExperimenting && animationStep === 'stirring' ? '🥽🧪💫' : '🧪'}
              </div>
              <div className="bg-white bg-opacity-90 rounded-lg p-4 shadow-md">
                <div className="text-lg font-semibold mb-2">실험 조건</div>
                <div className="space-y-1 text-sm">
                  <div>용질: {substances[currentExperiment.substance].name} {currentExperiment.amount}g</div>
                  <div>용매: {temperatures[currentExperiment.temperature].name} {currentExperiment.waterVolume}mL</div>
                  <div>온도: {temperatures[currentExperiment.temperature].value}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">📚 실험 팁</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 온도가 높을수록 대부분의 물질이 잘 녹습니다</li>
              <li>• 용질의 양을 늘리면 포화용액이 될 가능성이 높아집니다</li>
              <li>• 같은 조건으로 여러 번 실험해도 결과는 동일합니다</li>
              <li>• 다양한 조건으로 실험하여 패턴을 찾아보세요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentTab;