import SafetyChecklist from "../Angiography/SafetyChecklist";
import AnesthesiaConsentForm from "../Consents/consents/AnesthesiaConsentForm";
import AnaesthesiaForm from "./AnaesthesiaForm";
import CardiacAnaesthesiaRecord from "./AnaesthesiaRecord";
import AnaesthesiaRecord from "./AnaesthesiaRecord";
import AnaesthesiaRecordChart from "./AnaesthesiaRecordChart";
import BloodTransfusionForm from "./BloodTransfusionForm";
import CardiacAnaesthesiaForm from "./CardiacAnaesthesiaForm";

import Investigations from "./Investigations";
import OperationNotes from "./OperationNotes";
import PreOperativeChecklist from "./PreOperativeChecklist";
import PreOperativeOrders from "./PreOperativeOrders";
import TeePreOperative from "./TeePreOperative";

export default function CardiacSurgery() {
  return (
    <>
      <PreOperativeChecklist />
      <Investigations />
      <PreOperativeOrders />
      <AnesthesiaConsentForm />
      <CardiacAnaesthesiaRecord />
       <AnaesthesiaRecordChart />
       <CardiacAnaesthesiaForm />
       <AnaesthesiaForm />
      <SafetyChecklist />
      <OperationNotes />
     < BloodTransfusionForm />
    
     
    </>
  );
}
