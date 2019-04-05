import { spawn } from "redux-saga/effects";
import {
  watchUserSignInSaga,
  watchUserSignOutSaga,
  watchUserSignUpSaga,
  watchUserConfirmSaga,
  watchUserNewVerificationCode
} from "./userAuth.saga";
import {
  watchExecutorSignInSaga,
  watchExecutorSignOutSaga,
  watchExecutorSignUpSaga,
  watchExecutorConfirmSaga
} from "./executorAuth.saga";
import { watchLoadUserSaga } from "./userLoad.saga";
//import { watchLoadExecutorSaga } from "./executorLoad.saga";

export default function*() {
  yield spawn(watchUserSignInSaga);
  yield spawn(watchUserSignUpSaga);
  yield spawn(watchUserConfirmSaga);
  yield spawn(watchUserSignOutSaga);
  yield spawn(watchLoadUserSaga);
  yield spawn(watchExecutorSignInSaga);
  yield spawn(watchExecutorConfirmSaga);
  yield spawn(watchExecutorSignUpSaga);
  yield spawn(watchExecutorSignOutSaga);
  yield spawn(watchUserNewVerificationCode);

  // yield spawn(watchLoadExecutorSaga);
}
