import React from 'react';
import { substances } from '../../data/experimentData';

const KnowledgeTab = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">📚 과학 지식</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 용해도 개념 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">💡 용해도란?</h3>
          <div className="space-y-4 text-sm">
            <p>
              <strong>용해도</strong>는 일정한 온도에서 용매 100g에 최대로 녹을 수 있는 
              용질의 양을 말합니다. 단위는 g/100g 또는 g/100mL로 표현합니다.
            </p>
            <div className="bg-blue-50 p-3 rounded">
              <strong>포화용액:</strong> 더 이상 용질이 녹지 않는 용액
            </div>
            <div className="bg-green-50 p-3 rounded">
              <strong>불포화용액:</strong> 용질이 더 녹을 수 있는 용액
            </div>
          </div>
        </div>

        {/* 온도와 용해도 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-red-800">🌡️ 온도와 용해도</h3>
          <div className="space-y-4 text-sm">
            <p>
              대부분의 고체 물질은 온도가 높아질수록 용해도가 증가합니다. 
              하지만 물질마다 증가하는 정도가 다릅니다.
            </p>
            
            <div className="space-y-2">
              {Object.entries(substances).map(([key, substance]) => (
                <div key={key} className="bg-gray-50 p-3 rounded flex items-center gap-3">
                  <span className="text-lg">{substance.emoji}</span>
                  <div>
                    <div className="font-medium">{substance.name}</div>
                    <div className="text-xs text-gray-600">{substance.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 실생활 응용 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-green-800">🏠 실생활 속 용해도</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-lg">☕</span>
              <div>
                <strong>뜨거운 차에 설탕이 잘 녹는 이유</strong><br/>
                온도가 높을수록 설탕의 용해도가 크게 증가하기 때문
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🧂</span>
              <div>
                <strong>소금물의 농도 조절</strong><br/>
                소금은 온도 변화에 둔감해서 일정한 농도 유지 가능
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">💊</span>
              <div>
                <strong>의약품 제조</strong><br/>
                용해도를 이용해 약물의 흡수율과 효과 조절
              </div>
            </div>
          </div>
        </div>

        {/* 화학 결합과 용해도 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-purple-800">⚛️ 화학 결합과 용해도</h3>
          <div className="space-y-3 text-sm">
            <div className="bg-purple-50 p-3 rounded">
              <strong>이온결합 화합물 (소금, 질산칼륨)</strong><br/>
              물 분자가 이온을 둘러싸며 용해시킴. 온도 영향 다양함.
            </div>
            <div className="bg-orange-50 p-3 rounded">
              <strong>분자결합 화합물 (설탕)</strong><br/>
              수소결합으로 물과 결합. 온도가 높을수록 잘 녹음.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeTab;