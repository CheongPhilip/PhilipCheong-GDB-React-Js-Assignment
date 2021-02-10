import {Actions} from "src/store/home/actions";
import {connect, MapDispatchToPropsFunction, MapStateToProps} from "react-redux";
import {HomeComponent} from "./component";
import {RootState} from "src/store";

import {HomeStates} from "src/store/home/types";
import {Dispatch, bindActionCreators} from "redux";

import * as actions from "../../store/home/actions";

interface StateProps {
    state?: HomeStates;
}

interface OwnProps {
    cssProps?: React.CSSProperties;
    cssPropsMobile?: React.CSSProperties;
}

interface DispatchProps {
    actions?: Actions;
}

export type Props = StateProps & DispatchProps & OwnProps;

export const mapStateToProps: MapStateToProps<StateProps, unknown, RootState> = (
    state: RootState
): StateProps => ({
    state: state.home
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, OwnProps> = (
    dispatch: Dispatch
): DispatchProps => ({
    actions: bindActionCreators(actions.actCollections, dispatch)
});

const connector = connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps);

export const Home = connector(HomeComponent);
