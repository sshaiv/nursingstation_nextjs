import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import { useState } from "react";

export default function CoronaryAngiography() {
  const [lang, setLang] = useState("hi");

  const hindiContent = (
    <div className="space-y-4 mt-2 p-2 border">
      {/* Header */}
      <h2 className="text-lg text-center font-semibold text-gray-700">
        कोरोनरी एन्जियोग्राफी हेतु सूचित सहमति पत्र
      </h2>

      {/* Instructions Text */}
      <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700 max-h-60 overflow-y-auto">
        <p>
          हृदय की रक्त धमनियों की रचना एवं उसमें उपस्थित रुकावट (अथवा सिकुड़ने)
          को जानने के लिये कोरोनरी एन्जियोग्राफी की जाती है। इसके लिये दांयी
          अथवा बांयी (रेडियल जो हाँथों में / फीमोरल जो पैरों को रक्त प्रदाय करती
          है), स्थानीय निश्चेतना देकर एक माध्यम आकार की सुई से पंक्चर किया जाता
          है। तत्पश्चात् एक्स-रे की मदद से देखते हुए एक ट्‌यूब को हृदय की रक्त
          धमनियों के मुहाने पर ले जाते हैं एवं इसके जरिये एक विशेष प्रकार की
          आयोडीन युक्त डाई (डाई/कॉन्ट्रास्ट) को धमनी में इन्जेक्ट करते हैं और
          वीडियों छवियों की श्रृंखला रिकार्ड की जाती है। कॉन्ट्रास्ट की कुछ
          मात्रा हृदय के मुख्य पम्पिंग चेम्बर (बायाँ निलय) में भी इंजेक्ट
          करतेहैं जिससे उसकी म्पिंग क्षमता एवं आकार का पता चलता है। इस प्रकार
          प्राप्त वीडियो आकृतियों से हृदय की रक्त धमनियों का एक नक्शा हमारे
          सामने प्राप्त बडो जाता है। इससे हम आपको यह बता पायेंगे कि आपकी धमनियों
          में कहाँ एवं कितनी रुकावट है और आपके लिये क्या बायपास ऑपरेशन अथवा
          एन्जियोप्लास्टी (रुकी हुई / सिकुड़ी हुई धमनी का बैलून/गुब्बारा द्वारा
          इलाज) की आवश्यकता है अथवा आपका इलाज दवाईयों से ही आगे चलता रहे।
        </p>
        <p className=" p-4">
          साधारण तौर पर इस जाँच की जोखिम निर्भर करती है आपकी रक्त धमनियों में
          उपस्थित रुकावट के अनुपात पर, आपके प्रमुख पम्पिंग चेम्बर (बायाँ निलय)
          की क्षमता पर और अन्य स्वास्थ्य संबंधित परेशानियों पर जैसे गुर्दों की
          स्थिति, डायबिटीज, ब्लड प्रेशर आदि। नीचे दर्शायी गई विभिन्न समस्याएँ
          एन्जियोग्राफी में हो सकती है उनके सामने दर्शाये अनुपात में:-
        </p>
        <ul className="list-disc pl-5">
          <li>
            20 में 1: रेडियल/फीमोरल धमनी की पंक्चर की जगह सूजन या खून का थक्का
            जम जाना, कॉन्ट्रास्ट की वजह से गुर्दो को नुकसान।
          </li>
          <li>
            100 में 1: हृदय की धड़कन का अनियमित होना, फीमोरल धमनी की क्षति के
            लिये ऑपरेशन।
          </li>
          <li>
            1000 में 1: लकवा, हृदयाघात, डाई से खतरनाक रिएक्शन / दुष्परिणाम,
            अत्यावश्यक बायपास अथवा एन्जियोप्लास्टी की आवश्यकता, मृत्यु।
          </li>
        </ul>
      </div>

      <div className="space-y-4 p-4  ">
        <p className="text-sm">
          I{" "}
          <input
            type="text"
            className="border-b border-gray-400 focus:outline-none px-1 w-48"
          />
          आई.पी.नं.{" "}
          <input
            type="text"
            className="border-b border-gray-400 focus:outline-none px-1 w-32"
          />
          आयु वर्ष{" "}
          <input
            type="text"
            className="border-b border-gray-400 focus:outline-none px-1 w-20"
          />
          पुत्र/पुत्री/पत्नी{" "}
          <input
            type="text"
            className="border-b border-gray-400 focus:outline-none px-1 w-48"
          />
          को उपर्युक्त विधियों के फायदे, जोखिम तथा संभावित परेशानियों के विषय
          में समझने योग्य भाषा में विस्तार से बता दिया गया है। मैं उपर्युक्त
          निदान विधि आवश्यकता पड़ने पर एनेस्थिसिया अथवा किसी तरह के आकस्मिक
          उपचार हेतु स्वीकृति देता/देती हूँ।
        </p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* Doctor Section */}
          <div className="flex flex-col space-y-1">
            <DigitalSignatureSection title=" हस्ताक्षर, हृदय रोग चिकित्सक" />
            <input
              type="text"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <input
              type="datetime-local"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>

          {/* Patient Section */}
          <div className="flex flex-col space-y-1">
            <DigitalSignatureSection title="मरीज के हस्ताक्षर" />
            <input
              type="text"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <input
              type="datetime-local"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>
        </div>

        {/* Witness Section */}
        <div className="mt-4 flex flex-col space-y-1">
          <DigitalSignatureSection title=" परिजन/गवाह के हस्ताक्षर" />
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <input
              type="text"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <input
              type="text"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <input
              type="datetime-local"
              className="border border-gray-300 rounded px-2 py-1 text-sm col-span-3"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const englishContent = (
    <div className="space-y-4 mt-2 p-2 border">
      {/* Header */}
      <h2 className="text-lg text-center font-semibold text-gray-700">
        INFORMED CONSENT FOR CORONARY ANGIOGRAPHY
      </h2>

      {/* Instructions Text */}
      <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700 max-h-60 overflow-y-auto">
        <p>
          Coronary Angiography is done to show the anatomy and the extent of any
          disease in the coronary arteries, the vessels which supply the heart
          with blood. It is done by inserting a fine needle into the
          femoral/radial artery, using local anaesthetic. A tube or catheter is
          then passed with X-ray control into each coronary artery in turn and a
          series of video images is recorded while a special dye or contrast
          medium is injected into the arteries. Dye is also injected into the
          main pumping chamber of the heart (left ventricle) so that we can
          assess its size and how well it contracts. These video images provide
          us with a map of coronary arteries. This enables us to advise you
          whether you have any narrowing (stenosis) or blockage in your coronary
          vessels, whether these might b helped by an operation (coronary
          bypass) or angioplasty (opening a narrowed or blocked vessel with a
          balloon or whether you would be best treated with drugs or medicines.
        </p>
        <p className=" p-4">
          In general, risks of coronary angiography will depend on the severity
          of any coronary disease you may have, how well your left ventricular
          pumps blood around the body and on other comorbid condition such as
          poor kidney function, Diabetes, Hypertension etc. The table below
          shows the order of risk for various serious or trouble some
          consequences
        </p>
        <ul className="list-disc pl-5">
          <li>
            1:20 bruising or swelling related to the puncture site, contrast
            induced injury to kidneys.
          </li>
          <li>
            1:100 disturbance of heart rhythm needing urgent treatment, need for
            surgical repair of groin puncture site.
          </li>
          <li>
            1:1000 death, stroke, heart attack/ dangerous reaction to contrast
            medium (dye) ,need for urgent surgery or angioplasty
          </li>
        </ul>
      </div>

      <div className="space-y-4 p-4  ">
        <p className="text-sm">
          I{" "}
          <input
            type="text"
            className="border-b border-gray-400 focus:outline-none px-1 w-48"
          />
          I.P. No.{" "}
          <input
            type="text"
            className="border-b border-gray-400 focus:outline-none px-1 w-32"
          />
          Age year{" "}
          <input
            type="text"
            className="border-b border-gray-400 focus:outline-none px-1 w-20"
          />
          Son/Daughter/Wife of{" "}
          <input
            type="text"
            className="border-b border-gray-400 focus:outline-none px-1 w-48"
          />
          have been explained the benefit, risk & possible complication of the
          coronary angiography in my language in detail. I hereby give my
          consent for any type of emergency treatment or anaesthesia required
          during this procedure.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* Doctor Section */}
          <div className="flex flex-col space-y-1">
            <DigitalSignatureSection title=" Signature of Interventional Cardiologist" />

            <input
              type="text"
              placeholder="name"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <input
              type="datetime-local"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>

          {/* Patient Section */}
          <div className="flex flex-col space-y-1">
            <DigitalSignatureSection title="Patient's Signature" />
            <input
              type="text"
              placeholder="name"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <input
              type="datetime-local"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>
        </div>

        {/* Witness Section */}
        <div className="mt-4 flex flex-col space-y-1">
          <DigitalSignatureSection title="Signature of Relative/Witness" />

          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="name"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <input
              type="text"
              placeholder="relation"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <input
              type="text"
              placeholder="contact no."
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
            <input
              type="datetime-local"
              className="border border-gray-300 rounded px-2 py-1 text-sm col-span-3"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 border space-y-4">
      {/* Language toggle */}
      <div className="flex justify-end">
        <button
          onClick={() => setLang(lang === "hi" ? "en" : "hi")}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {lang === "hi" ? "Switch to English" : "Switch to Hindi"}
        </button>
      </div>

      {/* Render content based on language */}
      {lang === "hi" ? hindiContent : englishContent}
    </div>
  );
}
