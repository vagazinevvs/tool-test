// A global variable to hold the YouTube player object
let player;
const container = document.querySelector('.container');
const youtubeLinkInput = document.getElementById('youtubeLink');
const videoPreviewDiv = document.getElementById('videoPreview');
const generateGifButton = document.getElementById('generateGifButton');

// --- 1. Load the YouTube IFrame Player API ---
// This function name (onYouTubeIframeAPIReady) is special and called automatically by the API
function onYouTubeIframeAPIReady() {
    console.log("YouTube Player API is ready.");
    // Initial setup can be done here if needed
}

// Inject the YouTube IFrame Player API script into the page
function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
loadYouTubeAPI();


// --- 2. Helper function to extract YouTube Video ID ---
function getVideoId(url) {
    // Regex to find video IDs in various formats (watch?v=, youtu.be/, /v/)
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|\S*?[?&]v=)|youtu\.be\/|youtube-nocookie\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return (match && match[1].length === 11) ? match[1] : null;
}

// --- 3. Embed the Video when the user enters a link ---
youtubeLinkInput.addEventListener('change', () => {
    const url = youtubeLinkInput.value;
    const videoId = getVideoId(url);

    if (videoId) {
        // Clear any previous preview content
        videoPreviewDiv.innerHTML = '';
        videoPreviewDiv.classList.remove('preview-placeholder');

        // This creates a div where the player will be inserted
        const playerDiv = document.createElement('div');
        playerDiv.id = 'youtube-player';
        videoPreviewDiv.appendChild(playerDiv);

        // Create the actual YouTube player object
        player = new YT.Player('youtube-player', {
            height: '300', // Matches the CSS placeholder height
            width: '100%',
            videoId: videoId,
            playerVars: {
                'playsinline': 1,
                'controls': 1 // Show controls so the user can see the clip
            },
            events: {
                'onReady': onPlayerReady,
                'onError': onPlayerError
            }
        });
    } else {
        videoPreviewDiv.innerHTML = '<p>Invalid YouTube URL. Please try again.</p>';
        videoPreviewDiv.classList.add('preview-placeholder');
    }
});

function onPlayerReady(event) {
    console.log("Player is ready. Video duration:", event.target.getDuration());
    event.target.mute(); // Mute for better user experience on load
}

function onPlayerError(event) {
    console.error("YouTube Player Error:", event.data);
    videoPreviewDiv.innerHTML = '<p>Error loading video. Code: ' + event.data + '</p>';
}

// --- 4. Handle GIF Generation Button (Conceptual) ---
generateGifButton.addEventListener('click', () => {
    if (!player) {
        alert("Please enter a valid YouTube link first.");
        return;
    }

    const startTime = parseFloat(document.getElementById('startTime').value);
    const endTime = parseFloat(document.getElementById('endTime').value);

    if (isNaN(startTime) || isNaN(endTime) || startTime >= endTime || startTime < 0) {
        alert("Please enter a valid time range (Start < End, and Start >= 0).");
        return;
    }

    const clipDuration = endTime - startTime;
    // Maximum duration for a GIF is usually around 5-10 seconds
    if (clipDuration > 10) {
         alert("Clip is too long. Please select a range less than 10 seconds.");
         return;
    }

    // --- CRITICAL STEP: The Video to GIF Processing ---
    // At this point, you would trigger the complex logic:
    // 1. **Capture Frames:** Get frames from the YouTube player canvas between startTime and endTime.
    // 2. **Apply Cropping:** Use the coordinates selected by the 'Select Crop Area' button (JS needed for this).
    // 3. **Assemble GIF:** Use a library (like gif.js or ffmpeg.js) to compile the frames.
    
    // TEMPORARY MESSAGE: Show the download area conceptually
    console.log(`Attempting to generate GIF from ${startTime}s to ${endTime}s.`);
    alert("Generation process started! (This requires a complex video processing library to actually work.)");
