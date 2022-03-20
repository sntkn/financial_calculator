import { useEffect, useState } from 'react'
export const App = (): JSX.Element => {
  const [initialInvestment, setInitialInvestment] = useState(0)
  const handleInitialInvestment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialInvestment(Number(e.target.value))
  }

  const [monthlyInvestment, setMonthlyInvestment] = useState(0)
  const handleMonthlyInvestment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyInvestment(Number(e.target.value))
  }

  const [years, setYears] = useState(0)
  const handleYears = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYears(Number(e.target.value))
  }

  const [yields, setYields] = useState(0)
  const handleYields = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYields(Number(e.target.value))
  }

  const [profit, setProfit] = useState(0)
  const [totalReserves, setTotalReserves] = useState(0)

  const [totalAssets, setTotalAssets] = useState(0)
  useEffect(() => {
    const yearlyInvestment = monthlyInvestment * 12
    let total = initialInvestment
    let reserve = initialInvestment
    for (let index = 0; index < years; index++) {
      reserve += yearlyInvestment
      total += yearlyInvestment
      total *= yields / 100 + 1
    }
    const realTotalAssets = Math.floor(total * 10000)
    setTotalReserves(reserve * 10000)
    setTotalAssets(realTotalAssets)
    setProfit(realTotalAssets - reserve * 10000)
  }, [initialInvestment, monthlyInvestment, years, yields])

  const totalExcludedTax = () => totalAssets - profit + profit * 0.8

  return (
    <div>
      <div>
        <p>
          初期投資
          <input
            type="number"
            name="initialInvestment"
            value={initialInvestment}
            onChange={handleInitialInvestment}
          />
          万円で
        </p>
        <p>
          毎月
          <input
            type="number"
            name="monthlyInvestment"
            value={monthlyInvestment}
            onChange={handleMonthlyInvestment}
          />
          万円を積み立て、
        </p>
        <p>
          年利
          <input
            type="number"
            name="yields"
            value={yields}
            onChange={handleYields}
          />
          % で運用すると、
        </p>
        <p>
          <input
            type="number"
            name="years"
            value={years}
            onChange={handleYears}
          />
          年後に {totalAssets.toLocaleString()}
          円になります。
          <br />
          損益 {profit.toLocaleString()} 円で、 税引き後{' '}
          {Math.floor(totalExcludedTax()).toLocaleString()} 円になります。
          積立金額は{totalReserves.toLocaleString()}円です。
        </p>
      </div>
    </div>
  )
}
