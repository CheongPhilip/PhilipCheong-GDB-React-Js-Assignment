import {} from "styled-components";
import {Theme} from "./theme";

declare module "styled-components" {
    type Theme = typeof Theme;
    export interface DefaultTheme extends Theme {}
}
