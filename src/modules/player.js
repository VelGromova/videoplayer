import * as video from "./video";
import Modal from "./modal";
import Form from "./form";
import * as helpers from "./helpers";

function onReady (state) {
    let player = state.target
    let videoModal = new Modal('videoModal', {
        openButtonId: 'openModal',
        closeElementsClasses: ['modal__background', 'modal__close'],
    })

    let enjoyModal = new Modal('enjoyModal', {
        closeElementsClasses: ['modal__background', 'modal__close', 'submit__btn'],
    })

    let errorModal = new Modal('errorModal', {
        closeElementsClasses: ['modal__background', 'modal__close', 'submit__btn'],
    })

    let videoForm = new Form('videoForm', 'submit__btn', function (data) {
        videoModal.close()
        data.link = 'https://youtube.com/embed/' + helpers.getVideoIdFromYoutubeUrl(data.link)
        let id = video.addVideo(data);
        if (id < 0) {
            errorModal.open();

            return
        }

        data.id = id;
        enjoyModal.open();
        helpers.displayVideo(data);
        helpers.updateVideosButtonsEvens(player);

        if (data.id === 1) {
            player.playCustomVideo(data)
            helpers.changeActiveVideo(data.id)
        }
    })

    let allVideos = video.getVideos();
    allVideos.forEach(helpers.displayVideo);
    helpers.updateVideosButtonsEvens(player);

    if (allVideos.length > 0) {
        player.playCustomVideo(allVideos[0]);
        helpers.changeActiveVideo(allVideos[0].id)
    }
}

function onStateChange (state) {
    if (state.data === 0) {
        let allVideos = video.getVideos();
        let currentVideoId = state.target.getCustomVideoId();
        let currentVideoIndex = allVideos.findIndex(video => video.id === currentVideoId)

        let newVideoIndex = currentVideoIndex + 1;
        if (allVideos.length - 1 === currentVideoIndex) {
            newVideoIndex = 0
        }

        let newVideoData = allVideos[newVideoIndex]
        state.target.playCustomVideo(newVideoData);

        helpers.changeActiveVideo(newVideoData.id)
    }
}

export default function initializeYoutube(playerId) {
    if (typeof YT !== "undefined" && YT && YT.Player) {
        YT.Player.prototype.setCustomVideoId = function (id) {
            this.customVideoId = id;

            return this.customVideoId
        };

        YT.Player.prototype.getCustomVideoId = function (id) {
            return this.customVideoId
        };

        YT.Player.prototype.playCustomVideo = function ({id, link}) {
            this.setCustomVideoId(id)
            this.cueVideoByUrl(link);
            this.playVideo();
        };

        return new YT.Player(playerId, {
            width: '90%',
            height: 500,
            playerVars: {
                color: 'white'
            },

            events: {
                onReady: onReady,

                onStateChange: onStateChange
            }
        });
    } else {
        setTimeout(() => initializeYoutube(playerId), 100)
    }
}
