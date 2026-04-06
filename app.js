document.addEventListener("DOMContentLoaded", () => {
    const promptInput = document.getElementById("prompt");
    const formatSelect = document.getElementById("format");
    const generateBtn = document.getElementById("generate-btn");
    const loader = document.getElementById("loader");
    const resultImg = document.getElementById("result-img");
    const actionButtons = document.getElementById("action-buttons");
    const downloadBtn = document.getElementById("download-btn");
    const regenerateBtn = document.getElementById("regenerate-btn");

    let currentImageUrl = "";

    // Function to generate the image
    const generateImage = () => {
        const prompt = promptInput.value.trim();
        if (!prompt) {
            alert("Please enter a prompt before generating an image.");
            return;
        }

        // Extract width and height from the selected format
        const formatParts = formatSelect.value.split("x");
        const width = formatParts[0];
        const height = formatParts[1];

        // Encode the prompt safely for the URL
        const encodedPrompt = encodeURIComponent(prompt);
        
        // Generate a random seed to ensure a new image is generated every time
        const randomSeed = Math.floor(Math.random() * 1000000);

        // Build the Pollinations API URL
        currentImageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=true&seed=${randomSeed}`;

        // Update UI state
        generateBtn.disabled = true;
        regenerateBtn.disabled = true;
        downloadBtn.disabled = true;
        
        actionButtons.classList.add("hidden");
        resultImg.classList.add("hidden");
        loader.classList.remove("hidden");

        // Set the URL as the image source
        resultImg.src = currentImageUrl;
    };

    // When the image finishes loading
    resultImg.onload = () => {
        loader.classList.add("hidden");
        resultImg.classList.remove("hidden");
        actionButtons.classList.remove("hidden");
        
        generateBtn.disabled = false;
        regenerateBtn.disabled = false;
        downloadBtn.disabled = false;
    };

    // If an error occurs during loading
    resultImg.onerror = () => {
        loader.classList.add("hidden");
        alert("An error occurred while generating the image. Please try again.");
        generateBtn.disabled = false;
        regenerateBtn.disabled = false;
        downloadBtn.disabled = false;
    };

    // Function to force download the image
    const downloadImage = async () => {
        if (!currentImageUrl) return;
        
        try {
            downloadBtn.textContent = "Downloading... ⏳";
            downloadBtn.disabled = true;

            // Fetch the image as a Blob
            const response = await fetch(currentImageUrl);
            const blob = await response.blob();
            
            // Create a temporary object URL
            const blobUrl = window.URL.createObjectURL(blob);
            
            // Create a temporary link element and trigger download
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `AI-Image-${Date.now()}.jpg`;
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
            
        } catch (error) {
            console.error("Download failed:", error);
            alert("Failed to download image. You can right-click the image and select 'Save Image As...'.");
        } finally {
            downloadBtn.textContent = "Download 📥";
            downloadBtn.disabled = false;
        }
    };

    // Event Listeners
    generateBtn.addEventListener("click", generateImage);
    regenerateBtn.addEventListener("click", generateImage);
    downloadBtn.addEventListener("click", downloadImage);
});