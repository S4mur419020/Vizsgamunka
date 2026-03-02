import { useContext } from "react";
import { TranslationContext } from "./TranslationProvider";

export default function useTranslation() {
  return useContext(TranslationContext);
}