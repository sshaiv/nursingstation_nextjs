import { ModalHeading } from "@/app/common/text";
import Investigations from "../Cardiac Surgery/Investigations";
import PreOperativeChecklist from "../Cardiac Surgery/PreOperativeChecklist";
import InformedConsentForSurgery from "./ConcentSurgery";
import AnesthesiaConsentForm from "../Consents/consents/AnesthesiaConsentForm";
import SafetyChecklist from "../Angiography/SafetyChecklist";
import OperationNotes from "../Cardiac Surgery/OperationNotes";
import PreAnaestheticAssessment from "./PreAnaestheticAssessment";

export default function GeneralSurgery() {
  return (
    <>
      <PreOperativeChecklist />
      <Investigations />
      <InformedConsentForSurgery />
      <AnesthesiaConsentForm />
      <PreAnaestheticAssessment />
      <SafetyChecklist />
      <OperationNotes />
    </>
  );
}
