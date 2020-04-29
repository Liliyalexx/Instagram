import React from 'react';
import Emojis from "react-emoji-render";

 
function MyEmojiRenderer({ children, ...rest }) {
  const options = {
    baseUrl: "https://mycustom.cdn.com/emojis/",
    ext: "svg",
  };
 
  return <MyEmojiRenderer options={options} {...rest} />;
}
export default MyEmojiRenderer;