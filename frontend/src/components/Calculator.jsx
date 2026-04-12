import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, TrendingUp, IndianRupee, Calendar, GraduationCap, Heart, Home as HomeIcon, Car } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { calculateSIP, calculateLumpsum } from '../data/mock';

const CURRENT_YEAR = new Date().getFullYear();

const GOALS = {
  education: {
    label: 'Education',
    icon: GraduationCap,
    field1Label: 'Child Age (Years)',
    field1Default: 5,
    field1Min: 0,
    field1Max: 17,
    corpusLabel: "Target Corpus (₹)",
    summaryLabel: 'Education Corpus',
    periodFn: (v) => Math.max(0, 18 - v),
    hintFn: (v) => {
      const y = Math.max(0, 18 - v);
      if (y <= 0) return { text: '⚠️ Child must be under 18.', warn: true };
      return { text: `Period: ${y} years`, warn: false };
    },
    validate: (v) => (v < 0 || v >= 18) ? 'Age must be 0-17.' : null
  },
  marriage: {
    label: 'Marriage',
    icon: Heart,
    field1Label: 'Target Year',
    field1Default: CURRENT_YEAR + 5,
    field1Min: CURRENT_YEAR + 1,
    field1Max: CURRENT_YEAR + 60,
    corpusLabel: 'Target Corpus (₹)',
    summaryLabel: 'Marriage Corpus',
    periodFn: (v) => Math.max(0, v - CURRENT_YEAR),
    hintFn: (v) => {
      const y = Math.max(0, v - CURRENT_YEAR);
      if (y <= 0) return { text: `⚠️ Use year > ${CURRENT_YEAR}.`, warn: true };
      return { text: `Period: ${y} years`, warn: false };
    },
    validate: (v) => (v <= CURRENT_YEAR) ? `Year must be after ${CURRENT_YEAR}.` : null
  },
  house: {
    label: 'House',
    icon: HomeIcon,
    field1Label: 'Target Year',
    field1Default: CURRENT_YEAR + 10,
    field1Min: CURRENT_YEAR + 1,
    field1Max: CURRENT_YEAR + 60,
    corpusLabel: 'Target Corpus (₹)',
    summaryLabel: 'House Corpus',
    periodFn: (v) => Math.max(0, v - CURRENT_YEAR),
    hintFn: (v) => {
      const y = Math.max(0, v - CURRENT_YEAR);
      if (y <= 0) return { text: `⚠️ Use year > ${CURRENT_YEAR}.`, warn: true };
      return { text: `Period: ${y} years`, warn: false };
    },
    validate: (v) => (v <= CURRENT_YEAR) ? `Year must be after ${CURRENT_YEAR}.` : null
  },
  car: {
    label: 'Car',
    icon: Car,
    field1Label: 'Target Year',
    field1Default: CURRENT_YEAR + 5,
    field1Min: CURRENT_YEAR + 1,
    field1Max: CURRENT_YEAR + 60,
    corpusLabel: 'Target Corpus (₹)',
    summaryLabel: 'Car Corpus',
    periodFn: (v) => Math.max(0, v - CURRENT_YEAR),
    hintFn: (v) => {
      const y = Math.max(0, v - CURRENT_YEAR);
      if (y <= 0) return { text: `⚠️ Use year > ${CURRENT_YEAR}.`, warn: true };
      return { text: `Period: ${y} years`, warn: false };
    },
    validate: (v) => (v <= CURRENT_YEAR) ? `Year must be after ${CURRENT_YEAR}.` : null
  }
};

const Calculator = () => {
  const [sipValues, setSipValues] = useState({
    monthlyInvestment: 5000,
    expectedReturn: 12,
    timePeriod: 10
  });

  const [lumpsumValues, setLumpsumValues] = useState({
    investment: 100000,
    expectedReturn: 12,
    timePeriod: 10
  });

  const [selectedGoal, setSelectedGoal] = useState('education');
  const [goalValues, setGoalValues] = useState({
    field1: GOALS.education.field1Default,
    corpus: 2000000,
    rate: 12
  });
  const [goalHint, setGoalHint] = useState({ text: '', warn: false });

  const [sipResult, setSipResult] = useState(null);
  const [lumpsumResult, setLumpsumResult] = useState(null);
  const [goalResult, setGoalResult] = useState(null);

  useEffect(() => {
    handleSIPCalculate();
  }, []);

  useEffect(() => {
    const goal = GOALS[selectedGoal];
    setGoalValues({
      field1: goal.field1Default,
      corpus: 2000000,
      rate: 12
    });
    updateGoalHint(goal.field1Default);
    setGoalResult(null);
  }, [selectedGoal]);

  const updateGoalHint = (value) => {
    const goal = GOALS[selectedGoal];
    const hint = goal.hintFn(value);
    setGoalHint(hint);
  };

  const reverseSIP = (futureValue, rate, years) => {
    const r = rate / 100 / 12;
    const n = years * 12;
    if (n <= 0) return 0;
    if (r === 0) return futureValue / n;
    return futureValue * r / ((Math.pow(1 + r, n) - 1) * (1 + r));
  };

  const handleSIPCalculate = () => {
    const result = calculateSIP(
      sipValues.monthlyInvestment,
      sipValues.expectedReturn,
      sipValues.timePeriod
    );
    setSipResult(result);
  };

  const handleLumpsumCalculate = () => {
    const result = calculateLumpsum(
      lumpsumValues.investment,
      lumpsumValues.expectedReturn,
      lumpsumValues.timePeriod
    );
    setLumpsumResult(result);
  };

  const handleGoalCalculate = () => {
    const goal = GOALS[selectedGoal];
    const error = goal.validate(goalValues.field1);
    if (error) { alert(error); return; }
    const years = goal.periodFn(goalValues.field1);
    if (years <= 0) { alert('Investment period must be at least 1 year.'); return; }
    if (goalValues.corpus <= 0) { alert('Please enter a valid corpus amount.'); return; }
    const monthlyRequired = reverseSIP(goalValues.corpus, goalValues.rate, years);
    setGoalResult({
      corpus: goalValues.corpus,
      years: years,
      monthlyRequired: Math.round(monthlyRequired)
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const currentGoal = GOALS[selectedGoal];
  const GoalIcon = currentGoal.icon;

  return (
    <section id="calculator" className="pt-4 pb-12 lg:pt-10 lg:pb-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-2 bg-teal-100 rounded-full px-3 py-1 lg:px-4 lg:py-2 mb-3 lg:mb-4">
            <CalcIcon className="text-teal-600" size={16} />
            <span className="text-teal-700 text-xs lg:text-sm font-semibold">Financial Tools</span>
          </div>
          <h2 className="text-2xl lg:text-4xl font-bold text-slate-900 mb-2 lg:mb-4">
            Investment <span className="text-teal-600">Calculator</span>
          </h2>
          <p className="text-sm lg:text-lg text-slate-600 max-w-2xl mx-auto">
            Plan your financial future with our easy-to-use investment calculators
          </p>
        </div>

        {/* Calculator Tabs */}
        <Card className="shadow-xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-yellow-50 border-b p-4 lg:p-6">
            <CardTitle className="text-xl lg:text-2xl">Calculate Your Returns</CardTitle>
            <CardDescription className="text-xs lg:text-sm">SIP, Lumpsum, or Goal Planner</CardDescription>
          </CardHeader>
          <CardContent className="p-4 lg:p-8">
            <Tabs defaultValue="sip" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 lg:mb-8 bg-slate-100/50 p-1">
                <TabsTrigger value="sip" className="text-[10px] sm:text-sm lg:text-lg py-2">SIP</TabsTrigger>
                <TabsTrigger value="lumpsum" className="text-[10px] sm:text-sm lg:text-lg py-2">Lumpsum</TabsTrigger>
                <TabsTrigger value="goal" className="text-[10px] sm:text-sm lg:text-lg py-2">Goal</TabsTrigger>
              </TabsList>

              {/* SIP Calculator */}
              <TabsContent value="sip" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                  <div className="space-y-4 lg:space-y-6">
                    <div>
                      <Label htmlFor="sip-monthly" className="text-xs lg:text-base font-semibold text-slate-700 mb-1 lg:mb-2 block">
                        Monthly Investment (₹)
                      </Label>
                      <Input
                        id="sip-monthly"
                        type="number"
                        value={sipValues.monthlyInvestment}
                        onChange={(e) => setSipValues({...sipValues, monthlyInvestment: Number(e.target.value)})}
                        className="text-sm lg:text-lg h-10 lg:h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sip-return" className="text-xs lg:text-base font-semibold text-slate-700 mb-1 lg:mb-2 block">
                        Expected Return (% p.a.)
                      </Label>
                      <Input
                        id="sip-return"
                        type="number"
                        value={sipValues.expectedReturn}
                        onChange={(e) => setSipValues({...sipValues, expectedReturn: Number(e.target.value)})}
                        className="text-sm lg:text-lg h-10 lg:h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sip-period" className="text-xs lg:text-base font-semibold text-slate-700 mb-1 lg:mb-2 block">
                        Time Period (Years)
                      </Label>
                      <Input
                        id="sip-period"
                        type="number"
                        value={sipValues.timePeriod}
                        onChange={(e) => setSipValues({...sipValues, timePeriod: Number(e.target.value)})}
                        className="text-sm lg:text-lg h-10 lg:h-12"
                      />
                    </div>
                    <Button onClick={handleSIPCalculate} className="w-full bg-teal-600 hover:bg-teal-700 text-white h-10 lg:h-12 text-sm lg:text-lg">
                      Calculate
                    </Button>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-yellow-50 rounded-xl p-4 lg:p-8 border border-teal-200">
                    {sipResult ? (
                      <div className="space-y-4 lg:space-y-6">
                        <h3 className="text-lg lg:text-2xl font-bold text-slate-900 mb-2">Summary</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 lg:p-4 bg-white rounded-lg">
                            <span className="text-[10px] lg:text-base text-slate-600 font-medium">Total Invested</span>
                            <span className="text-sm lg:text-xl font-bold">{formatCurrency(sipResult.totalInvestment)}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 lg:p-4 bg-white rounded-lg">
                            <span className="text-[10px] lg:text-base text-slate-600 font-medium">Est. Returns</span>
                            <span className="text-sm lg:text-xl font-bold text-yellow-600">{formatCurrency(sipResult.estimatedReturns)}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 lg:p-4 bg-teal-600 text-white rounded-lg shadow-md">
                            <span className="text-xs lg:text-base font-medium">Total Value</span>
                            <span className="text-base lg:text-2xl font-bold">{formatCurrency(sipResult.totalValue)}</span>
                          </div>
                        </div>
                      </div>
                    ) : <ResultPlaceholder Icon={CalcIcon} />}
                  </div>
                </div>
              </TabsContent>

              {/* Lumpsum Calculator */}
              <TabsContent value="lumpsum" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                  <div className="space-y-4 lg:space-y-6">
                    <div>
                      <Label htmlFor="lumpsum-amount" className="text-xs lg:text-base font-semibold text-slate-700 mb-1 lg:mb-2 block">
                        Investment Amount (₹)
                      </Label>
                      <Input
                        id="lumpsum-amount"
                        type="number"
                        value={lumpsumValues.investment}
                        onChange={(e) => setLumpsumValues({...lumpsumValues, investment: Number(e.target.value)})}
                        className="text-sm lg:text-lg h-10 lg:h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lumpsum-return" className="text-xs lg:text-base font-semibold text-slate-700 mb-1 lg:mb-2 block">
                        Expected Return (% p.a.)
                      </Label>
                      <Input
                        id="lumpsum-return"
                        type="number"
                        value={lumpsumValues.expectedReturn}
                        onChange={(e) => setLumpsumValues({...lumpsumValues, expectedReturn: Number(e.target.value)})}
                        className="text-sm lg:text-lg h-10 lg:h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lumpsum-period" className="text-xs lg:text-base font-semibold text-slate-700 mb-1 lg:mb-2 block">
                        Time Period (Years)
                      </Label>
                      <Input
                        id="lumpsum-period"
                        type="number"
                        value={lumpsumValues.timePeriod}
                        onChange={(e) => setLumpsumValues({...lumpsumValues, timePeriod: Number(e.target.value)})}
                        className="text-sm lg:text-lg h-10 lg:h-12"
                      />
                    </div>
                    <Button onClick={handleLumpsumCalculate} className="w-full bg-teal-600 hover:bg-teal-700 text-white h-10 lg:h-12 text-sm lg:text-lg">
                      Calculate
                    </Button>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-yellow-50 rounded-xl p-4 lg:p-8 border border-teal-200">
                    {lumpsumResult ? (
                      <div className="space-y-4 lg:space-y-6">
                        <h3 className="text-lg lg:text-2xl font-bold text-slate-900 mb-2">Summary</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 lg:p-4 bg-white rounded-lg">
                            <span className="text-[10px] lg:text-base text-slate-600 font-medium">Total Invested</span>
                            <span className="text-sm lg:text-xl font-bold">{formatCurrency(lumpsumResult.totalInvestment)}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 lg:p-4 bg-white rounded-lg">
                            <span className="text-[10px] lg:text-base text-slate-600 font-medium">Est. Returns</span>
                            <span className="text-sm lg:text-xl font-bold text-yellow-600">{formatCurrency(lumpsumResult.estimatedReturns)}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 lg:p-4 bg-teal-600 text-white rounded-lg shadow-md">
                            <span className="text-xs lg:text-base font-medium">Total Value</span>
                            <span className="text-base lg:text-2xl font-bold">{formatCurrency(lumpsumResult.totalValue)}</span>
                          </div>
                        </div>
                      </div>
                    ) : <ResultPlaceholder Icon={CalcIcon} />}
                  </div>
                </div>
              </TabsContent>

              {/* Goal Planner */}
              <TabsContent value="goal" className="space-y-6">
                <div className="flex gap-2 flex-wrap mb-4">
                  {Object.entries(GOALS).map(([key, goal]) => {
                    const Icon = goal.icon;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedGoal(key)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 lg:px-5 lg:py-3 rounded-full text-[10px] lg:text-sm font-semibold transition-all ${
                          selectedGoal === key ? 'bg-teal-600 text-white shadow-lg' : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        <Icon size={14} />
                        {goal.label}
                      </button>
                    );
                  })}
                </div>

                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                  <div className="space-y-4 lg:space-y-6">
                    <div>
                      <Label htmlFor="goal-field1" className="text-xs lg:text-base font-semibold text-slate-700 mb-1 lg:mb-2 block">
                        {currentGoal.field1Label}
                      </Label>
                      <Input
                        id="goal-field1"
                        type="number"
                        value={goalValues.field1}
                        min={currentGoal.field1Min}
                        max={currentGoal.field1Max}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setGoalValues({...goalValues, field1: val});
                          updateGoalHint(val);
                        }}
                        className="text-sm lg:text-lg h-10 lg:h-12"
                      />
                      <div className={`mt-1 text-[10px] lg:text-xs font-semibold ${goalHint.warn ? 'text-red-600' : 'text-teal-600'}`}>
                        {goalHint.text}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="goal-corpus" className="text-xs lg:text-base font-semibold text-slate-700 mb-1 lg:mb-2 block">
                        {currentGoal.corpusLabel}
                      </Label>
                      <Input
                        id="goal-corpus"
                        type="number"
                        value={goalValues.corpus}
                        onChange={(e) => setGoalValues({...goalValues, corpus: Number(e.target.value)})}
                        className="text-sm lg:text-lg h-10 lg:h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="goal-rate" className="text-xs lg:text-base font-semibold text-slate-700 mb-1 lg:mb-2 block">
                        Expected Return (%)
                      </Label>
                      <Input
                        id="goal-rate"
                        type="number"
                        value={goalValues.rate}
                        onChange={(e) => setGoalValues({...goalValues, rate: Number(e.target.value)})}
                        className="text-sm lg:text-lg h-10 lg:h-12"
                      />
                    </div>
                    <Button onClick={handleGoalCalculate} className="w-full bg-teal-600 hover:bg-teal-700 text-white h-10 lg:h-12 text-sm lg:text-lg">
                      Calculate
                    </Button>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-yellow-50 rounded-xl p-4 lg:p-8 border border-teal-200">
                    {goalResult ? (
                      <div className="space-y-4 lg:space-y-6">
                        <h3 className="text-lg lg:text-2xl font-bold text-slate-900 mb-2">Goal Summary</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 lg:p-4 bg-white rounded-lg">
                            <span className="text-[10px] lg:text-base text-slate-600 font-medium">Target Amount</span>
                            <span className="text-sm lg:text-xl font-bold">{formatCurrency(goalResult.corpus)}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 lg:p-4 bg-white rounded-lg">
                            <span className="text-[10px] lg:text-base text-slate-600 font-medium">Period</span>
                            <span className="text-sm lg:text-xl font-bold text-yellow-600">{goalResult.years} yrs</span>
                          </div>
                          <div className="flex flex-col gap-1 p-3 lg:p-4 bg-teal-600 text-white rounded-lg shadow-md">
                            <span className="text-[10px] lg:text-sm font-medium">Monthly SIP Required</span>
                            <span className="text-base lg:text-2xl font-bold">{formatCurrency(goalResult.monthlyRequired)}</span>
                          </div>
                        </div>
                      </div>
                    ) : <ResultPlaceholder Icon={GoalIcon} />}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

const ResultPlaceholder = ({ Icon }) => (
  <div className="flex flex-col items-center justify-center h-full text-center py-8 lg:py-0">
    <Icon className="text-teal-600 mb-2 lg:mb-4 opacity-20" size={32} lg={48} />
    <p className="text-slate-500 text-xs lg:text-lg">
      Enter details to see results
    </p>
  </div>
);

export default Calculator;