import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const setCookie = ({ data, cookieName, time }: { data: any; cookieName: string; time: number }) => {
  const dataToJson = JSON.stringify(data);

  if (time) {
    cookies.set(cookieName, dataToJson, {
      path: '/',
      maxAge: time,
      sameSite: true,
    });
  } else {
    cookies.set(cookieName, dataToJson, { path: '/', sameSite: true });
  }
};

export const getCookie = (cookieName: string) => {
  return cookies.get(cookieName);
};

export const deleteCookie = (cookieName: string) => {
  cookies.remove(cookieName, { path: '/', sameSite: true });
};
