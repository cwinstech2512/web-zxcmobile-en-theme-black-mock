// import env from '/env';
// import { accountService } from '@/_services';

const facebookAppId = '580856374218206'

export function initFacebookSdk () {
  window.fbAsyncInit = function () {
    const FB = window.FB
    FB.init({
      appId: facebookAppId,
      cookie: true,
      xfbml: true,
      version: 'v13.0'
    })
  }

  // load facebook sdk script
  ;(function (d, s, id) {
    var js
    var fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) { return }
    js = d.createElement(s); js.id = id
    js.src = 'https://connect.facebook.net/en_US/sdk.js'
    fjs.parentNode.insertBefore(js, fjs)
  }(document, 'script', 'facebook-jssdk')
  )
}
