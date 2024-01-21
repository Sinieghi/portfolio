export function handleSubmit(...subItems) {
  subItems[3].preventDefault();
  const dispatch = subItems[0];
  const method = subItems[1];
  const variables = subItems[2];
  dispatch(method(variables));
}
export function handleChange(e, dispatch, collector) {
  dispatch(collector({ name: e.target.name, value: e.target.value }));
}
