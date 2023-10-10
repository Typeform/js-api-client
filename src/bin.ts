import { inspect } from 'util'

import { createClient, Typeform } from './index'

const print = (message: string) => {
  // eslint-disable-next-line no-console
  console.log(message)
}

const token = process.env.TF_TOKEN

if (!token) {
  throw new Error('Add your personal token as TF_TOKEN env variable')
}

const typeformAPI = createClient({ token })

const [, , ...args] = process.argv
const [methodName, ...methodParams] = args

if (!methodName || methodName === '-h' || methodName === '--help') {
  print('usage: typeform-api <method> [params]')
  print('examples:  yarn api forms.list')
  print('           yarn api forms.get \'{uid:"abc12345"}\'')
  print("           yarn api themes.list '{pageSize:3}'")
  process.exit(0)
}

const [property, method] = methodName.split('.')

// @ts-ignore
if (!typeformAPI[property]?.[method]) {
  throw new Error(`Method ${methodName} does not exist`)
}

let parsedParams = undefined

if (methodParams && methodParams.length > 0) {
  const methodParamsString = methodParams.join(',')
  const normalizedParams = methodParamsString.startsWith('{')
    ? methodParamsString
    : `{${methodParamsString}}`

  try {
    // this eval executes code supplied by user on their own machine, this is safe
    // eslint-disable-next-line no-eval
    eval(`parsedParams = ${normalizedParams}`)
  } catch (err) {
    throw new Error(`Invalid params: ${normalizedParams}`)
  }
}

print(`API: ${methodName}():`)

// @ts-ignore
typeformAPI[property][method](parsedParams)
  .then((result: Object) => {
    print(inspect(result, { showHidden: false, depth: null, colors: true }))
  })
  .catch((err: Typeform.ApiError) => {
    const detailsString = inspect(err.details, {
      showHidden: false,
      depth: null,
      colors: true,
    })
    print(`---------------------------------------------`)
    print(`Error: ${err.code}: ${err.message}`)
    print(`Details: ${detailsString}`)
    print(`---------------------------------------------`)
  })
