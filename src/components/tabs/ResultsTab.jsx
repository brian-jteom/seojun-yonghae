import React from 'react';
import { Eye, BarChart3, Beaker } from 'lucide-react';
import { substances, temperatures } from '../../data/experimentData';

const ResultsTab = ({ lastResult, experiments }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">📊 실험 결과 분석</h2>
      
      {lastResult ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 result-card">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-500" />
              최근 실험 결과
            </h3>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${lastResult.isSaturated ? 'bg-orange-50 border border-orange-200' : 'bg-green-50 border border-green-200'}`}>
                <div className="text-center mb-3">
                  <div className="text-4xl mb-2 animate-bounce">
                    {lastResult.isSaturated ? '🥽' : '✨'}
                  </div>
                  <div className={`text-lg font-bold ${lastResult.isSaturated ? 'text-orange-700' : 'text-green-700'}`}>
                    {lastResult.isSaturated ? '포화용액 형성!' : '완전 용해!'}
                  </div>
                  {parseFloat(lastResult.efficiency) >= 95 && (
                    <div className="text-sm text-purple-600 font-medium mt-1 animate-pulse">
                      🎯 완벽한 실험! 95% 이상 효율 달성!
                    </div>
                  )}
                  {lastResult.isSaturated && parseFloat(lastResult.concentration) >= 15 && (
                    <div className="text-sm text-blue-600 font-medium mt-1 animate-pulse">
                      💎 고농도 포화용액 생성!
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-3 rounded">
                    <div className="text-gray-600">용해된 양</div>
                    <div className="text-xl font-bold text-blue-600">{lastResult.dissolved}g</div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="text-gray-600">용해 효율</div>
                    <div className="text-xl font-bold text-green-600">{lastResult.efficiency}%</div>
                  </div>
                  {lastResult.isSaturated && (
                    <>
                      <div className="bg-white p-3 rounded">
                        <div className="text-gray-600">침전물</div>
                        <div className="text-xl font-bold text-red-600">{lastResult.precipitate}g</div>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <div className="text-gray-600">포화농도</div>
                        <div className="text-xl font-bold text-purple-600">{lastResult.concentration}%</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">📚 결과 해석</h4>
                <p className="text-sm text-blue-700">
                  {lastResult.isSaturated 
                    ? `이 온도에서 더 이상 용해되지 않아 포화용액이 되었습니다. 최대 용해량은 ${lastResult.maxSoluble}g입니다.`
                    : `모든 용질이 완전히 용해되었습니다. 더 많은 양도 용해될 수 있습니다.`
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">📋 실험 기록부</h3>
            
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              {experiments.map((exp, index) => (
                <div key={exp.id} className="bg-gray-50 p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">실험 #{experiments.length - index}</div>
                    <div className="text-xs text-gray-500">{exp.timestamp}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>물질: {substances[exp.substance].name}</div>
                    <div>온도: {temperatures[exp.temperature].value}</div>
                    <div>용질: {exp.amount}g</div>
                    <div>용매: {exp.waterVolume}mL</div>
                  </div>
                  
                  <div className="mt-2 flex justify-between items-center">
                    <span className={`px-2 py-1 rounded text-xs ${
                      exp.result.isSaturated 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {exp.result.isSaturated ? '포화' : '불포화'}
                    </span>
                    <span className="text-sm font-medium">효율: {exp.result.efficiency}%</span>
                  </div>
                </div>
              ))}
              
              {experiments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Beaker className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>아직 실험 기록이 없습니다.</p>
                  <p className="text-sm">실험을 수행해보세요!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>실험 결과를 확인하려면 먼저 실험을 수행해주세요.</p>
        </div>
      )}
    </div>
  );
};

export default ResultsTab;