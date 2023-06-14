setTimeout(() => {
    const subscriptions = document.querySelectorAll('ytd-channel-renderer')
    const formattedSubscriptions = Array.from(subscriptions).map(subscription => subscription.querySelector('#channel-title').querySelector('#text').textContent)
    localStorage.setItem('subscriptions', JSON.stringify(formattedSubscriptions))
    window.location.replace('/feed/history')
}, 1000)