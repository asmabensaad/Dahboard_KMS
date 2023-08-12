
import React from 'react';
import Form from '../../components/common/Elements/Form';
import styles from './PasswordResetLink.module.scss';
import Joi from "joi-browser";
import { connect } from "react-redux";
import { sendResetLink, resendPasswordResetEmail } from '../../store/feature/accountService';
import { isEmpty } from '../../common/utils';
import PageButton from '../../components/common/Elements/PageButton';

class PasswordResetLink extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: "",
            },
            errors: {},
        };
    }

    //data validation schema
    schema = {
        email: Joi.string()
            .required()
            .regex(
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
            )
            .label("Email")
            .error(() => {
                return {
                    message: "A valid email address is required.",
                };
            })
    };

    doSubmit = (e) => {
        this.handleSubmit(e);

        this.props.sendResetLink(
            this.state.data.email
        );
    }
    render() {
        return (
            <div className={styles.PasswordResetLink}>
                {
                    (isEmpty(this.props.membership) ||
                        isEmpty(this.props.membership.user) ||
                        (!this.props.membership.user.passwordResetLinkSent)) &&
                    <div>
                        <div className={styles.header}>
                            <h2>
                                Change Password
                            </h2>
                        </div>
                        <p>Please enter your email address. We will send you an email to reset your password.</p>
                        <form onSubmit={this.doSubmit}>
                            {this.renderInput("email", "Email", styles.fieldSet)}

                            {this.renderSubmitButton("Send Reset Link")}
                        </form>
                    </div>
                }
                {(this.props.membership.user && this.props.membership.user.passwordResetLinkSent) && <div>
                    <div className={styles.header}>
                        <h2>
                            Change Password
                        </h2>
                    </div>
                    <p>If we found the account associated with this email, you would receive an email soon. Please check your inbox and spam folders.</p>
                    <PageButton
                        variant="contained"
                        color="blue"
                        onClick={() => this.props.resendPasswordResetEmail()}
                    >
                        Resend Password Reset Email
                    </PageButton>

                </div>}
            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    membership: state.entities.accounts.membership
});

const mapDispatchToProps = (dispatch) => ({
    sendResetLink: (email) => {
        dispatch(sendResetLink(email));
    },
    resendPasswordResetEmail: () => {
        dispatch(resendPasswordResetEmail());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetLink);