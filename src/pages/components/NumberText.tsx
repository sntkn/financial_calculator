import { VFC } from 'react'
import { Text } from '@chakra-ui/react'

type NumberTextType = {
  num: number
  size?: string
}

export const NumberText: VFC<NumberTextType> = ({ num, size = 'lg' }) => (
  <Text as="span" fontSize={size} mx=".5em">
    {num.toLocaleString()}
  </Text>
)

export const ProfitAndLossText: VFC<NumberTextType> = ({ num, size = 'lg' }) =>
  num > 0 ? (
    <Text as="span" color="green" fontSize={size}>
      +{num.toLocaleString()}
    </Text>
  ) : (
    <Text as="span" color="red" fontSize={size}>
      {num.toLocaleString()}
    </Text>
  )
