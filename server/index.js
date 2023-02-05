import bodyParser from 'body-parser';
import cors from 'cors'
import dotenv from 'dotenv'
import express from "express";
import { Configuration, OpenAIApi } from "openai";

dotenv.config({ path: './config.env' })
const configuration = new Configuration({
    organization: process.env.ORG_NAME,
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);
const app = express();

app.use(bodyParser.json());
app.use(cors())

app.post('/', async (req, res) => {
    try {

        const { message,currentModel } = req.body;
        const response = await openai.createCompletion({
            model: `${currentModel}`,
            prompt: `${message}`,
            max_tokens: 100,
            temperature: 0.5,
        });
        // console.log(response.data.choices[0])
        console.log(message);
        // console.log(response.data);
        res.status(200).json({
            message: response.data.choices[0].text
            // data: message
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.get('/models', async (req, res) => {
    const response = await openai.listEngines();
    // console.log(response.data.data)
    res.json({
        models: response.data
    })
})

app.listen(5000, () => { console.log("App Started!") })