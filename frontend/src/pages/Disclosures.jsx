import React, { useState } from 'react';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';

const Disclosures = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* Updated Header to hide all nav links */}
      <Header openBookingModal={openBookingModal} hideLinks={true} />

      <main className="pt-28 lg:pt-36 pb-16 flex-grow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Disclosures
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Asset Kraft Investments Private Limited ("Asset Kraft") is an AMFI-registered Mutual Fund Distributor. We receive commission from Asset Management Companies (AMCs) for mutual fund business sourced under our own ARN code. The commission earned varies from fund house to fund house and from scheme to scheme.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              The table below shows the indicative trail commission rates received from various AMCs under different product categories. Actual commissions may vary slightly across schemes and share classes as per AMC-defined slabs and SEBI regulations.
            </p>
            <p className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">
              All rates are per annum, trail, and exclusive of GST.
            </p>
          </div>

          <div className="overflow-x-auto mb-12 rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-teal-50">
                  <th className="p-5 border-b border-slate-200 text-teal-800 font-bold w-2/3">
                    Fund Category
                  </th>
                  <th className="p-5 border-b border-slate-200 text-teal-800 font-bold w-1/3">
                    Trail commission per annum
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 text-slate-700">
                    <span className="block font-semibold mb-1">Equity Oriented Schemes</span>
                    <span className="text-sm text-slate-500">(Includes Arbitrage Funds, ELSS Funds, Index Funds, Thematic Funds, all Equity Funds and Equity oriented Hybrid Funds)</span>
                  </td>
                  <td className="p-5 text-slate-700 font-medium align-top">
                    0.15% to 1.45%
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 text-slate-700">
                    <span className="block font-semibold mb-1">Debt Oriented Schemes</span>
                    <span className="text-sm text-slate-500">(all debt schemes including Overnight, Liquid Funds)</span>
                  </td>
                  <td className="p-5 text-slate-700 font-medium align-top">
                    0.05% to 1.00%
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 text-slate-700">
                    <span className="block font-semibold mb-1">Gold ETF Funds</span>
                  </td>
                  <td className="p-5 text-slate-700 font-medium align-top">
                    0.20% to 1.45%
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 text-slate-700">
                    <span className="block font-semibold mb-1">International Funds</span>
                    <span className="text-sm text-slate-500">(Index, Fund of Funds)</span>
                  </td>
                  <td className="p-5 text-slate-700 font-medium align-top">
                    0.40% - 1.00%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-teal-600 inline-block">
              Notes on the rates disclosed above:
            </h2>
            <ul className="space-y-4 text-slate-600 list-disc list-outside ml-6 marker:text-teal-500 text-lg">
              <li className="pl-2">
                The rates refer to T-30 cities as defined by AMFI. Commission may be higher for inflows from B-30 cities, in line with prevailing AMFI/SEBI provisions and the applicable AMC policy.
              </li>
              <li className="pl-2">
                The rates are subject to change without prior notice, at the sole discretion of and as per the agreement between Asset Kraft Investments Private Limited and the respective AMCs.
              </li>
              <li className="pl-2">
                These rates apply to investments subscribed into Regular / Distributor Plans only. No upfront commission is paid to or received by Asset Kraft.
              </li>
              <li className="pl-2">
                Scheme-level commission details for any specific scheme are available with your Relationship Manager and will be provided on request. For all details check this <a href="https://docs.google.com/spreadsheets/d/1qEN93yuSAl7Gg2qpoPgJvIdb0T9x8Pj5/edit?gid=1445722640#gid=1445722640" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2 break-all">link.</a>
              </li>
              <li className="pl-2">
                This information is compiled on a best-effort basis and is updated as and when revised rates are received from the AMCs. Investors are advised to check this page before investing.
              </li>
              <li className="pl-2">
                Actual commission for a given investment depends on the AMC, scheme category, holding period, investor location (T-30/B-30) and any revisions to the AMC's trail structure.
              </li>
              <li className="pl-2">
                You can view the gross commission earned by Asset Kraft Investments Private Limited in any financial year on the AMFI website: <a href="https://www.amfiindia.com/commission-disclosure" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 font-medium underline underline-offset-2 break-all">https://www.amfiindia.com/commission-disclosure</a>
              </li>
              <li className="pl-2">
                The commission actually paid to your distributor on your own folios is also reflected in the Consolidated Account Statement (CAS) issued to you by CAMS / KFintech.
              </li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-teal-600 inline-block">
              Key Disclosures
            </h2>
            <ul className="space-y-4 text-slate-600 list-disc list-outside ml-6 marker:text-teal-500 text-lg">
              <li className="pl-2">
                Asset Kraft Investments Private Limited receives trail commission only. We do not accept upfront commission or one-time payments from any AMC.
              </li>
              <li className="pl-2">
                Asset Kraft is not an associate, group company or sponsor of any AMC or Mutual Fund.
              </li>
              <li className="pl-2">
                We do not accept any gift, incentive trip, or non-cash benefit from any AMC that could give rise to a conflict of interest.
              </li>
              <li className="pl-2">
                Our scheme recommendations are based on objective criteria — suitability to the investor's goals, risk profile and time horizon — and are not influenced by the commission payable on a scheme.
              </li>
              <li className="pl-2">
                We are an AMFI-registered Mutual Fund Distributor and not a SEBI-Registered Investment Adviser. We provide incidental advice in the course of distribution and do not charge any advisory fee to our clients. For formal investment advice, please consult a SEBI-Registered Investment Adviser.
              </li>
              <li className="pl-2">
                Disclosure of commission earnings is also made to clients at the time of investment.
              </li>
            </ul>
          </div>

          {/* Important Links Section */}
          <div className="w-full">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-teal-600 inline-block">
              Important Links
            </h2>
            {/* Grid ensures 3 equal-width columns on md+ screens spanning the full max-w-6xl container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 w-full">
              <a 
                href="https://www.sebi.gov.in/filings/mutual-funds.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center bg-teal-50 hover:bg-teal-600 text-teal-700 hover:text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 border border-teal-200 hover:border-teal-600 shadow-sm text-center"
              >
                Offer Documents
              </a>
              <a 
                href="https://scores.sebi.gov.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center bg-teal-50 hover:bg-teal-600 text-teal-700 hover:text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 border border-teal-200 hover:border-teal-600 shadow-sm text-center"
              >
                SEBI SCORES Portal
              </a>
              <a 
                href="https://www.amfiindia.com/research-information/commission-disclosure" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center bg-teal-50 hover:bg-teal-600 text-teal-700 hover:text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 border border-teal-200 hover:border-teal-600 shadow-sm text-center"
              >
                Commission Disclosure
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={closeBookingModal} 
      />
    </div>
  );
};

export default Disclosures;