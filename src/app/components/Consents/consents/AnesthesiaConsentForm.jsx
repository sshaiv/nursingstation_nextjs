import DateTimeInput from "@/app/common/DateTimeInput";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import React, { useState } from "react";

export default function AnesthesiaConsentForm() {
  const [lang, setLang] = useState("en");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());

  return (
    <div className="p-6 text-sm leading-relaxed my-2 border rounded-lg shadow-md bg-white">
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 text-sm border rounded-lg shadow hover:bg-gray-100"
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
        >
          {lang === "en" ? "Switch to Hindi" : "Switch to English"}
        </button>
      </div>
      {/* Header */}

      {lang === "en" && (
        <div className="space-y-4 text-sm leading-relaxed">
          <div className="flex justify-between mb-4">
            <div>
              Date of Surgery:{" "}
              <input className="border-b border-dotted w-40 outline-none" />{" "}
              Time:{" "}
              <input className="border-b border-dotted w-40 outline-none" />
            </div>
            <div>
              Ward / Bed:{" "}
              <input className="border-b border-dotted w-40 outline-none" />
            </div>
          </div>

          <div className="mb-4">
            Surgeon’s Name:{" "}
            <input className="border-b border-dotted w-80 outline-none" /> Name
            of Surgery:{" "}
            <input className="border-b border-dotted w-80 outline-none" />
          </div>

          <h2 className="text-center text-3xl font-bold underline mb-4">
            INFORMED CONSENT FOR ANESTHESIA SERVICES
          </h2>

          <p className="mb-2 text-justify">
            I <input className="border-b border-dotted w-96 outline-none" />{" "}
            acknowledge that my doctor has explained to me that I will have an
            operation, diagnostic or treatment procedure. My doctor has
            explained the risks of the procedure, advised me of alternative
            treatment and told me about the expected outcome and what could
            happen if my condition remains untreated. I also understand that
            anesthesia services are needed so that my doctor can perform the
            operation or procedure.
          </p>

          <p className="mb-2 text-justify">
            It has been explained to me that all forms of anesthesia involve
            some risks and no guarantee or promises can be made concerning the
            results of my procedure or treatment. Although rare, unexpected
            severe complications with anesthesia can occur and include the
            remote possibility of infection, bleeding, drug reactions, blood
            clots, loss of sensation, loss of limb function, paralysis, stroke,
            brain damage, heart attack or even death. I understand that these
            risks apply to all forms of anesthesia and that additional or
            specific risks have been identified below as they may apply to a
            specific type of anesthesia.
          </p>
          <p className="mb-2 text-justify">
            I understand that the type(s) of anesthesia service checked below
            will be used for my procedure and that the anesthetic technique to
            be used is determined by many factors including my physical
            condition, the type of procedure my doctor is to do, his or her
            preference, as well as my own desire. It has been explained to me
            that sometimes an anesthesia technique which involves the use of
            local anesthetics, with or without sedation, may not succeed
            completely and therefore another technique may have to be used
            including general anesthesia.
          </p>

          <table className="w-full border border-black text-xs text-left">
            <tbody>
              {/* General Anesthesia */}
              <tr>
                <td rowSpan="3" className="border p-2 align-top w-1/4">
                  <label className="flex items-start">
                    <input type="checkbox" className="mr-2 mt-1" />
                    General Anesthesia
                  </label>
                </td>
                <td className="border p-2 w-1/4">Expected Result</td>
                <td className="border p-2" colSpan="2">
                  Total unconscious state, possible placement of a tube into the
                  windpipe.
                </td>
              </tr>
              <tr>
                <td className="border p-2">Technique</td>
                <td className="border p-2" colSpan="2">
                  Drug injected into the bloodstream, inhaled into the lungs, or
                  by other routes.
                </td>
              </tr>
              <tr>
                <td className="border p-2">Risks</td>
                <td className="border p-2" colSpan="2">
                  Mouth or throat pain, hoarseness, injury to mouth or teeth,
                  awareness under anesthesia, injury to blood vessels,
                  aspiration, pneumonia.
                </td>
              </tr>

              {/* Spinal or Epidural Analgesia */}
              <tr>
                <td rowSpan="3" className="border p-2 align-top">
                  <label className="flex items-start">
                    <input type="checkbox" className="mr-2 mt-1" />
                    Spinal or Epidural Analgesia/Anesthesia
                  </label>
                  <div className="ml-6 mt-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> With sedation
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> Without
                      sedation
                    </label>
                  </div>
                </td>
                <td className="border p-2">Expected Result</td>
                <td className="border p-2" colSpan="2">
                  Temporary decreased or loss of feeling and/or movement to
                  lower part of the body.
                </td>
              </tr>
              <tr>
                <td className="border p-2">Technique</td>
                <td className="border p-2" colSpan="2">
                  Drug injected through a needle/catheter placed either directly
                  into the spinal canal or just outside the spinal canal.
                </td>
              </tr>
              <tr>
                <td className="border p-2">Risks</td>
                <td className="border p-2" colSpan="2">
                  Headache, backache, buzzing in the ears, convulsions,
                  infection, persistent weakness, numbness, residual pain,
                  injury to blood vessels, “total spinal”.
                </td>
              </tr>

              {/* Major / Minor Nerve Block */}
              <tr>
                <td rowSpan="3" className="border p-2 align-top">
                  <label className="flex items-start">
                    <input type="checkbox" className="mr-2 mt-1" />
                    Major / Minor Nerve Block
                  </label>
                  <div className="ml-6 mt-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> With sedation
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> Without
                      sedation
                    </label>
                  </div>
                </td>
                <td className="border p-2">Expected Result</td>
                <td className="border p-2" colSpan="2">
                  Temporary loss of feeling and/or movement of a specific limb
                  or area.
                </td>
              </tr>
              <tr>
                <td className="border p-2">Technique</td>
                <td className="border p-2" colSpan="2">
                  Drug injected near nerves providing loss of sensation to the
                  area of the operation.
                </td>
              </tr>
              <tr>
                <td className="border p-2">Risks</td>
                <td className="border p-2" colSpan="2">
                  Infection, convulsions, weakness, persistent numbness,
                  residual pain, injury to blood vessels.
                </td>
              </tr>

              {/* Intravenous Regional Anesthesia */}
              <tr>
                <td rowSpan="3" className="border p-2 align-top">
                  <label className="flex items-start">
                    <input type="checkbox" className="mr-2 mt-1" />
                    Intravenous Regional Anesthesia
                  </label>
                  <div className="ml-6 mt-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> With sedation
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> Without
                      sedation
                    </label>
                  </div>
                </td>
                <td className="border p-2">Expected Result</td>
                <td className="border p-2" colSpan="2">
                  Temporary loss of feeling and/or movement of a limb.
                </td>
              </tr>
              <tr>
                <td className="border p-2">Technique</td>
                <td className="border p-2" colSpan="2">
                  Drug injected into veins of arm or leg while using a
                  tourniquet.
                </td>
              </tr>
              <tr>
                <td className="border p-2">Risks</td>
                <td className="border p-2" colSpan="2">
                  Infection, convulsions, persistent numbness, residual pain,
                  injury to blood vessels.
                </td>
              </tr>

              {/* Monitored Anesthesia Care (with sedation) */}
              <tr>
                <td rowSpan="3" className="border p-2 align-top">
                  <label className="flex items-start">
                    <input type="checkbox" className="mr-2 mt-1" />
                    Monitored Anesthesia Care (with sedation)
                  </label>
                </td>
                <td className="border p-2">Expected Result</td>
                <td className="border p-2" colSpan="2">
                  Reduced anxiety and pain, partial or total amnesia.
                </td>
              </tr>
              <tr>
                <td className="border p-2">Technique</td>
                <td className="border p-2" colSpan="2">
                  Drug injected into the bloodstream, inhaled into the lungs, or
                  by other routes producing a semi-conscious state.
                </td>
              </tr>
              <tr>
                <td className="border p-2">Risks</td>
                <td className="border p-2" colSpan="2">
                  An unconscious state, depressed breathing, injury to blood
                  vessels.
                </td>
              </tr>

              {/* Monitored Anesthesia Care (without sedation) */}
              <tr>
                <td rowSpan="3" className="border p-2 align-top">
                  <label className="flex items-start">
                    <input type="checkbox" className="mr-2 mt-1" />
                    Monitored Anesthesia Care (without sedation)
                  </label>
                </td>
                <td className="border p-2">Expected Result</td>
                <td className="border p-2" colSpan="2">
                  Measurement of vital signs, availability of anesthesia
                  provider for further intervention.
                </td>
              </tr>
              <tr>
                <td className="border p-2">Technique</td>
                <td className="border p-2" colSpan="2">
                  None.
                </td>
              </tr>
              <tr>
                <td className="border p-2">Risks</td>
                <td className="border p-2" colSpan="2">
                  Increased awareness, anxiety and/or discomfort.
                </td>
              </tr>

              {/* Local Anaesthesia */}
              <tr>
                <td rowSpan="3" className="border p-2 align-top">
                  <label className="flex items-start">
                    <input type="checkbox" className="mr-2 mt-1" />
                    Local Anaesthesia
                  </label>
                </td>
                <td className="border p-2">Expected Result</td>
                <td className="border p-2" colSpan="2">
                  Anesthesia of the area/part where local anaesthesia is given.
                </td>
              </tr>
              <tr>
                <td className="border p-2">Technique</td>
                <td className="border p-2" colSpan="2">
                  Local anesthetic is injected/infiltrated into the area to be
                  operated.
                </td>
              </tr>
              <tr>
                <td className="border p-2">Risks</td>
                <td className="border p-2" colSpan="2">
                  Discomfort due to injection / Anxiety.
                </td>
              </tr>
            </tbody>
          </table>

          {/* Consent Footer */}
          <p className="mt-6 text-justify">
            I hereby consent to the anesthesia service, checked above and
            authorize that it be administered by Dr.{" "}
            <input className="border-b border-dotted w-80 outline-none" />
            or his/her associates, all of whom are credentialed to provide
            anesthesia services at this health facility. I also consent to an
            alternative type of anesthesia, if necessary, as deemed appropriate
            by them. I expressly desire the following considerations be observed
            (or write "none").
          </p>
          <hr className="my-2 border border-black" />

          <p className="text-justify">
            I certify and acknowledge that I have read this form or has been
            read out to me, that I understand the risks, alternatives and
            expected results of the anesthesia services and that I had ample
            time to ask question and consider my decision
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              Sign <DigitalSignatureSection /> <br />
              Name of the Patient:{" "}
              <input className="border-b border-dotted w-64 outline-0" /> <br />
              <div className="flex gap-2 w-full mt-1">
                <label className="flex-shrink-0">Date & Time :</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <div>
              Sign <DigitalSignatureSection /> <br />
              Name of the Anesthetist:{" "}
              <input className="border-b border-dotted w-64 outline-0" /> <br />
              <div className="flex gap-2 w-full mt-1">
                <label className="flex-shrink-0">Date & Time :</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Witness */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              Sign <DigitalSignatureSection /> <br />
              Name of the Witness:{" "}
              <input className="border-b border-dotted w-64 outline-none" />{" "}
              <br />
              <div className="flex gap-2 w-full mt-1">
                <label className="flex-shrink-0">Date & Time :</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <div>
              Address ( Witness ) :{" "}
              <input className="border-b border-dotted w-80 outline-0 mb-1.5" />{" "}
              <br />
              Contact No. ( Witness ) :{" "}
              <input className="border-b border-dotted w-64 outline-0" /> <br />
            </div>
          </div>
        </div>
      )}

      {lang == "hi" && (
        <div className="space-y-4 text-sm leading-relaxed">
          <div className="flex justify-between mb-4">
            <div>
              ऑपरेशन की तारीख:{" "}
              <input className="border-b border-dotted border-black w-40 outline-none" />{" "}
              {/* Time:{" "}
              <input className="border-b border-dotted w-40 outline-none" /> */}
            </div>
            <div>
              वार्ड / बेड:{" "}
              <input className="border-b border-dotted border-black w-40 outline-none" />
            </div>
          </div>

          <div className="mb-4">
            शल्य चिकित्सक:{" "}
            <input className="border-b border-dotted border-black w-80 outline-none" />{" "}
            शल्यक्रिया का नाम :{" "}
            <input className="border-b border-dotted border-black w-80 outline-none" />
          </div>

          <h2 className="text-center text-3xl font-bold underline mb-4">
            एनेस्थिसिया (निश्चेतना) हेतु सूचित सहमति-पत्र
          </h2>

          <p className="mb-2 text-justify">
            मुझे/हमें मेरे चिकित्सक एवं निश्चेतना विशेषज्ञ द्वारा समझा दिया गया
            है कि मेरी शल्यक्रिया, नैदानिक अथवा उपचार प्रक्रिया होना है। मेरे
            चिकित्सक ने मुझे प्रक्रिया से संबंधित जोखिम समझा दिये है तथा
            वैकल्पिक उपचार भी समझा दिया है और यह भी बताया है कि इससे संभावित
            परिणाम क्या होंगे, और उपचार न होने पर कैसी स्थिति रहेगी। मैं जानता
            हूँ कि मेरे उपचार अथवा शल्य क्रिया के लिए निश्चेतना (असंवेदन करने की
            जरुरत) देना जरुरी है ताकि मेरी शल्य क्रिया चिकित्सक कर सके।
          </p>

          <p className="mb-2 text-justify">
            मुझे अच्छे से यह समझा दिया गया है कि सभी प्रकार के ऐनेस्थिसिया में
            जोखिम होता है और संभावित परिणामों के लिए किसी भी प्रकार की ग्यारण्टी
            या वादा नहीं किया जा सकता किन्तु कुछ एक बार असंभावित जटिलताएं
            ऐनेस्थिसिया से सम्बंधित हो सकती है, जिसमें संक्रमण, खून का रिसाव,
            दवाईयों का दुष्परिणाम, खून के थक्के जमना, संवेदना खोना, हाथ अथवा पैर
            का काम न करना, लकवा होना, मस्तिष्क क्षति, हृदयाचात या मृत्यु भी हो
            सकती है। मैं समझता हूँ कि यह जोखिम सभी प्रकार के ऐनेस्थिसिया में हो
            सकते है और इनके अलावा कुछ खास जोखिम भी पहचाने गए है, जो किसी खास
            ऐनेस्थिसिया से होते है, जो कि नीचे लिखे है (जिस पर निशान लगाया गया
            है।)।
          </p>
          <p className="mb-2 text-justify">
            मैं यह जानता हूँ कि नीचे लिखी ऐनेस्थिसिया तकनीक जो कि मेरी शल्य
            क्रिया में उपयोग की जानी है का निर्णय अनेक कारणों पर निर्भर करता है,
            जैसे कि - मेरी शारीरिक स्थिति, चिकित्सक द्वारा किये जा रहे उपचार का
            प्रकार तथा उपचार के दौरान मेरी जरुरत। मुझे यह समझा दिया गया है कि कई
            बार ऐनेस्थिसिया के लिए जो तकनीक अपनाई जाती है जिसमें लोकल
            ऐनेस्थेिटिक (सुन्न करने की दवा) का उपयोग किया जाता है (सिडेशन / नींद
            की दवा के साथ या बिना सिडेशन के) कई बार पूर्ण सफल नहीं हो पाती जिसके
            लिए दूसरी तकनीक अपनानी पड़ती है जिसमें जनरल ऐनेस्थिसिया सम्मिलित है।
          </p>

          <table className="w-full border border-black text-xs text-left">
            <tbody>
              {/* General Anesthesia */}
              <tr>
                <td rowSpan="3" className="border p-2 align-top w-1/4">
                  <label className="flex items-start">
                    <input type="checkbox" className="mr-2 mt-1" />
                    जनरल ऐनेस्थिसिया (पूर्ण बेहोशी)
                  </label>
                </td>
                <td className="border p-2 w-1/4">संभावित परिणाम</td>
                <td className="border p-2" colSpan="2">
                  पूर्ण असंवेदन की स्थिति, श्वास नली में ट्यूब लगाने की संभावना।
                </td>
              </tr>
              <tr>
                <td className="border p-2">तकनीक</td>
                <td className="border p-2" colSpan="2">
                  रक्त धमनियों में दवाई इंजेक्शन द्वारा दी जाती है या श्वसन
                  प्रक्रिया से फेफड़ों के द्वारा या कोई और रास्ते से।
                </td>
              </tr>
              <tr>
                <td className="border p-2">जोखिम</td>
                <td className="border p-2" colSpan="2">
                  मुँह अथवा गले में दर्द, आवाज में कर्कशता या फटापन, मुँह अथवा
                  दाँतों में चोट, रक्त धमनियों में चोट, ऐनेस्थिसिया के दौरान
                  जागरुकता, ऐस्पिरेशन, निमोनिया (श्वास की नली में बलगम का उतर
                  जाना)
                </td>
              </tr>

              {/* Spinal or Epidural Analgesia */}
              <tr>
                <td rowSpan="3" className="border p-2 align-top">
                  <label className="flex items-start">
                    <input type="checkbox" className="mr-2 mt-1" />
                    स्पाईनल और एपिड्यूरल ऐनेस्थिसिया
                  </label>
                  <div className="ml-6 mt-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> सिडेशन के साथ।
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> सिडेशन के बगैर।
                    </label>
                  </div>
                </td>
                <td className="border p-2">संभावित परिणाम</td>
                <td className="border p-2" colSpan="2">
                  एहसास का अस्थाई या पूर्ण रूप से खोना एवं शरीर के निचले हिस्से
                  की गतिविधि बंद होना।
                </td>
              </tr>
              <tr>
                <td className="border p-2">तकनीक</td>
                <td className="border p-2" colSpan="2">
                  ऐनेस्थिसिया की दया सुई के द्वारा सीधे स्पाईनल केनाल में या
                  स्पाईनल केनाल के बाहर लगाना।
                </td>
              </tr>
              <tr>
                <td className="border p-2">जोखिम</td>
                <td className="border p-2" colSpan="2">
                  सिर दर्द, पीठ दर्द, कान में सरसराहट, मिर्गी का दौरा, संक्रमण,
                  लगातार कमजोरी, संवेदनहीनता, रिसिड्यूल पेन, रक्त धमनियों को
                  नुकसान।
                </td>
              </tr>

              {/* Major / Minor Nerve Block */}
              <tr>
                <td rowSpan="3" className="border p-2 align-top">
                  <label className="flex items-start">
                    <input type="checkbox" className="mr-2 mt-1" />
                    वृहत/लघु नर्व ब्लॉक
                  </label>
                  <div className="ml-6 mt-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> सिडेशन के साथ।
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> सिडेशन के बगैर।
                    </label>
                  </div>
                </td>
                <td className="border p-2">संभावित परिणाम</td>
                <td className="border p-2" colSpan="2">
                  किसी खास अंग की गतिविधि बंद होना या एहसास का अस्थाई रूप से
                  खोना (सुन्नपन)।
                </td>
              </tr>
              <tr>
                <td className="border p-2">तकनीक</td>
                <td className="border p-2" colSpan="2">
                  नस के पास सुई के द्वारा दवाई देना, शल्य क्रिया होने वाले किसी
                  खास हिस्से या अंग में दवाई देना।
                </td>
              </tr>
              <tr>
                <td className="border p-2">जोखिम</td>
                <td className="border p-2" colSpan="2">
                  संक्रमण, मिर्गी का दौरा, कमजोरी, लगातार संवेदनहीनता, अवशिष्ट
                  दर्द, रक्त धमनियों में चोट।
                </td>
              </tr>

              {/* Intravenous Regional Anesthesia */}
              <tr>
                <td rowSpan="3" className="border p-2 align-top">
                  <label className="flex items-start">
                    <input type="checkbox" className="mr-2 mt-1" />
                    इनटावीनस रिजनल ऐनेस्थिसिया
                  </label>
                  <div className="ml-6 mt-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      सिडेशन के साथ।
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" /> सिडेशन के बगैर।
                    </label>
                  </div>
                </td>
                <td className="border p-2">संभावित परिणाम</td>
                <td className="border p-2" colSpan="2">
                  किसी खास अंग की गतिविधि बंद होना या एहसास का अस्थाई रूप से
                  खोना (सुन्नपन)।
                </td>
              </tr>
              <tr>
                <td className="border p-2">तकनीक</td>
                <td className="border p-2" colSpan="2">
                  हाथ या पैर की नस में दवाई लगाना एवं लगाते समय टोरनीक्वीट का
                  उपयोग।
                </td>
              </tr>
              <tr>
                <td className="border p-2">जोखिम</td>
                <td className="border p-2" colSpan="2">
                  संक्रमण, मिर्गी का दौरा, लगातार संवेदनहीनता, अवशिष्ट दर्द,
                  रक्त धमनियों में चोट।
                </td>
              </tr>

              {/* Monitored Anesthesia Care (with sedation) */}
              <tr>
                <td rowSpan="3" className="border p-2 align-top">
                  <label className="flex items-start">
                    <input type="checkbox" className="mr-2 mt-1" />
                    मोनीटर्ड ऐनेस्थिसिया केयर (सिडेशन के साथ )
                  </label>
                </td>
                <td className="border p-2">संभावित परिणाम</td>
                <td className="border p-2" colSpan="2">
                  उत्सुकता या चिन्ता एवं दर्द में कमी, आंशिक या पूर्ण ऐमनेसिया।
                </td>
              </tr>
              <tr>
                <td className="border p-2">तकनीक</td>
                <td className="border p-2" colSpan="2">
                  रक्त धमनियों में इंजेक्शन द्वारा दवाई पहुंचाना, श्वसन क्रिया
                  द्वारा फेफड़ों के अंदर दवा पहुंचाना या किसी अन्य तरीके से
                  अर्धमूर्झित अवस्था में रखना।
                </td>
              </tr>
              <tr>
                <td className="border p-2">जोखिम</td>
                <td className="border p-2" colSpan="2">
                  मूर्छित अवस्था, मंद गति से श्वास लेना, रक्त धमनियों में चोट।
                </td>
              </tr>

              {/* Monitored Anesthesia Care (without sedation) */}
              <tr>
                <td rowSpan="3" className="border p-2 align-top">
                  <label className="flex items-start">
                    <input type="checkbox" className="mr-2 mt-1" />
                    मोनीटर्ड ऐनेस्थिसिया केयर (सिडेशन के बगैर){" "}
                  </label>
                </td>
                <td className="border p-2">संभावित परिणाम</td>
                <td className="border p-2" colSpan="2">
                  वायटलस साईन का मापना, आगे की प्रक्रिया के लिए ऐनेस्थिसिया देने
                  वाले की उपलब्धता।
                </td>
              </tr>
              <tr>
                <td className="border p-2">तकनीक</td>
                <td className="border p-2" colSpan="2">
                  कोई नहीं।
                </td>
              </tr>
              <tr>
                <td className="border p-2">जोखिम</td>
                <td className="border p-2" colSpan="2">
                  उत्सुकता एवं जागरुकता बढ़ने से असुविधा जनक लगना।
                </td>
              </tr>

              {/* Local Anaesthesia */}
              <tr>
                <td rowSpan="3" className="border p-2 align-top">
                  <label className="flex items-start">
                    <input type="checkbox" className="mr-2 mt-1" />
                    कॉनसियस सिडेशन (लोकल ऐनेस्थिसिया)
                  </label>
                </td>
                <td className="border p-2">संभावित परिणाम</td>
                <td className="border p-2" colSpan="2">
                  निश्चित किए गए हिस्से या अंग का सुन्नपन, जहां पर सुई द्वारा
                  दवा दी गई है।
                </td>
              </tr>
              <tr>
                <td className="border p-2">तकनीक</td>
                <td className="border p-2" colSpan="2">
                  शल्य क्रिया के लिए निश्चित किए गए हिस्से या अंग पर सुई के
                  द्वारा दवाई लगाना।
                </td>
              </tr>
              <tr>
                <td className="border p-2">जोखिम</td>
                <td className="border p-2" colSpan="2">
                  सुई के दर्द या चिन्ता के कारण असुविधा |
                </td>
              </tr>
            </tbody>
          </table>

          {/* Consent Footer */}
          <p className="mt-6 text-justify">
            मैं उपरोक्त ऐनेस्थिसिया सेवा समझते हुए, एनेस्थिटिस्ट डॉ.{" "}
            <input className="border-b border-dotted border-black w-80 outline-none" />
            या उनके सहयोगी को, जो कि सभी प्रशिक्षित एवं निश्चेतना में दक्ष हैं,
            ऐनेस्थिसिया देने का अधिकार देता हूँ। ये ऐनेस्थिसिया सेवा स्वास्थ्य
            सुविधाओं को ध्यान में रखकर दी जा रही है। मैं इस बात की भी सहमति देता
            हूँ कि आवश्यकता होने पर वैकल्पिक ऐनेस्थिसिया का प्रकार भी उपयोग कर
            सकते है।
          </p>

          <p className="text-justify">
            या उनके सहयोगी को, जो कि सभी प्रशिक्षित एवं निश्चेतना में दक्ष हैं,
            ऐनेस्थिसिया देने का अधिकार देता हूँ। ये ऐनेस्थिसिया सेवा स्वास्थ्य
            सुविधाओं को ध्यान में रखकर दी जा रही है। मैं इस बात की भी सहमति देता
            हूँ कि आवश्यकता होने पर वैकल्पिक ऐनेस्थिसिया का प्रकार भी उपयोग कर
            सकते है।
            <input className="border-b border-dotted border-black w-80 outline-none" />
          </p>
          <hr className="my-2 border border-black" />

          <p className="text-justify">
            मैं यह प्रमाणित करता हूँ कि मैंने यह फार्म अच्छे से पढ़ लिया है या
            मुझे पढ़ कर बता दिया गया है और मैं सारे जोखिम, विकल्प एवं संभवित
            परिणाम के बारे में समझ चुका हूँ तथा मुझे यह सारी बातें समझने, सवाल
            पूछने तथा मेरे निर्णय के लिए मुझे पर्याप्त समय दिया गया।
          </p>

          {/* Main 2-column sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              हस्ताक्षर <DigitalSignatureSection /> <br />
              मरीज का नाम :{" "}
              <input className="border-b border-dotted w-64 outline-0" /> <br />
              <div className="flex gap-2 w-full mt-1">
                <label className="flex-shrink-0">दिनांक/समय :</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            <div>
              हस्ताक्षर <DigitalSignatureSection /> <br />
              ऐनेस्थेिटिस्ट का नाम:{" "}
              <input className="border-b border-dotted w-64 outline-0" /> <br />
              <div className="flex gap-2 w-full mt-1">
                <label className="flex-shrink-0">दिनांक/समय :</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Witness */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              हस्ताक्षर <DigitalSignatureSection /> <br />
              गवाह का नाम :{" "}
              <input className="border-b border-dotted w-64 outline-none" />{" "}
              <br />
              <div className="flex gap-2 w-full mt-1">
                <label className="flex-shrink-0">दिनांक/समय :</label>
                <DateTimeInput
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  time={selectedTime}
                  onTimeChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <div>
              गवाह का पता :{" "}
              <input className="border-b border-dotted w-80 outline-0 mb-1.5" />{" "}
              <br />
              गवाह का दूरभाष क्र. / मोबाईल :{" "}
              <input className="border-b border-dotted w-64 outline-0" /> <br />
            </div>
          </div>

          {/* Guardian */}
          <div className="mt-6">
            <p className="font-bold">
              अवयस्क की स्थिति में (18 वर्ष से कम) या शारीरिक या मानसिक रूप से
              हस्ताक्षर करने में असक्षम, माता-पिता या नियुक्त परिजन हस्ताक्षर
              करे।
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <div>
                हस्ताक्षर <DigitalSignatureSection /> <br />
                नाम :{" "}
                <input className="border-b border-dotted w-64 outline-0" />{" "}
                <br />
                रिश्ता :{" "}
                <input className="border-b border-dotted w-64 outline-0" />{" "}
                <br />
                <div className="flex gap-2 w-full mt-1">
                  <label className="flex-shrink-0">दिनांक/समय :</label>
                  <DateTimeInput
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    time={selectedTime}
                    onTimeChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <p>
            ★ नियुक्त परिजन : पति-पत्नी, बेटा-बेटी, माता-पिता, भाई-बहन
            &nbsp;&nbsp;&nbsp;&nbsp; ★ गवाह के हस्ताक्षर अनिवार्य हैं।
          </p>
        </div>
      )}
    </div>
  );
}
