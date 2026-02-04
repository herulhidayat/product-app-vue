/** String Helper Title Case  */
export function toTitleCase(str: string | undefined) {
  if (!str) return str;
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function abbreviation(text: any) {
  return text
    ?.split(/\s/)
    .reduce(function (accumulator: any, word: any) {
      return accumulator + word.charAt(0);
    }, "")
    .substring(0, 2);
}

export function replaceAll(str: string, mapObj: any) {
  if (!str) return str;

  const re = new RegExp(Object.keys(mapObj).join("|"), "gi");

  return str.replace(re, function (matched: any) {
    return mapObj[matched.toLowerCase()];
  });
}

export function camelToSnakeCase(str: string) {
  return str.replace(
    new RegExp(/[A-Z]/g),
    (letter) => `_${letter.toLowerCase()}`
  );
}

export function camelCaseToTitleCase(s?: string) {
  if (!s) return "";
  const result = s.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function breakText(
  text: string,
  rowLength: number = 30,
  separator: string = "\n"
) {
  const re = new RegExp(`.{1,${rowLength}}`, "g");
  const splitted = text.match(re);
  return splitted?.join(separator);
}

export function parseUrl(href: string) {
  const match = href.match(
    /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
  );
  return (
    match && {
      href: href,
      protocol: match[1],
      host: match[2],
      hostname: match[3],
      port: match[4],
      pathname: match[5],
      search: match[6],
      hash: match[7],
    }
  );
}

export function isAlphaNumeric(str: string) {
  let code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (
      !(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)
    ) {
      // lower alpha (a-z)
      return false;
    }
  }
  return true;
}
