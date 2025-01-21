let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text, lang = "en-US") {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = lang;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir. I hope you have a productive day ahead.");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon Sir. How can I assist you this afternoon?");
    } else {
        speak("Good Evening Sir. I am here to help you with anything you need.");
    }
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
}

btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
});

function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";
    let lang = message.match(/[अ-ह]/) ? "hi-IN" : "en-US";

    if (message.includes("hello") || message.includes("hey") || message.includes("नमस्ते")) {
        speak("Hello sir, what can I help you with today?", lang);
    } else if (message.includes("who are you") || message.includes("तुम कौन हो")) {
        speak("I am a virtual assistant, created by Akash Sir. I am here to make your life easier.", lang);
    } else if (message.includes("open youtube") || message.includes("यूट्यूब खोलो")) {
        speak("Opening YouTube for you. Enjoy your videos!", lang);
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open google") || message.includes("गूगल खोलो")) {
        speak("Opening Google. What would you like to search for?", lang);
        window.open("https://google.com/", "_blank");
    } else if (message.includes("open facebook") || message.includes("फेसबुक खोलो")) {
        speak("Opening Facebook. Stay connected with your friends!", lang);
        window.open("https://facebook.com/", "_blank");
    } else if (message.includes("open instagram") || message.includes("इंस्टाग्राम खोलो")) {
        speak("Opening Instagram. Let's see what's trending!", lang);
        window.open("https://instagram.com/", "_blank");
    } else if (message.includes("open calculator") || message.includes("कैलकुलेटर खोलो")) {
        speak("Opening calculator. Ready to crunch some numbers?", lang);
        window.open("calculator://");
    } else if (message.includes("open whatsapp") || message.includes("व्हाट्सएप खोलो")) {
        speak("Opening WhatsApp. Chat away!", lang);
        window.open("whatsapp://");
    } else if (message.includes("open twitter") || message.includes("ट्विटर खोलो")) {
        speak("Opening Twitter. Stay updated with the latest tweets!", lang);
        window.open("https://twitter.com/", "_blank");
    } else if (message.includes("open linkedin") || message.includes("लिंक्डइन खोलो")) {
        speak("Opening LinkedIn. Connect with professionals!", lang);
        window.open("https://linkedin.com/", "_blank");
    } else if (message.includes("open reddit") || message.includes("रेडिट खोलो")) {
        speak("Opening Reddit. Dive into discussions!", lang);
        window.open("https://reddit.com/", "_blank");
    } else if (message.includes("open github") || message.includes("गिटहब खोलो")) {
        speak("Opening GitHub. Explore the world of code!", lang);
        window.open("https://github.com/", "_blank");
    } else if (message.includes("open stackoverflow") || message.includes("स्टैक ओवरफ्लो खोलो")) {
        speak("Opening StackOverflow. Find solutions to your coding problems!", lang);
        window.open("https://stackoverflow.com/", "_blank");
    } else if (message.includes("open email") || message.includes("ईमेल खोलो")) {
        speak("Opening email. Let's check your inbox!", lang);
        window.open("mailto: codewithpanda28@gmail.com", "_blank");
    } else if (message.includes("what's the weather") || message.includes("weather update") || message.includes("मौसम कैसा है")) {
        speak("Fetching the latest weather update for you. Please wait a moment.", lang);
        fetch('https://api.openweathermap.org/data/2.5/weather?q=YourCity&appid=YourAPIKey')
            .then(response => response.json())
            .then(data => {
                const temperature = data.main.temp;
                const weatherDescription = data.weather[0].description;
                speak(`The current temperature is ${temperature} degrees with ${weatherDescription}.`, lang);
            })
            .catch(error => {
                speak("Sorry, I couldn't fetch the weather update at the moment. Please try again later.", lang);
                console.error(error);
            });
    } else if (message.includes("set an alarm") || message.includes("remind me") || message.includes("अलार्म सेट करो")) {
        speak("Setting an alarm or reminder for you. Please hold on.", lang);
        setTimeout(() => {
            speak("This is your reminder! Hope it helps.", lang);
        }, 5000);
    } else if (message.includes("play music") || message.includes("play a song") || message.includes("गाना बजाओ")) {
        speak("Opening Spotify. Enjoy your music!", lang);
        window.open("https://open.spotify.com", "_blank");
    } else if (message.includes("tell me a joke") || message.includes("make me laugh") || message.includes("मुझे एक चुटकुला सुनाओ")) {
        speak("Here's a joke for you. Hope it makes you smile!", lang);
        const jokesInHindi = [
            "टीचर: बच्चो, बताओ सबसे ज्यादा स्ट्रॉन्ग कौन होता है? पप्पू: सर, सबसे ज्यादा स्ट्रॉन्ग तो एग होता है। टीचर: वो कैसे? पप्पू: क्योंकि एग तोड़ने के बाद ही पता चलता है कि वो कच्चा है या उबला हुआ।",
            "पत्नी: सुनिए जी, अगर मैं मर गई तो आप क्या करेंगे? पति: मैं भी मर जाऊंगा। पत्नी: क्यों? पति: तुम्हारे साथ रहने की आदत जो हो गई है।",
            "बच्चा: मम्मी, मुझे एक भाई चाहिए। मम्मी: बेटा, तुम्हारे पापा बिजनेस ट्रिप पर गए हैं। बच्चा: तो क्या हुआ, आप ऑनलाइन ऑर्डर कर दो।",
            "पप्पू: मम्मी, मुझे एक भाई चाहिए। मम्मी: बेटा, तुम्हारे पापा बिजनेस ट्रिप पर गए हैं। पप्पू: तो क्या हुआ, आप ऑनलाइन ऑर्डर कर दो।",
            "टीचर: पप्पू, तुम क्लास में सो क्यों रहे हो? पप्पू: आपकी आवाज़ सुनकर नींद आ जाती है।",
            "पत्नी: सुनिए जी, अगर मैं मर गई तो आप क्या करेंगे? पति: मैं भी मर जाऊंगा। पत्नी: क्यों? पति: तुम्हारे बिना जीने का कोई मतलब नहीं।",
            "बच्चा: मम्मी, मुझे एक भाई चाहिए। मम्मी: बेटा, तुम्हारे पापा बिजनेस ट्रिप पर गए हैं। बच्चा: तो क्या हुआ, आप ऑनलाइन ऑर्डर कर दो।",
            "पप्पू: मम्मी, मुझे एक भाई चाहिए। मम्मी: बेटा, तुम्हारे पापा बिजनेस ट्रिप पर गए हैं। पप्पू: तो क्या हुआ, आप ऑनलाइन ऑर्डर कर दो।",
            "टीचर: पप्पू, तुम क्लास में सो क्यों रहे हो? पप्पू: आपकी आवाज़ सुनकर नींद आ जाती है।",
            "पत्नी: सुनिए जी, अगर मैं मर गई तो आप क्या करेंगे? पति: मैं भी मर जाऊंगा। पत्नी: क्यों? पति: तुम्हारे बिना जीने का कोई मतलब नहीं।",
            "बच्चा: मम्मी, मुझे एक भाई चाहिए। मम्मी: बेटा, तुम्हारे पापा बिजनेस ट्रिप पर गए हैं। बच्चा: तो क्या हुआ, आप ऑनलाइन ऑर्डर कर दो।",
            "पप्पू: मम्मी, मुझे एक भाई चाहिए। मम्मी: बेटा, तुम्हारे पापा बिजनेस ट्रिप पर गए हैं। पप्पू: तो क्या हुआ, आप ऑनलाइन ऑर्डर कर दो।",
            "टीचर: पप्पू, तुम क्लास में सो क्यों रहे हो? पप्पू: आपकी आवाज़ सुनकर नींद आ जाती है।",
            "पत्नी: सुनिए जी, अगर मैं मर गई तो आप क्या करेंगे? पति: मैं भी मर जाऊंगा। पत्नी: क्यों? पति: तुम्हारे बिना जीने का कोई मतलब नहीं।",
            "बच्चा: मम्मी, मुझे एक भाई चाहिए। मम्मी: बेटा, तुम्हारे पापा बिजनेस ट्रिप पर गए हैं। बच्चा: तो क्या हुआ, आप ऑनलाइन ऑर्डर कर दो।",
            "पप्पू: मम्मी, मुझे एक भाई चाहिए। मम्मी: बेटा, तुम्हारे पापा बिजनेस ट्रिप पर गए हैं। पप्पू: तो क्या हुआ, आप ऑनलाइन ऑर्डर कर दो।",
            "टीचर: पप्पू, तुम क्लास में सो क्यों रहे हो? पप्पू: आपकी आवाज़ सुनकर नींद आ जाती है।",
            "पत्नी: सुनिए जी, अगर मैं मर गई तो आप क्या करेंगे? पति: मैं भी मर जाऊंगा। पत्नी: क्यों? पति: तुम्हारे बिना जीने का कोई मतलब नहीं।",
            "बच्चा: मम्मी, मुझे एक भाई चाहिए। मम्मी: बेटा, तुम्हारे पापा बिजनेस ट्रिप पर गए हैं। बच्चा: तो क्या हुआ, आप ऑनलाइन ऑर्डर कर दो।",
            "पप्पू: मम्मी, मुझे एक भाई चाहिए। मम्मी: बेटा, तुम्हारे पापा बिजनेस ट्रिप पर गए हैं। पप्पू: तो क्या हुआ, आप ऑनलाइन ऑर्डर कर दो।"
        ];
        const randomJoke = jokesInHindi[Math.floor(Math.random() * jokesInHindi.length)];
        speak(randomJoke, lang);
    } else if (message.includes("news update") || message.includes("latest news") || message.includes("ताजा खबर")) {
        speak("Fetching the latest news for you. Please wait a moment.", lang);
        fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=4c73b2c3d5404a248a19e5bb4d0b6d6d')
            .then(response => response.json())
            .then(data => {
                const articles = data.articles;
                if (articles.length > 0) {
                    speak(`Here's the latest news: ${articles[0].title}`, lang);
                } else {
                    speak("Sorry, I couldn't find any news updates at the moment.", lang);
                }
            })
            .catch(error => {
                speak("Sorry, I couldn't fetch the news update at the moment. Please try again later.", lang);
                console.error(error);
            });
    } else if (message.includes("what's the time") || message.includes("current time") || message.includes("समय क्या है")) {
        let currentTime = new Date().toLocaleTimeString();
        speak("The current time is " + currentTime + ". Stay on schedule!", lang);
    } else if (message.includes("what's the date") || message.includes("current date") || message.includes("तारीख क्या है")) {
        let currentDate = new Date().toLocaleDateString();
        speak("Today's date is " + currentDate + ". Mark your calendar!", lang);
    } else if (message.includes("time") || message.includes("समय")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time + ". Don't lose track!", lang);
    } else if (message.includes("date") || message.includes("तारीख")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak("The date is " + date + ". Keep it in mind!", lang);
    } else if (message.includes("did it") || message.includes("क्या यह हो सकता है")) {
        speak("Yes, I can do it. AI can do all. Let's achieve perfection together!", lang);
    } else {
        let finalText = "This is what I found on the internet regarding " + message.replace("jarvis", "").replace("shifra", "");
        speak(finalText, lang);
        window.open(`https://www.google.com/search?q=${message.replace("jarvis", "").replace("shifra", "")}`, "_blank");
    }
}