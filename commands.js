import 'dotenv/config'
import { InstallGlobalCommands } from './utils.js'

// Simple test command
const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
  type: 1,
}

// txt2img command
const TXT2IMG_COMMAND = {
  name: 'txt2img',
  description: 'Enter your prompt to draw something',
  type: 1,
  options: [
    {
      name: 'prompt',
      description: 'prompt',
      type: 3,
      required: true,
    },
  ],
}

const ALL_COMMANDS = [TEST_COMMAND, TXT2IMG_COMMAND]

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS)
