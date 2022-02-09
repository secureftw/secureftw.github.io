export const fight = (aPhase, aLuck, bPhase, bLuck, nonce, gameNo) => {
  gameNo = parseFloat(gameNo);
  aLuck = parseFloat(aLuck);
  bLuck = parseFloat(bLuck);
  nonce = parseFloat(nonce);
  if (aPhase === bPhase) {
    return compareLuck(aLuck, bLuck, nonce);
  }

  switch (aPhase) {
    case "Fire":
      switch (bPhase) {
        case "Metal":
          aLuck = aLuck + 5;
          break;
        case "Wood":
          aLuck = aLuck + 3;
          break;
        case "Earth":
          aLuck = aLuck - 3;
          break;
        case "Water":
          aLuck = aLuck - 5;
          break;
        case "Dark":
          aLuck = aLuck - 3;
          break;
        case "Light":
          aLuck = aLuck + 3;
          break;
      }
      break;
    case "Water":
      switch (bPhase) {
        case "Fire":
          aLuck = aLuck + 5;
          break;
        case "Metal":
          aLuck = aLuck + 3;
          break;
        case "Wood":
          aLuck = aLuck - 3;
          break;
        case "Earth":
          aLuck = aLuck - 5;
          break;
        case "Dark":
          aLuck = aLuck - 3;
          break;
        case "Light":
          aLuck = aLuck + 3;
          break;
      }
      break;
    case "Wood":
      switch (bPhase) {
        case "Earth":
          aLuck = aLuck + 5;
          break;
        case "Water":
          aLuck = aLuck + 3;
          break;
        case "Fire":
          aLuck = aLuck - 3;
          break;
        case "Metal":
          aLuck = aLuck - 5;
          break;
        case "Dark":
          aLuck = aLuck - 3;
          break;
        case "Light":
          aLuck = aLuck + 3;
          break;
      }
      break;
    case "Earth":
      switch (bPhase) {
        case "Water":
          aLuck = aLuck + 5;
          break;
        case "Fire":
          aLuck = aLuck + 3;
          break;
        case "Metal":
          aLuck = aLuck - 3;
          break;
        case "Wood":
          aLuck = aLuck - 5;
          break;
        case "Dark":
          aLuck = aLuck - 3;
          break;
        case "Light":
          aLuck = aLuck + 3;
          break;
      }
      break;
    case "Metal":
      switch (bPhase) {
        case "Wood":
          aLuck = aLuck + 5;
          break;
        case "Earth":
          aLuck = aLuck + 3;
          break;
        case "Water":
          aLuck = aLuck - 3;
          break;
        case "Fire":
          aLuck = aLuck - 5;
          break;
        case "Dark":
          aLuck = aLuck - 3;
          break;
        case "Light":
          aLuck = aLuck + 3;
          break;
      }
      break;
    case "Dark":
      switch (bPhase) {
        case "Light":
          // Formula changed from Game#5
          aLuck = aLuck - (gameNo > 4 ? 5 : 3);
          break;
        default:
          aLuck = aLuck + 3;
          break;
      }
      break;
    case "Light":
      switch (bPhase) {
        case "Dark":
          // Formula changed from Game#5
          aLuck = aLuck + (gameNo > 4 ? 5 : 3);
          break;
        default:
          aLuck = aLuck - 3;
          break;
      }
      break;
  }
  return compareLuck(aLuck, bLuck, nonce);
};

const compareLuck = (aLuck, bLuck, nonce) => {
  if (aLuck > bLuck) {
    return "A";
  } else if (bLuck > aLuck) {
    return "B";
  } else {
    // tslint:disable-next-line:no-unused-expression
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    return nonce % 2 === 0 ? "A" : "B";
  }
  // else
  // {
  // 	var tx = (Transaction)Runtime.ScriptContainer;
  // 	return tx.Nonce % 2 == 0 ? "A" : "B";
  // }
};
