import React from 'react';

const CertificateModal = ({ showCertificate, certificateData, setShowCertificate }) => {
  if (!showCertificate || !certificateData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCertificate(false)}></div>
      
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in duration-300">
        <div className={`bg-gradient-to-r ${certificateData.color} text-white p-8 text-center relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-4 text-6xl opacity-30">⚗️</div>
            <div className="absolute top-8 right-8 text-4xl opacity-30">🧪</div>
            <div className="absolute bottom-4 left-8 text-5xl opacity-30">🔬</div>
            <div className="absolute bottom-8 right-4 text-3xl opacity-30">⚛️</div>
          </div>
          
          <div className="relative z-10">
            <div className="text-6xl mb-4">{certificateData.icon}</div>
            <h2 className="text-2xl font-bold mb-2">{certificateData.title}</h2>
            <p className="text-lg opacity-90">{certificateData.subtitle}</p>
          </div>
        </div>

        <div className="p-8">
          <div className="text-center mb-6">
            <div className="inline-block bg-gray-100 rounded-full px-4 py-2 mb-4">
              <span className="text-sm text-gray-600">수여 날짜: {certificateData.achievementDate}</span>
            </div>
            
            <h3 className="text-xl font-semibold mb-3">🎉 축하합니다! 🎉</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              "{certificateData.challengeTitle}" 도전과제를 완료하여<br/>
              <strong className="text-gray-800">{certificateData.title}</strong>를 수여합니다.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-blue-800">{certificateData.description}</p>
            </div>
          </div>

          <div className="border-t pt-6 flex justify-between items-end">
            <div className="text-sm text-gray-500">
              <div>용해도 실험실</div>
              <div>과학 교육 프로그램</div>
            </div>
            <div className="text-right">
              <div className="w-24 h-8 border-b border-gray-300 mb-2"></div>
              <div className="text-xs text-gray-500">지도교사 서명</div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setShowCertificate(false)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-xl transition-all"
            >
              닫기
            </button>
            <button
              onClick={() => {
                alert('인증서를 저장했습니다! 선생님께 보여드리세요.');
                setShowCertificate(false);
              }}
              className={`flex-1 bg-gradient-to-r ${certificateData.color} text-white font-bold py-3 px-4 rounded-xl transition-all hover:shadow-lg`}
            >
              📁 저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;