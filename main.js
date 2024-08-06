const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.querySelector(".result");
const sound = document.querySelector("#sound");
const btn = document.querySelector("#search-btn");

btn.addEventListener("click", () => {
  let inpWord = document.querySelector("#inp-word").value;
  fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `<div class="word">
      <h1>${inpWord}</h1>
      <button onclick='playSound()'>
        <ion-icon name="volume-high-outline"></ion-icon>
      </button>
    </div>
    <div class="details">
      <p>${data[0].meanings[0].partOfSpeech}</p>
      <p>/${data[0].phonetic}/</p>
    </div>
    <p class="word-meaning">
     ${data[0].meanings[0].definitions[0].definition}
    </p>
    <p class="word-example">
   ${data[0].meanings[0].definitions[0].example || " "}
    </p>`;
      const audioSrc = data[0].phonetics.find((phonetic) => phonetic.audio);
      if (audioSrc) {
        sound.setAttribute("src", audioSrc.audio);
      } else {
        console.log("No audio available for this word.");
      }
    })
    .catch((error) => console.log(error));
});

function playSound() {
  sound.play();
}
