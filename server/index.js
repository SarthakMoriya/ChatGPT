import bodyParser from 'body-parser';
import cors from 'cors'
import express from "express";
import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
    organization: "org-I9OKq05jdcouidEMCp3nwmHw",
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);
const app = express();

app.use(bodyParser.json());
app.use(cors())

app.post('/', async (req, res) => {
    const { message } = req.body;
    // const response = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: "Say this is a test",
    //     max_tokens: 7,
    //     temperature: 0,
    // });
    // console.log(response.data.choices[0].text)

    res.status(200).json({
        // data: response.data
        data: message
    })
})

app.listen(5000, () => { console.log("App Started!") })