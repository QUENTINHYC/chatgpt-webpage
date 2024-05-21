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
                'Authorization': `Bearer sk-proj-tUmYW5Aff5oinmPbhGyOT3BlbkFJydNQwl1G0ITCbLIki6tZ'
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
