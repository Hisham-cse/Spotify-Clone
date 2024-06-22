console.log('Lets write JavaScript');

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    // let div = document.createElement("div")
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = []
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href)
        }

    }
    return songs;
}
async function main() {
    //get the list of all the songs
    let songs = await getSongs()
    console.log(songs);

    //play the first song
    var audio = new Audio(songs[0]);
    // audio.play();
    // const audioElement = new Audio("car_horn.wav");
  audio.addEventListener("loadeddata", () => {
  let duration = audio.duration;
  console.log(audio.duration,audio.currentSrc,audio.currentTime);
  // The duration variable now holds the duration (in seconds) of the audio clip
});
}



main()













//promise
// let promise = new Promise(function(resolve,reject){
//     alert("I am a alert")
//     resolve(56)

// })

// console.log(promise);
// async function harry(){
//     return 5
// }
