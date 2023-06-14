setTimeout(() => {
    const videos = document.querySelectorAll('ytd-video-renderer');
    const formattedVideos = Array.from(videos).map(video => {
        try {
            let percent = video.querySelector('#progress').style.width

            percent = Number(percent.slice(0, percent.length - 1))
            const author = video.querySelector('#channel-name').querySelector('#text').textContent
            if (percent <= 75) return {author: author, href: video.querySelector('a').href}
        } catch (e) {
        }
        return null
    })
    localStorage.setItem('videos', JSON.stringify(formattedVideos))
    window.location.replace('/feed/channels')
}, 1000)