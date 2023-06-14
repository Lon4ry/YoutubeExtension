setTimeout(() => {
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions'))
    localStorage.removeItem('subscriptions')
    const videos = document.querySelectorAll('ytd-video-renderer');
    for (let i = 0; i < videos.length; i++) {
        const author = videos[i].querySelector('#channel-name').querySelector('#text').textContent
        let percent = videos[i].querySelector('#progress').style.width
        percent = Number(percent.slice(0, percent.length - 1))
        console.log({author: author, percent: percent, doc: videos[i]})
        console.log(subscriptions.includes(author))
        if (percent <= 90 && subscriptions.includes(author)) return window.location.replace(videos[i].querySelector('a').href)
    }
}, 1000)