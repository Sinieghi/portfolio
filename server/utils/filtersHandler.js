export const filtersHandler = async (queryNotifier, fretes, result) => {
  let msg = [];

  if (Boolean(fretes.length)) return (msg = []);
  const freteMessage = queryNotifier.map((msgContent) => {
    switch (msgContent.msg) {
      case "name":
        if (Boolean(fretes.length)) return fretes;
        msg = "inp1 Não encontrado";
        break;
      case "city":
        if (Boolean(fretes.length)) fretes;
        msg = "inp2 Não encontrado";
        break;
      case "date":
        if (Boolean(fretes.length)) fretes;
        msg = "inp3 Data não encontrada";
        break;
      case "loadType":
        if (Boolean(fretes.length)) fretes;
        msg = "inp4 Tipo de carga não encontrado";
        break;
      case "states":
        if (Boolean(fretes.length)) fretes;
        msg = "inp5 Estado não encontrado";
        break;
      case "body special":
        if (Boolean(fretes.length)) fretes;
        msg = "inp6 Nenhum fretes para esse tipo carroceria epeciais";
        break;
      case "body closed":
        if (Boolean(fretes.length)) fretes;
        msg = "inp7 Nenhum fretes para esse tipo carroceria fechada";
        break;
      case "body open":
        if (Boolean(fretes.length)) fretes;
        msg = "inp8 Nenhum fretes para esse tipo carroceria aberta";
        break;
      case "ligth":
        if (Boolean(fretes.length)) fretes;
        msg = "inp9 Veículo pesado não encontrado";
        break;
      case "medium":
        if (Boolean(fretes.length)) fretes;
        msg = "inp10 Veículo medio não encontrado";
        break;
      case "heavy":
        if (Boolean(fretes.length)) fretes;
        msg = "inp11 Veículo leve não encontrado";
        break;
      default:
        break;
    }
    return msg;
  });
  [...msg, ...freteMessage];
  return msg;
};
