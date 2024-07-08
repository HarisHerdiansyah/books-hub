export default function mockAuth(param) {
  return new Promise((resolve, reject) => {
    if (param === 'ok') {
      resolve();
    } else {
      reject();
    }
  });
}
