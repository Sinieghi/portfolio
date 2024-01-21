export function corsConfig(req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  if (process.env.NODE_ENV === "production") {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:7000");
  } else {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:7000");
  }
  next();
}
export function allowStripeRequest(req, res, next) {
  res.setHeader("Access-Control-Allow-Credentials", false);
  next();
}

export function urlSetter(path, searchParams) {
  return process.env.ALLOWED_ORIGIN + `${path}${searchParams}`;
}
