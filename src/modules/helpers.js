import * as video from './video'

export function htmlToElement(html) {
  let template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;

  return template.content.firstChild;
}

export function fillHtmlWithVideoData ({id, author, title, link}) {
  return '<li class="video__info__container eg-flexCenter eg-justifyContentCenter">' +
    '<div class="tooltip">'+ link +'</div>' +
    '<div class="video__info video__id">' + id + '</div>' +
    '<div class="video__info video__title">' + title + '</div>' +
    '<div class="video__info video__author">' + author + '</div>' +
    '<div class="video__info video__control eg-flex">' +
    '<span class="video__play icon icon-play" videoId="' + id + '"></span>' +
    '<span class="video__delete icon icon-delete" videoId="' + id + '"></span>' +
    '</div>' +
    '</li>'
}

export function displayVideo (videoInfo) {
  let html = fillHtmlWithVideoData(videoInfo);
  let videoList = document.getElementsByClassName('videos__list')[0];

  videoList.appendChild(htmlToElement(html))
}

export function updateVideosButtonsEvens(playerObj) {
  let player = playerObj;
  let videoList = document.getElementsByClassName('videos__list')[0];
  let playBtns = videoList.getElementsByClassName('video__play');
  for (let index = 0; index < playBtns.length; index++) {
    let playBtn = playBtns[index];
    playBtn.addEventListener('click', function () {
      let videoId = playBtn.getAttribute('videoId');
      changeActiveVideo(videoId)
      player.playCustomVideo(video.findVideo(videoId));
    })
  }

  let deleteBtns = videoList.getElementsByClassName('video__delete');
  for (let index = 0; index < deleteBtns.length; index++) {
    let deleteBtn = deleteBtns[index];
    deleteBtn.addEventListener('click', function () {
      let videoId = this.getAttribute('videoId');
      if (video.removeVideo(videoId)) {
        let containerNode = this.parentNode.parentNode;
        containerNode.parentNode.removeChild(containerNode)
      }
    })
  }
}

export function changeActiveVideo(videoId) {
  let listOfElements = document.getElementsByClassName('video__control active')
  for (let index = 0; index < listOfElements.length; index++) {
    listOfElements[index].classList.remove('active')
  }

  let playBtns = document.getElementsByClassName('video__play')
  for (let index = 0; index < playBtns.length; index++) {
    if (playBtns[index].getAttribute('videoId') == videoId) {
      playBtns[index].parentNode.classList.add('active')
    }
  }
}

export function getVideoIdFromYoutubeUrl(url) {
  let rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  let matches = url.match(rx)
  if (matches) {
    return matches[1]
  }

  return url
}
