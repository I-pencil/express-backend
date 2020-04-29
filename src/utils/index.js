export function promiseCatch(promise) {
  return promise
    .then((data) => [null, data])
    .catch((err) => {
      return [err];
    });
}
