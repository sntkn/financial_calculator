import { useEffect, useState, VFC } from 'react'
import {
  Box,
  Input,
  InputGroup,
  Text,
  InputRightElement,
  Center,
  Divider,
  Heading,
} from '@chakra-ui/react'

export const App: VFC = () => {
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
  const ProfitAndLossText: VFC = () => {
    return profit > 0 ? (
      <Text as="span" color="green" fontSize="lg">
        +{profit.toLocaleString()}
      </Text>
    ) : (
      <Text as="span" color="red" fontSize="lg">
        {profit.toLocaleString()}
      </Text>
    )
  }
  const NumberText: VFC<{ num: number }> = ({ num }) => (
    <Text as="span" fontSize="lg" mx=".5em">
      {num.toLocaleString()}
    </Text>
  )

  return (
    <Center>
      <Box w="30%" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Heading bgColor="gray.100" textAlign="center" p=".5em" fontSize="2em">
          金融電卓
        </Heading>
        <Box p="1em">
          <Box mt="1em">
            <Text mb="8px">初期投資</Text>
            <InputGroup>
              <Input
                textAlign="right"
                name="initialInvestment"
                value={initialInvestment}
                onChange={handleInitialInvestment}
              />
              <InputRightElement>万円</InputRightElement>
            </InputGroup>
          </Box>
          <Box mt="1em">
            <Text mb="8px">毎月の積み立て</Text>
            <InputGroup>
              <Input
                textAlign="right"
                name="monthlyInvestment"
                value={monthlyInvestment}
                onChange={handleMonthlyInvestment}
              />
              <InputRightElement>万円</InputRightElement>
            </InputGroup>
          </Box>
          <Box mt="1em">
            <Text mb="8px">年利</Text>
            <InputGroup>
              <Input
                textAlign="right"
                name="yields"
                value={yields}
                onChange={handleYields}
              />
              <InputRightElement>％</InputRightElement>
            </InputGroup>
          </Box>
          <Box mt="1em">
            <Text mb="8px">運用年数</Text>
            <InputGroup>
              <Input
                textAlign="right"
                name="years"
                value={years}
                onChange={handleYears}
              />
              <InputRightElement>年</InputRightElement>
            </InputGroup>
          </Box>
          <Divider orientation="horizontal" my="2em" />
          <Text>{Number(years)} 年後</Text>
          <Text>
            総資産額
            <NumberText num={totalAssets} />
            円 (
            <ProfitAndLossText />) 円)
          </Text>
          <Text>
            税引き後
            <NumberText num={Math.floor(totalExcludedTax())} />
            円<br />
          </Text>
          <Text>
            積立
            <NumberText num={totalReserves} />円
          </Text>
        </Box>
      </Box>
    </Center>
  )
}
