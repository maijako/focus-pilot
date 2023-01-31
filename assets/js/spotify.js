window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let element = document.getElementById('embed-iframe');
    let options = {
        // width: '60%',
        // height: '300',
        uri: 'spotify:playlist:4Zjli1P13J5mmSCD5iKAXK'
    };
    let callback = (EmbedController) => {
        document.querySelectorAll('ul#episodes > li > button').forEach(
            episode => {
                episode.addEventListener('click', () => {
                    EmbedController.loadUri(episode.dataset.spotifyId)
                });
            })
    };
    IFrameAPI.createController(element, options, callback);
};




