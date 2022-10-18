import {
  Input,
  Spinner,
  Textarea,
  extendTheme,
  type ThemeConfig,
} from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode('#f8f8f8', '#111')(props),
    },
  }),
}

const shadows = {
  outline: '0 0 0 3px #075E54',
}

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

Spinner.defaultProps = {
  ...Spinner.defaultProps,
  size: 'sm',
  speed: '0.6s',
  thickness: '4px',
  color: '#075E54',
}

Input.defaultProps = {
  ...Input.defaultProps,
  variant: 'filled',
  focusBorderColor: '#075E54',
}

Textarea.defaultProps = {
  ...Textarea.defaultProps,
  variant: 'filled',
  focusBorderColor: '#075E54',
}

const theme = extendTheme({ config, styles, shadows })
export default theme
