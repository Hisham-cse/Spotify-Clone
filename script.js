console.log("lets write js")

async function getSong() {

    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    // console.log(as);
    let songs = []
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            // taking what is after song word =>
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}
const playMusic=(track)=>{
     var audio = new Audio(track)
    audio.play()
}
async function main() {

    let currentSong;

    //Get the list of all the songs 
    let songs = await getSong()
    console.log(songs);

    //Show all the songs in the playlist
    let songUL=document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs){
        songUL.innerHTML=songUL.innerHTML+`<li>
        
        <img class="invert" src="music.svg" alt="">
        <div class="info">
            <div>${song.replaceAll("%20","")}</div>
            <div>Hisham</div>
        </div>
        <div class="playnow"><span>playnow</span>
            <img class="invert" src="play.svg" alt="">
        </div>

        </li>`
    }
    // attach an event Listener to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
            // playMusic(e.querySelector(".info").firstElementChild.innerHTML)
        })
    })

    //play the first song
    // var audio = new Audio(songs[0])
    // audio.play()


    // audio.addEventListener("loadeddata",()=>{
    //     // let duration = audio.duration;
    //     console.log(audio.duration,audio.currentSrc,audio.currentTime);
    // })
}
main()
