import { useEffect, useState } from 'react'
export const App = (): JSX.Element => {
  const [initialInvestment, setInitialInvestment] = useState<string>('')
  const handleInitialInvestment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialInvestment(e.target.value)
  }

  const [monthlyInvestment, setMonthlyInvestment] = useState<string>('')
  const handleMonthlyInvestment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyInvestment(e.target.value)
  }

  const [yields, setYields] = useState<string>('')
  const handleYields = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYields(e.target.value)
  }

  const [years, setYears] = useState<string>('')
  const handleYears = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYears(e.target.value)
  }

  const [profit, setProfit] = useState(0)
  const [totalReserves, setTotalReserves] = useState(0)

  const [totalAssets, setTotalAssets] = useState(0)
  useEffect(() => {
    const yearlyInvestment = Number(monthlyInvestment) * 12
    let total = Number(initialInvestment)
    let reserve = Number(initialInvestment)
    for (let index = 0; index < Number(years); index++) {
      reserve += yearlyInvestment
      total += yearlyInvestment
      total *= Number(yields) / 100 + 1
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
            type="text"
            name="initialInvestment"
            value={initialInvestment}
            onChange={handleInitialInvestment}
          />
          万円で
        </p>
        <p>
          毎月
          <input
            type="text"
            name="monthlyInvestment"
            value={monthlyInvestment}
            onChange={handleMonthlyInvestment}
          />
          万円を積み立て、
        </p>
        <p>
          年利
          <input
            type="text"
            name="yields"
            value={yields}
            onChange={handleYields}
          />
          % で運用すると、
        </p>
        <p>
          <input
            type="text"
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
