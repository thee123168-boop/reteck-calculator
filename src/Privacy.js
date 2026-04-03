import React from 'react';

export default function Privacy() {
  return (
    <div style={{maxWidth:800, margin:'0 auto', padding:'40px 20px', fontFamily:'sans-serif', lineHeight:1.8, color:'#2d3748'}}>
      <h1 style={{color:'#1a365d', marginBottom:8}}>개인정보처리방침</h1>
      <p style={{color:'#718096', marginBottom:32}}>최종 업데이트: 2025년 1월 1일</p>

      <h2 style={{color:'#1a365d', marginTop:32}}>1. 수집하는 개인정보</h2>
      <p>본 사이트(재테크 계산기)는 별도의 회원가입 없이 이용 가능하며, 사용자의 개인정보를 수집하지 않습니다. 계산기에 입력하는 모든 수치는 사용자의 브라우저 내에서만 처리되며 서버에 저장되지 않습니다.</p>

      <h2 style={{color:'#1a365d', marginTop:32}}>2. 쿠키 및 광고</h2>
      <p>본 사이트는 Google AdSense를 통해 광고를 게재할 수 있습니다. Google은 쿠키를 사용하여 사용자의 관심사에 맞는 광고를 표시할 수 있습니다. Google의 광고 쿠키 사용을 거부하려면 <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" style={{color:'#2b6cb0'}}>Google 광고 설정</a>에서 설정할 수 있습니다.</p>

      <h2 style={{color:'#1a365d', marginTop:32}}>3. 제3자 서비스</h2>
      <p>본 사이트는 다음의 제3자 서비스를 사용합니다.</p>
      <ul>
        <li><strong>Google Analytics</strong>: 사이트 방문 통계 수집 (익명 데이터)</li>
        <li><strong>Google AdSense</strong>: 광고 게재</li>
      </ul>

      <h2 style={{color:'#1a365d', marginTop:32}}>4. 면책조항</h2>
      <p>본 사이트의 계산 결과는 참고용으로만 제공되며 실제 금융 상황과 다를 수 있습니다. 중요한 금융 결정 시 전문가와 상담하시기 바랍니다.</p>

      <h2 style={{color:'#1a365d', marginTop:32}}>5. 문의</h2>
      <p>개인정보처리방침에 관한 문의사항은 아래 이메일로 연락해 주세요.</p>
      <p><strong>이메일:</strong> thee123168@gmail.com</p>

      <div style={{marginTop:48, paddingTop:24, borderTop:'1px solid #e2e8f0', textAlign:'center'}}>
        <a href="/" style={{color:'#2b6cb0'}}>← 계산기로 돌아가기</a>
      </div>
    </div>
  );
}