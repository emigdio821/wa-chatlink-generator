import clsx from 'clsx'
import Head from 'next/head'
import { useState } from 'react'
import { NextPage } from 'next/types'
import { useForm } from 'react-hook-form'
import { formSchema } from '../form-schemas'
import WAIcon from '../components/svg/WAIcon'
import ThemeBtn from '../components/ThemeBtn'
import { yupResolver } from '@hookform/resolvers/yup'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BiLink,
  BiPhone,
  BiReset,
  BiInfoCircle,
  BiLinkExternal,
  BiMessageRounded,
} from 'react-icons/bi'

interface FieldValues {
  countryCode: string
  phone: string
  message: string
}

const Home: NextPage = () => {
  const [data, setData] = useState<FieldValues>()

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FieldValues>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  })

  const onSubmit = handleSubmit((values) => {
    setData(values)
    reset({}, { keepValues: true })
  })

  function handleReset() {
    reset()
    setData(undefined)
  }

  return (
    <>
      <Head>
        <title>WA ChatLink Generator</title>
      </Head>
      <div className="mx-auto flex max-w-2xl flex-col gap-2 p-6">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex w-8 max-sm:w-7">
                  <WAIcon />
                </div>
                <h2 className="text-2xl font-bold max-sm:text-xl">
                  ChatLink Generator
                </h2>
              </div>
              <ThemeBtn />
            </div>
            <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold">Note</span>: please check the{' '}
              <span className="font-semibold">country code</span> and{' '}
              <span className="font-semibold">phone number</span> carefully,
              otherwise, the link will not be generated correctly.
            </p>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="phone"
                className="flex items-center gap-2 text-sm font-semibold"
              >
                <BiPhone />
                Phone number
              </label>
              <div className="flex items-start gap-2">
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    id="countryCode"
                    placeholder="52"
                    {...register('countryCode')}
                    className={clsx('simple-input w-20', {
                      'border-red-400 dark:border-red-300': errors.countryCode,
                    })}
                  />
                  {errors.countryCode && (
                    <p className="error-msg">{errors.countryCode.message}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <input
                    id="phone"
                    type="text"
                    {...register('phone')}
                    placeholder="1234567890"
                    className={clsx('simple-input w-full', {
                      'border-red-400 dark:border-red-300': errors.phone,
                    })}
                  />
                  {errors.phone && (
                    <p className="error-msg">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="message"
                className="flex items-center gap-2 text-sm font-semibold"
              >
                <BiMessageRounded />
                Message
              </label>
              <div className="flex flex-col gap-1">
                <textarea
                  id="message"
                  {...register('message')}
                  placeholder="The message you want to send"
                  className={clsx('simple-input h-36 resize-none p-2', {
                    'border-red-400 dark:border-red-300': errors.message,
                  })}
                />
                {errors.message && (
                  <p className="error-msg">{errors.message.message}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="simple-btn border border-zinc-300 bg-zinc-600 text-white hover:border-zinc-300 hover:bg-zinc-800 dark:border-zinc-800 dark:bg-zinc-700 dark:hover:border-zinc-800 dark:hover:bg-zinc-800"
              >
                <BiReset />
                Reset
              </button>
              <button
                type="submit"
                className="simple-btn w-full"
                disabled={!isValid || !isDirty}
              >
                <BiLink />
                Generate
              </button>
            </div>
          </div>
        </form>
        <AnimatePresence mode="wait" initial={false}>
          {data && !isDirty && (
            <motion.div
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 6 }}
              className="flex items-center justify-center gap-2 rounded-md border p-2 text-sm font-semibold dark:border-zinc-800"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md underline-offset-4 outline-none ring-[#72caaf] hover:underline focus:ring-2"
                href={`https://wa.me/+${data?.countryCode}${data?.phone}?text=${data?.message}`}
              >
                {`https://wa.me/+${data?.countryCode}${data?.phone}...`}
                <BiLinkExternal />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default Home
