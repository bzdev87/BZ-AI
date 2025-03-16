async function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") return;

    let chatBox = document.getElementById("chatBox");

    let userMessage = document.createElement("p");
    userMessage.classList.add("user-message");
    userMessage.innerHTML = "<strong>Anda:</strong> " + userInput;
    chatBox.appendChild(userMessage);

    let botMessage = document.createElement("p");
    botMessage.classList.add("bot-message");
    botMessage.innerHTML = "<strong>BOT BZ AI:</strong> Sedang memproses...";
    chatBox.appendChild(botMessage);

    try {
        let response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4-turbo",
                messages: [{ role: "user", content: userInput }]
            })
        });

        let data = await response.json();
        botMessage.innerHTML = "<strong>BOT BZ AI:</strong> " + data.choices[0].message.content;
    } catch (error) {
        botMessage.innerHTML = "<strong>BOT BZ AI:</strong> Maaf, ada kesalahan!";
    }

    document.getElementById("userInput").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}