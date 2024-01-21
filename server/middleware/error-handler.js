export const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    //default
    statusCode: err.statusCode || 500,
    msg: err.message || "Algo deu errado tente mais tarde",
  };

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }
  if (err.name === "CastError") {
    customError.msg = `Nenhum item com essa ID: ${err.value}`;
    customError.statusCode = 404;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Valores duplicados para essa chave ${Object.keys(
      err.keyValue
    )}, por favor escolha outro valor`;
    customError.statusCode = 400;
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};
