const getVideos = () => {
    chrome.webNavigation.onCompleted.removeListener(getVideos)
    chrome.tabs.query({
        url: 'https://www.youtube.com/feed/history'
    }, (tabs => chrome.scripting.executeScript({
        target: {tabId: tabs[tabs.length - 1].id}, files: ["getVideos.js"]
    }, () => console.log)))
    chrome.storage.local.set({videos: true}).then()
}
const getSubscriptions = () => {
    chrome.webNavigation.onCompleted.removeListener(getSubscriptions)
    chrome.tabs.query({
        url: 'https://www.youtube.com/feed/channels'
    }, (tabs => chrome.scripting.executeScript({
        target: {tabId: tabs[tabs.length - 1].id}, files: ["getSubscriptions.js"]
    }, () => console.log)))
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const state = await chrome.storage.local.get('videos')
    if (tab.url === 'https://youtube.localhost/' && tab.active && changeInfo.status === 'complete') {
        chrome.tabs.create({url: 'https://www.youtube.com/feed/history'}).then(() => chrome.webNavigation.onCompleted.addListener(getVideos))
        chrome.tabs.remove(tab.id).then()
    } else if (changeInfo.url === 'https://www.youtube.com/feed/channels' && state['videos']) {
        console.log(true)
        await chrome.storage.local.remove('videos');
        chrome.webNavigation.onCompleted.addListener(getSubscriptions);
    }
})