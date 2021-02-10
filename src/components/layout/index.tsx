import {connect, MapDispatchToPropsFunction, MapStateToProps} from "react-redux";
import {LayoutComponent} from "./component";
import {RootState} from "src/store";

interface StateProps {}

interface OwnProps {
    children?: React.ReactChild;
}

interface DispatchProps {}

export type Props = StateProps & DispatchProps & OwnProps;

export const mapStateToProps: MapStateToProps<
    StateProps,
    unknown,
    RootState
> = (): StateProps => ({});

const mapDispatchToProps: MapDispatchToPropsFunction<
    DispatchProps,
    OwnProps
> = (): DispatchProps => ({});

const connector = connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps);

export const Layout = connector(LayoutComponent);
