import React, { useState } from 'react';
import { Calculator as CalcIcon, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { calculateSIP, calculateLumpsum } from '../data/mock';

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

  const [sipResult, setSipResult] = useState(null);
  const [lumpsumResult, setLumpsumResult] = useState(null);

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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

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
            <CardDescription>Choose between SIP or Lumpsum investment</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <Tabs defaultValue="sip" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="sip" className="text-lg">SIP Calculator</TabsTrigger>
                <TabsTrigger value="lumpsum" className="text-lg">Lumpsum Calculator</TabsTrigger>
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
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Calculator;
