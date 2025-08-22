import AnesthesiaConsentForm from "../Consents/consents/AnesthesiaConsentForm";
import CardiacAnaesthesiaRecord from "./AnaesthesiaRecord";
import AnaesthesiaRecord from "./AnaesthesiaRecord";

import Investigations from "./Investigations";
import PreOperativeChecklist from "./PreOperativeChecklist";
import PreOperativeOrders from "./PreOperativeOrders";

export default function CardiacSurgery() {
  return (
    <>
      <PreOperativeChecklist />
      <Investigations />
      <PreOperativeOrders />
       <AnesthesiaConsentForm />
       <CardiacAnaesthesiaRecord />
      
    </>
  );
}
