document.querySelector('#btn').addEventListener('click', () => {
    (async () => {
        await chrome.runtime.sendMessage({do: 'youtube-last-seen'})
    })()
})