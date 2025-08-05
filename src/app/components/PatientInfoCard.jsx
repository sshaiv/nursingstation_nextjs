
import LineItem from "../common/PatientInfo";
export default function PatientInfoCard({
  name,
  age,
  gender,
  bedNo,
  doctor,
  billingGroup,
  phone,
}) {
  return (
    <div className="w-full border border-gray-200 bg-white rounded-md shadow-sm p-2 md:p-3 text-xs space-y-2">
      {/* ✅ ALL DETAILS IN ONE CLEAN ROW */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-gray-700 font-medium">
        <img
          src="/patient.jpeg"
          alt="Patient"
          className="w-6 h-6 rounded-full object-cover"
        />

        <div className="flex items-center gap-1 font-semibold text-gray-800 text-[12px]">
          {name}
          <span className="text-gray-500 font-normal">
            ({age} yrs, {gender})
          </span>
        </div>

        <LineItem icon="🛏️" label="Bed No" value={bedNo} />
        <LineItem icon="👨‍⚕️" label="Primary Dr." value={doctor} />
        <LineItem icon="📝" label="Billing Group" value={billingGroup} />
        <LineItem icon="📞" label="Phone" value={phone} />
      </div>
    </div>
  );
}
