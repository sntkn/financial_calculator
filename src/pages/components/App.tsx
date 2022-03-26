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
  Flex,
} from '@chakra-ui/react'
import { ProfitAndLossText, NumberText } from './NumberText'
import { ResultTable } from './ResultTable'

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
  const [yearlyResult, setYearlyResult] = useState<number[][]>([])

  useEffect(() => {
    let total = Number(initialInvestment)
    let reserve = Number(initialInvestment)
    const monthlyYields = Number(yields) / 12
    const results = []
    for (let index = 0; index < Number(years); index++) {
      for (let month = 0; month < 12; month++) {
        reserve += Number(monthlyInvestment)
        total += Number(monthlyInvestment)
        total *= Number(monthlyYields) / 100 + 1
      }
      results.push([reserve * 10000, total * 10000, (total - reserve) * 10000])
    }
    const realTotalAssets = Math.floor(total * 10000)
    setTotalReserves(reserve * 10000)
    setTotalAssets(realTotalAssets)
    setProfit(realTotalAssets - reserve * 10000)
    setYearlyResult(results)
  }, [initialInvestment, monthlyInvestment, years, yields])

  const totalExcludedTax = () => totalAssets - profit + profit * 0.8

  return (
    <Center>
      <Box my="10px" borderWidth="1px" borderRadius="lg" w="80%">
        <Heading
          as="h2"
          bgColor="gray.100"
          textAlign="center"
          p=".5em"
          fontSize="1.5em"
        >
          金融電卓
        </Heading>
        <Flex>
          <Box w="40%" mx="10px" p="10px">
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
            <Box
              p="10px"
              borderWidth="1px"
              borderRadius="lg"
              bgColor="gray.100"
            >
              <Text>{Number(years)} 年後</Text>
              <Text>
                総資産額
                <NumberText num={totalAssets} />
                円 (
                <ProfitAndLossText num={profit} />)
              </Text>
              <Text>
                税引き後
                <NumberText num={Math.floor(totalExcludedTax())} />円
              </Text>
              <Text>
                積立
                <NumberText num={totalReserves} />円
              </Text>
            </Box>
          </Box>
          <Box w="60%" mx="10px" p="10px">
            <ResultTable results={yearlyResult} />
          </Box>
        </Flex>
      </Box>
    </Center>
  )
}
