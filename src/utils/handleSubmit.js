function handleSubmit(request, { onLoading, onSuccess, onError, onFinally }) {
  if (onLoading) onLoading(true);

  request()
    .then((result) => {
      if (onSuccess) onSuccess(result);
    })
    .catch((err) => {
      if (onError) onError(err);
      else console.error(err); // fallback error handler
    })
    .finally(() => {
      if (onLoading) onLoading(false);
      if (onFinally) onFinally();
    });
}

export default handleSubmit;
