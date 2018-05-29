import * as video from './modules/video'
import Modal from './modules/modal'
import Form from './modules/form'

document.addEventListener('DOMContentLoaded', function(){
    function test () {
        let test = document.getElementById('test')
        test.addEventListener('load', function(a, b) {
            console.log('---------LOAD-------')
            console.log(a)
            console.log(b)
        })

        test.addEventListener('change', function(a, b) {
            console.log('---------ChANGE-------')
            console.log(a)
            console.log(b)
        })

        test.addEventListener('waiting', function(a, b) {
            console.log('---------WAITING-------')
            console.log(a)
            console.log(b)
        })

        test.addEventListener('playing', function(a, b) {
            console.log('---------WAITING-------')
            console.log(a)
            console.log(b)
        })

    }

    let player;

    function readyYoutube() {
        if ((typeof YT !== "undefined") && YT && YT.Player) {
            player = new YT.Player('videoTest', {
                width: 600,
                height: 400,
                videoId: 'Xa0Q0J5tOP0',
                playerVars: {
                    color: 'white',
                    playlist: 'taJ60kskkns,FG0fTKAqZ5g'
                },
                events: {
                    onReady: function (s) {
                        console.log('SHIIIIT')
                        console.log(s)
                    },
                    onStateChange: function (s) {
                        console.log('SHIIIIT CHANGE')
                        console.log(s)
                    }
                }
            });
        } else {
            setTimeout(readyYoutube, 100);
        }
    }

    readyYoutube()

    const videoModal = new Modal('videoModal', {
        openButtonId: 'openModal',
        closeElementsClasses: ['modal__background', 'modal__close'],
    })

    const enjoyModal = new Modal('enjoyModal', {
        closeElementsClasses: ['modal__background', 'modal__close', 'submit__btn'],
    })

    const errorModal = new Modal('errorModal', {
        closeElementsClasses: ['modal__background', 'modal__close', 'submit__btn'],
    })

    const videoForm = new Form('videoForm', 'submit__btn', data => {
        videoModal.close()
        video.addVideoToPlaylist(data) ? enjoyModal.open() : errorModal.open()
    })
}, false);
