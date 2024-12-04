// Song data
const songs = [
  { id: "001", title: "I love you - Celine Dion", file: "videos/001.mp4" },
  { id: "002", title: "Maybe this time - Sarah Geronimo", file: "videos/002.mp4" },
  { id: "003", title: "Bulong - December Avenue", file: "videos/003.mp4" },
  { id: "004", title: "Magbalik - Callalily", file: "videos/004.mp4" },
  { id: "005", title: "Marilag - Dionela", file: "videos/005.mp4" },
  { id: "006", title: "Sining - Dionela", file: "videos/006.mp4" },
  { id: "007", title: "Palagi - TJ Monterde", file: "videos/007.mp4" },
  { id: "008", title: "Dilaw - Maki", file: "videos/008.mp4" },
  { id: "009", title: "Upside Down - 6cyclemind", file: "videos/009.mp4" },
  { id: "010", title: "Bagsakan - PNE,Gloc-9, Francis M", file: "videos/010.mp4" },
];

// References to HTML elements
const songListElement = document.getElementById("song-list");
const songQueueElement = document.getElementById("song-queue");
const karaokeVideo = document.getElementById("karaoke-video");
const addToQueueButton = document.getElementById("add-to-queue");
const songSearchInput = document.getElementById("song-search");
const playNextButton = document.getElementById("play-next");
const clearQueueButton = document.getElementById("clear-queue");

// Song queue array
let songQueue = [];
let isPlaying = false; // Track if a song is currently playing

// Populate the static song list and add click functionality
songs.forEach((song) => {
  const li = document.createElement("li");
  li.textContent = `${song.id} - ${song.title}`;
  li.addEventListener("click", () => {
    songQueue.push(song); // Add the song to the queue
    updateQueue();

    // If no song is playing, start the first song in the queue
    if (!isPlaying) {
      playNextSong();
    }
  });
  songListElement.appendChild(li);
});

// Add a song to the queue by its number
function addSongToQueue() {
  const songNumber = songSearchInput.value.trim(); // Get the entered song number
  const song = songs.find((s) => s.id === songNumber); // Find the song in the array

  if (!song) {
    alert("Song not found. Please enter a valid song number.");
    return;
  }

  // Add the song to the queue
  songQueue.push(song);
  updateQueue();

  // If no song is playing, start the first song in the queue
  if (!isPlaying) {
    playNextSong();
  }

  songSearchInput.value = ""; // Clear the input
}

// Update the song queue display
function updateQueue() {
  songQueueElement.innerHTML = ""; // Clear the current queue

  songQueue.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${song.title}`;
    songQueueElement.appendChild(li);
  });
}

// Play the next song in the queue
function playNextSong() {
  if (songQueue.length === 0) {
    isPlaying = false;
    alert("No more songs in the queue!");
    return;
  }

  const nextSong = songQueue.shift(); // Remove the first song in the queue
  karaokeVideo.src = nextSong.file;
  karaokeVideo.play();
  isPlaying = true; // Mark as playing

  updateQueue(); // Update the queue display
}

// Automatically play the next song when the current one ends
karaokeVideo.addEventListener("ended", () => {
  if (songQueue.length > 0) {
    playNextSong();
  } else {
    isPlaying = false; // Mark as not playing if no more songs
  }
});

// Clear the song queue
function clearQueue() {
  songQueue = []; // Empty the queue array
  updateQueue(); // Update the queue display
  karaokeVideo.pause(); // Stop any currently playing video
  karaokeVideo.src = ""; // Clear the video source
  isPlaying = false; // Reset the playing state
}

// Add event listeners
addToQueueButton.addEventListener("click", addSongToQueue);
playNextButton.addEventListener("click", playNextSong);
clearQueueButton.addEventListener("click", clearQueue);

// Allow pressing Enter to add a song to the queue
songSearchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addSongToQueue();
  }
});
