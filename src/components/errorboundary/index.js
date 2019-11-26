import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';

import { ERROR_BOUNDARY_TYPE } from '../../data/config/constants';

import ShowMessage from '../showmessage';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, errorInfo) {
        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key]);
            });
            Sentry.captureException(error);
        });
        this.setState({ hasError: true }, () => {
            if (this.props.onErrorCallback) {
                this.props.onErrorCallback();
            }
        });
    }

    render() {
        const { type, children } = this.props;
        const { hasError } = this.state;

        if (hasError) {
            if (type === ERROR_BOUNDARY_TYPE.ERROR) {
                return (
                    <ShowMessage title="Error" message="something went worng." height={100} width={100} error />
                );
            } else {
                return null;
            }
        } else {
            return children;
        }
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    type: PropTypes.string,
    onErrorCallback: PropTypes.func,
};
