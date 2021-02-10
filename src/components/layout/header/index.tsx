import {Actions} from "src/store/layout/actions";
import {connect, MapDispatchToPropsFunction, MapStateToProps} from "react-redux";
import {LayoutHeaderComponent} from "./component";
import {RootState} from "src/store";

import {LayoutStates} from "src/store/layout/types";
import {Dispatch, bindActionCreators} from "redux";

import {actCollections} from "../../../store/layout/actions";

interface StateProps {
    state: LayoutStates;
}

interface OwnProps {}

interface DispatchProps {
    actions: Actions;
}

export type Props = StateProps & DispatchProps & OwnProps;

export const mapStateToProps: MapStateToProps<StateProps, unknown, RootState> = (
    state: RootState
): StateProps => ({
    state: state.layout
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, OwnProps> = (
    dispatch: Dispatch
): DispatchProps => ({
    actions: bindActionCreators(actCollections, dispatch)
});

const connector = connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps);

export const LayoutHeader = connector(LayoutHeaderComponent);
