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
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://portfolio-8d5e6.web.app"
    );
  } else {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://portfolio-8d5e6.web.app"
    );
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
