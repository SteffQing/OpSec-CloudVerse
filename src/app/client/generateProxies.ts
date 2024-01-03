export function handleCountry(
  proxy: string,
  country: string,
  scheme: SchemeType,
  _proxy: _ProxyType
) {
  const { remainingProxy } = extractHostPortUserPass_and_RemainingProxy(
    proxy,
    scheme,
    _proxy
  );
  if (country === "Random") {
    if (remainingProxy.includes("_country-")) {
      let index1 = remainingProxy.indexOf("_");
      let index2 = remainingProxy.lastIndexOf("_");
      if (index1 === index2) {
        return formatProxy(_proxy, scheme, "");
      } else {
        let _remainingProxy = remainingProxy.substring(index2);
        return formatProxy(_proxy, scheme, _remainingProxy);
      }
    }
    return proxy;
  } else {
    if (remainingProxy.includes("_country-")) {
      let index1 = remainingProxy.indexOf("_");
      let index2 = remainingProxy.lastIndexOf("_");
      if (index1 === index2) {
        let newCountryProxy = "_country-" + country;
        return formatProxy(_proxy, scheme, newCountryProxy);
      } else {
        let newCountryProxy = "_country-" + country;
        let _remainingProxy = remainingProxy.substring(index2);
        let newProxy = newCountryProxy + _remainingProxy;
        return formatProxy(_proxy, scheme, newProxy);
      }
    } else {
      let newCountryProxy = "_country-" + country;
      let newProxy = newCountryProxy + remainingProxy;
      return formatProxy(_proxy, scheme, newProxy);
    }
  }
}
export function handleAmount(
  proxy: string,
  amount: number,
  scheme: SchemeType,
  _proxy: _ProxyType
): string | string[] {
  if (amount === 0 || amount === 1) {
    return proxy;
  }
  const { remainingProxy } = extractHostPortUserPass_and_RemainingProxy(
    proxy,
    scheme,
    _proxy
  );
  const proxies = [proxy];
  for (let i = 1; i < amount; i++) {
    let newSession = generateRandomString();
    if (remainingProxy.includes("_session-")) {
      let index = remainingProxy.indexOf("_session-");
      let _remainingProxy = remainingProxy.substring(0, index);
      let newProxy = _remainingProxy + `_session-` + newSession;
      proxies.push(formatProxy(_proxy, scheme, newProxy));
    } else {
      //   let newProxy = remainingProxy + `_session-` + newSession;
      proxies.push(formatProxy(_proxy, scheme, remainingProxy));
    }
  }
  return proxies;
}
export type Type = "rotating" | "static";
export function handleType(
  proxy: string,
  type: Type,
  _proxy: _ProxyType,
  amount: number,
  scheme: SchemeType
) {
  if (type === "rotating") {
    if (amount === 0 || amount === 1) {
      return proxy;
    } else {
      let proxies = [proxy];
      for (let i = 1; i < amount; i++) {
        proxies.push(proxy);
      }
      return proxies;
    }
  } else {
    if (amount === 0 || amount === 1) {
      return proxy;
    } else {
      return handleAmount(proxy, amount, scheme, _proxy);
    }
  }
}

export type SchemeType =
  | "host:port:user:pass"
  | "user:pass@host:port"
  | "user:pass:host:port";
interface _ProxyType {
  host: string;
  port: string;
  username: string;
  password: string;
}
export function handleScheme(
  proxy: string,
  _proxy: _ProxyType,
  prevScheme: SchemeType,
  scheme: SchemeType
) {
  const { host, password, port, username } = _proxy;
  if (prevScheme === "host:port:user:pass") {
    if (proxy === `${host}:${port}:${username}:${password}`) {
      if (scheme === "user:pass@host:port") {
        return `${username}:${password}@${host}:${port}`;
      }
      return `${username}:${password}:${host}:${port}`;
    }
    // Else, it has some proxy inbetween
    let index = proxy.indexOf(password) + password.length;
    let newProxy = proxy.substring(index);
    if (scheme === "user:pass@host:port") {
      return `${username}:${password}${newProxy}@${host}:${port}`;
    }
    return `${username}:${password}${newProxy}:${host}:${port}`;
  } else if (prevScheme === "user:pass@host:port") {
    if (proxy === `${username}:${password}@${host}:${port}`) {
      if (scheme === "host:port:user:pass") {
        return `${host}:${port}:${username}:${password}`;
      }
      return `${username}:${password}:${host}:${port}`;
    }
    let userPassIndex = proxy.indexOf(password) + password.length;
    let newProxy = proxy.substring(userPassIndex);
    let hostPortIndex = newProxy.indexOf(`@${host}:${port}`);
    let remainingProxy = newProxy.substring(0, hostPortIndex);
    if (scheme === "host:port:user:pass") {
      return `${host}:${port}:${username}:${password}${remainingProxy}`;
    }
    return `${username}:${password}${remainingProxy}:${host}:${port}`;
  } else if (prevScheme === "user:pass:host:port") {
    if (proxy === `${username}:${password}:${host}:${port}`) {
      if (scheme === "host:port:user:pass") {
        return `${host}:${port}:${username}:${password}`;
      }
      return `${username}:${password}@${host}:${port}`;
    }
    let indexH = proxy.indexOf(host) - 1;
    let indexP = proxy.indexOf(password) + password.length;
    let newProxy = proxy.substring(indexP, indexH);
    if (scheme === "host:port:user:pass") {
      return `${host}:${port}:${username}:${password}${newProxy}`;
    }
    return `${username}:${password}${newProxy}@${host}:${port}`;
  }
  return proxy;
}

function extractHostPortUserPass_and_RemainingProxy(
  proxy: string,
  scheme: SchemeType,
  _proxy: _ProxyType
) {
  let remainingProxy = "";
  let { host, password, port, username } = _proxy;
  if (scheme === "host:port:user:pass") {
    let index = proxy.lastIndexOf(":");
    let _index = index + password.length;
    remainingProxy = proxy.substring(_index + 1);
  } else if (scheme === "user:pass@host:port") {
    let index = proxy.indexOf(":") + password.length + 1;
    let _index = proxy.indexOf("@");
    remainingProxy = proxy.substring(index, _index);
  } else if (scheme === "user:pass:host:port") {
    let index = proxy.indexOf(":") + password.length + 1;
    let _index = proxy.indexOf(host) - 1;
    remainingProxy = proxy.substring(index, _index);
  }
  return { host, port, username, password, remainingProxy };
}

function formatProxy(
  _proxy: _ProxyType,
  scheme: SchemeType,
  remainingProxy: string
) {
  const { host, password, port, username } = _proxy;
  if (scheme === "host:port:user:pass") {
    return `${host}:${port}:${username}:${password}${remainingProxy}`;
  } else if (scheme === "user:pass@host:port") {
    return `${username}:${password}${remainingProxy}@${host}:${port}`;
  } else {
    return `${username}:${password}${remainingProxy}:${host}:${port}`;
  }
}
function generateRandomString() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
