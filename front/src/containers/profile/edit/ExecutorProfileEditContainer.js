import { connect } from "react-redux";
import {
  editMainExecutor,
  changePasswordExecutor,
  editTypesOfCleaningExecutor
} from "../../../actions/executor.actions";
import ExecutorProfileEdit from "../../../components/profile/edit/ExecutorProfileEdit";

const mapStateToProps = state => ({
  role: state.profile.role,
  username: state.profile.data.username,
  city: state.profile.data.city,
  email: state.profile.data.email,
  phoneNumber: state.profile.data.phoneNumber,
  companyName: state.profile.data.companyName,
  description: state.profile.data.description,
  standartSmallRoom:
    state.profile.data.typesOfCleaning.standart.standartSmallRoom,
  standartBigRoom: state.profile.data.typesOfCleaning.standart.standartBigRoom,
  standartBathRoom:
    state.profile.data.typesOfCleaning.standart.standartBathRoom,
  generalBigRoom: state.profile.data.typesOfCleaning.general.generalBigRoom,
  generalSmallRoom: state.profile.data.typesOfCleaning.general.generalSmallRoom,
  generalBathRoom: state.profile.data.typesOfCleaning.general.generalBathRoom,
  afterRepairBigRoom:
    state.profile.data.typesOfCleaning.afterRepair.afterRepairBigRoom,
  afterRepairSmallRoom:
    state.profile.data.typesOfCleaning.afterRepair.afterRepairSmallRoom,
  afterRepairBathRoom:
    state.profile.data.typesOfCleaning.afterRepair.afterRepairBathRoom,
  bigCarpet: state.profile.data.typesOfCleaning.carpet.bigCarpet,
  smallCarpet: state.profile.data.typesOfCleaning.carpet.smallCarpet,
  office: state.profile.data.typesOfCleaning.office,
  industrial: state.profile.data.typesOfCleaning.industrial,
  furniture: state.profile.data.typesOfCleaning.furniture,
  pool: state.profile.data.typesOfCleaning.pool
});

export default connect(
  mapStateToProps,
  { editMainExecutor, changePasswordExecutor, editTypesOfCleaningExecutor }
)(ExecutorProfileEdit);
