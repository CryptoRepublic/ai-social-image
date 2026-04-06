document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const promptInput = document.getElementById("prompt");
    const formatSelect = document.getElementById("format");
    const modelSelect = document.getElementById("model");
    const seedInput = document.getElementById("seed");
    const enhanceCheckbox = document.getElementById("enhance");
    
    const generateBtn = document.getElementById("generate-btn");
    const loader = document.getElementById("loader");
    const resultImg = document.getElementById("result-img");
    const actionButtons = document.getElementById("action-buttons");
    const downloadBtn = document.getElementById("download-btn");
    const regenerateBtn = document.getElementById("regenerate-btn");

    // Modal & Auth Elements
    const authBtn = document.getElementById("auth-btn");
    const authModal = document.getElementById("auth-modal");
    const apiKeyInput = document.getElementById("api-key-input");
    const saveKeyBtn = document.getElementById("save-key-btn");
    const clearKeyBtn = document.getElementById("clear-key-btn");
    const closeModalBtn = document.getElementById("close-modal-btn");

    let currentBlobUrl = "";

    // --- Authentication Logic ---
    const checkAuthStatus = () => {
        const token = localStorage.getItem("pollinationsToken");
        if (token) {
            authBtn.textContent = "✅ Logged In";
            authBtn.classList.add("btn-success");
            authBtn.classList.remove("btn-outline");
            apiKeyInput.value = token;
            clearKeyBtn.classList.remove("hidden");
        } else {
            authBtn.textContent = "🔑 Login / API Key";
            authBtn.classList.remove("btn-success");
            authBtn.classList.add("btn-outline");
            apiKeyInput.value = "";
            clearKeyBtn.classList.add("hidden");
        }
    };

    authBtn.addEventListener("click", () => authModal.classList.remove("hidden"));
    closeModalBtn.addEventListener("click", () => authModal.classList.add("hidden"));

    saveKeyBtn.addEventListener("click", () => {
        const token = apiKeyInput.value.trim();
        if (token) {
            localStorage.setItem("pollinationsToken", token);
            checkAuthStatus();
            authModal.classList.add("hidden");
        }
    });

    clearKeyBtn.addEventListener("click", () => {
        localStorage.removeItem("pollinationsToken");
        checkAuthStatus();
        authModal.classList.add("hidden");
    });

    checkAuthStatus(); // Initialize auth state

    // --- Image Generation Logic ---
    const generateImage = async () => {
        const prompt = promptInput.value.trim();
        if (!prompt) {
            alert("Please enter a prompt before generating an image.");
            return;
        }

        // 1. Get base parameters
        const formatParts = formatSelect.value.split("x");
        const width = formatParts[0];
        const height = formatParts[1];
        const encodedPrompt = encodeURIComponent(prompt);
        
        // 2. Get advanced parameters
        const model = modelSelect.value;
        const seed = seedInput.value.trim() !== "" ? seedInput.value : Math.floor(Math.random() * 1000000);
        const enhance = enhanceCheckbox.checked ? "true" : "false";

        // 3. Build URL
        const apiUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&model=${model}&seed=${seed}&enhance=${enhance}&nologo=true`;

        // Update UI
        generateBtn.disabled = true;
        regenerateBtn.disabled = true;
        actionButtons.classList.add("hidden");
        resultImg.classList.add("hidden");
        loader.classList.remove("hidden");

        // Prepare Request Headers (if user is logged in)
        const token = localStorage.getItem("pollinationsToken");
        const fetchOptions = { method: 'GET' };
        if (token) {
            fetchOptions.headers = { 'Authorization': `Bearer ${token}` };
        }

        try {
            // Fetch image as Blob (so we can pass headers and instantly download later)
            const response = await fetch(apiUrl, fetchOptions);
            
            if (!response.ok) {
                throw new Error(response.status === 401 ? "Unauthorized: Invalid API Key" : "Failed to generate image");
            }

            const blob = await response.blob();
            
            // Clean up previous blob URL to avoid memory leaks
            if (currentBlobUrl) URL.revokeObjectURL(currentBlobUrl);
            
            currentBlobUrl = window.URL.createObjectURL(blob);
            
            // Display Image
            resultImg.src = currentBlobUrl;
            
            resultImg.onload = () => {
                loader.classList.add("hidden");
                resultImg.classList.remove("hidden");
                actionButtons.classList.remove("hidden");
            };

        } catch (error) {
            console.error(error);
            loader.classList.add("hidden");
            alert(`Error: ${error.message}. Please try again.`);
        } finally {
            generateBtn.disabled = false;
            regenerateBtn.disabled = false;
        }
    };

    // --- Instant Download Logic ---
    const downloadImage = () => {
        if (!currentBlobUrl) return;
        
        const link = document.createElement("a");
        link.href = currentBlobUrl;
        link.download = `AI-Image-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Event Listeners
    generateBtn.addEventListener("click", generateImage);
    regenerateBtn.addEventListener("click", generateImage);
    downloadBtn.addEventListener("click", downloadImage);
});
