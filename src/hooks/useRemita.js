import { useState, useEffect } from "react";

const cachedScripts = [];

const useRemitaPayment = ({ live=false }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // const { key, customerId, firstName, lastName, email, amount, narration, onSuccess, onError, onClose } = remitaData;
    let script;
    let src = !live
      ? "https://remitademo.net/payment/v1/remita-pay-inline.bundle.js"
      : "https://login.remita.net/payment/v1/remita-pay-inline.bundle.js";

    if (cachedScripts.includes(src)) {
      setLoaded(true);
      setError(false);
    } else {
      cachedScripts.push(src);

      script = document.createElement("script");
      script.src = src;
      script.async = true;

      const onScriptLoad = () => {
        setLoaded(true);
        setError(false);
      };

      const onScriptError = () => {
        const index = cachedScripts.indexOf(src);
        if (index >= 0) cachedScripts.splice(index, 1);
        script.remove();
        setLoaded(true);
        setError(true);
      };

      script.addEventListener("load", onScriptLoad);
      script.addEventListener("complete", onScriptLoad);
      script.addEventListener("error", onScriptError);

      document.body.appendChild(script);
    }

    return () => {
      if (script) {
        script.remove();
      }
    };
  }, [ live]);

  const startPayment = (payload) => {
      if (loaded) {
          
        //   Typescript type for payload
        // const { key, customerId, firstName, lastName, email, amount, narration, onSuccess, onError, onClose } = payload;
  
      var paymentEngine = window.RmPaymentEngine.init(payload);
      paymentEngine.showPaymentWidget();
    }
  };

  return { loaded, error, startPayment};
};

export default useRemitaPayment