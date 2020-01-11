import React from "react";
import { mount, lazy, route } from "navi";
import { Hello } from "./components/Hello";

export const routes = mount({
  "/": route({
    title: "Meee",
    view: <Hello />
  })
  // "/voc": lazy(() => import("./components/VocabularyWindow/VocabularyWindow"))
});
