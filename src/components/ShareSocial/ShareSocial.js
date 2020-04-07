import React from "react";
import styled from "styled-components";

import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

const ShareSocial = (props) => {
  return (
    <Wrapper>
      <FacebookShareButton
        quote={
          "Hush - a secret sharing application. Come explore and share your secrets."
        }
        url={props.url}
      >
        <FbIcon borderRadius={8} />
      </FacebookShareButton>
      <TwitterShareButton
        title={"Hush - a secrets sharing application"}
        url={props.url}
      >
        <TwitIcon borderRadius={8} />
      </TwitterShareButton>
      <WhatsappShareButton
        title={"Hush - a secrets sharing application"}
        url={props.url}
      >
        <WhatIcon borderRadius={8} />
      </WhatsappShareButton>
      <EmailShareButton
        subject={"Hush - a secrets sharing application"}
        body={"Come explore this application and learn other people secrets."}
        url={props.url}
      >
        <MailIcon borderRadius={8} />
      </EmailShareButton>
    </Wrapper>
  );
};

export { ShareSocial };

const Wrapper = styled.span`
  text-align: right;
  margin: 1% 0;
  display: flex;
  flex-direction: row;
`;

const FbIcon = styled(FacebookIcon)`
  &:hover {
    opacity: 0.7;
  }
`;

const TwitIcon = styled(TwitterIcon)`
  &:hover {
    opacity: 0.7;
  }
`;

const WhatIcon = styled(WhatsappIcon)`
  &:hover {
    opacity: 0.7;
  }
`;

const MailIcon = styled(EmailIcon)`
  &:hover {
    opacity: 0.7;
  }
`;
