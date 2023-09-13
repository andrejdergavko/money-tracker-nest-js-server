export function cookieParser(cookieString: string) {
  if (cookieString === '') return {};

  const pairs = cookieString.split(';');

  const splittedPairs = pairs.map((cookie) => cookie.split('='));

  const cookieObj: Record<string, string> = splittedPairs.reduce<
    Record<string, string>
  >(function (acc, part) {
    acc[decodeURIComponent(part[0].trim())] = decodeURIComponent(
      part[1].trim(),
    );

    return acc;
  }, {});

  return cookieObj;
}
