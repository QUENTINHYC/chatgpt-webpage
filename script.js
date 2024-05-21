document.addEventListener('DOMContentLoaded', (event) => {
    const userInput = document.getElementById('userInput');
    const submitButton = document.getElementById('submitButton');
    const responseContainer = document.getElementById('responseContainer');

    submitButton.addEventListener('click', async () => {
        const userMessage = userInput.value;
        if (userMessage.trim() !== "") {
            const response = await getChatGPTResponse(userMessage);
            displayResponse(response);
            userInput.value = '';
        }
    });

    async function getChatGPTResponse(message) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer sk-proj-sdMx3rARz6iX2wsfg7m2T3BlbkFJpnT7RUCZ5XZKNlYOoCI8'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }]
            })
        });

        const data = await response.json();
        if (response.ok) {
            return data.choices[0].message.content;
        } else {
            console.error('Erreur:', data);
            return 'Une erreur est survenue. Veuillez réessayer.';
        }
    }

    function displayResponse(response) {
        const responseParagraph = document.createElement('p');
        responseParagraph.innerText = response;
        responseContainer.appendChild(responseParagraph);
    }
});
