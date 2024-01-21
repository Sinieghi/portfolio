import Frete from "../models/Frete.js";

export async function handleLimiter({ user, body, res }) {
  const freteLimit = await Frete.findOne({
    createdBy: user._id,
    isConcluded: false,
  }).countDocuments();
  switch (user.signaturePlan) {
    case "teste":
      //100
      if (freteLimit <= 99) {
        await Frete.create(body);
        res.status(201).json({ msg: "success!" });
        break;
      }
    case "básico":
      //17
      if (freteLimit <= 16) {
        await Frete.create(body);
        res.status(201).json({ msg: "success!" });
        break;
      }
    //25
    case "avançado":
      if (freteLimit <= 24) {
        await Frete.create(body);
        res.status(201).json({ msg: "success!" });
        break;
      }
    //37
    case "premium":
      if (freteLimit <= 36) {
        await Frete.create(body);
        res.status(201).json({ msg: "success!" });
        break;
      }
    default:
      res.status(400).json({ msg: "Limite de fretes foi atingido!" });
  }
}
