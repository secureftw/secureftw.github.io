import React from "react";
import { FaDiscord, FaMedium, FaTwitter, FaGithub } from "react-icons/fa";

const SocialLinkGroup = () => {
  return (
    <>
      <a
        target="_blank"
        href="https://twitter.com/N3_FTW_NETWORK"
        className="button is-white is-small"
      >
        <FaTwitter />
      </a>
      <a
        target="_blank"
        href="https://github.com/ForTheWinn"
        className="button is-white is-small"
      >
        <FaGithub />
      </a>
      <a
        target="_blank"
        href="https://discord.gg/A83mtQqsfP"
        className="button is-white is-small"
      >
        <FaDiscord />
      </a>
      <a
        target="_blank"
        href="https://medium.com/@Forthewin_network"
        className="button is-white is-small"
      >
        <FaMedium />
      </a>
    </>
  );
};

export default SocialLinkGroup;
