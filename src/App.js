import React, { useState } from 'react';
import './App.css';
import Privacy from './Privacy';

// 숫자 포맷 (천단위 콤마)
const fmt = (n) => Math.round(n).toLocaleString('ko-KR');

// ────────────────────────────────
// 1. 연봉 실수령액 계산기
// ────────────────────────────────
function SalaryCalculator() {
  const [salary, setSalary] = useState('');

  const calc = () => {
    const s = parseFloat(salary.replace(/,/g, '')) * 10000;
    if (!s || s <= 0) return null;
    const monthly = s / 12;
    const pension = monthly * 0.045;
    const health = monthly * 0.03545;
    const longterm = monthly * 0.00455;
    const employment = monthly * 0.009;
    const tax = monthly * 0.033;
    const total = pension + health + longterm + employment + tax;
    return { monthly, pension, health, longterm, employment, tax, total, take: monthly - total };
  };

  const result = calc();

  return (
    <div className="calculator-card">
      <h2>💼 연봉 실수령액 계산기</h2>
      <p className="desc">연봉을 입력하면 4대보험과 소득세를 제외한 실수령액을 계산해드려요.</p>
      <div className="input-group">
        <label>연봉 (만원)</label>
        <input
          type="text"
          placeholder="예: 4000"
          value={salary}
          onChange={e => setSalary(e.target.value.replace(/[^0-9]/g, ''))}
        />
      </div>
      {result && (
        <>
          <div className="result-box">
            <div className="result-label">월 실수령액</div>
            <div className="result-value">{fmt(result.take)}원</div>
            <div className="result-sub">연 실수령액: {fmt(result.take * 12)}원</div>
          </div>
          <div className="result-detail">
            <div className="detail-row"><span>월 세전 급여</span><span>{fmt(result.monthly)}원</span></div>
            <div className="detail-row"><span>국민연금 (4.5%)</span><span>-{fmt(result.pension)}원</span></div>
            <div className="detail-row"><span>건강보험 (3.545%)</span><span>-{fmt(result.health)}원</span></div>
            <div className="detail-row"><span>장기요양 (0.455%)</span><span>-{fmt(result.longterm)}원</span></div>
            <div className="detail-row"><span>고용보험 (0.9%)</span><span>-{fmt(result.employment)}원</span></div>
            <div className="detail-row"><span>소득세 (근사값)</span><span>-{fmt(result.tax)}원</span></div>
            <div className="detail-row"><span>총 공제액</span><span>-{fmt(result.total)}원</span></div>
          </div>
        </>
      )}
    </div>
  );
}

// ────────────────────────────────
// 2. 퇴직금 계산기
// ────────────────────────────────
function RetirementCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [avgWage, setAvgWage] = useState('');

  const calc = () => {
    if (!startDate || !endDate || !avgWage) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = (end - start) / (1000 * 60 * 60 * 24);
    if (days < 365) return { error: '퇴직금은 1년 이상 근무 시 발생해요.' };
    const wage = parseFloat(avgWage.replace(/,/g, '')) * 10000;
    const retirement = (wage / 30) * 30 * (days / 365);
    return { days: Math.floor(days), years: (days / 365).toFixed(1), retirement };
  };

  const result = calc();

  return (
    <div className="calculator-card">
      <h2>📅 퇴직금 계산기</h2>
      <p className="desc">입사일, 퇴사일, 평균 월급을 입력하면 예상 퇴직금을 계산해드려요.</p>
      <div className="input-group">
        <label>입사일</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      </div>
      <div className="input-group">
        <label>퇴사일</label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </div>
      <div className="input-group">
        <label>최근 3개월 평균 월급 (만원)</label>
        <input
          type="text"
          placeholder="예: 350"
          value={avgWage}
          onChange={e => setAvgWage(e.target.value.replace(/[^0-9]/g, ''))}
        />
      </div>
      {result && (
        result.error
          ? <div className="result-box"><div className="result-value" style={{fontSize:'1.1rem'}}>{result.error}</div></div>
          : <>
            <div className="result-box">
              <div className="result-label">예상 퇴직금</div>
              <div className="result-value">{fmt(result.retirement)}원</div>
              <div className="result-sub">근속기간: {result.years}년 ({result.days}일)</div>
            </div>
          </>
      )}
    </div>
  );
}

// ────────────────────────────────
// 3. 적금 만기금액 계산기
// ────────────────────────────────
function SavingsCalculator() {
  const [monthly, setMonthly] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');

  const calc = () => {
    const m = parseFloat(monthly.replace(/,/g, '')) * 10000;
    const r = parseFloat(rate) / 100 / 12;
    const n = parseInt(months);
    if (!m || !r || !n) return null;
    const total = m * n;
    const interest = m * r * (n * (n + 1)) / 2;
    const tax = interest * 0.154;
    return { total, interest, tax, final: total + interest - tax };
  };

  const result = calc();

  return (
    <div className="calculator-card">
      <h2>🏦 적금 만기금액 계산기</h2>
      <p className="desc">매월 납입액, 금리, 기간을 입력하면 세후 만기금액을 계산해드려요.</p>
      <div className="input-group">
        <label>월 납입액 (만원)</label>
        <input type="text" placeholder="예: 30" value={monthly} onChange={e => setMonthly(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className="input-group">
        <label>연 금리 (%)</label>
        <input type="text" placeholder="예: 3.5" value={rate} onChange={e => setRate(e.target.value)} />
      </div>
      <div className="input-group">
        <label>납입 기간 (개월)</label>
        <input type="text" placeholder="예: 12" value={months} onChange={e => setMonths(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      {result && (
        <>
          <div className="result-box">
            <div className="result-label">세후 만기금액</div>
            <div className="result-value">{fmt(result.final)}원</div>
          </div>
          <div className="result-detail">
            <div className="detail-row"><span>총 납입액</span><span>{fmt(result.total)}원</span></div>
            <div className="detail-row"><span>세전 이자</span><span>+{fmt(result.interest)}원</span></div>
            <div className="detail-row"><span>이자소득세 (15.4%)</span><span>-{fmt(result.tax)}원</span></div>
          </div>
        </>
      )}
    </div>
  );
}

// ────────────────────────────────
// 4. 대출 이자 계산기
// ────────────────────────────────
function LoanCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');
  const [type, setType] = useState('equal');

  const calc = () => {
    const p = parseFloat(principal.replace(/,/g, '')) * 10000;
    const r = parseFloat(rate) / 100 / 12;
    const n = parseInt(months);
    if (!p || !r || !n) return null;
    if (type === 'equal') {
      const monthly = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      const total = monthly * n;
      return { monthly, total, interest: total - p };
    } else {
      const monthlyPrincipal = p / n;
      const firstMonth = monthlyPrincipal + p * r;
      const totalInterest = p * r * (n + 1) / 2;
      return { monthly: firstMonth, total: p + totalInterest, interest: totalInterest, note: '첫 달 기준 금액' };
    }
  };

  const result = calc();

  return (
    <div className="calculator-card">
      <h2>🏠 대출 이자 계산기</h2>
      <p className="desc">대출 원금, 금리, 기간을 입력하면 월 상환액과 총 이자를 계산해드려요.</p>
      <div className="input-group">
        <label>대출 원금 (만원)</label>
        <input type="text" placeholder="예: 10000" value={principal} onChange={e => setPrincipal(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className="input-group">
        <label>연 금리 (%)</label>
        <input type="text" placeholder="예: 4.5" value={rate} onChange={e => setRate(e.target.value)} />
      </div>
      <div className="input-group">
        <label>대출 기간 (개월)</label>
        <input type="text" placeholder="예: 120" value={months} onChange={e => setMonths(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className="input-group">
        <label>상환 방식</label>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="equal">원리금균등상환</option>
          <option value="principal">원금균등상환</option>
        </select>
      </div>
      {result && (
        <>
          <div className="result-box">
            <div className="result-label">월 상환액 {result.note ? `(${result.note})` : ''}</div>
            <div className="result-value">{fmt(result.monthly)}원</div>
          </div>
          <div className="result-detail">
            <div className="detail-row"><span>대출 원금</span><span>{fmt(parseFloat(principal) * 10000)}원</span></div>
            <div className="detail-row"><span>총 이자</span><span>{fmt(result.interest)}원</span></div>
            <div className="detail-row"><span>총 상환액</span><span>{fmt(result.total)}원</span></div>
          </div>
        </>
      )}
    </div>
  );
}

// ────────────────────────────────
// 5. 비상금 목표 계산기
// ────────────────────────────────
function EmergencyCalculator() {
  const [expense, setExpense] = useState('');
  const [saved, setSaved] = useState('');

  const calc = () => {
    const e = parseFloat(expense.replace(/,/g, '')) * 10000;
    const s = parseFloat((saved || '0').replace(/,/g, '')) * 10000;
    if (!e) return null;
    const target3 = e * 3;
    const target6 = e * 6;
    const progress3 = Math.min((s / target3) * 100, 100);
    return { target3, target6, progress3, remaining: Math.max(target3 - s, 0), s };
  };

  const result = calc();

  return (
    <div className="calculator-card">
      <h2>🛡️ 비상금 목표 계산기</h2>
      <p className="desc">월 지출을 입력하면 전문가 권장 비상금 목표액(3~6개월치)을 알려드려요.</p>
      <div className="input-group">
        <label>월 평균 지출 (만원)</label>
        <input type="text" placeholder="예: 200" value={expense} onChange={e => setExpense(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className="input-group">
        <label>현재 모아둔 비상금 (만원, 선택)</label>
        <input type="text" placeholder="예: 150" value={saved} onChange={e => setSaved(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      {result && (
        <>
          <div className="result-box">
            <div className="result-label">권장 비상금 (3개월)</div>
            <div className="result-value">{fmt(result.target3)}원</div>
            <div className="result-sub">6개월 목표: {fmt(result.target6)}원</div>
          </div>
          <div className="result-detail">
            <div className="detail-row"><span>현재 비상금</span><span>{fmt(result.s)}원</span></div>
            <div className="detail-row"><span>3개월 목표까지 부족액</span><span>{fmt(result.remaining)}원</span></div>
            <div className="detail-row"><span>달성률</span><span>{result.progress3.toFixed(1)}%</span></div>
          </div>
          <div style={{marginTop:16,background:'#e2e8f0',borderRadius:8,height:12,overflow:'hidden'}}>
            <div style={{width:`${result.progress3}%`,height:'100%',background:'linear-gradient(90deg,#1a365d,#2b6cb0)',borderRadius:8,transition:'width 0.5s'}}/>
          </div>
        </>
      )}
    </div>
  );
}

// ────────────────────────────────
// 메인 App
// ────────────────────────────────
const TABS = [
  { id: 'salary', label: '💼 연봉 실수령액' },
  { id: 'retirement', label: '📅 퇴직금' },
  { id: 'savings', label: '🏦 적금' },
  { id: 'loan', label: '🏠 대출 이자' },
  { id: 'emergency', label: '🛡️ 비상금' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('salary');
  const [page, setPage] = useState('home');
if (page === 'privacy') return <Privacy />;

  return (
    <div className="app">
      <header>
        <h1>💰 재테크 계산기</h1>
        <p>직장인을 위한 필수 금융 계산기 모음</p>
      </header>

      <div className="tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'salary' && <SalaryCalculator />}
      {activeTab === 'retirement' && <RetirementCalculator />}
      {activeTab === 'savings' && <SavingsCalculator />}
      {activeTab === 'loan' && <LoanCalculator />}
      {activeTab === 'emergency' && <EmergencyCalculator />}

      <div className="ad-placeholder">
        📢 광고 영역 (Google AdSense 연동 시 여기에 광고가 표시됩니다)
      </div>

      <footer>
        <p>© 2025 재테크 계산기 · 본 계산 결과는 참고용이며 실제와 다를 수 있습니다.</p>
        <p style={{marginTop:8}}>
          <button onClick={() => setPage('privacy')} style={{background:'none', border:'none', color:'#718096', cursor:'pointer', textDecoration:'underline', fontSize:'0.82rem'}}>
            개인정보처리방침
          </button>
        </p>
      </footer>
    </div>
  );
}