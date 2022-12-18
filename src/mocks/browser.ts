import { setupWorker } from "msw";
import { mockRepository } from "./handlers";
import _ from "lodash-es";

export const worker = setupWorker(..._.values(mockRepository));
