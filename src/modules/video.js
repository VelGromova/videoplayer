export function findVideo(id) {
    let videos = JSON.parse(window.localStorage.getItem('videos'))

    return videos.find(video => video.id == id)
}

export function removeVideo(id) {
    let videos = JSON.parse(window.localStorage.getItem('videos'))

    try {
        let index = videos.findIndex(video => video.id == id)
        if (index >= 0) {
            videos.splice(index, 1)
            window.localStorage.setItem('videos', JSON.stringify(videos))

            return true
        }

        return false
    } catch (error) {
        return false;
    }
}

export function addVideo({author, title, link}) {
    let videos = JSON.parse(window.localStorage.getItem('videos'))
    videos = videos ? videos : []
    if (
        videos.find((video) =>
            video.author === author &&
            video.title === title &&
            video.link === link
        )
    ) {
        return -1;
    }

    let maxId = 0
    videos.forEach(video => {
        console.log(video)
        video.id > maxId ? maxId = video.id : ''
    })
    let id = maxId + 1;
    videos.push({id, author, title, link})
    window.localStorage.setItem('videos', JSON.stringify(videos))

    return id;
}

export function getVideos() {
    let videos = JSON.parse(window.localStorage.getItem('videos'))

    return videos ? videos : []
}
