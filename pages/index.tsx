import {
  Box,
  Link,
  Input,
  Stack,
  Image,
  Button,
  Center,
  Heading,
  Textarea,
  FormLabel,
  IconButton,
  FormControl,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  SunIcon,
  MoonIcon,
  ChatIcon,
  LinkIcon,
  PhoneIcon,
  ExternalLinkIcon,
} from '@chakra-ui/icons'
import Head from 'next/head'
import { NextPage } from 'next/types'
import { FormEvent, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Home: NextPage = () => {
  const [number, setNumber] = useState<string>()
  const [message, setMessage] = useState<string>()
  const [generate, setGenerate] = useState<boolean>(false)
  const { toggleColorMode } = useColorMode()
  const ThemeIcon = useColorModeValue(MoonIcon, SunIcon)

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (message && number) {
      setGenerate(true)
    } else {
      setGenerate(false)
    }
  }

  const handlePhoneChange = (value: string) => {
    setGenerate(false)
    setNumber(value)
  }

  const handleMessagePhoneChange = (value: string) => {
    setGenerate(false)
    setMessage(encodeURIComponent(value))
  }

  return (
    <>
      <Head>
        <title>WA ChatLink Generator</title>
      </Head>
      <Center>
        <Stack p={10} w="2xl">
          <form onSubmit={handleFormSubmit}>
            <Stack>
              <Stack
                mb={6}
                align="center"
                justify="space-between"
                direction="row"
              >
                <Stack direction="row" align="center">
                  <Image
                    alt="wa"
                    src="./wa.svg"
                    boxSize={{ base: 8, md: 10 }}
                  />
                  <Heading as="h2" size={{ base: 'md', sm: 'lg' }}>
                    ChatLink Generator
                  </Heading>
                </Stack>
                <IconButton
                  size="sm"
                  rounded="full"
                  aria-label="Theme"
                  icon={<ThemeIcon />}
                  onClick={toggleColorMode}
                />
              </Stack>
              <FormControl isRequired>
                <FormLabel>
                  <PhoneIcon boxSize={3} /> Phone number
                </FormLabel>
                <Input
                  type="number"
                  placeholder="+521234567890"
                  onChange={(e) => handlePhoneChange(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>
                  <ChatIcon boxSize={3} /> Message
                </FormLabel>
                <Textarea
                  height={140}
                  placeholder="The message you want to send"
                  onChange={(e) => handleMessagePhoneChange(e.target.value)}
                />
              </FormControl>
              <Button
                type="submit"
                variant="outline"
                rightIcon={<LinkIcon boxSize={3} />}
              >
                Generate link
              </Button>
            </Stack>
          </form>
          <AnimatePresence exitBeforeEnter initial={false}>
            <Box
              p={4}
              rounded="md"
              as={motion.div}
              borderWidth={1}
              exit={{ opacity: 0.2, y: -10, transition: { duration: 0.2 } }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
              initial={{ opacity: 0.2, y: -10 }}
              key={generate ? 'animate' : 'exit'}
              display={generate ? 'unset' : 'none'}
            >
              <Heading as="h6" size={{ base: 'sm', sm: 'md' }} mb={2}>
                Link:
              </Heading>
              <Link
                isExternal
                fontSize="sm"
                noOfLines={2}
                href={`https://wa.me/${number}?text=${message}`}
              >
                {`https://wa.me/${number}?text=${message}`}{' '}
                <ExternalLinkIcon mx="2px" />
              </Link>
            </Box>
          </AnimatePresence>
        </Stack>
      </Center>
    </>
  )
}

export default Home
