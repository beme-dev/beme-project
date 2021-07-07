export function sleep(millis: number) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

export async function sleepPromise(
  millis: number,
  promise: Promise<any>,
) {
  const wait = new Promise((resolve) =>
    setTimeout(resolve, millis),
  );
  await wait;
  return promise;
}