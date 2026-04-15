const firebaseConfig = {
            apiKey: "AIzaSyB9YscukLv0Z4HsR8_irVwkn6C5YdNqSzI",
            authDomain: "iml300-spring2026-cloud.firebaseapp.com",
            projectId: "iml300-spring2026-cloud",
            storageBucket: "iml300-spring2026-cloud.firebasestorage.app",
            messagingSenderId: "201453116602",
            appId: "1:201453116602:web:a5dc75563b4bca25d73683"
        };

        firebase.initializeApp(firebaseConfig);

        const db = firebase.database();
        const dbRef = db.ref("text");

        const chatContainer = document.getElementById("chat-container");
        const entry = document.getElementById("text-input-entry");
        const form = document.getElementById("text-input-form");

        dbRef.on("child_added", gotText);

        function gotText(data) {
            const value = data.val();
            chatContainer.innerHTML =
                "<div class='response'>" + value + "</div>" + chatContainer.innerHTML;
        }

        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const textToSubmit = entry.value.trim();
            if (!textToSubmit) return;

            const newKey = dbRef.push().key;
            const updates = {};
            updates[newKey] = textToSubmit;
            dbRef.update(updates);

            entry.value = "";
            entry.placeholder = "Would you like to share more?";
        });