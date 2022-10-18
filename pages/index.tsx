import {
  Link,
  Input,
  Stack,
  Button,
  Center,
  Heading,
  Textarea,
  FormLabel,
  FormControl,
  useColorMode,
} from '@chakra-ui/react'
import Head from 'next/head'
import { NextPage } from 'next/types'
import { ChangeEvent, FormEvent, useState } from 'react'

const Home: NextPage = () => {
  const [number, setNumber] = useState<string>()
  const [message, setMessage] = useState<string>()
  const [generate, setGenerate] = useState<boolean>(false)
  const { toggleColorMode } = useColorMode()

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
    setMessage(value)
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
                mb={4}
                align="center"
                justify="space-between"
                direction="row"
              >
                <Heading as="h2" size={{ base: 'md', sm: 'lg' }}>
                  WhastsApp ChatLink Generator
                </Heading>
                <Button onClick={toggleColorMode} size="sm" rounded="full">
                  Theme
                </Button>
              </Stack>
              <FormControl isRequired>
                <FormLabel>Phone number</FormLabel>
                <Input
                  type="number"
                  placeholder="+521234567890"
                  onChange={(e) => handlePhoneChange(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea
                  height={100}
                  placeholder="The message you want to send"
                  onChange={(e) => handleMessagePhoneChange(e.target.value)}
                />
              </FormControl>
              <Button type="submit">Generate link</Button>
            </Stack>
          </form>
          {number && message && generate && (
            <Link
              isExternal
              fontSize="sm"
              noOfLines={2}
              href={`https://wa.me/${number}?text=${message}`}
            >
              {`https://wa.me/${number}?text=${message}`}
            </Link>
          )}
        </Stack>
      </Center>
    </>
  )
}

export default Home
