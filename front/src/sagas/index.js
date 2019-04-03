import { spawn } from "redux-saga/effects";
import {
  watchUserSignInSaga,
  watchUserSignOutSaga,
  watchUserSignUpSaga,
  watchUserConfirmSaga
} from "./userAuth.saga";
import { watchLoadUserSaga } from "./userLoad.saga";

export default function*() {
  yield spawn(watchUserSignInSaga);
  yield spawn(watchUserSignUpSaga);
  yield spawn(watchUserConfirmSaga);
  yield spawn(watchUserSignOutSaga);
  yield spawn(watchLoadUserSaga);
}
