function handleCountry(
  extractProxy: string,
  country: string,
  scheme: SchemeType,
  _proxy: _ProxyType,
  type: Type
) {
  let _extractProxy = "";
  if (extractProxy.includes("_country-")) {
    let index = extractProxy.lastIndexOf("_");
    // If the index is 0, then it means that the proxy is only country based else there is a session
    _extractProxy = index === 0 ? "" : extractProxy.substring(index);
  } else {
    // a session might exist, or extractProxy is empty, assign to _
    _extractProxy = extractProxy;
  }
  let newProxy = country === "Random" ? "" : `_country-${country}`;
  let proxy = newProxy + _extractProxy;
  return handleType(proxy, type, _proxy, scheme);
}

export type Type = "rotating" | "static";
function handleType(
  extractProxy: string,
  type: Type,
  _proxy: _ProxyType,
  scheme: SchemeType
) {
  let session = generateRandomString();
  let _extractProxy = "";
  if (extractProxy.includes("_session-")) {
    let index = extractProxy.lastIndexOf("_");
    // If the index is 0, then it means that the proxy is only session based
    _extractProxy = index === 0 ? "" : extractProxy.substring(0, index);
  } else {
    // a session might exist, or extractProxy is empty, assign to _
    _extractProxy = extractProxy;
  }
  let newProxy = type === "rotating" ? "" : `_session-${session}`;
  let proxy = _extractProxy + newProxy;
  return handleScheme(proxy, _proxy, scheme);
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
function handleScheme(
  extractProxy: string,
  _proxy: _ProxyType,
  scheme: SchemeType
) {
  return formatProxy(_proxy, scheme, extractProxy);
}

function extractProxy(proxy: string, scheme: SchemeType, _proxy: _ProxyType) {
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
  return remainingProxy;
}

function formatProxy(
  _proxy: _ProxyType,
  scheme: SchemeType,
  remainingProxy: string
) {
  console.log(remainingProxy, "formatProxy");

  const { host, password, port, username } = _proxy;
  if (scheme === "host:port:user:pass") {
    return `${host}:${port}:${username}:${password}${remainingProxy}`;
  } else if (scheme === "user:pass@host:port") {
    return `${username}:${password}${remainingProxy}@${host}:${port}`;
  } else {
    return `${username}:${password}${remainingProxy}:${host}:${port}`;
  }
}
export function generateRandomString() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function generateProxies(
  proxy: string,
  type: Type,
  amount: number,
  scheme: SchemeType,
  prevScheme: SchemeType,
  country: string,
  _proxy: _ProxyType
): string[] {
  const proxies: string[] = [];
  let _amount = amount;
  let _extractProxy = extractProxy(proxy, prevScheme, _proxy);

  /* With a while loop, iterate over every amount to generate a proxy and store in the proxies array */
  while (_amount > 0) {
    const newProxy = handleCountry(
      _extractProxy,
      country,
      scheme,
      _proxy,
      type
    );
    proxies.push(newProxy);
    _amount--;
  }

  return proxies;
}
