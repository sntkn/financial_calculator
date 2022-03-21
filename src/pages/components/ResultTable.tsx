import { VFC } from 'react'
import { Table, Tr, Td, Th } from '@chakra-ui/react'
import { ProfitAndLossText, NumberText } from './NumberText'

export const ResultTable: VFC<{ results: number[][] }> = ({ results }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th isNumeric>年数</Th>
          <Th isNumeric>積立</Th>
          <Th isNumeric>利益</Th>
          <Th isNumeric>総資産額</Th>
        </Tr>
      </thead>
      <tbody>
        {results.map((data, i) => (
          <Tr key={i}>
            <Td isNumeric>
              <NumberText num={i + 1} size="sm" />
            </Td>
            <Td isNumeric>
              <NumberText num={data[0]} size="sm" />
            </Td>
            <Td isNumeric>
              <ProfitAndLossText num={Math.floor(data[2])} size="sm" />
            </Td>
            <Td isNumeric>
              <NumberText num={Math.floor(data[1])} size="sm" />
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  )
}
