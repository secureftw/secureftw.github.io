import React from "react";
import { IPlayer } from "../../../../../../packages/neo/contracts/ftw/tournament/interfaces";
import DisplayRune from "../../../DisplayRune";
import { fight } from "../helpers";
import { useWallet } from "../../../../../../packages/provider";

interface ITournamentTree {
  champ: string;
  nonce: string;
  tree: IPlayer[];
  onClick: (obj) => void;
}

function* chunks(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

const TournamentTree = ({ onClick, champ, tree, nonce }: ITournamentTree) => {
  const { network } = useWallet();
  // @ts-ignore
  let arena16: IPlayer[] = [];
  let arena8: IPlayer[] = [];
  let arena4: IPlayer[] = [];
  let arena2: IPlayer[] = [];
  // @ts-ignore
  const arena32 = [...chunks(tree, 2)];
  arena32.forEach((arr) => {
    const res = fight(
      arr[0].phase,
      arr[0].luck,
      arr[1].phase,
      arr[1].luck,
      nonce
    );
    if (res === "A") {
      arena16.push(arr[0]);
    } else {
      arena16.push(arr[1]);
    }
  });
  // @ts-ignore
  arena16 = [...chunks(arena16, 2)];
  arena16.forEach((arr) => {
    const res = fight(
      arr[0].phase,
      arr[0].luck,
      arr[1].phase,
      arr[1].luck,
      nonce
    );
    if (res === "A") {
      arena8.push(arr[0]);
    } else {
      arena8.push(arr[1]);
    }
  });
  // @ts-ignore
  arena8 = [...chunks(arena8, 2)];
  arena8.forEach((arr) => {
    const res = fight(
      arr[0].phase,
      arr[0].luck,
      arr[1].phase,
      arr[1].luck,
      nonce
    );
    if (res === "A") {
      arena4.push(arr[0]);
    } else {
      arena4.push(arr[1]);
    }
  });
  // @ts-ignore
  arena4 = [...chunks(arena4, 2)];
  arena4.forEach((arr) => {
    const res = fight(
      arr[0].phase,
      arr[0].luck,
      arr[1].phase,
      arr[1].luck,
      nonce
    );
    if (res === "A") {
      arena2.push(arr[0]);
    } else {
      arena2.push(arr[1]);
    }
  });

  // @ts-ignore
  arena2 = [...chunks(arena2, 2)];

  // @ts-ignore
  const arenaTree = [arena2, arena4, arena8, arena16, arena32];

  return (
    <>
      <div className="is-flex mb-5" style={{ justifyContent: "safe center" }}>
        <DisplayRune
          network={network}
          onClick={(obj) => {
            onClick(obj);
          }}
          width={"128px"}
          height={"128px"}
          tokenId={champ}
        />
      </div>
      {arenaTree.map((arena) => {
        return (
          <div className="is-flex mb-5" style={{ justifyContent: "center" }}>
            {arena.map((arr, i) => {
              const winner = fight(
                arr[0].phase,
                arr[0].luck,
                arr[1].phase,
                arr[1].luck,
                nonce
              );
              return (
                <div
                  className={`is-flex ${arena.length - 1 !== i ? "mr-5" : ""} `}
                >
                  <div style={{ opacity: winner === "A" ? "1" : "0.3" }}>
                    <DisplayRune
                      network={network}
                      onClick={(obj) => {
                        onClick(obj);
                      }}
                      width={"32px"}
                      height={"32px"}
                      tokenId={arr[0].tokenId}
                    />
                  </div>
                  <div style={{ opacity: winner === "B" ? "1" : "0.3" }}>
                    <DisplayRune
                      network={network}
                      onClick={(obj) => {
                        onClick(obj);
                      }}
                      width={"32px"}
                      height={"32px"}
                      tokenId={arr[1].tokenId}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default TournamentTree;
