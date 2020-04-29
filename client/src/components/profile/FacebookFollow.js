import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook} from "@fortawesome/free-brands-svg-icons";

export default function FaceBookFollow() {
  return (
    <div>
      <h6>FacebookFollow</h6>
      <a
  href="https://www.facebook.com/learnbuildteach/"
  className="facebook social"
>
  <FontAwesomeIcon icon={faFacebook} size="2x" />
</a>
    </div>
  );
}