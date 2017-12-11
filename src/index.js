import React, { Component } from 'react';

const trapHOC = (options = {}) => (WrappedComponent) => {
	const args = Object.assign({ trapIsActive: false }, options);

	class FocusTrap extends Component {
		constructor() {
			super();

			this.state = {
				trapIsActive: args.trapIsActive,
			};

			this.focusLock = this.focusLock.bind(this);
			this.activateTrap = this.activateTrap.bind(this);
			this.deactivateTrap = this.deactivateTrap.bind(this);
		}

		componentDidMount() {
			if (typeof document !== 'undefined') {
				document.addEventListener('focus', this.focusLock, true);
			}
		}

		componentWillUnmount() {
			if (typeof document !== 'undefined') {
				document.removeEventListener('focus', this.focusLock, true);
			}
		}

		activateTrap() {
			this.setState({ trapIsActive: true });
		}

		deactivateTrap() {
			this.setState({ trapIsActive: false });
		}

		focusLock(e) {
			if (this.state.trapIsActive === true && this.el && e.target) {
				const el = this.el;
				const focusable = el.querySelectorAll('[tabindex]:not([tabindex="-1"]), button:not([tabindex="-1"]), [role="button"]:not([tabindex="-1"]), [href]:not([tabindex="-1"]), input:not([tabindex="-1"]), select:not([tabindex="-1"]), textarea:not([tabindex="-1"])');
				const firstFocusable = focusable[0];

				if (!el.contains(e.target)) {
					e.stopPropagation();
					if (firstFocusable) {
						firstFocusable.focus();
					}
				}
			}
		}

		render() {
			return (
				<div className="trapper" ref={(el) => { this.el = el; }}>
					<WrappedComponent {...this.props} activateTrap={this.activateTrap} deactivateTrap={this.deactivateTrap} />
				</div>
			);
		}
	}
	return FocusTrap;
};

export default trapHOC;
