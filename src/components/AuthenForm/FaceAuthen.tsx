import { AuthenFormUtils } from '../../utils';

const FaceAuthen = (() => {
  return {
    AuthPopup(host: string, redirectUrl: string, popupName: string, email?: string) {
      return new Promise((resolve, reject) => {
        const url = host + `?redirect_url=${redirectUrl}${email && `&email${email}`}`;

        const registerWindowPopup = AuthenFormUtils.openPopupResize(url, popupName);
        console.log({ registerWindowPopup });
        if (!registerWindowPopup) {
          reject({ error: true, msg: 'Popup Blocked' });
        }

        if (registerWindowPopup?.focus) {
          window.focus();
        }

        // checking status window
        const intervalId = setInterval(() => {
          if (registerWindowPopup?.closed) {
            clearInterval(intervalId);
            reject({ error: true, msg: 'User Cancelled' });
          }

          let href: string | undefined = '';
          try {
            href = registerWindowPopup?.location.href;
          } catch (err) {
            console.log(err);
          }

          // checking href or black page
          if (!href || href === 'about::blank') {
            return;
          }

          console.log({ href });

          if (href.startsWith(redirectUrl)) {
            console.log('Server send href', href);
            clearInterval(intervalId);
            resolve({ success: true, href });
            registerWindowPopup?.close();
          }
        }, 50);
      });
    },
  };
})();

export default FaceAuthen;
