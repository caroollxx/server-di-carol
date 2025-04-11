async function askChatGPT(system_prompt, user_prompt) {
    const endpoint = 'https://api.openai.com/v1/chat/completions';

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPEN_AI_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: system_prompt },
                    { role: 'user', content: user_prompt }
                ],
            }),
        })

        if (!response.ok) {
            if (response.status === 401)
                return {
                    status: 401,
                    message: 'OpenAI key non valida. Controlla di aver inserito correttamente la chiave API.'
                }

            return {
                status: response.status,
                message: `HTTP error! status: ${response.status}`
            }
        }

        const data = await response.json()
        
        return {
            status: 200,
            message: data.choices[0].message.content
        }
    } catch (error) {
        console.error('Error:', error)
        return {
            status: 500,
            message: error.message
        }
    } 
}

module.exports = { askChatGPT }