// pages/preference/[id].js

import React from "react";
import { useRouter } from "next/router";

function Preference() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Preference Page</h1>
      <p>Preference ID: {id}</p>
      {/* Add additional content for the preference page */}
    </div>
  );
}

export default Preference;
