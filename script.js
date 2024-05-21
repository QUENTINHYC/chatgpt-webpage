document.addEventListener('DOMContentLoaded', (event) => {
    const chatbox = document.getElementById('chatbox');

    const userInput = document.createElement('input');
    userInput.setAttribute('type', 'text');
    userInput.setAttribute('placeholder', 'Tapez votre message ici...');
    chatbox.appendChild(userInput);

    const submitButton = document.createElement('button');
    submitButton.innerText = 'Envoyer';
    chatbox.appendChild(submitButton);

    const responseContainer = document.createElement('div');
    chatbox.appendChild(responseContainer);

    submitButton.addEventListener('click', async () => {
        const userMessage = userInput.value;
        const response = await getChatGPTResponse(userMessage);
        const responseParagraph = document.createElement('p');
        responseParagraph.innerText = response;
        responseContainer.appendChild(responseParagraph);
        userInput.value = '';
    });
});

async function getChatGPTResponse(message) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer sk-proj-sya5eSgrKe6w4RAvMOTyT3BlbkFJ7ltFTJgzdB1OWUsYxEhj`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}
