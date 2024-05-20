import React, { Component } from "react";

const cachedScripts = [];
export default class RemitaPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: false,
    };
  }

  componentDidMount() {
    const { live } = this.props;
    let script;
    let src = !live
      ? "https://demo.remita.net/payment/v1/remita-pay-inline.bundle.js"
      : "https://login.remita.net/payment/v1/remita-pay-inline.bundle.js";
    if (cachedScripts.includes(src)) {
      this.setState({
        loaded: true,
        error: false,
      });
    } else {
      cachedScripts.push(src);

      script = document.createElement("script");
      script.src = src;
      script.async = true;

      const onScriptLoad = () => {
        this.setState({
          loaded: true,
          error: false,
        });
      };

      const onScriptError = () => {
        const index = cachedScripts.indexOf(src);
        if (index >= 0) cachedScripts.splice(index, 1);
        script.remove();

        this.setState({
          loaded: true,
          error: true,
        });
      };

      script.addEventListener("load", onScriptLoad);
      script.addEventListener("complete", onScriptLoad);
      script.addEventListener("error", onScriptError);

      document.body.appendChild(script);
    }
  }

  startPayment() {
    const {
      onSuccess,
      onClose,
      key,
      customerId,
      firstName,
      lastName,
      email,
      amount,
      narration,
      onError,
    } = this.props.remitaData;
    if (this.state.loaded) {
      let payload = {
        key,
        customerId,
        firstName,
        lastName,
        email,
        amount,
        narration,
        onSuccess,
        onError,
        onClose,
      };
      var paymentEngine = RmPaymentEngine.init(payload);
      paymentEngine.showPaymentWidget();
    }
  }

  render() {
    const { className, text } = this.props;
    return (
      <button className={className} onClick={() => this.startPayment()}>
        {text || "Pay"}
      </button>
    );
  }
}