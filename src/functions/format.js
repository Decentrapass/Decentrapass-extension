import { IF } from "../constants/AddInterfaces";
import { TYPES } from "../constants/constants";

// Adds the spaces to credit cards. EX: 0000 0000 0000 0000
export const formatCard = (card) => {
  let result = "";
  for (let i = 0; i < card.length; i += 4) {
    result += card.substring(i, i + 4) + " ";
  }
  return result.substring(0, result.length - 1);
};

// Calls the contract and formats the received data into objects
export async function formatData(numItems, contract, acc) {
  let arr = [];
  let count = 0;
  for (let i = 0; i < numItems; i++) {
    let itemData = await contract.objects(acc, i).call();

    let type = itemData[0];

    if (itemData[1] != "") {
      let ipfsData;

      // IPFS Gateway + saved hash in contract
      let url = "https://gateway.ipfs.io/ipfs/" + itemData[1];

      let res = await fetch(url);
      ipfsData = await res.text();

      let receivedData = ipfsData.split(",");

      let data = {
        numId: count++,
        id: i,
        type: TYPES[type],
      };

      // Grabbing the corresponding interface for type
      let correspondingIF = Object.keys(IF[TYPES[type]]);

      for (let j = 0; j < receivedData.length; j++) {
        data[correspondingIF[j]] = receivedData[j];
      }

      arr.push(data);
    }
  }

  return arr;
}

// Gets an account and returns 0x + n first numbers + "..." + n last numbers
export function formatAccount(acc, n) {
  if (acc === "guest") return acc;

  acc = acc || "";
  let shortAcc =
    acc.substring(0, n + 2) + "..." + acc.substring(acc.length - n, acc.length);

  return shortAcc;
}
