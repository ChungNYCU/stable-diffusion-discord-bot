import 'dotenv/config'
import express from 'express'
import { InteractionType, InteractionResponseType } from 'discord-interactions'
import { txt2img } from './services/stableDiffusionService.js'
import { uploadImg } from './services/imgurService.js'
import { VerifyDiscordRequest, getRandomEmoji } from './utils.js'
import txt2imgReqBody from './txt2imgReqBody.js';

const app = express()
const PORT = process.env.PORT || 3000

// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }))

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/interactions', async function (req, res) {
  // Interaction type and data
  const { type, id, data } = req.body
  const { username } = req.body.user || ''

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG })
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data
    // "test" command
    if (name === 'test') {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: `Hello ${username} ${getRandomEmoji()}`,
        },
      })
    }

    // "txt2img" command
    if (name === 'txt2img') {
      // TODO: call local stable diffusion server and upload the result to a cloud hosted img platform.
      const prompt = data.options[0].value
      const reqBody = JSON.parse(JSON.stringify(txt2imgReqBody))
      reqBody.prompt += prompt
      const img = await txt2img(reqBody)
      const imgId = await uploadImg(img)

      const attachment = `https://i.imgur.com/${imgId}`
      // Edit msg send ealier
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `txt2img ${getRandomEmoji()} \n ${attachment}`,
        },
      })
    }
  }
})

app.listen(PORT, () => {
  console.log('Listening on port', PORT)
})
