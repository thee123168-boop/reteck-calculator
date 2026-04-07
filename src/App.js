import React, { useState } from 'react';
import './App.css';
import Privacy from './Privacy';

const fmt = (n) => Math.round(n).toLocaleString('ko-KR');

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
      <div className="input-group"><label>연봉 (만원)</label><input type="text" placeholder="예: 4000" value={salary} onChange={e => setSalary(e.target.value.replace(/[^0-9]/g, ''))} /></div>
      {result && (<><div className="result-box"><div className="result-label">월 실수령액</div><div className="result-value">{fmt(result.take)}원</div><div className="result-sub">연 실수령액: {fmt(result.take * 12)}원</div></div><div className="result-detail"><div className="detail-row"><span>월 세전 급여</span><span>{fmt(result.monthly)}원</span></div><div className="detail-row"><span>국민연금 (4.5%)</span><span>-{fmt(result.pension)}원</span></div><div className="detail-row"><span>건강보험 (3.545%)</span><span>-{fmt(result.health)}원</span></div><div className="detail-row"><span>장기요양 (0.455%)</span><span>-{fmt(result.longterm)}원</span></div><div className="detail-row"><span>고용보험 (0.9%)</span><span>-{fmt(result.employment)}원</span></div><div className="detail-row"><span>소득세 (근사값)</span><span>-{fmt(result.tax)}원</span></div><div className="detail-row"><span>총 공제액</span><span>-{fmt(result.total)}원</span></div></div></>)}
    </div>
  );
}

function RetirementCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [avgWage, setAvgWage] = useState('');
  const calc = () => {
    if (!startDate || !endDate || !avgWage) return null;
    const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    if (days < 365) return { error: '퇴직금은 1년 이상 근무 시 발생해요.' };
    const wage = parseFloat(avgWage.replace(/,/g, '')) * 10000;
    return { days: Math.floor(days), years: (days / 365).toFixed(1), retirement: wage * (days / 365) };
  };
  const result = calc();
  return (
    <div className="calculator-card">
      <h2>📅 퇴직금 계산기</h2>
      <p className="desc">입사일, 퇴사일, 평균 월급을 입력하면 예상 퇴직금을 계산해드려요.</p>
      <div className="input-group"><label>입사일</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></div>
      <div className="input-group"><label>퇴사일</label><input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} /></div>
      <div className="input-group"><label>최근 3개월 평균 월급 (만원)</label><input type="text" placeholder="예: 350" value={avgWage} onChange={e => setAvgWage(e.target.value.replace(/[^0-9]/g, ''))} /></div>
      {result && (result.error ? <div className="result-box"><div className="result-value" style={{fontSize:'1.1rem'}}>{result.error}</div></div> : <div className="result-box"><div className="result-label">예상 퇴직금</div><div className="result-value">{fmt(result.retirement)}원</div><div className="result-sub">근속기간: {result.years}년 ({result.days}일)</div></div>)}
    </div>
  );
}

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
      <div className="input-group"><label>월 납입액 (만원)</label><input type="text" placeholder="예: 30" value={monthly} onChange={e => setMonthly(e.target.value.replace(/[^0-9]/g, ''))} /></div>
      <div className="input-group"><label>연 금리 (%)</label><input type="text" placeholder="예: 3.5" value={rate} onChange={e => setRate(e.target.value)} /></div>
      <div className="input-group"><label>납입 기간 (개월)</label><input type="text" placeholder="예: 12" value={months} onChange={e => setMonths(e.target.value.replace(/[^0-9]/g, ''))} /></div>
      {result && (<><div className="result-box"><div className="result-label">세후 만기금액</div><div className="result-value">{fmt(result.final)}원</div></div><div className="result-detail"><div className="detail-row"><span>총 납입액</span><span>{fmt(result.total)}원</span></div><div className="detail-row"><span>세전 이자</span><span>+{fmt(result.interest)}원</span></div><div className="detail-row"><span>이자소득세 (15.4%)</span><span>-{fmt(result.tax)}원</span></div></div></>)}
    </div>
  );
}

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
      return { monthly, total: monthly * n, interest: monthly * n - p };
    } else {
      const mp = p / n;
      const first = mp + p * r;
      const totalInterest = p * r * (n + 1) / 2;
      return { monthly: first, total: p + totalInterest, interest: totalInterest, note: '첫 달 기준' };
    }
  };
  const result = calc();
  return (
    <div className="calculator-card">
      <h2>🏠 대출 이자 계산기</h2>
      <p className="desc">대출 원금, 금리, 기간을 입력하면 월 상환액과 총 이자를 계산해드려요.</p>
      <div className="input-group"><label>대출 원금 (만원)</label><input type="text" placeholder="예: 10000" value={principal} onChange={e => setPrincipal(e.target.value.replace(/[^0-9]/g, ''))} /></div>
      <div className="input-group"><label>연 금리 (%)</label><input type="text" placeholder="예: 4.5" value={rate} onChange={e => setRate(e.target.value)} /></div>
      <div className="input-group"><label>대출 기간 (개월)</label><input type="text" placeholder="예: 120" value={months} onChange={e => setMonths(e.target.value.replace(/[^0-9]/g, ''))} /></div>
      <div className="input-group"><label>상환 방식</label><select value={type} onChange={e => setType(e.target.value)}><option value="equal">원리금균등상환</option><option value="principal">원금균등상환</option></select></div>
      {result && (<><div className="result-box"><div className="result-label">월 상환액 {result.note ? `(${result.note})` : ''}</div><div className="result-value">{fmt(result.monthly)}원</div></div><div className="result-detail"><div className="detail-row"><span>대출 원금</span><span>{fmt(parseFloat(principal) * 10000)}원</span></div><div className="detail-row"><span>총 이자</span><span>{fmt(result.interest)}원</span></div><div className="detail-row"><span>총 상환액</span><span>{fmt(result.total)}원</span></div></div></>)}
    </div>
  );
}

function EmergencyCalculator() {
  const [expense, setExpense] = useState('');
  const [saved, setSaved] = useState('');
  const calc = () => {
    const e = parseFloat(expense.replace(/,/g, '')) * 10000;
    const s = parseFloat((saved || '0').replace(/,/g, '')) * 10000;
    if (!e) return null;
    const target3 = e * 3;
    const progress3 = Math.min((s / target3) * 100, 100);
    return { target3, target6: e * 6, progress3, remaining: Math.max(target3 - s, 0), s };
  };
  const result = calc();
  return (
    <div className="calculator-card">
      <h2>🛡️ 비상금 목표 계산기</h2>
      <p className="desc">월 지출을 입력하면 전문가 권장 비상금 목표액(3~6개월치)을 알려드려요.</p>
      <div className="input-group"><label>월 평균 지출 (만원)</label><input type="text" placeholder="예: 200" value={expense} onChange={e => setExpense(e.target.value.replace(/[^0-9]/g, ''))} /></div>
      <div className="input-group"><label>현재 모아둔 비상금 (만원, 선택)</label><input type="text" placeholder="예: 150" value={saved} onChange={e => setSaved(e.target.value.replace(/[^0-9]/g, ''))} /></div>
      {result && (<><div className="result-box"><div className="result-label">권장 비상금 (3개월)</div><div className="result-value">{fmt(result.target3)}원</div><div className="result-sub">6개월 목표: {fmt(result.target6)}원</div></div><div className="result-detail"><div className="detail-row"><span>현재 비상금</span><span>{fmt(result.s)}원</span></div><div className="detail-row"><span>부족액</span><span>{fmt(result.remaining)}원</span></div><div className="detail-row"><span>달성률</span><span>{result.progress3.toFixed(1)}%</span></div></div><div style={{marginTop:16,background:'#e2e8f0',borderRadius:8,height:12,overflow:'hidden'}}><div style={{width:`${result.progress3}%`,height:'100%',background:'linear-gradient(90deg,#1a365d,#2b6cb0)',borderRadius:8}}/></div></>)}
    </div>
  );
}

function DepositCalculator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('2.1');
  const [days, setDays] = useState('');
  const calc = () => {
    const a = parseFloat(amount.replace(/,/g, '')) * 10000;
    const r = parseFloat(rate) / 100;
    const d = parseInt(days);
    if (!a || !r || !d) return null;
    const interest = a * r * (d / 365);
    const tax = interest * 0.154;
    return { interest, tax, final: interest - tax };
  };
  const result = calc();
  return (
    <div className="calculator-card">
      <h2>📈 주식 예탁금 이용료 계산기</h2>
      <p className="desc">증권사에 맡긴 예탁금에 대한 이용료(이자)를 계산해드려요.</p>
      <div className="input-group"><label>예탁금 (만원)</label><input type="text" placeholder="예: 1000" value={amount} onChange={e => setAmount(e.target.value.replace(/[^0-9]/g, ''))} /></div>
      <div className="input-group"><label>연 이용료율 (%)</label><input type="text" placeholder="예: 2.1" value={rate} onChange={e => setRate(e.target.value)} /></div>
      <div className="input-group"><label>예탁 기간 (일)</label><input type="text" placeholder="예: 30" value={days} onChange={e => setDays(e.target.value.replace(/[^0-9]/g, ''))} /></div>
      {result && (<><div className="result-box"><div className="result-label">세후 이용료 수령액</div><div className="result-value">{fmt(result.final)}원</div></div><div className="result-detail"><div className="detail-row"><span>세전 이용료</span><span>{fmt(result.interest)}원</span></div><div className="detail-row"><span>이자소득세 (15.4%)</span><span>-{fmt(result.tax)}원</span></div><div className="detail-row"><span>세후 수령액</span><span>{fmt(result.final)}원</span></div></div><div className="result-detail" style={{marginTop:12,background:'#fffbeb',border:'1px solid #f6e05e'}}><p style={{fontSize:'0.82rem',color:'#744210'}}>💡 키움 2.0%, 미래에셋 2.1%, 삼성증권 2.0%, NH투자 1.8%</p></div></>)}
    </div>
  );
}

function CourtCalculator() {
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('deposit');
  const RATES = { deposit: { rate: 2.5, label: '전세보증금 공탁 (연 2.5%)' }, execution: { rate: 5.0, label: '집행공탁 (연 5.0%)' }, guarantee: { rate: 1.0, label: '보증공탁 (연 1.0%)' } };
  const calc = () => {
    const a = parseFloat(amount.replace(/,/g, '')) * 10000;
    if (!a || !startDate || !endDate) return null;
    const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    if (days <= 0) return null;
    const interest = a * (RATES[type].rate / 100) * (days / 365);
    const tax = interest * 0.154;
    return { days: Math.floor(days), interest, tax, final: interest - tax, total: a + interest - tax };
  };
  const result = calc();
  return (
    <div className="calculator-card">
      <h2>⚖️ 법원 공탁금 이자 계산기</h2>
      <p className="desc">전세보증금, 집행공탁 등 법원에 맡긴 공탁금의 이자를 계산해드려요.</p>
      <div className="input-group"><label>공탁금 (만원)</label><input type="text" placeholder="예: 10000" value={amount} onChange={e => setAmount(e.target.value.replace(/[^0-9]/g, ''))} /></div>
      <div className="input-group"><label>공탁 종류</label><select value={type} onChange={e => setType(e.target.value)}>{Object.entries(RATES).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}</select></div>
      <div className="input-group"><label>공탁 시작일</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></div>
      <div className="input-group"><label>공탁 종료일</label><input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} /></div>
      {result && (<><div className="result-box"><div className="result-label">세후 이자</div><div className="result-value">{fmt(result.final)}원</div><div className="result-sub">총액: {fmt(result.total)}원</div></div><div className="result-detail"><div className="detail-row"><span>공탁 기간</span><span>{result.days}일</span></div><div className="detail-row"><span>세전 이자</span><span>{fmt(result.interest)}원</span></div><div className="detail-row"><span>이자소득세</span><span>-{fmt(result.tax)}원</span></div><div className="detail-row"><span>세후 이자</span><span>{fmt(result.final)}원</span></div></div></>)}
    </div>
  );
}

function SubscriptionCalculator() {
  const [noHome, setNoHome] = useState('');
  const [homelessYears, setHomelessYears] = useState('0');
  const [dependents, setDependents] = useState('0');
  const [savingsYears, setSavingsYears] = useState('0');
  const hs = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32];
  const ds = [5,10,15,20,25,30,35];
  const ss = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
  const calc = () => {
    if (noHome === '') return null;
    const h = noHome === 'yes' ? hs[Math.min(parseInt(homelessYears), 15)] : 0;
    const d = ds[Math.min(parseInt(dependents), 6)];
    const s = ss[Math.min(parseInt(savingsYears), 15)];
    return { h, d, s, total: h + d + s };
  };
  const result = calc();
  const getGrade = (s) => s >= 70 ? '매우 높음 🔥' : s >= 55 ? '높음 👍' : s >= 40 ? '보통 😊' : '낮음 😢';
  return (
    <div className="calculator-card">
      <h2>🏠 청약 가점 계산기</h2>
      <p className="desc">무주택 기간, 부양가족 수, 청약통장 가입 기간을 입력하면 청약 가점을 계산해드려요. (만점 84점)</p>
      <div className="input-group"><label>무주택 여부</label><select value={noHome} onChange={e => setNoHome(e.target.value)}><option value="">선택해주세요</option><option value="yes">무주택자</option><option value="no">유주택자</option></select></div>
      {noHome === 'yes' && <div className="input-group"><label>무주택 기간 (년)</label><select value={homelessYears} onChange={e => setHomelessYears(e.target.value)}>{[...Array(16)].map((_,i) => <option key={i} value={i}>{i === 0 ? '1년 미만' : `${i}년 이상`}</option>)}</select></div>}
      <div className="input-group"><label>부양가족 수</label><select value={dependents} onChange={e => setDependents(e.target.value)}>{[...Array(7)].map((_,i) => <option key={i} value={i}>{i === 0 ? '없음' : `${i}명`}</option>)}</select></div>
      <div className="input-group"><label>청약통장 가입 기간 (년)</label><select value={savingsYears} onChange={e => setSavingsYears(e.target.value)}>{[...Array(16)].map((_,i) => <option key={i} value={i}>{i === 0 ? '1년 미만' : `${i}년 이상`}</option>)}</select></div>
      {result && (<><div className="result-box"><div className="result-label">총 청약 가점</div><div className="result-value">{result.total}점 / 84점</div><div className="result-sub">경쟁력: {getGrade(result.total)}</div></div><div className="result-detail"><div className="detail-row"><span>무주택 기간 (최대 32점)</span><span>{result.h}점</span></div><div className="detail-row"><span>부양가족 (최대 35점)</span><span>{result.d}점</span></div><div className="detail-row"><span>청약통장 가입기간 (최대 17점)</span><span>{result.s}점</span></div></div><div className="result-detail" style={{marginTop:12,background:'#ebf8ff',border:'1px solid #90cdf4'}}><p style={{fontSize:'0.82rem',color:'#2a4365'}}>💡 청약 가점 50점 이상이면 서울 일반 아파트 당첨 가능성이 있어요!</p></div></>)}
    </div>
  );
}

function StockCalculator() {
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [fee, setFee] = useState('0.015');
  const calc = () => {
    const buy = parseFloat(buyPrice.replace(/,/g, ''));
    const sell = parseFloat(sellPrice.replace(/,/g, ''));
    const qty = parseFloat(quantity.replace(/,/g, ''));
    const feeRate = parseFloat(fee) / 100;
    if (!buy || !sell || !qty) return null;
    const buyTotal = buy * qty;
    const sellTotal = sell * qty;
    const buyFee = buyTotal * feeRate;
    const sellFee = sellTotal * feeRate;
    const tax = sellTotal * 0.0023;
    const profit = sellTotal - buyTotal - buyFee - sellFee - tax;
    return { buyTotal, sellTotal, buyFee, sellFee, tax, profit, rate: (profit / buyTotal) * 100 };
  };
  const result = calc();
  return (
    <div className="calculator-card">
      <h2>📊 주식 수익률 계산기</h2>
      <p className="desc">매수가, 매도가, 수량을 입력하면 수수료와 세금을 제외한 실제 수익률을 계산해드려요.</p>
      <div className="input-group"><label>매수가 (원)</label><input type="text" placeholder="예: 50000" value={buyPrice} onChange={e => setBuyPrice(e.target.value.replace(/[^0-9]/g, ''))} /></div>
      <div className="input-group"><label>매도가 (원)</label><input type="text" placeholder="예: 60000" value={sellPrice} onChange={e => setSellPrice(e.target.value.replace(/[^0-9]/g, ''))} /></div>
      <div className="input-group"><label>수량 (주)</label><input type="text" placeholder="예: 100" value={quantity} onChange={e => setQuantity(e.target.value.replace(/[^0-9]/g, ''))} /></div>
      <div className="input-group"><label>수수료율 (%)</label><input type="text" placeholder="예: 0.015" value={fee} onChange={e => setFee(e.target.value)} /></div>
      {result && (<><div className="result-box" style={{background: result.profit >= 0 ? 'linear-gradient(135deg,#1a365d,#2b6cb0)' : 'linear-gradient(135deg,#742a2a,#c53030)'}}><div className="result-label">실제 수익금</div><div className="result-value">{result.profit >= 0 ? '+' : ''}{fmt(result.profit)}원</div><div className="result-sub">수익률: {result.rate >= 0 ? '+' : ''}{result.rate.toFixed(2)}%</div></div><div className="result-detail"><div className="detail-row"><span>매수 금액</span><span>{fmt(result.buyTotal)}원</span></div><div className="detail-row"><span>매도 금액</span><span>{fmt(result.sellTotal)}원</span></div><div className="detail-row"><span>매수 수수료</span><span>-{fmt(result.buyFee)}원</span></div><div className="detail-row"><span>매도 수수료</span><span>-{fmt(result.sellFee)}원</span></div><div className="detail-row"><span>증권거래세 (0.23%)</span><span>-{fmt(result.tax)}원</span></div><div className="detail-row"><span>최종 수익</span><span>{fmt(result.profit)}원</span></div></div></>)}
    </div>
  );
}

function HealthCalculator() {
  const [salary, setSalary] = useState('');
  const [type, setType] = useState('employee');
  const calc = () => {
    const s = parseFloat(salary.replace(/,/g, '')) * 10000;
    if (!s) return null;
    const monthly = s / 12;
    const health = monthly * (type === 'employee' ? 0.03545 : 0.0709);
    const longterm = monthly * (type === 'employee' ? 0.00455 : 0.0091);
    return { health, longterm, total: health + longterm };
  };
  const result = calc();
  return (
    <div className="calculator-card">
      <h2>🏥 건강보험료 계산기</h2>
      <p className="desc">연봉을 입력하면 월 건강보험료와 장기요양보험료를 계산해드려요.</p>
      <div className="input-group"><label>가입 유형</label><select value={type} onChange={e => setType(e.target.value)}><option value="employee">직장가입자</option><option value="self">지역가입자</option></select></div>
      <div className="input-group"><label>연봉 (만원)</label><input type="text" placeholder="예: 4000" value={salary} onChange={e => setSalary(e.target.value.replace(/[^0-9]/g, ''))} /></div>
      {result && (<><div className="result-box"><div className="result-label">월 본인 부담 보험료</div><div className="result-value">{fmt(result.total)}원</div></div><div className="result-detail"><div className="detail-row"><span>건강보험료</span><span>{fmt(result.health)}원</span></div><div className="detail-row"><span>장기요양보험료</span><span>{fmt(result.longterm)}원</span></div><div className="detail-row"><span>월 합계</span><span>{fmt(result.total)}원</span></div><div className="detail-row"><span>연 합계</span><span>{fmt(result.total * 12)}원</span></div></div><div className="result-detail" style={{marginTop:12,background:'#f0fff4',border:'1px solid #9ae6b4'}}><p style={{fontSize:'0.82rem',color:'#276749'}}>💡 직장가입자는 회사가 절반을 부담해요!</p></div></>)}
    </div>
  );
}

function IsaCalculator() {
  const [profit, setProfit] = useState('');
  const [type, setType] = useState('general');
  const calc = () => {
    const p = parseFloat(profit.replace(/,/g, '')) * 10000;
    if (!p) return null;
    const deduction = type === 'general' ? 2000000 : 4000000;
    const taxable = Math.max(p - deduction, 0);
    const isaTax = taxable * 0.099;
    const normalTax = p * 0.154;
    return { p, deduction, taxable, isaTax, normalTax, saved: normalTax - isaTax };
  };
  const result = calc();
  return (
    <div className="calculator-card">
      <h2>💰 ISA 절세 계산기</h2>
      <p className="desc">ISA 계좌를 통해 절세할 수 있는 금액을 계산해드려요. 연간 2,000만원까지 납입 가능해요.</p>
      <div className="input-group"><label>ISA 유형</label><select value={type} onChange={e => setType(e.target.value)}><option value="general">일반형 (200만원 비과세)</option><option value="preferred">서민·농어민형 (400만원 비과세)</option></select></div>
      <div className="input-group"><label>운용 수익 (만원)</label><input type="text" placeholder="예: 500" value={profit} onChange={e => setProfit(e.target.value.replace(/[^0-9]/g, ''))} /></div>
      {result && (<><div className="result-box"><div className="result-label">절세 금액</div><div className="result-value">{fmt(result.saved)}원</div><div className="result-sub">ISA 세금: {fmt(result.isaTax)}원 vs 일반 세금: {fmt(result.normalTax)}원</div></div><div className="result-detail"><div className="detail-row"><span>총 수익</span><span>{fmt(result.p)}원</span></div><div className="detail-row"><span>비과세 한도</span><span>{fmt(result.deduction)}원</span></div><div className="detail-row"><span>과세 대상</span><span>{fmt(result.taxable)}원</span></div><div className="detail-row"><span>ISA 세금 (9.9%)</span><span>{fmt(result.isaTax)}원</span></div><div className="detail-row"><span>일반 세금 (15.4%)</span><span>{fmt(result.normalTax)}원</span></div><div className="detail-row"><span>절세 금액</span><span>{fmt(result.saved)}원</span></div></div><div className="result-detail" style={{marginTop:12,background:'#fffff0',border:'1px solid #f6e05e'}}><p style={{fontSize:'0.82rem',color:'#744210'}}>💡 ISA 계좌는 3년 이상 유지해야 세제 혜택을 받을 수 있어요!</p></div></>)}
    </div>
  );
}

function YearEndCalculator() {
  const [salary, setSalary] = useState('');
  const [paid, setPaid] = useState('');
  const [deduction, setDeduction] = useState('');
  const calc = () => {
    const s = parseFloat(salary.replace(/,/g, '')) * 10000;
    const p = parseFloat(paid.replace(/,/g, '')) * 10000;
    const d = parseFloat((deduction || '0').replace(/,/g, '')) * 10000;
    if (!s || !p) return null;
    const taxBase = Math.max(s - d, 0);
    let tax = 0;
    if (taxBase <= 14000000) tax = taxBase * 0.06;
    else if (taxBase <= 50000000) tax = 840000 + (taxBase - 14000000) * 0.15;
    else if (taxBase <= 88000000) tax = 6240000 + (taxBase - 50000000) * 0.24;
    else if (taxBase <= 150000000) tax = 15360000 + (taxBase - 88000000) * 0.35;
    else tax = 37060000 + (taxBase - 150000000) * 0.38;
    const localTax = tax * 0.1;
    const totalTax = tax + localTax;
    const refund = p - totalTax;
    return { taxBase, tax, localTax, totalTax, refund };
  };
  const result = calc();
  return (
    <div className="calculator-card">
      <h2>📋 연말정산 환급액 계산기</h2>
      <p className="desc">연봉, 기납부 세액, 소득공제액을 입력하면 예상 환급액을 계산해드려요. (근사값)</p>
      <div className="input-group"><label>연봉 (만원)</label><input type="text" placeholder="예: 4000" value={salary} onChange={e => setSalary(e.target.value.replace(/[^0-9]/g, ''))} /></div>
      <div className="input-group"><label>올해 납부한 소득세 합계 (만원)</label><input type="text" placeholder="예: 150" value={paid} onChange={e => setPaid(e.target.value.replace(/[^0-9]/g, ''))} /></div>
      <div className="input-group"><label>소득공제 총액 (만원, 선택)</label><input type="text" placeholder="예: 500" value={deduction} onChange={e => setDeduction(e.target.value.replace(/[^0-9]/g, ''))} /></div>
      {result && (<><div className="result-box" style={{background: result.refund >= 0 ? 'linear-gradient(135deg,#1a365d,#2b6cb0)' : 'linear-gradient(135deg,#742a2a,#c53030)'}}><div className="result-label">{result.refund >= 0 ? '예상 환급액 💰' : '예상 추가 납부액 😢'}</div><div className="result-value">{fmt(Math.abs(result.refund))}원</div></div><div className="result-detail"><div className="detail-row"><span>과세표준</span><span>{fmt(result.taxBase)}원</span></div><div className="detail-row"><span>산출 세액</span><span>{fmt(result.tax)}원</span></div><div className="detail-row"><span>지방소득세 (10%)</span><span>{fmt(result.localTax)}원</span></div><div className="detail-row"><span>총 납부해야 할 세금</span><span>{fmt(result.totalTax)}원</span></div><div className="detail-row"><span>기납부 세액</span><span>{fmt(parseFloat(paid.replace(/,/g,''))*10000)}원</span></div></div><div className="result-detail" style={{marginTop:12,background:'#fff5f5',border:'1px solid #feb2b2'}}><p style={{fontSize:'0.82rem',color:'#742a2a'}}>⚠️ 본 계산은 참고용이며 실제 환급액과 다를 수 있어요. 정확한 금액은 홈택스에서 확인하세요.</p></div></>)}
    </div>
  );
}

const TABS = [
  { id: 'salary', label: '💼 연봉 실수령액' },
  { id: 'retirement', label: '📅 퇴직금' },
  { id: 'savings', label: '🏦 적금' },
  { id: 'loan', label: '🏠 대출 이자' },
  { id: 'emergency', label: '🛡️ 비상금' },
  { id: 'deposit', label: '📈 주식 예탁금' },
  { id: 'court', label: '⚖️ 법원 공탁금' },
  { id: 'subscription', label: '🏠 청약 가점' },
  { id: 'stock', label: '📊 주식 수익률' },
  { id: 'health', label: '🏥 건강보험료' },
  { id: 'isa', label: '💰 ISA 절세' },
  { id: 'yearend', label: '📋 연말정산' },
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
          <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === 'salary' && <SalaryCalculator />}
      {activeTab === 'retirement' && <RetirementCalculator />}
      {activeTab === 'savings' && <SavingsCalculator />}
      {activeTab === 'loan' && <LoanCalculator />}
      {activeTab === 'emergency' && <EmergencyCalculator />}
      {activeTab === 'deposit' && <DepositCalculator />}
      {activeTab === 'court' && <CourtCalculator />}
      {activeTab === 'subscription' && <SubscriptionCalculator />}
      {activeTab === 'stock' && <StockCalculator />}
      {activeTab === 'health' && <HealthCalculator />}
      {activeTab === 'isa' && <IsaCalculator />}
      {activeTab === 'yearend' && <YearEndCalculator />}
      <div className="ad-placeholder">
        📢 광고 영역 (Google AdSense 연동 시 여기에 광고가 표시됩니다)
      </div>
      <footer>
        <p>© 2025 재테크 계산기 · 본 계산 결과는 참고용이며 실제와 다를 수 있습니다.</p>
        <p style={{marginTop:8}}>
          <button onClick={() => setPage('privacy')} style={{background:'none',border:'none',color:'#718096',cursor:'pointer',textDecoration:'underline',fontSize:'0.82rem'}}>
            개인정보처리방침
          </button>
        </p>
      </footer>
    </div>
  );
}