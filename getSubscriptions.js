setTimeout(() => {
    const subscriptions = document.querySelectorAll('ytd-channel-renderer')
    const formattedSubscriptions = Array.from(subscriptions).map(subscription => subscription.querySelector('#channel-title').querySelector('#text').textContent)
    localStorage.setItem('subscriptions', JSON.stringify(formattedSubscriptions))
    getVideo()
}, 250)

const getVideo = () => {
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions'))
    const videos = JSON.parse(localStorage.getItem('videos'))
    for (let i = 0; i < videos.length; i++) {
        if (videos[i])
            if (subscriptions.includes(videos[i].author))
                return window.location.replace(videos[i].href)
    }
}