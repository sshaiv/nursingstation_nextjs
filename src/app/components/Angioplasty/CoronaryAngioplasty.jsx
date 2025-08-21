import DateTimeInput from "@/app/common/DateTimeInput";
import DigitalSignatureSection from "@/app/common/DigitalSignatureSection";
import { useState } from "react";

export default function CoronaryAngioplasty() {
  const [lang, setLang] = useState("hi");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const [selectedTime, setSelectedTime] = useState(getCurrentTimeHHMM());

  const hindiContent = (
    <div className="space-y-4 mt-2 rounded-2xl border bg-white p-3 shadow-sm">
      {/* Header */}
      <h2 className="text-lg text-center font-semibold text-gray-700">
        कोरोनरी एन्जियोप्लास्टी (PTCA) हेतु सूचित सहमति पत्र
      </h2>

      {/* Instructions Text */}
      <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700 max-h-full overflow-y-auto">
        <p>
          यह एक प्रकार के इलाज की विधि है, हृदय की रक्त धमनियों में उपस्थित
          ऑपरेशन की जगह अथवा उसके पूरक के रूप में उपयोग की जा सकती है। यह
          केथेटेराइजेशन प्रयोगशाला में एन्जियोग्राफी की ही भांति की जाती है।
          रुकावट या सिकुड़ेपन को ठीक करने के लिये। यह विधि बायपास एक नली /
          केथेटर फीमोरल धमनी (अथवा हाथ की रेडियल धमनी) के रास्ते हृदय की
          बीमारग्रस्त धमनी के मुहाने पर ले जाते हैं। पूरा कार्य एक्स-रे की
          सहायता से देखते हुए किया जाता है। इसके पश्चात् एक बहुत ही महीन वॉयर जो
          शरीर अथवा धमनी पर कोई दुष्प्रभाव नहीं डालता है, हृदय की बीमारग्रस्त
          धमनी में पहुंचाया जाता है। इस वॉयर का उपयोग एक बैलून / गुब्बारा को
          रुकावट / सिकुड़ेपन के स्थान पर पहुंचाने के लिये किया जाता है। इस बैलून
          को तरल कॉन्टास्ट से फुलाया जाता है जिससे रुकावट वाला स्थान खुल जाता
          है। हालांकि इस प्रक्रिया में अक्सर धमनी में खून का प्रवाह चालू हो जाता
          है, लेकिन साथ ही धमनी में विच्छेदन हो सकता है या बैलून / गुब्बारा
          सिकुड़ने पर धमनी फिर से सिकुड़ जाती है अथवा अगले महीनों में रुकावट
          (रीस्टेनोसिस) फिर से हो सकती है। इसलिये इन सभी समस्याओं से निपटने के
          लिये, एक धातु की जालीनुमा ट्यूब अथवा कॉईल का उपयोग होता है। इसे हम
          स्टेन्ट कहते है। बैलून / गुब्बारे को इसके बाद निकाल लेते है, जबकि
          स्टेन्ट धमनी में ही रहकर उसे लंबे समय तक खुला रखता है।
        </p>
        <p className=" p-4">
          यह कार्य सफलतापूर्वक करने के बाद स्टेन्ट में खून का थक्का जमने से
          रोकने के लिये कुछ दवाईयां उपयोग की जाती हैं। एन्टीप्लेटलेट ऐसी दवाई
          हैं जिसे कम से कम 1 वर्ष तक लेना पड़ता है। इसके अतिरिक्त कुछ विशेष
          परिस्थितियों में जब स्टेन्टमें खून का थक्का जमने की अधिव संभावना लगती
          है अब्सिक्सिमाब/ इंटेग्रेलिन/टिरोफाइबन नामक दवाईयां देनी पड़ती है।
          एन्जियोप्लास्टी होती है, उन्हें आजीवन एस्पिरिन व कुछ मात्रा लेनी होती
          है। 2% मरीजों में रुकावट (रीस्टेनोसिस) अगले 1 वर्ष में हो सकती है
          जिसका इलाज दोबारा एन्जियोप्लास्टी करने से, दवाइ से या सर्जरी
          सफलतापूर्वक हो जाता है।
        </p>
        <p className=" p-4">
          कोरोनरी एन्जियोग्राफी की तरह ही एन्जियोप्लास्टी करने में भी कुछ
          जटिलताएँ हो सकती है। आपकी हृदय धमनियों में बीमारी की स्थिति, आपके
          पम्पिंग चेम्बर (बायाँ निलय) की कार्य क्षमता एवं अन्य मौजूद बीमारियों
          पर इस इलाज की सुरक्षा निर्भर करती है। नीचे दर्शाये गये अनुसार विभिन्न
          जटिलताएँ इस इलाज के दौरान हो सकते हैं।
        </p>

        <ul className="list-disc pl-5">
          <li>
            5 में 1 रुकावट (रीस्टेनोसिस) अर्थात् स्टेन्ट / एन्जियोप्लास्टी की
            जगह अगले 1 वर्ष में फिर से रुकावट की संभावना।
          </li>
          <li>
            20 में 1 तुरन्त / आवश्यक बायपास की आवश्यकता, फेमोरल अथवा अन्य पंक्चर
            की जगह सूजन अथवा खून का जमना, कॉन्टास्ट की वजह से गुर्दों को नुकसान।
          </li>
          <li>
            50 में 1 स्टेन्ट में खून का थक्का जमने के कारण धमनी को पुनः खोलने की
            आवश्यकता, फीमोरल अथवा अन्य पंक्चर की जगह शल्यक्रिया की आवश्यकता
          </li>
          <li>
            100 में 1 हार्ट अटैक, खून का थक्का बनने से रोकने वाली दवाईयों के
            दुष्परिणाम, हृदय धमनी का फटना, हृदय की धड़कन / गति का अनियमित होना,
            मृत्यु ।
          </li>
        </ul>
      </div>

        <div className="space-y-4 p-4  ">
        <p className="text-sm">
         मैं{" "}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Doctor Section */}
          <div className="flex flex-col space-y-1">
            <DigitalSignatureSection title="ह्रदय रोग चिकित्सक" />
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={selectedTime}
              onTimeChange={setSelectedTime}
            />
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>

          {/* Patient Section */}
          <div className="flex flex-col space-y-1">
            <DigitalSignatureSection title="मरीज़ के हस्ताक्षर" />
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={selectedTime}
              onTimeChange={setSelectedTime}
            />
            <input
              type="text"
              placeholder="Name"
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
    <div className="space-y-4 mt-2 rounded-2xl border bg-white p-3 shadow-sm">
      {/* Header */}
      <h2 className="text-lg text-center font-semibold text-gray-700">
        INFORMED CONSENT FOR CORONARY ANGIOPLASTY (PTCA)
      </h2>

      {/* Instructions Text */}
      <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700 max-h-full overflow-y-auto">
        <p>
          Coronary Angloplasty (PTCA) is done to deal with narrowed or blocked
          coronary arteries. It is done in the much the same way as a coronary
          anglogram After an injection of focal anaesthunder catheterisation
          laboratory in much the Aire tube or catheter is introduced inte an
          artery in the gron only angid guided into the affected coronary artery
          undert X-ray control. A thy wire is then passed down the artery so
          that a cylindrical balloon can be passed over it into the el in that
          is narrowed or blocked. This balloon is then inftated when fuld to
          compress the material narrowing the vessel in order to open it
        </p>
        <p className=" p-4">
          While this is often enough to restore blood flow to the heart muscle
          the coronary artery may split or damage The narrowing may reoccur as
          the balloon is deflated or the blockage may reform (restenosis) during
          the next few months in this case, one or more stents may be used. A
          stent is a slotted metal tube or wire coll, which is usually mounted
          on a balloon so that it can be passed into the diseased part of the
          artery. The balloon is then inflated so that stent is expanded inside
          the artery to hold it open. The stent remains after the balloon is
          removed.
        </p>
        <p className=" p-4">
          After this has been done, drugs are given to reduce the risk that
          blood may clot and block the stents Antiplatelet drugs are used for up
          to one year. Besides this, in certain cases, where there is a high
          chance of blood clots formation in stents,
          Abciximab/Integralin/Tirofiban may need to be administered. A small
          daily dose of aspirin should be taken indefinitely Restenosis occurs
          in upto 2% of patients in whom a stent has been used, but this can
          usually be breated with another angioplasty/medicine or surgery.
        </p>
        <p className=" p-4">
          Like coronary angiography, the risks of coronary angioplasty depend on
          the severity and extent of your coronary diseases, how well your left
          ventricle pumps and your general health.
        </p>
        <p className=" p-4">
          Table below shows the order of risk for various serious or troublesome
          consequences.
        </p>
        <ul className="list-disc pl-5">
          <li>1:5 restenosis</li>
          <li>
            1:20 need for urgent heart surgery bruising or swelling related to
            the groin puncture-haematoma including Pseudoaneurysm contrast
            induced injury to kidneys.
          </li>
          <li>
            1:50 need for urgent re-opening of coronary artery need for surgical
            repair to groin puncture site
          </li>
          <li>
            1:100 death, heart attack rupture of blood vessel (dissection)
            dangerous reaction to drugs which alter blood clotting disturbance
            of heart rhythm needing urgent treatment
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
          have been explained the advantages, disadvantages & possible
          complication of the PTCA in my language in detail. I hereby give my
          consent for any type of emergency treatment or anaesthesia required
          during this procedure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Doctor Section */}
          <div className="flex flex-col space-y-1">
            <DigitalSignatureSection title="Signature of Interventional Cardiologist" />
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={selectedTime}
              onTimeChange={setSelectedTime}
            />
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>

          {/* Patient Section */}
          <div className="flex flex-col space-y-1">
            <DigitalSignatureSection title="Patient's Signature" />
            <DateTimeInput
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              time={selectedTime}
              onTimeChange={setSelectedTime}
            />
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>
        </div>

        {/* Witness Section */}
        <div className="mt-4 flex flex-col space-y-1">
          <DigitalSignatureSection title="Signature of Relative/Witness" />
          <DateTimeInput
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            time={selectedTime}
            onTimeChange={setSelectedTime}
          />
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
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className=" space-y-4">
      {/* Language toggle */}
      <div className="flex justify-end">
        <button
          onClick={() => setLang(lang === "hi" ? "en" : "hi")}
          role="button"
          className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-[#36395a] bg-[#fcfcfd] rounded-md 
             shadow-[0_2px_4px_rgba(45,35,66,0.2),0_7px_13px_-3px_rgba(45,35,66,0.15),inset_0_-3px_0_#d6d6e7]
             transition duration-150 ease-in-out
             hover:shadow-[0_4px_8px_rgba(45,35,66,0.3),0_7px_13px_-3px_rgba(45,35,66,0.2),inset_0_-3px_0_#d6d6e7] hover:-translate-y-0.5
             focus:shadow-[inset_0_0_0_1.5px_#d6d6e7,0_2px_4px_rgba(45,35,66,0.4),0_7px_13px_-3px_rgba(45,35,66,0.3),inset_0_-3px_0_#d6d6e7]
             active:shadow-[inset_0_3px_7px_#d6d6e7] active:translate-y-0.5"
        >
          {lang === "hi" ? "Switch to English" : "Switch to Hindi"}
        </button>
      </div>

      {/* Render content based on language */}
      {lang === "hi" ? englishContent : hindiContent}
    </div>
  );
}
