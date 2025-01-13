import { useState } from "react";
import IncomeStatement from "./incomeStatement";

function Table() {
  const [yearRange, setYearRange] = useState({ start: 2020, end: 2024 });
  const [revenueRange, setRevenueRange] = useState({
    min: 0,
    max: 999999999999,
  });
  const [netIncomeRange, setNetIncomeRange] = useState({
    min: 0,
    max: 999999999999,
  });
  const [tempYearRange, setTempYearRange] = useState(yearRange);
  const [tempRevenueRange, setTempRevenueRange] = useState(revenueRange);
  const [tempNetIncomeRange, setTempNetIncomeRange] = useState(netIncomeRange);
  const [sortOrder, setSortOrder] = useState("Date (Descending)");
  const { data, isLoading, error } = IncomeStatement();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error Fetching Income Statements</h1>;
  }

  const confirmFilters = () => {
    if (Number.isNaN(tempYearRange.start)) {
      tempYearRange.start = 0;
    }
    if (Number.isNaN(tempYearRange.end)) {
      tempYearRange.end = 2024;
    }
    if (Number.isNaN(tempRevenueRange.min)) {
      tempRevenueRange.min = 0;
    }
    if (Number.isNaN(tempRevenueRange.max)) {
      tempRevenueRange.max = 999999999999;
    }
    if (Number.isNaN(tempNetIncomeRange.min)) {
      tempNetIncomeRange.min = 0;
    }
    if (Number.isNaN(tempNetIncomeRange.max)) {
      tempNetIncomeRange.max = 999999999999;
    }
    setYearRange(tempYearRange);
    setRevenueRange(tempRevenueRange);
    setNetIncomeRange(tempNetIncomeRange);
  };

  const filter = data.filter((statement: any) => {
    const year = new Date(statement.date).getFullYear();
    return (
      year >= yearRange.start &&
      year <= yearRange.end &&
      statement.revenue >= revenueRange.min &&
      statement.revenue <= revenueRange.max &&
      statement.netIncome >= netIncomeRange.min &&
      statement.netIncome <= netIncomeRange.max
    );
  });

  const sortedTable = filter.sort((statementA: any, statementB: any) => {
    switch (sortOrder) {
      case "dateD":
        return (
          new Date(statementB.date).getFullYear() -
          new Date(statementA.date).getFullYear()
        );
      case "dateA":
        return (
          new Date(statementA.date).getFullYear() -
          new Date(statementB.date).getFullYear()
        );
      case "revD":
        return statementB.revenue - statementA.revenue;
      case "revA":
        return statementA.revenue - statementB.revenue;
      case "netD":
        return statementB.netIncome - statementA.netIncome;
      case "netA":
        return statementA.netIncome - statementB.netIncome;
    }
  });

  return (
    <>
      <h1 className="p-8">AAPL Income Statements</h1>
      <div className="flex flex-row flex-wrap justify-center justify-items-center">
        <div className="justify-center inline-flex">
          <input
            className="interactive w-32"
            type="number"
            placeholder="Start Year"
            onChange={(e) =>
              setTempYearRange({
                ...tempYearRange,
                start: parseInt(e.target.value),
              })
            }
          />
          <p className="text-5xl align-middle">-</p>
          <input
            className="interactive w-32"
            type="number"
            placeholder="End Year"
            onChange={(e) =>
              setTempYearRange({
                ...tempYearRange,
                end: parseInt(e.target.value),
              })
            }
          />
        </div>
        <div className="justify-center inline-flex">
          <input
            className="interactive"
            type="number"
            placeholder="Minimum Revenue"
            onChange={(e) =>
              setTempRevenueRange({
                ...tempRevenueRange,
                min: parseInt(e.target.value),
              })
            }
          />
          <p className="text-5xl align-middle">-</p>
          <input
            className="interactive"
            type="number"
            placeholder="Maximum Revenue"
            onChange={(e) =>
              setTempRevenueRange({
                ...tempRevenueRange,
                max: parseInt(e.target.value),
              })
            }
          />
        </div>
        <div className="justify-center inline-flex">
          <input
            className="interactive"
            type="number"
            placeholder="Minimum Net Income"
            onChange={(e) =>
              setTempNetIncomeRange({
                ...tempNetIncomeRange,
                min: parseInt(e.target.value),
              })
            }
          />
          <p className="text-5xl align-middle">-</p>
          <input
            className="interactive"
            type="number"
            placeholder="Maximum Net Income"
            onChange={(e) =>
              setTempNetIncomeRange({
                ...tempNetIncomeRange,
                max: parseInt(e.target.value),
              })
            }
          />
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <button className="interactive w-24" onClick={confirmFilters}>
          Filter
        </button>
        <select
          className="interactive"
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option value="dateD">Date (Descending)</option>
          <option value="dateA">Date (Ascending)</option>
          <option value="revD">Total Revenue (Descending)</option>
          <option value="revA">Total Revenue (Ascending)</option>
          <option value="netD">Net Income (Descending)</option>
          <option value="netA">Net Income (Ascending)</option>
        </select>
      </div>
      <div className="justify-items-center">
        <table className="table-auto border-collapse border-2 border-black w-auto">
          <thead>
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Total Revenue</th>
              <th className="border p-2">Net Income</th>
              <th className="border p-2">Gross Profit</th>
              <th className="border p-2">EPS (Earnings Per Share)</th>
              <th className="border p-2">Operating Income</th>
            </tr>
          </thead>
          <tbody>
            {sortedTable.map((statement: any, index: any) => (
              <tr key={index}>
                <td className="border p-2">{statement.date}</td>
                <td className="border p-2">
                  {statement.revenue.toLocaleString()}
                </td>
                <td className="border p-2">
                  {statement.netIncome.toLocaleString()}
                </td>
                <td className="border p-2">
                  {statement.grossProfit.toLocaleString()}
                </td>
                <td className="border p-2">{statement.eps}</td>
                <td className="border p-2">
                  {statement.operatingIncome.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Values in USD</p>
      </div>
    </>
  );
}

export default Table;
