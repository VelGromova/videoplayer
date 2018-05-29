export function findVideo({author, title, link}) {
    let videos = JSON.parse(window.localStorage.getItem('videos'))

    return videos.findIndex((video) =>
        video.author === author &&
        video.title === title &&
        video.link === link
    )
}

export function removeVideoFromPlaylist(index) {
    let videos = JSON.parse(window.localStorage.getItem('videos'))

    try {
        videos.splice(index, 1)
        window.localStorage.setItem('videos', JSON.stringify(videos))

        return true
    } catch (error) {
        return false;
    }
}

export function addVideoToPlaylist({author, title, link}) {
    let videos = JSON.parse(window.localStorage.getItem('videos'))
    videos = videos ? videos : []
    if (
        videos.find((video) =>
            video.author === author &&
            video.title === title &&
            video.link === link
        )
    ) {
        return false;
    }

    videos.push({author, title, link})
    window.localStorage.setItem('videos', JSON.stringify(videos))

    return true;
}

export function getVideos() {
    let videos = JSON.parse(window.localStorage.getItem('videos'))

    return videos ? videos : []
}
