const { askChatGPT } = require("./functions/askChatGPT.js")

const express = require("express");
const app = express()

require("dotenv").config()

app.use(express.static("static"))

app.get("/tavola-periodica-chat", async (req, res) => {
    const { user_prompt } = req.query

    if (!user_prompt)
        return res.status(400).send({
            status: 400,
            message: "user_prompt not find"
        })
        

    const { status, message } = await askChatGPT(
        "Ti fornirò una lista di numeri atomici separati da virgole. Per ogni combinazione possibile, genera la formula molecolare e il nome del composto corrispondente. Se non esiste un composto noto, rispondi 'Non esiste'. Esempi: Input: 8,8 Output: O₂ - Ossigeno molecolare. Input: 3,1 Output: LiCl - Cloruro di litio. Input: 85,8 Output: Non esiste.",
        user_prompt
    )

    if (status != 200)
        return res.status(status).send({
            status,
            message
        })

    res.send({
        status: 200,
        message
    })
})//`Ora rispondi per il seguente input: ${lista_numeri}`

app.get("/intelligenza-artificiale-chat", async (req, res) => {
    const { user_prompt } = req.query

    if (!user_prompt)
        return res.status(400).send({
            status: 400,
            message: "user_prompt not find"
        })
        

    const { status, message } = await askChatGPT(
        "Sei un assistente virtuale specializzato in intelligenza artificiale. Rispondi alle domande degli utenti in modo chiaro, accurato e professionale, fornendo spiegazioni tecniche o semplificate a seconda del livello di conoscenza richiesto. Usa un tono amichevole e coinvolgente, evitando eccessiva complessità. Se l'utente ha bisogno di consigli, proponi soluzioni personalizzate e pratica. Se non sei sicuro di una risposta, suggerisci risorse o metodi per ottenere informazioni più precise.",
        user_prompt
    )

    if (status != 200)
        return res.status(status).send({
            status,
            message
        })

    res.send({
        status: 200,
        message
    })
})

app.get("*", (req, res) => {
    res.status(404).send("Pagina non trovata :(")
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server in ascolto alla porta ${port}...`)
})