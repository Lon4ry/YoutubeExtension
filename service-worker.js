const getVideos = () => {
    chrome.webNavigation.onCompleted.removeListener(getVideos)
    chrome.tabs.query({
        url: 'https://www.youtube.com/feed/history'
    }, (tabs => chrome.scripting.executeScript({
        target: {tabId: tabs[tabs.length - 1].id}, files: ["getVideos.js"]
    })))
}
const getSubscriptions = () => {
    chrome.webNavigation.onCompleted.removeListener(getSubscriptions)
    chrome.tabs.query({
        url: 'https://www.youtube.com/feed/channels'
    }, (tabs => chrome.scripting.executeScript({
        target: {tabId: tabs[tabs.length - 1].id}, files: ["getSubscriptions.js"]
    }, async () => await chrome.storage.local.set({subscriptions: true}))))

}

chrome.runtime.onMessage.addListener((message) => {
    if (message.do === 'youtube-last-seen') chrome.tabs.create({url: 'https://www.youtube.com/feed/channels'}).then(() => chrome.webNavigation.onCompleted.addListener(getSubscriptions))
})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    const state = await chrome.storage.local.get()
    if (tab.url === 'https://youtube.localhost/' && tab.active && changeInfo.status === 'complete') {
        chrome.tabs.create({url: 'https://www.youtube.com/feed/channels'}).then(() => {
            chrome.tabs.remove(tab.id).then()
            chrome.webNavigation.onCompleted.addListener(getSubscriptions)
        })
    } else if (changeInfo.url === 'https://www.youtube.com/feed/history' && state['subscriptions']) {
        await chrome.storage.local.remove('subscriptions');
        chrome.webNavigation.onCompleted.addListener(getVideos);
    }
})