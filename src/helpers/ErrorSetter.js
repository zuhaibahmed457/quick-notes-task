export default function ErrorsSetter(error) {
  let errObj = {};
  for (const [key, value] of Object.entries(error?.data?.error)) {
    errObj = {...errObj, [key]: value[0]};
  }
  return errObj;
}
