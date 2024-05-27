declare function delay(ms: number): void

declare function print(...args: (string | number | boolean | undefined)[]): void

declare interface Console {
  log: (...args: (string | number | boolean | undefined)[]) => void
  warn: (...args: (string | number | boolean | undefined)[]) => void
  error: (...args: (string | number | boolean | undefined)[]) => void
  debug: (...args: (string | number | boolean | undefined)[]) => void
}

declare const console: Console

declare function str(payload: number): string

declare function hexStr(payload: number): string

declare function type(
  payload: unknown
):
  | 'number'
  | 'boolean'
  | 'string'
  | 'object'
  | 'null'
  | 'array'
  | 'foreign_ptr'
  | 'function'
  | 'undefined'
  | 'array_buf'
  | 'data_view'
  | '???'

declare function die(message: string): never

declare function load(path: string, namespace?: unknown): any

declare function chr(payload: number): string | null

declare interface ObjectConstructor {
  create: (o: object) => any
}

declare const Object: ObjectConstructor

declare const NaN: number

declare function isNaN(number: number): boolean

declare function require(id: 'badusb'): BadUsbModule
declare function require(id: 'dialog'): DialogModule
declare function require(id: 'notification'): NotificationModule

declare interface BadUsbModule {
  setup: (configuration?: {
    vid: number
    pid: number
    mfr_name?: string
    prod_name?: string
  }) => void
  isConnected: () => boolean
  press: (...keys: (string | number)[]) => void
  hold: (...keys: (string | number)[]) => void
  release: (...keys: (string | number)[]) => void
  print: (text: string, delay?: number) => void
  println: (text: string, delay?: number) => void
}

declare interface DialogModule {
  message: (header: string, text: string) => boolean
  custom: (configuration: {
    header: string
    text: string
    button_left?: string
    button_right?: string
    button_center?: string
  }) => string
}

declare interface NotificationModule {
  success: () => void
  error: () => void
  blink: (
    color: 'blue' | 'red' | 'green' | 'yellow' | 'cyan' | 'magenta',
    type: 'short' | 'long'
  ) => void
}

declare interface Array<T> {
  length: number
  push: (...items: T[]) => number
  splice: (start: number, deleteCount: number, ...items: T[]) => T[]
}

declare interface String {
  length: number
  slice: (start: number, end: number) => string
  at: (position: number) => number | undefined
  charCodeAt: (position: number) => number | undefined
  indexOf: (searchString: string, position?: number) => number
}

declare interface Boolean {}

declare interface CallableFunction {}

declare interface Function {}

declare interface IArguments {}

declare interface NewableFunction {}

declare interface Number {}

declare interface Object {}

declare interface RegExp {}
