import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, TrendingUp, DollarSign, Calendar, GraduationCap, Heart, Home as HomeIcon, Car } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { calculateSIP, calculateLumpsum } from '../data/mock';

const CURRENT_YEAR = new Date().getFullYear();

const GOALS = {
  education: {
    label: 'Child Education',
    icon: GraduationCap,
    field1Label: 'How old is your child? (in years)',
    field1Default: 5,
    field1Min: 0,
    field1Max: 17,
    corpusLabel: "How much do you need for your kid's education? (₹)",
    summaryLabel: 'Education Corpus',
    periodFn: (v) => Math.max(0, 18 - v),
    hintFn: (v) => {
      const y = Math.max(0, 18 - v);
      if (y <= 0) return { text: '⚠️ Child must be under 18.', warn: true };
      return { text: `Investment period: ${y} year${y !== 1 ? 's' : ''} (until child turns 18)`, warn: false };
    },
    validate: (v) => (v < 0 || v >= 18) ? 'Child age must be between 0 and 17.' : null
  },
  marriage: {
    label: 'Marriage',
    icon: Heart,
    field1Label: 'Year of Marriage',
    field1Default: CURRENT_YEAR + 5,
    field1Min: CURRENT_YEAR + 1,
    field1Max: CURRENT_YEAR + 60,
    corpusLabel: 'How much do you want for marriage? (₹)',
    summaryLabel: 'Marriage Corpus',
    periodFn: (v) => Math.max(0, v - CURRENT_YEAR),
    hintFn: (v) => {
      const y = Math.max(0, v - CURRENT_YEAR);
      if (y <= 0) return { text: `⚠️ Choose year after ${CURRENT_YEAR}.`, warn: true };
      return { text: `Investment period: ${y} year${y !== 1 ? 's' : ''} (from now until ${v})`, warn: false };
    },
    validate: (v) => (v <= CURRENT_YEAR) ? `Target year must be after ${CURRENT_YEAR}.` : null
  },
  house: {
    label: 'Buy House',
    icon: HomeIcon,
    field1Label: 'When do you plan to buy house? (Year)',
    field1Default: CURRENT_YEAR + 10,
    field1Min: CURRENT_YEAR + 1,
    field1Max: CURRENT_YEAR + 60,
    corpusLabel: 'How much do you need for house? (₹)',
    summaryLabel: 'House Corpus',
    periodFn: (v) => Math.max(0, v - CURRENT_YEAR),
    hintFn: (v) => {
      const y = Math.max(0, v - CURRENT_YEAR);
      if (y <= 0) return { text: `⚠️ Choose year after ${CURRENT_YEAR}.`, warn: true };
      return { text: `Investment period: ${y} year${y !== 1 ? 's' : ''} (from now until ${v})`, warn: false };
    },
    validate: (v) => (v <= CURRENT_YEAR) ? `Target year must be after ${CURRENT_YEAR}.` : null
  },
  car: {
    label: 'Buy Car',
    icon: Car,
    field1Label: 'When do you want to buy car? (Year)',
    field1Default: CURRENT_YEAR + 5,
    field1Min: CURRENT_YEAR + 1,
    field1Max: CURRENT_YEAR + 60,
    corpusLabel: 'How much do you need for car? (₹)',
    summaryLabel: 'Car Corpus',
    periodFn: (v) => Math.max(0, v - CURRENT_YEAR),
    hintFn: (v) => {
      const y = Math.max(0, v - CURRENT_YEAR);
      if (y <= 0) return { text: `⚠️ Choose year after ${CURRENT_YEAR}.`, warn: true };
      return { text: `Investment period: ${y} year${y !== 1 ? 's' : ''} (from now until ${v})`, warn: false };
    },
    validate: (v) => (v <= CURRENT_YEAR) ? `Target year must be after ${CURRENT_YEAR}.` : null
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
    
    if (error) {
      alert(error);
      return;
    }

    const years = goal.periodFn(goalValues.field1);
    
    if (years <= 0) {
      alert('Investment period must be at least 1 year.');
      return;
    }

    if (goalValues.corpus <= 0) {
      alert('Please enter a valid corpus amount.');
      return;
    }

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
    <section id="calculator" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-teal-100 rounded-full px-4 py-2 mb-4">
            <CalcIcon className="text-teal-600" size={20} />
            <span className="text-teal-700 font-semibold">Financial Tools</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Investment <span className="text-teal-600">Calculator</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Plan your financial future with our easy-to-use investment calculators
          </p>
        </div>

        {/* Calculator Tabs */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-yellow-50 border-b">
            <CardTitle className="text-2xl">Calculate Your Returns</CardTitle>
            <CardDescription>Choose between SIP, Lumpsum, or plan for a life goal</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <Tabs defaultValue="sip" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="sip" className="text-lg">SIP Calculator</TabsTrigger>
                <TabsTrigger value="lumpsum" className="text-lg">Lumpsum Calculator</TabsTrigger>
                <TabsTrigger value="goal" className="text-lg">🎯 Goal Planner</TabsTrigger>
              </TabsList>

              {/* SIP Calculator */}
              <TabsContent value="sip" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Input Section */}
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="sip-monthly" className="text-base font-semibold text-slate-700 mb-2 block">
                        Monthly Investment (₹)
                      </Label>
                      <Input
                        id="sip-monthly"
                        type="number"
                        value={sipValues.monthlyInvestment}
                        onChange={(e) => setSipValues({...sipValues, monthlyInvestment: Number(e.target.value)})}
                        className="text-lg h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="sip-return" className="text-base font-semibold text-slate-700 mb-2 block">
                        Expected Return (% p.a.)
                      </Label>
                      <Input
                        id="sip-return"
                        type="number"
                        value={sipValues.expectedReturn}
                        onChange={(e) => setSipValues({...sipValues, expectedReturn: Number(e.target.value)})}
                        className="text-lg h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="sip-period" className="text-base font-semibold text-slate-700 mb-2 block">
                        Time Period (Years)
                      </Label>
                      <Input
                        id="sip-period"
                        type="number"
                        value={sipValues.timePeriod}
                        onChange={(e) => setSipValues({...sipValues, timePeriod: Number(e.target.value)})}
                        className="text-lg h-12"
                      />
                    </div>

                    <Button 
                      onClick={handleSIPCalculate}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 text-lg"
                    >
                      Calculate SIP Returns
                    </Button>
                  </div>

                  {/* Results Section */}
                  <div className="bg-gradient-to-br from-teal-50 to-yellow-50 rounded-2xl p-8 border border-teal-200">
                    {sipResult ? (
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Your Investment Summary</h3>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                            <div className="flex items-center gap-3">
                              <DollarSign className="text-teal-600" size={24} />
                              <span className="text-slate-700 font-medium">Total Investment</span>
                            </div>
                            <span className="text-xl font-bold text-slate-900">
                              {formatCurrency(sipResult.totalInvestment)}
                            </span>
                          </div>

                          <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                            <div className="flex items-center gap-3">
                              <TrendingUp className="text-yellow-600" size={24} />
                              <span className="text-slate-700 font-medium">Estimated Returns</span>
                            </div>
                            <span className="text-xl font-bold text-yellow-600">
                              {formatCurrency(sipResult.estimatedReturns)}
                            </span>
                          </div>

                          <div className="flex justify-between items-center p-4 bg-teal-600 text-white rounded-xl shadow-lg">
                            <div className="flex items-center gap-3">
                              <CalcIcon size={24} />
                              <span className="font-medium">Total Value</span>
                            </div>
                            <span className="text-2xl font-bold">
                              {formatCurrency(sipResult.totalValue)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <CalcIcon className="text-teal-600 mb-4" size={48} />
                        <p className="text-slate-600 text-lg">
                          Enter your investment details and click calculate to see your potential returns
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Lumpsum Calculator */}
              <TabsContent value="lumpsum" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Input Section */}
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="lumpsum-amount" className="text-base font-semibold text-slate-700 mb-2 block">
                        Investment Amount (₹)
                      </Label>
                      <Input
                        id="lumpsum-amount"
                        type="number"
                        value={lumpsumValues.investment}
                        onChange={(e) => setLumpsumValues({...lumpsumValues, investment: Number(e.target.value)})}
                        className="text-lg h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="lumpsum-return" className="text-base font-semibold text-slate-700 mb-2 block">
                        Expected Return (% p.a.)
                      </Label>
                      <Input
                        id="lumpsum-return"
                        type="number"
                        value={lumpsumValues.expectedReturn}
                        onChange={(e) => setLumpsumValues({...lumpsumValues, expectedReturn: Number(e.target.value)})}
                        className="text-lg h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="lumpsum-period" className="text-base font-semibold text-slate-700 mb-2 block">
                        Time Period (Years)
                      </Label>
                      <Input
                        id="lumpsum-period"
                        type="number"
                        value={lumpsumValues.timePeriod}
                        onChange={(e) => setLumpsumValues({...lumpsumValues, timePeriod: Number(e.target.value)})}
                        className="text-lg h-12"
                      />
                    </div>

                    <Button 
                      onClick={handleLumpsumCalculate}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 text-lg"
                    >
                      Calculate Lumpsum Returns
                    </Button>
                  </div>

                  {/* Results Section */}
                  <div className="bg-gradient-to-br from-teal-50 to-yellow-50 rounded-2xl p-8 border border-teal-200">
                    {lumpsumResult ? (
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Your Investment Summary</h3>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                            <div className="flex items-center gap-3">
                              <DollarSign className="text-teal-600" size={24} />
                              <span className="text-slate-700 font-medium">Total Investment</span>
                            </div>
                            <span className="text-xl font-bold text-slate-900">
                              {formatCurrency(lumpsumResult.totalInvestment)}
                            </span>
                          </div>

                          <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                            <div className="flex items-center gap-3">
                              <TrendingUp className="text-yellow-600" size={24} />
                              <span className="text-slate-700 font-medium">Estimated Returns</span>
                            </div>
                            <span className="text-xl font-bold text-yellow-600">
                              {formatCurrency(lumpsumResult.estimatedReturns)}
                            </span>
                          </div>

                          <div className="flex justify-between items-center p-4 bg-teal-600 text-white rounded-xl shadow-lg">
                            <div className="flex items-center gap-3">
                              <CalcIcon size={24} />
                              <span className="font-medium">Total Value</span>
                            </div>
                            <span className="text-2xl font-bold">
                              {formatCurrency(lumpsumResult.totalValue)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <CalcIcon className="text-teal-600 mb-4" size={48} />
                        <p className="text-slate-600 text-lg">
                          Enter your investment details and click calculate to see your potential returns
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Goal Planner */}
              <TabsContent value="goal" className="space-y-6">
                {/* Goal Pills */}
                <div className="flex gap-3 flex-wrap mb-6">
                  {Object.entries(GOALS).map(([key, goal]) => {
                    const Icon = goal.icon;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedGoal(key)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-all duration-200 ${
                          selectedGoal === key
                            ? 'bg-teal-600 text-white shadow-lg'
                            : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-teal-300'
                        }`}
                      >
                        <Icon size={18} />
                        {goal.label}
                      </button>
                    );
                  })}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Input Section */}
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="goal-field1" className="text-base font-semibold text-slate-700 mb-2 block">
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
                        className="text-lg h-12"
                      />
                      <div className={`mt-2 text-sm font-semibold ${goalHint.warn ? 'text-red-600' : 'text-teal-600'}`}>
                        {goalHint.text}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="goal-corpus" className="text-base font-semibold text-slate-700 mb-2 block">
                        {currentGoal.corpusLabel}
                      </Label>
                      <Input
                        id="goal-corpus"
                        type="number"
                        value={goalValues.corpus}
                        onChange={(e) => setGoalValues({...goalValues, corpus: Number(e.target.value)})}
                        className="text-lg h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="goal-rate" className="text-base font-semibold text-slate-700 mb-2 block">
                        Expected Return (% p.a.)
                      </Label>
                      <Input
                        id="goal-rate"
                        type="number"
                        value={goalValues.rate}
                        onChange={(e) => setGoalValues({...goalValues, rate: Number(e.target.value)})}
                        className="text-lg h-12"
                      />
                    </div>

                    <Button 
                      onClick={handleGoalCalculate}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 text-lg"
                    >
                      Calculate Monthly SIP
                    </Button>
                  </div>

                  {/* Results Section */}
                  <div className="bg-gradient-to-br from-teal-50 to-yellow-50 rounded-2xl p-8 border border-teal-200">
                    {goalResult ? (
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Your Investment Summary</h3>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                            <div className="flex items-center gap-3">
                              <GoalIcon className="text-teal-600" size={24} />
                              <span className="text-slate-700 font-medium">{currentGoal.summaryLabel}</span>
                            </div>
                            <span className="text-xl font-bold text-slate-900">
                              {formatCurrency(goalResult.corpus)}
                            </span>
                          </div>

                          <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                            <div className="flex items-center gap-3">
                              <Calendar className="text-yellow-600" size={24} />
                              <span className="text-slate-700 font-medium">Investment Period</span>
                            </div>
                            <span className="text-xl font-bold text-yellow-600">
                              {goalResult.years} year{goalResult.years !== 1 ? 's' : ''}
                            </span>
                          </div>

                          <div className="flex justify-between items-center p-4 bg-teal-600 text-white rounded-xl shadow-lg">
                            <div className="flex items-center gap-3">
                              <DollarSign size={24} />
                              <span className="font-medium text-sm">Monthly Investment for {goalResult.years} years</span>
                            </div>
                            <span className="text-2xl font-bold">
                              {formatCurrency(goalResult.monthlyRequired)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <GoalIcon className="text-teal-600 mb-4" size={48} />
                        <p className="text-slate-600 text-lg">
                          Select your goal and enter details to calculate your monthly investment
                        </p>
                      </div>
                    )}
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

export default Calculator;
