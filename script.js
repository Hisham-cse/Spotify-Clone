console.log("lets write js")

let currentSong =new Audio();

function formatTime(seconds) {
    // Round off seconds
    seconds = Math.round(seconds);

    // Calculate minutes and seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Pad with leading zeros if necessary
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    // Concatenate minutes and seconds with a colon
    return `${formattedMinutes}:${formattedSeconds}`;
}
async function getSongs() {

    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    // console.log(as);
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            // taking what is after song word =>
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}
const playMusic=(track,pause=false)=>{
    //  var audio = new Audio("/songs/"+track)
    currentSong.src = "/songs/"+track
    if(!pause){
    currentSong.play()
    play.src="pause.svg"
    }
    document.querySelector(".songinfo").innerHTML=decodeURI(track)
    document.querySelector(".songtime").innerHTML="00:00 / 00:00"
    //  audio.play()
}
async function main() {

   

    //Get the list of all the songs 
    let songs = await getSongs()
    // console.log(songs);

    playMusic(songs[0],true)

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

        </li>`;
    }
    // attach an event Listener to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",()=>{
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

    //Attach an event listener to play,next and previous

    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src="pause.svg"
        }else{
            currentSong.pause()
            play.src="play.svg"
        }
    })

    //listen for timeupdate event
    currentSong.addEventListener("timeupdate",()=>{
        console.log(currentSong.currentTime,currentSong.duration);
        document.querySelector(".songtime").innerHTML= `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`
        document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100+"%";
    })
    // add an Event listener to seekbar
    
    document.querySelector(".seekbar").addEventListener("click",e=>{
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
       document.querySelector(".circle").style.left.percent+"%"
       currentSong.currentTime=((currentSong.duration)*percent)/100;
    })

    //Add Event Listener for hamburger
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left="0"
    })
    //Add Event Listener for close(cross)
    document.querySelector(".cross").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-100%"
    })

}
main()
// console.log(formatTime(231.45));